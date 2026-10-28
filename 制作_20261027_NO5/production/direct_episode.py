import json,sys,math,hashlib,re,subprocess
from pathlib import Path
P=Path(__file__).resolve().parents[1]
sys.path.insert(0,'/Users/henry/Desktop/秒懂金融学院/.agents/skills/finance-video-ai/scripts')
from stock_production import narration_hash
s=json.loads((P/'script.json').read_text());meta=json.loads((P/'audio/metadata.json').read_text());cand=json.loads((P/'candidates.json').read_text())
groups=[
(1,1,'pexels_38698437','history','从实际日收盘曲线看见跌破4000；实物金条生产持续运动，历史收盘与3975盘中低点分开标注。'),
(2,2,'mixkit_2861','history_low','熔铸黄金实物持续运动，展示3975盘中低点与实际日线；主镜头不冻结。'),
(3,3,'pexels_36418699','question','真实投资者看盘动作对应跌势下的疑问；不把演员标作托尔森。'),
(4,5,'pexels_7579954','author','官方原照抠图与10月25日报告身份同屏；GCI量尺只呈现实际25读数与下四分位。'),
(6,7,'pexels_38412249','washout','市场屏幕作资料底层；黄金卖出换取现金、承接盘承压，3950阈值以假设机制表达。'),
(8,10,'pexels_10223447','window','日历窗口从10月底展开至11月第二周；第10幕停在提前给出3950这一句，引出历史原报告。'),
(11,11,'pexels_27616566','earlier_title','金融新闻报纸与美元实拍打底，展示10月15日报告标题与原文预测；不冒充报告实拍。'),
(12,13,'mixkit_2862','earlier','原10月15日报告黄金原图先完整出现再聚焦右端；明确3950是当时预测。真实金库支持讨论标的。'),
(14,16,'pexels_39020626','distance','实际3975低点与3950预测在同一数轴比较，量尺演示25美元约0.6%的距离，不补造历史行情。'),
(17,18,'pexels_7580278','support','技术分析实拍打底；3963至3946区域展开成带，3950落在带内。'),
(19,20,'pexels_38875223','support_deep','延续共同价格量尺，下探3890的更深支撑只作技术位，不画为已发生走势。'),
(21,22,'pexels_37558975','stress','华尔街实景；严重股灾使权益资产缩水，投资者变现金，黄金也被售出；条件分支注明极端情景。'),
(23,23,'pexels_7579951','maincase','回到分析师真实原照与主要筑底时间窗，区分3500条件分支。'),
(24,24,'pexels_4987955','silver','美国铸币局实景作贵金属机构资料；原白银报告图聚焦55下方与50趋势线，标明预测支撑。'),
(25,25,'pexels_29188213','yield','美国财政建筑实景；揭示原TNX周线真实过程，单位TNX除以10，最后4.988%与5%阈值分开。'),
(26,27,'pexels_1797020','probability','放大镜检验美元实拍；100格概率格从约70格收缩至不足10格，12月另列风险标签。'),
(28,28,'pexels_4393479','fed','美元钞票实拍和议息日历翻页，决议作为待发生催化；不冒充发布会现场。'),
(29,29,'pexels_5466779','pce','真实数钞动作；通胀压力活塞上升推动加息预期标尺，表达条件机制。'),
(30,30,'pexels_4145888','sequence','美元资料打底；预期利息筹码减少、持金机会成本压力解除、黄金承接面稳定，最后指向筑底窗口。'),
(31,31,'pexels_38711950','timeline1','市场热图实拍；10月15日至23日八日跨度，分别落定3950预测和3975实际低点，保留差距。'),
(32,32,'pexels_30445098','timeline2','双屏研究实拍；10月25日最新判断与3950再次出现，标明仍是判断。'),
(33,33,'pexels_4319342','interaction','纽约证券交易所实景；未来一到两周日历与关键观察线，留时间读互动问题。'),
(34,35,'pexels_5651767','close','真实美元与硬币实拍继续运动；短语随口播出现，结尾不放封面。')]
by={x['source_id']:x for x in cand['sources']};used={g[2] for g in groups};cand['sources']=[x for x in cand['sources'] if x['source_id'] in used];(P/'candidates.json').write_text(json.dumps(cand,ensure_ascii=False,indent=2));(P/'materials.json').write_text(json.dumps(cand,ensure_ascii=False,indent=2))
units=[];dec=[];research=[]
for a,b,sid,kind,goal in groups:
 ids=[f'scene_{i:02d}' for i in range(a,b+1)];rid='r_'+sid
 research.append({'id':rid,'query':by[sid].get('research_query','gold bullion real production vault'),'channel':'Pexels官方当期检索与原始JSON' if sid.startswith('pexels') else 'Mixkit本期gold检索与单素材许可页面','results':[{'url':by[sid]['url'],'source_id':sid,'decision':'selected','why':goal}]+([{'url':q['url'],'decision':'rejected','why':q['why']} for q in by[sid].get('reuse_exception',{}).get('searched_alternatives',[])])})
 for i in range(a,b+1):
  row=s['scenes'][i-1];row['shots']=[{'source_id':sid,'path':by[sid]['path'],'fit_to_audio':True,'supports':goal,'transition':'cut','transitionFrames':0,'camera':{'startScale':1,'endScale':1.012,'originX':50,'originY':50}}];row['overlayStrength']=.32
  if i==a:row['shots'][0]['in_frame']=3
  row['subtitleHighlights']=[v for v in ['4000美元','3950美元','3975美元','最后一洗','最后一跌','GCI','25','深度超卖区','恐慌抛售','最终洗盘','3963到3946美元','3890美元','3500美元','50美元','5%','70%','不足10%','美联储决议','PCE通胀数据','未来一到两周'] if v in row['text']]
 units.append({'first':ids[0],'last':ids[-1],'kind':kind})
 dec.append({'scene_ids':ids,'goal':goal,'visual_solution':goal,'graphics_role':'以原数据、原图、阈值和对象状态变化提供口播增量，不重复整句字幕。','visual_family':kind,'source_ids':[sid],'research_ids':[rid]})
 # exact audio range record for actual source review
 frames=sum(math.ceil(meta['files'][x]['duration_ms']*30/1000) for x in ids)
 duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(P/by[sid]['path'])]))
 assert frames/30+.1<=duration,(sid,frames/30,duration)
 print(a,b,sid,round(frames/30,2),round(duration,2))
