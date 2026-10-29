import {clientReferences} from '@/lib/client-references';
import {SectionHeading} from './InteriorUI';
import {OrganizationLogo,OrganizationDetails} from './OrganizationIdentity';
import {organizationProfile} from '@/lib/organization-profiles';
export default function ClientReferences(){return <section id="clients" className="interior-section client-references"><SectionHeading eyebrow="CLIENTS & SERVICE CONTEXT" title="客戶與服務面向" description="以下呈現已確認可公開的客戶名稱與服務面向；個別專案的工作範圍與成果，依實際資料分別說明。"/><div className="values-grid client-reference-grid">{clientReferences.map(client=><article id={'client-'+client.id} key={client.id}><OrganizationLogo id={client.id}/><p className="category-label">{client.area}</p><h3>{organizationProfile(client.id)?.displayName||client.name}</h3><OrganizationDetails id={client.id}/><p className="organization-relationship-label">韓森服務面向</p><span className="partner-status">{client.status}</span><p>{client.summary}</p></article>)}</div></section>}
