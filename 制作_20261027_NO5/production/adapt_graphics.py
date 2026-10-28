import json,shutil
from pathlib import Path
P=Path(__file__).resolve().parents[1]
props=json.loads((P/'stock_props.json').read_text());script=json.loads((P/'script.json').read_text());by={s['id']:s for s in props['scenes']}
props['episodeUnits']=[{**u,'from':by[u['first']]['from'],'frames':by[u['last']]['from']+by[u['last']]['frames']-by[u['first']]['from']} for u in script['episodeUnits']]
props['actualGoldPoints']=json.loads((P/'data/xau-daily.json').read_text())['points']
D=P/'stock_public/evidence';D.mkdir(exist_ok=True,parents=True)
for f in (P/'evidence').iterdir():
 if f.suffix.lower() in ['.png','.jpg','.jpeg','.webp']:shutil.copy2(f,D/f.name)
(P/'stock_props.json').write_text(json.dumps(props,ensure_ascii=False,indent=2))
