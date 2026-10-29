import Link from 'next/link';
import LineIcon from './LineIcon';
import {inquiryHref} from '@/lib/inquiry-links';
import {associateConsultant as person} from '@/lib/associate-consultant';
export default function AssociateConsultant(){return <article className="associate-consultant" id="consultant-vincent-wu" aria-label="顧問吳志倫 Vincent Wu"><div className="associate-consultant-heading"><span className="expertise-icon"><LineIcon name="people"/></span><div><p className="eyebrow">CONSULTANT · ORGANIZATION & GROWTH</p><h3>{person.name}<span>{person.en}</span></h3><p className="associate-role">{person.role}</p></div></div><p>{person.intro}</p><ul className="associate-specialties" aria-label="Vincent Wu專業面向">{person.areas.map(area=><li key={area}>{area}</li>)}</ul><p>{person.industryContext}</p><Link className="detail-link" href={inquiryHref('人才資產發展','','team')}>討論組織與人才發展需求 →</Link></article>}
