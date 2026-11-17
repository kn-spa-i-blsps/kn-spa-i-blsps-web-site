import fs from 'node:fs';
import db,{getSetting,setSetting} from './db.js';
export function initWebsite(){
 if(getSetting('redesign_published_v1')==='true')return;
 const seed=JSON.parse(fs.readFileSync(new URL('./initial-content.json',import.meta.url),'utf8'));
 const en=value=>seed.SITE_EN[value]||value;
 const upsert=(table,row)=>{const keys=Object.keys(row);db.prepare('INSERT INTO '+table+' ('+keys.join(',')+') VALUES ('+keys.map(()=>'?').join(',')+') ON CONFLICT(id) DO UPDATE SET '+keys.filter(k=>k!=='id').map(k=>k+'=excluded.'+k).join(',')).run(...keys.map(k=>row[k]));};
 db.transaction(()=>{
  db.prepare('UPDATE members SET is_active=0').run();
  const memberIds={};
  for(const [index,p] of seed.PEOPLE.entries()){
   const previous=db.prepare('SELECT * FROM members WHERE name=?').get(p.n);
   const id=previous?.id||p.slug;memberIds[p.slug]=id;
   upsert('members',{id,name:p.n,role_pl:p.roles[0]?.role||'',role_en:en(p.roles[0]?.role||''),bio_pl:previous?.bio_pl||'',bio_en:previous?.bio_en||'',custom_tags:previous?.custom_tags||'[]',socials:previous?.socials||'[]',photo_url:previous?.photo_url||'',sort_order:index,assignments:JSON.stringify(p.roles.map(r=>({group:r.group,role_pl:r.role,role_en:en(r.role)}))),is_active:1,show_photo:0});
  }
  for(const [index,id] of seed.ORDER.entries()){
   const p=seed.P[id],x=seed.X[id];
   const website={logo_url:p.logo,illustration_url:p.ill,color:p.c,tag_pl:p.tag,tag_en:en(p.tag),where_pl:p.where,where_en:en(p.where),alt:p.alt,title_pl:p.title,title_en:en(p.title),lead_pl:p.lead,lead_en:en(p.lead),stage:x.stage,finished:!!x.finished,research:!!x.research,research_html_pl:id==='bluespark'?seed.researchHtml.pl:'',research_html_en:id==='bluespark'?seed.researchHtml.en:'',about:x.about.map(([heading,text])=>({heading_pl:heading,heading_en:en(heading),text_pl:text,text_en:en(text)})),done_pl:x.done,done_en:en(x.done),done_caption_pl:x.doneCap||'',done_caption_en:en(x.doneCap||''),plan_pl:x.plan,plan_en:en(x.plan),gallery:Array.from({length:7},(_,i)=>({url:seed.TEST_MEDIA['img/p/'+seed.GK[id]+'_g'+(i+1)+'.jpg'],caption_pl:'Zdjęcie z projektu '+p.name,caption_en:'Photo from the '+p.name+' project'}))};
   const team=seed.PEOPLE.filter(m=>m.roles.some(r=>r.group===id||r.group===id+'-research')).map(m=>memberIds[m.slug]);
   upsert('projects',{id,title:p.name,full_title:p.title,ordering:index,short_desc_pl:p.short,short_desc_en:en(p.short),full_desc_pl:x.about.map(a=>a[1]).join('\n\n'),full_desc_en:x.about.map(a=>en(a[1])).join('\n\n'),team_ids:JSON.stringify(team),spec:'[]',image_url:x.doneImg||'',external_url:'',website:JSON.stringify(website)});
  }
  db.prepare('UPDATE news SET published=0').run();
  for(const p of seed.POSTS){
   const e=p.en||{};upsert('news',{id:p.id,date:p.date,title_pl:p.t,title_en:e.t||p.t,short_desc_pl:p.x,short_desc_en:e.x||p.x,full_desc_pl:p.html,full_desc_en:e.html||p.html,content_format:'html',cover_image:p.img||'',gallery:JSON.stringify(p.gallery||[]),links:JSON.stringify((p.links||[]).map(l=>({...l,label:typeof l.label==='string'?{pl:l.label,en:(p.en?.links||[]).find(e=>e.url===l.url)?.label||l.label}:l.label}))),published:1,featured:p.big?1:0,project_id:p.p});
  }
  db.prepare('DELETE FROM partners').run();
  for(const [i,p] of seed.partners.entries())db.prepare('INSERT INTO partners(name,url,logo,category,sort_order) VALUES(?,?,?,?,?)').run(p.name,p.url,p.logo,p.category,i);
  const site={texts:seed.siteTexts,homeGallery:seed.homeGallery,homeAboutImage:seed.homeAboutImage,contact:seed.contact,socials:seed.socials,researchVideo:seed.researchHtml.pl.match(/<video[^>]*src="([^"]+)/)?.[1]||'',groups:seed.TEAM.map(({people,...group})=>group),icons:seed.TEST_ICONS};
  setSetting('public_site',JSON.stringify(site));setSetting('redesign_published_v1','true');setSetting('migrated','true');
 })();
}
