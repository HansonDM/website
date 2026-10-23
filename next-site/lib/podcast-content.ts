import snapshot from './podcast-feed.json';

export type PodcastEpisode=typeof snapshot.latest;
export const podcast=snapshot;
export const podcastEpisodes:readonly PodcastEpisode[]=snapshot.episodes;
export function podcastEpisode(value:unknown){return typeof value==='string'?podcastEpisodes.find(episode=>episode.id===value):undefined;}
export function podcastEpisodeHref(value:unknown){const episode=podcastEpisode(value);return episode?'/knowledge/#podcast-'+episode.id:null;}
export function podcastShareUrl(value:unknown){return podcastEpisode(value)?.url??null;}
export function podcastHashEpisode(hash:string){if(!hash.startsWith('#podcast-'))return undefined;return podcastEpisode(hash.slice('#podcast-'.length));}
export function podcastExcerpt(episode:PodcastEpisode){const first=episode.description.split('\n\n').find(Boolean)||'';return first.length>220?first.slice(0,220)+'…':first;}
export function podcastDate(value:string){return new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));}
