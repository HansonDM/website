"""Read the official public RSS; publish only validated, already released metadata."""
import argparse
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import tempfile
import time
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
FEED_URL = 'https://feed.firstory.me/rss/user/cld2k5uon026b01tj3x31cprb'
SHOW_URL = 'https://open.firstory.fm/user/biznutrify543'
EMBED_URL = 'https://open.firstory.fm/embed/user/biznutrify543'
MAX_BYTES = 8 * 1024 * 1024

class PlainText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.hidden = 0
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'): self.hidden += 1
        if tag in ('p', 'br', 'li', 'div', 'h2', 'h3'): self.parts.append('\n')
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.hidden = max(0, self.hidden - 1)
        if tag in ('p', 'li', 'div'): self.parts.append('\n')
    def handle_data(self, data):
        if not self.hidden: self.parts.append(data)

def plain_text(value, limit=8000):
    parser = PlainText()
    parser.feed(value or '')
    lines = [re.sub(r'\s+', ' ', line).strip() for line in ''.join(parser.parts).splitlines()]
    return '\n\n'.join(line for line in lines if line)[:limit]

def parse_feed(raw, now=None):
    now = now or datetime.now(timezone.utc)
    if len(raw) > MAX_BYTES or re.search(br'<!\s*(DOCTYPE|ENTITY)', raw, re.I):
        raise ValueError('RSS exceeds size limit or contains a document type/entity declaration')
    channel = ET.fromstring(raw).find('channel')
    if channel is None or channel.findtext('title') != '企業解憂事務所' or channel.findtext('link') != SHOW_URL:
        raise ValueError('Unexpected podcast source')
    episodes = {}
    for item in channel.findall('item'):
        guid = (item.findtext('guid') or '').strip()
        link = (item.findtext('link') or '').strip()
        title = plain_text(item.findtext('title'), 500)
        if not re.fullmatch(r'[a-z0-9]{10,64}', guid) or link != 'https://open.firstory.fm/story/' + guid or not title:
            continue
        try:
            published = parsedate_to_datetime(item.findtext('pubDate') or '')
            if published.tzinfo is None: continue
            published = published.astimezone(timezone.utc)
        except (ValueError, TypeError, OverflowError):
            continue
        if published > now: continue
        description = plain_text(item.findtext('description'))
        duration = item.findtext('{http://www.itunes.com/dtds/podcast-1.0.dtd}duration', '')
        seconds = int(duration) if duration.isdecimal() and int(duration) < 604800 else None
        episodes[guid] = {'id': guid, 'title': title, 'url': link,
            'publishedAt': published.isoformat().replace('+00:00', 'Z'),
            'description': description, 'durationSeconds': seconds}
    if not episodes: raise ValueError('No valid published episode in the official RSS')
    recent = sorted(episodes.values(), key=lambda episode: (episode['publishedAt'], episode['id']), reverse=True)[:6]
    latest = recent[0]
    return {'version': 2, 'showTitle': channel.findtext('title'),
        'showDescription': plain_text(channel.findtext('description'), 2000),
        'showUrl': SHOW_URL, 'feedUrl': FEED_URL, 'embedUrl': EMBED_URL,
        'checkedAt': now.isoformat().replace('+00:00', 'Z'), 'latest': latest, 'episodes': recent}

class FirstoryRedirects(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        from urllib.parse import urlparse
        target = urlparse(newurl)
        if target.scheme != 'https' or target.hostname not in ('feed.firstory.me', 'open.firstory.me', 'open.firstory.fm'):
            raise ValueError('Unexpected RSS redirect')
        return super().redirect_request(req, fp, code, msg, headers, newurl)

def download():
    opener = urllib.request.build_opener(FirstoryRedirects())
    for attempt in range(3):
        try:
            request = urllib.request.Request(FEED_URL, headers={'User-Agent': 'HansonWebsite-PodcastSync/1.0', 'Accept': 'application/rss+xml, application/xml'})
            with opener.open(request, timeout=25) as response:
                raw = response.read(MAX_BYTES + 1)
            return parse_feed(raw)
        except Exception:
            if attempt == 2: raise
            time.sleep(2 * (attempt + 1))

def latest_publication(snapshot):
    if (not isinstance(snapshot, dict) or snapshot.get('showTitle') != '企業解憂事務所'
            or snapshot.get('feedUrl') != FEED_URL or snapshot.get('showUrl') != SHOW_URL
            or not isinstance(snapshot.get('episodes'), list) or not snapshot['episodes']
            or snapshot.get('latest') != snapshot['episodes'][0]):
        raise ValueError('INVALID_PODCAST_SNAPSHOT')
    try:
        published = datetime.fromisoformat(snapshot['latest']['publishedAt'].replace('Z', '+00:00'))
        if published.tzinfo is None: raise ValueError('Missing publication timezone')
        return published.astimezone(timezone.utc)
    except (KeyError, TypeError, AttributeError, ValueError) as error:
        raise ValueError('INVALID_PODCAST_PUBLICATION') from error

def stage_snapshot(target, raw):
    target.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=target.parent, prefix='.' + target.name + '.',
                                     suffix='.tmp', delete=False) as stream:
        temporary = Path(stream.name)
        try:
            stream.write(raw)
            stream.flush()
        except Exception:
            temporary.unlink(missing_ok=True)
            raise
    return temporary

def write_snapshot(snapshot):
    # Prepare both outputs before replacing either. A caught I/O failure restores
    # replaced files; this is not a cross-file transaction or crash recovery.
    incoming = latest_publication(snapshot)
    encoded = (json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n').encode('utf-8')
    targets = [ROOT / 'lib/podcast-feed.json', ROOT / 'public/podcast-status.json']
    previous = {target: target.read_bytes() if target.exists() else None for target in targets}
    for raw in previous.values():
        if raw is not None and incoming < latest_publication(json.loads(raw)):
            raise ValueError('RSS_LATEST_EPISODE_REGRESSION')
    staged = {}; replaced = []; temporary_files = []
    try:
        for target in targets:
            staged[target] = stage_snapshot(target, encoded)
            temporary_files.append(staged[target])
        for target in targets:
            staged[target].replace(target)
            replaced.append(target)
    except Exception as error:
        rollback_errors = []
        for target in reversed(replaced):
            try:
                if previous[target] is None:
                    target.unlink(missing_ok=True)
                else:
                    restore = stage_snapshot(target, previous[target])
                    temporary_files.append(restore)
                    restore.replace(target)
            except Exception as rollback_error:
                rollback_errors.append(rollback_error)
        if rollback_errors:
            raise RuntimeError('PODCAST_SNAPSHOT_ROLLBACK_FAILED: inspect both outputs before rebuilding') from error
        raise
    finally:
        for temporary in temporary_files:
            temporary.unlink(missing_ok=True)

if __name__ == '__main__':
    argparse.ArgumentParser(description=__doc__).parse_args()
    snapshot = download()
    write_snapshot(snapshot)
    print('Official RSS verified; latest episode: ' + snapshot['latest']['title'])
