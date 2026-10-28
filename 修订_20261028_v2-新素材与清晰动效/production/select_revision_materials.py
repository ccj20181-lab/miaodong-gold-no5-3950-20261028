# coding: utf-8
import json,sys
from pathlib import Path
P=Path(__file__).resolve().parents[1]
sys.path.insert(0,'/Users/henry/Desktop/秒懂金融学院/.agents/skills/finance-video-ai/scripts')
from stock_licensing import _assess
chosen=[6263163,6173172,5743128,26773217,6266264,5364907,3944852,6263486,7552421,8425702,7947425,5646855,7592929,11271609,29188225,5909916,6266440,4121754,7687708,14609095,7255353,39104011,5705007]
old=json.loads((P/'production/all-history-identities.json').read_text());ids=set(old['source_ids']);urls=set(old['urls']);found={}
for f in sorted((P/'production').glob('pexels-*.json')):
 data=json.loads(f.read_text())
 for row in data['props']['pageProps']['initialData']['data']:
  if row.get('type')!='video':continue
  a=row['attributes'];n=a['id']
  if n not in chosen or n in found:continue
  sid=f'pexels_{n}';u=f'https://www.pexels.com/video/{a["slug"]}-{n}/';assert sid not in ids and u not in urls,(sid,u)
  source={'source_id':sid,'provider_id':f'pexels:{n}','path':f'materials/pexels_{n}.mp4','url':u,'media_type':'video','source_label':'Pexels｜资料画面','download_url':a['video']['src'],'license_evidence':{'path':str(f.relative_to(P)),'source_url':'https://www.pexels.com/search/videos/'+f.stem[7:].replace('-','%20')+'/'},'description':a['description'],'candidate_duration':a['duration'],'width':a['width'],'height':a['height'],'research_query':f.stem[7:].replace('-',' ')}
  _assess(P,source);found[n]=source
assert set(found)==set(chosen),set(chosen)-set(found)
(P/'candidates.json').write_text(json.dumps({'sources':[found[n] for n in chosen]},ensure_ascii=False,indent=2))
print('fresh licensed video candidates',len(found))
for n in chosen:print(n,found[n]['candidate_duration'],found[n]['description'])
