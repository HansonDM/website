import {parsePlanningFocus,planningHref,type PlanningId} from './service-planning';

export function serviceNavigationSelection(kind:PlanningId,search:string){
 const values=new URLSearchParams(search).getAll('focus');
 return parsePlanningFocus(kind,values.length===1?values[0]:undefined);
}

export function serviceNavigationHref(kind:PlanningId,selected:readonly string[]){
 // Keep the existing public share/return format; no preparation answers or other query fields.
 return planningHref(kind,selected);
}
