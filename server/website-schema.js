import db from './db.js';
export function websiteSchema(){
 const columns={projects:{website:"TEXT NOT NULL DEFAULT '{}'"},members:{assignments:"TEXT NOT NULL DEFAULT '[]'",is_active:'INTEGER NOT NULL DEFAULT 1',show_photo:'INTEGER NOT NULL DEFAULT 1'},news:{project_id:"TEXT NOT NULL DEFAULT 'kn'"}};
 for(const [table,fields] of Object.entries(columns)){
  const existing=new Set(db.prepare('PRAGMA table_info('+table+')').all().map(row=>row.name));
  for(const [name,type] of Object.entries(fields))if(!existing.has(name))db.exec('ALTER TABLE '+table+' ADD COLUMN '+name+' '+type);
 }
}
