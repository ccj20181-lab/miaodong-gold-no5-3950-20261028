import React, {useId} from 'react';

export type HistoricalPriceData = {
  light?: boolean;
  from: number;
  to: number;
  title: string;
  instrument: string;
  unit: string;
  source: string;
  points: {date: string; close: number; high?: number; low?: number}[];
  domain: [number, number];
  /** Relative to from. Reserve at least min(30 frames, 20% duration) after drawTo. */
  drawFrom: number;
  drawTo: number;
  /** Editorial holds map real dates to narration cues, never invent price observations. */
  timeStops?: {frame:number;date:string}[];
  contextNote?: string;
  startDate?: string;
  endDate?: string;
  markers?: {date: string; field: 'high' | 'low' | 'close'; label: string; from: number; to?:number}[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};
const GOLD='#E8C27A',WHITE='#F6F1E7',INK='#050607';
const Tone=React.createContext(false);
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const dateMs=(s:string)=>{
 const ms=Date.parse(`${s}T00:00:00Z`);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(ms)||new Date(ms).toISOString().slice(0,10)!==s)throw new Error(`Invalid price date: ${s}`);
 return ms;
};
const number=(v:number)=>v.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:2});
const fieldName={close:'收盘价',high:'盘中高点',low:'盘中低点'};
const Label:React.FC<{x:number;y:number;children:React.ReactNode;size?:number;anchor?:'start'|'middle'|'end';color?:string;numeral?:boolean}>=({x,y,children,size=22,anchor='start',color=WHITE,numeral=false})=>{const light=React.useContext(Tone);return <text x={x} y={y} fill={light?(color===GOLD?'#8D4C1F':'#17384F'):color} fontSize={size} textAnchor={anchor} style={{fontFamily:numeral?'StockNumeral, sans-serif':'StockLabel, sans-serif',fontWeight:700,paintOrder:'stroke fill',stroke:light?'#FFF8EA':INK,strokeWidth:2.2,strokeLinejoin:'round',fontVariantNumeric:'tabular-nums'}}>{children}</text>};
const sourceLines=(source:string)=>{
 const lines:string[]=[];let line='',weight=0;
 for(const char of source){const n=/[\u0000-\u00ff]/.test(char)?.53:1;if(weight+n>43){lines.push(line);line='';weight=0;}line+=char;weight+=n;}
 if(line)lines.push(line);
 if(lines.length>2)throw new Error('Historical chart source must fit two readable lines; shorten the source label and retain full provenance in the manifest');
 return lines;
};

