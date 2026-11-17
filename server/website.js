import { marked } from 'marked';
import db,{getSetting} from './db.js';
import fs from 'node:fs';
const seed=JSON.parse(fs.readFileSync(new URL('./initial-content.json',import.meta.url),'utf8'));
const parse=(value,fallback)=>{try{return JSON.parse(value);}catch{return fallback;}};
export function getWebsite(){
 const site=parse(getSetting('public_site'),{}),P={},X={},ORDER=[],translations={...seed.SITE_EN};
 const pair=(pl,en)=>{if(pl&&en)translations[pl]=en;return pl||'';};
 const projectRows=db.prepare('SELECT * FROM projects ORDER BY ordering,title').all();
 for(const row of projectRows){
  const w=parse(row.website,{}),id=row.id;
  ORDER.push(id);
  P[id]={name:row.title,c:w.color||'var(--kn)',tag:pair(w.tag_pl,w.tag_en),where:pair(w.where_pl,w.where_en),alt:w.alt||'',logo:w.logo_url||site.icons?.club,ill:w.illustration_url||w.logo_url||site.icons?.club,short:pair(row.short_desc_pl,row.short_desc_en),title:pair(w.title_pl||row.full_title,w.title_en),lead:pair(w.lead_pl,w.lead_en)};
  X[id]={stage:Math.max(0,Math.min(3,Number(w.stage)||0)),finished:!!w.finished,research:!!w.research,researchHtml:{pl:w.research_html_pl||'',en:w.research_html_en||w.research_html_pl||''},about:(w.about||[]).map(a=>[pair(a.heading_pl,a.heading_en),pair(a.text_pl,a.text_en)]),doneImg:row.image_url||'',doneCap:pair(w.done_caption_pl,w.done_caption_en),done:pair(w.done_pl,w.done_en),plan:pair(w.plan_pl,w.plan_en),gallery:w.gallery||[]};
 }
 const members=db.prepare('SELECT * FROM members WHERE is_active=1 ORDER BY sort_order,name').all();
 const groups=[...(site.groups||[])];
 for(const row of projectRows)if(!groups.some(g=>g.id===row.id))groups.push({id:row.id,g:row.title,c:P[row.id].c});
 const TEAM=groups.filter(g=>!seed.ORDER.includes(g.id)||P[g.id]).map(g=>({...g,g:P[g.id]?.name||g.g,people:members.flatMap(m=>parse(m.assignments,[]).filter(a=>a.group===g.id).map(a=>[m.name,pair(a.role_pl||m.role_pl,a.role_en||m.role_en)]))})).filter(g=>g.people.length);
 for(const row of projectRows){const w=parse(row.website,{});if(w.favicon_url)site.icons[row.id]=w.favicon_url;else if(seed.P[row.id]?.logo!==w.logo_url&&w.logo_url)site.icons[row.id]=w.logo_url;}
 const photos=Object.fromEntries(members.filter(m=>m.show_photo&&m.photo_url).map(m=>[m.name,m.photo_url]));
 const POSTS=db.prepare('SELECT * FROM news WHERE published=1 ORDER BY featured DESC,date DESC').all().map(r=>{
  const links=parse(r.links,[]),label=(value,lang)=>typeof value==='object'?(value?.[lang]||value?.pl||''):value;
  const body=(text)=>{
   if(r.content_format==='markdown')return marked.parse(text||'');
   if(['text','plain'].includes(r.content_format))return '<p>'+String(text||'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c])).replace(/\n/g,'<br>')+'</p>';
   return text||'';
  };
  return {id:r.id,p:P[r.project_id]?r.project_id:'kn',date:r.date,big:!!r.featured,img:r.cover_image||'',t:r.title_pl,x:r.short_desc_pl,html:body(r.full_desc_pl),gallery:parse(r.gallery,[]),links:links.map(l=>({...l,label:label(l.label,'pl')})),en:{t:r.title_en||r.title_pl,x:r.short_desc_en||r.short_desc_pl,html:body(r.full_desc_en||r.full_desc_pl),links:links.map(l=>({...l,label:label(l.label,'en')}))}};
 });
 const partners=db.prepare('SELECT * FROM partners ORDER BY sort_order,name').all();
 return {P,X,ORDER,TEAM,POSTS,photos,partners,site,translations};
}
