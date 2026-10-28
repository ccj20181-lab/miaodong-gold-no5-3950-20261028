import json,re,requests,sys
from pathlib import Path
P=Path(__file__).resolve().parents[1]
sys.path.insert(0,'/Users/henry/Desktop/秒懂金融学院/.agents/skills/finance-video-ai/scripts')
from stock_licensing import _assess
chosen={36353836,38698437,38412249,7579954,7580278,36418699,37558975,4319342,38711950,39020626,29188213,1797020,4393479,10223447,4145888,5466779,5651767,30445098,7579951,38875223,4987955}
sources={}
for f in (P/'production').glob('pexels-*.json'):
 data=json.loads(f.read_text())
 for r in data['props']['pageProps']['initialData']['data']:
  if r.get('type')!='video':continue
  a=r['attributes'];n=a['id']
  if n not in chosen or n in sources:continue
  s={'source_id':f'pexels_{n}','provider_id':f'pexels:{n}','path':f'materials/pexels_{n}.mp4','url':f'https://www.pexels.com/video/{a["slug"]}-{n}/','media_type':'video','source_label':'Pexels｜资料画面','download_url':a['video']['src'],'license_evidence':{'path':str(f.relative_to(P)),'source_url':f'https://www.pexels.com/search/videos/{f.stem[7:].replace("-","%20")}/'},'description':a['description'],'candidate_duration':a['duration'],'research_query':f.stem[7:].replace('-',' ')}
  _assess(P,s);sources[n]=s
for n,slug in [(2861,'producing-gold-bullion'),(2862,'gold-ingots-on-a-shelf')]:
 u=f'https://mixkit.co/free-stock-video/{slug}-{n}/';r=requests.get(u,timeout=30);r.raise_for_status();f=P/f'production/mixkit-{n}.html';f.write_text(r.text)
 urls=list(dict.fromkeys(re.findall(r'https://[^\s"<>]+\.mp4',r.text)))
 media=next((x for x in urls if f'{n}' in x and '720' in x),None) or next(x for x in urls if f'{n}' in x)
 s={'source_id':f'mixkit_{n}','provider_id':f'mixkit:{n}','path':f'materials/mixkit_{n}.mp4','url':u,'media_type':'video','source_label':'Mixkit｜实物黄金资料','download_url':media,'license_evidence':{'path':str(f.relative_to(P)),'source_url':u},'reuse_exception':{'reason':'本期重新检索Pexels gold bullion/gold coins和Mixkit gold后，候选主要是加密币、CGI或无关装饰。真实金条熔铸与金库镜头直接对应实物黄金，限这两条例外复用。','searched_alternatives':[{'url':'https://www.pexels.com/video/digital-animation-of-gold-bars-8733007/','why':'CGI，非真实实物金条'},{'url':'https://www.pexels.com/video/a-handful-of-gold-and-silver-coins-8369983/','why':'加密代币，不可冒充实物黄金'}]}}
 _assess(P,s);sources[n]=s
out={'sources':list(sources.values())};(P/'candidates.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print('licensed candidates',len(sources))