/** True dated observations only. No interpolated quote or spline-generated extrema. */
export const HistoricalPriceChart:React.FC<{data:HistoricalPriceData;frame:number}>=({data:d,frame})=>{
 const GOLD='#E8C27A',WHITE='#F6F1E7',INK='#050607';
 const id=useId().replace(/:/g,'');
 if(frame<d.from||frame>=d.to)return null;
 const duration=d.to-d.from,hold=Math.min(30,Math.floor(duration*.2));
 if(![d.from,d.to,d.drawFrom,d.drawTo,...d.domain].every(Number.isFinite)||duration<=0||d.drawFrom<0||d.drawTo<=d.drawFrom||d.drawTo>duration-hold)throw new Error('Invalid chart timing: drawTo must leave a final reading hold');
 if(d.domain[1]<=d.domain[0]||d.points.length<2)throw new Error('Chart requires an increasing domain and at least two observations');
 const rows=d.points.map((p,i)=>{
  const time=dateMs(p.date);
  if(i&&time<=dateMs(d.points[i-1].date))throw new Error('Price observations must be unique and in ascending date order');
  if(!Number.isFinite(p.close)||p.close<d.domain[0]||p.close>d.domain[1])throw new Error(`Close is missing or outside domain: ${p.date}`);
  if(p.high!==undefined&&(!Number.isFinite(p.high)||p.high<p.close))throw new Error(`Invalid intraday high: ${p.date}`);
  if(p.low!==undefined&&(!Number.isFinite(p.low)||p.low>p.close))throw new Error(`Invalid intraday low: ${p.date}`);
  return {...p,time};
 });
 const first=d.startDate?dateMs(d.startDate):rows[0].time,last=d.endDate?dateMs(d.endDate):rows[rows.length-1].time;
 if(first>rows[0].time||last<rows[rows.length-1].time||last<=first)throw new Error('Chart date range must contain every supplied observation');
 const markers=(d.markers??[]).map(m=>{
  const row=rows.find(r=>r.date===m.date),value=row?.[m.field];
  if(!row||value===undefined||!Number.isFinite(value)||value<d.domain[0]||value>d.domain[1])throw new Error(`Marker requires the actual ${m.field} observation inside domain: ${m.date}`);
  if(!Number.isFinite(m.from)||m.from<0||m.from>=duration||m.to!==undefined&&(!Number.isFinite(m.to)||m.to<=m.from||m.to>duration))throw new Error('Marker timing must be relative to chart start');
  return {...m,row,value};
 });
 const f=frame-d.from,a=clamp(f/10)*clamp((duration-f)/9),progress=clamp((f-d.drawFrom)/(d.drawTo-d.drawFrom));
 // Calendar time drives reveal. The displayed price always remains an observed daily quote.
 let now=first+(last-first)*progress;
 if(d.timeStops){
  const stops=d.timeStops.map(s=>({...s,time:dateMs(s.date)}));
  if(stops.length<2||stops[0].frame!==d.drawFrom||stops[0].time!==first||stops[stops.length-1].frame!==d.drawTo||stops[stops.length-1].time!==last||stops.some((s,i)=>!Number.isInteger(s.frame)||s.frame<d.drawFrom||s.frame>d.drawTo||i>0&&(s.frame<=stops[i-1].frame||s.time<stops[i-1].time)))throw new Error('Invalid historical chart narration stops');
  now=f<=stops[0].frame?first:last;
  for(let i=1;i<stops.length;i++)if(f>=stops[i-1].frame&&f<stops[i].frame){const a=stops[i-1],b=stops[i];now=a.time+(b.time-a.time)*(f-a.frame)/(b.frame-a.frame);break;}
 }
 const visible=rows.filter(r=>r.time<=now),active=visible[visible.length-1];
 const left=96,right=908,top=139,bottom=477;
 const x=(t:number)=>left+(t-first)/(last-first)*(right-left);
 const y=(v:number)=>bottom-(v-d.domain[0])/(d.domain[1]-d.domain[0])*(bottom-top);
 const line=rows.map((r,i)=>`${i?'L':'M'}${x(r.time)},${y(r.close)}`).join(' ');
 const rawStep=(d.domain[1]-d.domain[0])/4,magnitude=10**Math.floor(Math.log10(rawStep));
 const step=([1,2,2.5,5,10].find(v=>v>=rawStep/magnitude)??10)*magnitude;
 const ticks:number[]=[];for(let v=Math.ceil(d.domain[0]/step)*step;v<=d.domain[1]+step*.0001;v+=step)ticks.push(v);
 const dateTicks:{time:number;label:string}[]=[];
 for(let t=Date.UTC(new Date(first).getUTCFullYear(),new Date(first).getUTCMonth(),1);t<=last;t=Date.UTC(new Date(t).getUTCFullYear(),new Date(t).getUTCMonth()+1,1))dateTicks.push({time:Math.max(first,t),label:`${new Date(t).getUTCMonth()+1}月`});
 const sources=sourceLines(`数据：${d.source}`);
 const activeMarkers=markers.filter(m=>f>=m.from&&f<(m.to??duration)&&m.row.time<=now);
 // A marker on the current close owns its quote; do not duplicate the final value.
 const markerOwnsQuote=active&&activeMarkers.some(m=>m.row.date===active.date&&m.field==='close');
 const quoteX=active?x(active.time):left,quoteY=active?y(active.close):bottom;
 const nearbyMarker=activeMarkers.some(m=>Math.abs(x(m.row.time)-quoteX)<145&&Math.abs(y(m.value)-quoteY)<70);
 const quoteBelow=quoteY<top+70||nearbyMarker;
 return <Tone.Provider value={false}><svg width={d.width??984} height={d.height??676} viewBox="0 0 984 676" style={{position:'absolute',left:d.x??0,top:d.y??0,pointerEvents:'none',overflow:'hidden'}}>
  <defs><clipPath id={`${id}-reveal`}><rect x={left-1} y={top-8} width={Math.max(0,x(now)-left+1)} height={bottom-top+17}/></clipPath><linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={GOLD} stopOpacity={.28}/><stop offset="1" stopColor={GOLD} stopOpacity={0}/></linearGradient><filter id={`${id}-shadow`} x="-15%" y="-30%" width="130%" height="160%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor={INK} floodOpacity={.8}/></filter></defs>
  <g opacity={a} filter={`url(#${id}-shadow)`}>
   <Label x={left} y={48} size={31}>{d.title}</Label>
   <Label x={left} y={83} size={20} color="#E3ECE7">{d.instrument} · {d.unit}</Label>
   <g><line x1={left} x2={left+27} y1={111} y2={111} stroke={GOLD} strokeWidth={3}/><Label x={left+38} y={118} size={20}>日收盘价</Label>{markers.some(m=>m.field!=='close')&&<Label x={right} y={118} size={18} anchor="end" color="#E3ECE7">◇ 盘中高低点</Label>}</g>
   {ticks.map(v=><g key={v}><line x1={left} x2={right} y1={y(v)} y2={y(v)} stroke={WHITE} strokeWidth={.8} opacity={.2}/><Label x={left-15} y={y(v)+7} size={21} anchor="end" numeral>{Number(v.toPrecision(10)).toLocaleString('en-US')}</Label></g>)}
   <line x1={left} x2={right} y1={bottom} y2={bottom} stroke={WHITE} strokeWidth={1} opacity={.45}/>
   {dateTicks.map((t,i)=><g key={i}><line x1={x(t.time)} x2={x(t.time)} y1={bottom} y2={bottom+7} stroke={WHITE} opacity={.55}/><Label x={x(t.time)} y={511} size={22} anchor={i===0?'start':'middle'}>{t.label}</Label></g>)}
   {f>=d.drawFrom&&<g clipPath={`url(#${id}-reveal)`}><path d={`${line} L${right},${bottom} L${left},${bottom} Z`} fill={`url(#${id}-area)`}/><path d={line} fill="none" stroke={INK} strokeWidth={7} strokeOpacity={.65} strokeLinejoin="round"/><path d={line} fill="none" stroke={GOLD} strokeWidth={14} strokeOpacity={.16} strokeLinejoin="round"/><path d={line} fill="none" stroke={GOLD} strokeWidth={3.6} strokeLinejoin="round" strokeLinecap="round"/></g>}
   {active&&<g><line x1={quoteX} x2={quoteX} y1={top} y2={bottom} stroke={WHITE} strokeWidth={.8} strokeDasharray="3 6" opacity={.38}/><circle cx={quoteX} cy={quoteY} r={10+6*Math.abs(Math.sin(f/7))} fill={GOLD} fillOpacity={.22}/><circle cx={quoteX} cy={quoteY} r={22} fill={GOLD} fillOpacity={.06}/><circle cx={quoteX} cy={quoteY} r={4} fill={WHITE}/>{!markerOwnsQuote&&f>=d.drawTo&&<Label x={right} y={top+48} anchor="end" size={31} color={GOLD} numeral>收盘 {number(active.close)}</Label>}<Label x={left} y={555} size={24} numeral>{active.date}</Label><Label x={left+175} y={555} size={21} color="#E3ECE7">现货黄金 · 日收盘</Label></g>}
   {activeMarkers.map((m,i)=>{
    const mx=x(m.row.time),my=y(m.value),below=m.field==='low'||my<top+45,side=mx>right-225?-1:1;
    const tx=Math.max(left+12,Math.min(right-12,mx+side*(42+(i%2)*16))),ty=Math.max(top+26,Math.min(bottom-28,my+(below?55:-45)));
    const reveal=Math.min(clamp((f-m.from)/10),clamp(((m.to??duration)-f)/8));
    return <g key={`${m.date}-${m.field}-${i}`} opacity={reveal}>
     {m.field==='close'?<circle cx={mx} cy={my} r={5} fill={GOLD}/>:<><line x1={mx} x2={mx} y1={y(m.row.close)} y2={my} stroke={WHITE} strokeWidth={1} strokeDasharray="2 3" opacity={.65}/><path d={`M${mx},${my-5} l5,5 l-5,5 l-5,-5Z`} fill={WHITE} stroke={INK} strokeWidth={1}/></>}
     <path d={`M${mx},${my} L${tx},${ty-14}`} fill="none" stroke={WHITE} strokeWidth={.9}/><Label x={tx} y={ty} size={21} anchor={side===1?'start':'end'}>{m.label} · {fieldName[m.field]}</Label><Label x={tx} y={ty+25} size={24} color={GOLD} anchor={side===1?'start':'end'} numeral>{m.date.slice(5)} · {number(m.value)}</Label>
    </g>;
   })}
   {d.contextNote&&<Label x={left} y={590} size={20} color="#E3ECE7">{d.contextNote}</Label>}
   {sources.map((s,i)=><Label key={i} x={left} y={625+i*25} size={20} color="#F0F5F1">{s}</Label>)}
  </g>
 </svg></Tone.Provider>;
};
