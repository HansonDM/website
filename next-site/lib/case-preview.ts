import content from './anonymous-case-preview.json';
import type {CasePreviewEntry} from './case-preview-model';
// Opt-in server setting; the editorial source and Logo assets are never imported here.
export function caseContentMode(){return process.env.CASE_CONTENT_MODE==='anonymous'?'anonymous':process.env.CASE_PREVIEW_ENABLED==='true'?'preview':'disabled';}
export function casePreviewEnabled(){return caseContentMode()==='preview';}
export function casePreviewEntries(enabled=caseContentMode()!=='disabled'):CasePreviewEntry[]{return enabled?content.entries as CasePreviewEntry[]:[];}
