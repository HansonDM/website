import {sitemapEntries} from '@/lib/site-metadata';
import {casePreviewEnabled} from '@/lib/case-preview';
export const dynamic='force-static';
export default function sitemap(){return sitemapEntries(casePreviewEnabled());}
