# coding: utf-8
import json,math,hashlib,re,sys
from pathlib import Path
P=Path(__file__).resolve().parents[1];S=P.parent/'制作_20261027_NO5'
s=json.loads((P/'script.json').read_text());baseline=json.loads((S/'script.json').read_text());manifest=json.loads((P/'candidates.json').read_text());by={x['source_id']:x for x in manifest['sources']};new=[x['source_id'] for x in manifest['sources']];assert len(s['episodeUnits'])==len(new)==23
m=json.loads((P/'audio/metadata.json').read_text());oldplan=json.loads((P/'production/baseline-visual-plan.json').read_text());units=[];research=[];decisions=[];replacement=[];ranges=[]
goals=[
'黄金戒指锉修实拍展示实体黄金；叠加保留本期实际金价曲线，首镜有连续手部动作，不把加工过程当价格走势。',
'金饰实物细节与移动展示打底，配合实际黄金日线与3975.64盘中低点；不再用反复出现的熔金原片。',
'手写记录与手机计算器的真实动作打底，承接市场判断疑问，不再选同一交易员棚景。',
'实际财务测算与计算器操作打底，官方托尔森抠图与GCI25承担特定身份和判断；不把泛金融文件当作原始报告。',
'现金清点与资金变现的实际动作支持恐慌抛售示意，黄金卖出换现金仍由既有机制图形呈现。',
'真实书写日程的手部动作打底，叠加10月底至11月第二周预测窗口；避开露出2024旧年份的摆拍桌面。',
'翻阅金融报纸/咖啡的实际动作提供报告回溯语境，本期原报告标题与北京时间10月15日仍由图层准确呈现。',
'真实金饰制作工序打底，原10月15日报告与3950预测保留，替换反复出现的金库金条原片。',
'俯视研究人员核对图表与手写标记的真实动作，支撑3975与3950的25美元比较；实际行情依据仍是Kitco与原数据。',
'手指/笔核对金融文档实拍打底，灰蒙版上的3963—3946支撑带展示本期技术位；原素材数字不当本期行情。',
'实际核对图表与计算器的镜头继续技术分析语境；叠加灰蒙版和清晰的3950/3890技术位。',
'曼哈顿金融区与渡轮的连续实景动作交代美国金融市场；极端股市下跌及黄金变现由条件机制图形解释。',
'阅读财经新闻的真实动作打底，回到托尔森主要时间窗；官方人物图与来源保留。',
'白银戒指抛光的真实动作支持白银标的，原白银走势图与55/50价格位只作报告证据与预测。',
'华盛顿街口车辆通行实景提供美国政经语境，原TNX真实周线、5%与4.988%读数承担收益率证据；不冒充美债交易现场。',
'现金计数器实际运行打底，既有100格概率图呈现约70%至不足10%；机器计数不作为概率来源。',
'美元点钞与手部操作的新镜头打底，实体感日历OCTOBER 28呈现本周FOMC时点，不用高透明纸面。',
'超市结账、扫描商品的真实消费动作支撑PCE所对应的消费价格语境，实际通胀数值未补造。',
'计算器与财经图表的手部操作支持收益率、持金机会成本与筑底窗口的机制总结，不把纸上旧数据当本期数据。',
'研究人员核对纸面金融图表打底，保留10月15日至23日的历史预判记录与8天跨度。',
'阅读新闻并喝咖啡的真实动作支持持续跟踪市场，10月25日最新判断仍由准确文字与3950呈现。',
'纽约Trinity Place金融区街景与相机移动打底，未来一到两周观察窗口和评论互动继续原时轴。',
'真实试戴和观赏金饰的手部动作收尾，继续黄金主题与原口播；不加封面、不改音轨。']
oldids=set(json.loads((P/'production/all-history-identities.json').read_text())['source_ids'])
for k,(u,sid,goal) in enumerate(zip(s['episodeUnits'],new,goals)):
 a=int(u['first'].split('_')[1]);b=int(u['last'].split('_')[1]);ids=[f'scene_{i:02d}' for i in range(a,b+1)];source=by[sid];old_sid=baseline['scenes'][a-1]['shots'][0]['source_id'];rid='r_'+sid
 for i in range(a,b+1):
  row=s['scenes'][i-1];row['shots']=[{'source_id':sid,'path':source['path'],'fit_to_audio':True,'supports':goal,'transition':'cut','transitionFrames':0,'camera':{'startScale':1,'endScale':1.012,'originX':50,'originY':50}}]
  if i==a:row['shots'][0]['in_frame']=3
 frames=sum(math.ceil(m['files'][i]['duration_ms']*30/1000) for i in ids);assert frames/30+.1<float(source['candidate_duration'])+.3,(sid,frames/30,source['candidate_duration'])
 ranges.append({'id':sid,'path':source['path'],'from':.1,'duration':frames/30})
 replacement.append({'scenes':ids,'old_source_id':old_sid,'new_source_id':sid,'new_url':source['url'],'reason':goal,'historical_id_url_overlap':False,'visual_review':'pending actual source playback'})
 results=[{'url':source['url'],'source_id':sid,'decision':'selected','why':goal}]
 raw=json.loads((P/source['license_evidence']['path']).read_text())
 for r in raw['props']['pageProps']['initialData']['data']:
  if r.get('type')!='video':continue
  v=r['attributes'];n=v['id'];candidate=f'pexels_{n}'
  if candidate==sid:continue
  why='本段所需对象或动作对应度较弱，未选用。'
  if candidate in oldids:why='往期或基线素材身份已出现，排除重复。'
  elif v['width']<=v['height']:why='竖屏素材，不满足真实模式横屏主素材要求。'
  elif any(t in v['description'].lower() for t in ['2021','2024','august']):why='可见旧日期容易与本期窗口混淆，未选。'
  elif candidate.startswith(('pexels_757','pexels_758','pexels_848','pexels_387')):why='与往期交易员/行情屏拍摄组视觉接近，本次主动排除。'
  results.append({'url':f'https://www.pexels.com/video/{v["slug"]}-{n}/','decision':'rejected','why':why})
  if len(results)>=5:break
 research.append({'id':rid,'query':source['research_query'],'channel':'Pexels官方当期检索；保留完整原始JSON及逐条许可','results':results})
 decisions.append({'scene_ids':ids,'goal':goal,'visual_solution':goal,'graphics_role':'保留本期已确认图形与数据，增强灰蒙版、实色物件和字体对比。','visual_family':u['kind'],'source_ids':[sid],'research_ids':[rid]})
plan={**oldplan,'intent':'new_episode','history':{'root':str(P.parents[1]),'scope_note':'包括此前第1—4期及NO.5基线实际渲染项目；另扩大比较同演员/同棚景和相近画面。不以换ID或换角度代替素材更新。'},'reuse_policy':{'max_reused_sources':0},'research':research,'scenes':decisions,'temporal_claims':oldplan['temporal_claims']}
s['visualRevision']={'baseline':str(S),'style':'cibc-gray-mask-plus-solid-objects','episode':5,'corner_episode_label':False,'same_narration':True}
(P/'script.json').write_text(json.dumps(s,ensure_ascii=False,indent=2));(P/'visual_plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2));(P/'materials.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));(P/'production/source-review-ranges.json').write_text(json.dumps(ranges,ensure_ascii=False,indent=2));(P/'production/material-replacement-record.json').write_text(json.dumps(replacement,ensure_ascii=False,indent=2))
assert [r['text'] for r in s['scenes']]==[r['text'] for r in baseline['scenes']]
print('23 sources assigned; no historical reuse allowed; all 35 narration texts preserved')
