import db from './db.js';
const pages=new Map([
 ['/','/'],['/index.html','/'],['/kontakt','/kontakt'],['/contact','/kontakt'],['/contact.html','/kontakt'],
 ['/zespol','/zespol'],['/team','/zespol'],['/team.html','/zespol'],['/partnerzy','/partnerzy'],
 ['/projekty','/projekty'],['/projects','/projekty'],['/projects.html','/projekty'],['/aktualnosci','/aktualnosci'],
 ['/bluespark','/projekty/bluespark'],['/test','/'],['/test/index.html','/'],
]);
function findId(table,id,condition=''){
 return db.prepare('SELECT id FROM '+table+' WHERE lower(id)=lower(?)'+condition+' ORDER BY CASE WHEN id=? THEN 0 ELSE 1 END LIMIT 1').get(id,id)?.id;
}
function withSearch(target,search,remove=[]){
 if(!search)return target;
 if(!remove.length)return target+search;
 const query=new URLSearchParams(search);
 for(const key of remove)query.delete(key);
 const kept=query.toString();return target+(kept?'?'+kept:'');
}
export function canonicalTarget(path,search=''){
 let decoded;try{decoded=decodeURIComponent(path);}catch{return null;}
 const clean=decoded.replace(/\/+$/,'')||'/',lower=clean.toLowerCase();
 if(pages.has(lower))return withSearch(pages.get(lower),search);
 if(lower==='/bluespark/competitions/robosub-2026'){
  const article=findId('news','robosub-2026-post-event',' AND published=1');
  const target=article?'/aktualnosci/'+encodeURIComponent(article):findId('projects','bluespark')?'/projekty/bluespark':null;
  return target?withSearch(target,search):null;
 }
 const route=clean.match(/^\/(projekty|project|aktualnosci|news|member)\/([^/]+)$/i);
 if(route){
  const kind=route[1].toLowerCase(),isMember=kind==='member',isNews=kind==='news'||kind==='aktualnosci';
  const table=isMember?'members':isNews?'news':'projects',condition=isMember?' AND is_active=1':isNews?' AND published=1':'';
  const id=findId(table,route[2],condition);if(!id)return null;
  return withSearch(isMember?'/zespol':(isNews?'/aktualnosci/':'/projekty/')+encodeURIComponent(id),search);
 }
 const files={'/article.html':{table:'news',key:'id',base:'/aktualnosci/',condition:' AND published=1'},'/project.html':{table:'projects',key:'id',base:'/projekty/',condition:''},'/member.html':{table:'members',key:'user',base:'/zespol',condition:' AND is_active=1'}};
 const file=files[lower];if(!file)return null;
 const query=new URLSearchParams(search);if(query.getAll(file.key).length!==1)return null;
 const id=findId(file.table,query.get(file.key),file.condition);if(!id)return null;
 return withSearch(file.base+(file.table==='members'?'':encodeURIComponent(id)),search,[file.key]);
}
export function canonicalRedirect(req,res,next){
 if(req.method!=='GET'&&req.method!=='HEAD')return next();
 const mark=req.originalUrl.indexOf('?'),search=mark>=0?req.originalUrl.slice(mark):'';
 const target=canonicalTarget(req.path,search);
 if(target&&target!==req.path+search)return res.redirect(301,target);
 next();
}