s['episodeUnits']=units;s['episodeNumber']=5
points=json.loads((P/'data/xau-daily.json').read_text())['points']
for n in [1,2]:
 row=s['scenes'][n-1];row['priceHistory']={'from':0,'to':'scene_end','title':'黄金跌破4000美元' if n==1 else '10月23日 · 盘中低点3975.64','instrument':'XAU/USD · 2026.09.25—10.23','unit':'美元/盎司','source':'英为财情｜日收盘；Kitco｜盘中低点','points':points,'domain':[3900,4350],'drawFrom':5,'drawTo':'reading_hold','markers':[{'date':'2026-10-23','field':'low','label':'盘中低点3975.64','from':160 if n==1 else 145}],'contextNote':'历史行情截至10月23日｜3950为托尔森预测'}
(P/'script.json').write_text(json.dumps(s,ensure_ascii=False,indent=2))
claims=[{'scene_ids':['scene_01','scene_02'],'quote':'黄金刚刚跌破4000美元','decision':'animate_series','data_path':'data/xau-daily.json'}]
for n in [6,12,24]:
 claims.append({'scene_ids':[f'scene_{n:02d}'],'quote':s['scenes'][n-1]['text'],'decision':'not_a_time_series','reason':'本幕是阈值/预测判断，不是随时间已发生的行情；真实历史走势已在开头完整交代。'})
claims.append({'scene_ids':['scene_25'],'quote':'10年期美债收益率上周已经收在5%下方','decision':'reveal_source_chart','chart_path':'evidence/thorson-0-chart-1.png','source_url':'https://goldprice.substack.com/p/weekend-gold-update','reason':'作者同一口径TNX周线已留原图；未取得作者周线逐笔序列，使用原始StockCharts真实走势图及原坐标，不从两个端点补线。','reveal_method':'完整图短暂交代后，在原图横轴上从左至右揭示2022—2026真实周线，最后定位2026年10月与5%水平线。'})
plan={'version':1,'intent':'new_episode','episode_number':5,'narration_sha256':narration_hash(s),'history':{'root':str(P.parents[1]),'scope_note':'扫描本视频工作空间中实际已渲染的项目；比较原始视频身份与SHA，封面和原始数据不算底层视频复用。'},'research':research,'scenes':dec,'temporal_claims':claims}
(P/'visual_plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2))
(P/'production/source-review-ranges.json').write_text(json.dumps([{'id':u[2],'path':by[u[2]]['path'],'from':.1,'duration':sum(math.ceil(meta['files'][f'scene_{i:02d}']['duration_ms']*30/1000) for i in range(u[0],u[1]+1))/30} for u in groups],ensure_ascii=False,indent=2))
