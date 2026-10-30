import snapshot from './podcast-feed.json';

export type PodcastEpisode=typeof snapshot.latest;
export const podcast=snapshot;
export const podcastEpisodes:readonly PodcastEpisode[]=snapshot.episodes;
export function podcastEpisode(value:unknown){return typeof value==='string'?podcastEpisodes.find(episode=>episode.id===value):undefined;}
export function podcastEpisodeHref(value:unknown){const episode=podcastEpisode(value);return episode?'/knowledge/#podcast-'+episode.id:null;}
export function podcastShareUrl(value:unknown){return podcastEpisode(value)?.url??null;}
export function podcastHashEpisode(hash:string){if(!hash.startsWith('#podcast-'))return undefined;return podcastEpisode(hash.slice('#podcast-'.length));}
export function podcastExcerpt(episode:PodcastEpisode){
 const paragraphs=episode.description.split(/\n\s*\n/).map(text=>text.trim()).filter(Boolean);
 const episodeNumber=(text:string)=>/^EP\s*(\d+)(?:\D|$)/i.exec(text)?.[1];
 const number=episodeNumber(episode.title);
 // Only the explicit Firstory prefix format is skipped in excerpts. The full
 // source description, including sponsorship, stays untouched and readable.
 const start=paragraphs.findIndex(text=>episodeNumber(text)!==undefined);
 const boundary=paragraphs[start-1]||'';
 const sponsorEnd=/^[-—–]{2,}\s*(?:以上廣告由\s*Firstory\s*與【[^】\r\n]{1,100}】共同執行|以上為\s*Firstory\s+Podcast\s*廣告)\s*[-—–]{2,}$/;
 const first=number&&start>0&&start<=32&&episodeNumber(paragraphs[start])===number&&sponsorEnd.test(boundary)
  ?paragraphs[start]:paragraphs[0]||'';
 return first.length>220?first.slice(0,220)+'…':first;
}
export function podcastDate(value:string){return new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));}
