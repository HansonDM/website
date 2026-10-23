export type IconName='chart'|'chip'|'people'|'gear'|'leaf'|'search'|'document'|'bulb'|'play';
export default function LineIcon({name}:{name:IconName}){const paths:Record<IconName,React.ReactNode>={
chart:<><path d="M5 31V21h6v10m5 0V16h6v15m5 0V10h6v21M4 16l10-6 7 2L33 2m-8 0h8v8"/></>,
chip:<><rect x="9" y="9" width="20" height="20" rx="3"/><path d="M13 3v6m6-6v6m6-6v6M13 29v6m6-6v6m6-6v6M3 13h6m-6 6h6m-6 6h6m20-12h6m-6 6h6m-6 6h6"/><text x="12" y="24" fill="currentColor" stroke="none" fontSize="13" fontFamily="Arial">AI</text></>,
people:<><circle cx="19" cy="11" r="5"/><path d="M9 32v-4c0-6 4-10 10-10s10 4 10 10v4M6 12a4 4 0 010 8m26-8a4 4 0 010 8M3 31v-4a8 8 0 015-7m27 11v-4a8 8 0 00-5-7"/></>,
gear:<><path d="M15 3h8l1 5 4 2 5-1 4 7-4 4v4l3 4-4 6-5-2-4 2-1 4h-8l-1-5-4-2-5 1-4-7 4-4v-4l-3-4 4-6 5 2 4-2z" transform="translate(1 -1) scale(.9)"/><circle cx="19" cy="18" r="6"/></>,
leaf:<><path d="M8 29C-1 11 17 5 33 3c-1 18-5 32-23 27M5 37L27 10M12 26l-1-10m8 3 10 1"/></>,
search:<><circle cx="16" cy="16" r="11"/><path d="M24 24l11 11"/></>,
document:<><path d="M9 3h14l7 7v25H9zM23 3v8h7M14 17h11m-11 6h11m-11 6h7"/></>,
bulb:<><path d="M12 25c0-4-5-6-5-12a12 12 0 0124 0c0 6-5 8-5 12zM13 30h12m-10 5h8M19 0v-3M2 5l-4-3m38 3 4-3"/></>,
play:<><circle cx="19" cy="19" r="15"/><path d="M16 12l11 7-11 7z" fill="currentColor" stroke="none"/></>};return <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
