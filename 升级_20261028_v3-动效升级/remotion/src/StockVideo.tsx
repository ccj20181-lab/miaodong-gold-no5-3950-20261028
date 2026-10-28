/**
 * v3 渲染壳：替换原共享 StockVideo（/Users/henry/.../stock/StockVideo）。
 * 时间轴、配音、字幕内容、标题、Logo、BGM 与 v2 完全一致，只升级画面层。
 */
import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {C, F, WIN, EASE, DUR, ramp, sp, SPRING, clamp, GOLD_GRAD} from './design';
import {Grain, Vignette, LightLeak} from './fx';

type Shot = any; type Scene = any;
const TR = DUR.transition; // 转场重叠帧

const Media: React.FC<{shot: Shot; style: React.CSSProperties}> = ({shot, style}) =>
  <OffthreadVideo muted src={staticFile(shot.src)} startFrom={shot.trimBefore} style={style}/>;

/** 三种转场，按镜头序号轮换：缩放模糊 / 横向甩镜 / 斜向遮罩擦除 */
type Kind = 'zoom' | 'whip' | 'mask' | 'none';
function enterStyle(kind: Kind, f: number): React.CSSProperties {
  if (kind === 'none') return {};
  const p = ramp(f, 0, TR, EASE.inOut);
  if (kind === 'zoom') return {transform: `scale(${1.22 - 0.22 * p})`, filter: `blur(${(1 - p) * 18}px) brightness(${1 + (1 - p) * 0.6})`, opacity: clamp(f / 4)};
  if (kind === 'whip') return {transform: `translateX(${(1 - p) * 105}%) skewX(${(1 - p) * -8}deg)`, filter: `blur(${Math.sin(Math.PI * p) * 22}px)`};
  // mask：斜切遮罩从左向右擦开
  const e = p * 135;
  return {clipPath: `polygon(0 0, ${e}% 0, ${e - 35}% 100%, 0 100%)`};
}

const Footage: React.FC<{shot: Shot; idx: number; kind: Kind}> = ({shot, idx, kind}) => {
  const f = useCurrentFrame();
  const len = shot.frames + TR;
  const p = interpolate(f, [0, len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Ken Burns：推/拉交替 + 轻微平移；背景反向慢速，形成视差
  const dir = idx % 2 ? -1 : 1;
  const s = idx % 2 ? 1.1 - 0.06 * p : 1.04 + 0.06 * p;
  const px = dir * (p - 0.5) * 22, py = (idx % 3 - 1) * (p - 0.5) * 10;
  const enter = enterStyle(kind, f);
  return <AbsoluteFill style={{...enter, transform: undefined}}>
    {/* 背景：同源虚化 + 压暗，视差反向 */}
    <AbsoluteFill style={{overflow: 'hidden', ...enter.transform ? {transform: enter.transform} : {}}}>
      <Media shot={shot} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(42px) saturate(0.7) brightness(0.42)', transform: `scale(${1.2 + 0.04 * p}) translate(${-px * 0.5}px, ${-py * 0.5}px)`}}/>
    </AbsoluteFill>
    {/* 主窗 */}
    <div style={{position: 'absolute', left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h, overflow: 'hidden', borderRadius: 6}}>
      <div style={{position: 'absolute', inset: 0, transform: enter.transform}}>
        <Media shot={shot} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', transform: `translate(${px}px, ${py}px) scale(${s})`, filter: 'contrast(1.06) saturate(0.88)'}}/>
        {/* 统一调色：暗部偏冷、高光偏金 */}
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(232,194,122,0.06), rgba(7,8,10,0.25))', mixBlendMode: 'multiply'}}/>
      </div>
    </div>
  </AbsoluteFill>;
};

/** 主窗框：发丝金线 + 角标 + 进度线 + 素材标注 */
const WindowFrame: React.FC<{total: number; label?: string}> = ({total, label}) => {
  const f = useCurrentFrame();
  const draw = ramp(f, 4, 34, EASE.out);
  const corner = (x: number, y: number, sx: number, sy: number) => <path d={`M${x} ${y + sy * 22}V${y}H${x + sx * 22}`} fill="none" stroke={C.gold} strokeWidth={2.5} opacity={draw}/>;
  return <svg style={{position: 'absolute', left: WIN.x - 10, top: WIN.y - 10, width: WIN.w + 20, height: WIN.h + 20, overflow: 'visible', pointerEvents: 'none'}}>
    <rect x={10} y={10} width={WIN.w} height={WIN.h} rx={6} fill="none" stroke="rgba(232,194,122,0.35)" strokeWidth={1} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw}/>
    {corner(2, 2, 1, 1)}{corner(WIN.w + 18, 2, -1, 1)}{corner(2, WIN.h + 18, 1, -1)}{corner(WIN.w + 18, WIN.h + 18, -1, -1)}
    <rect x={10} y={WIN.h + 8} width={WIN.w * (f / total)} height={2} fill={C.gold} opacity={0.85}/>
    {label && <text x={WIN.w + 4} y={WIN.h + 2} textAnchor="end" fontFamily={F.label} fontSize={17} fill={C.dim} letterSpacing="0.06em">{label}</text>}
  </svg>;
};

/** 逐字入场的大标题：遮罩上滑 + 模糊收焦；关键词金色渐变 + 下划线 */
const Title: React.FC<{lines: string[]; keywords: string[]}> = ({lines, keywords}) => {
  const f = useCurrentFrame();
  const pattern = keywords.length ? new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g') : null;
  let idx = 0;
  return <div style={{position: 'absolute', bottom: 1220, left: 48, width: 984, textAlign: 'center', fontFamily: F.title, fontWeight: 900, fontSize: 72, lineHeight: 1.22, color: C.white, letterSpacing: '0.01em'}}>
    {lines.map((line, li) => {
      const parts = pattern ? line.split(pattern).filter(Boolean) : [line];
      return <div key={li} style={{overflow: 'hidden', paddingBottom: 10}}>{parts.map((part, pi) => {
        const hot = keywords.includes(part);
        const startIdx = idx;
        const chars = [...part].map((ch, ci) => {
          const d = 4 + li * 8 + (idx++) * DUR.stagger;
          const p = sp(f, d, SPRING.soft);
          return <span key={ci} style={{display: 'inline-block', transform: `translateY(${(1 - p) * 90}%)`, opacity: p, filter: `blur(${(1 - p) * 6}px)`,
            ...(hot ? {backgroundImage: GOLD_GRAD, WebkitBackgroundClip: 'text', color: 'transparent', filter: `blur(${(1 - p) * 6}px) drop-shadow(0 4px 10px rgba(0,0,0,.6))`} : {textShadow: '0 4px 14px rgba(0,0,0,.65)'})}}>{ch}</span>;
        });
        const u = ramp(f, 4 + li * 8 + (startIdx + part.length) * DUR.stagger + 4, 4 + li * 8 + (startIdx + part.length) * DUR.stagger + 22);
        return <span key={pi} style={{position: 'relative', display: 'inline-block'}}>{chars}
          {hot && <span style={{position: 'absolute', left: 0, right: 0, bottom: 2, height: 6, background: C.gold, transformOrigin: 'left', transform: `scaleX(${u})`, opacity: 0.9, borderRadius: 3}}/>}
        </span>;
      })}</div>;
    })}
  </div>;
};

/** 字幕：统一字体/描边/位置；每句 5 帧上浮入场，关键词金色 + 下划线生长 */
const Caption: React.FC<{scene: Scene}> = ({scene}) => {
  const f = useCurrentFrame();
  const c = scene.captions.find((c: any) => f >= c.from && f < c.to);
  if (!c) return null;
  const local = f - c.from, p = ramp(local, 0, 6), out = 1 - ramp(f, c.to - 3, c.to, EASE.in);
  return <div style={{position: 'absolute', bottom: 404, left: 48, width: 984, textAlign: 'center', fontFamily: F.caption, fontWeight: 700, fontSize: 48, lineHeight: 1.2, color: C.white, whiteSpace: 'nowrap',
    opacity: Math.min(p, out + 0.4), transform: `translateY(${(1 - p) * 14}px)`, textShadow: '0 2px 2px rgba(0,0,0,.9), 0 6px 18px rgba(0,0,0,.7)', letterSpacing: '0.02em'}}>
    {c.segments.map((s: any, i: number) => s.highlight
      ? <span key={i} style={{position: 'relative', color: C.goldHi}}>{s.text}<span style={{position: 'absolute', left: 0, right: 0, bottom: -4, height: 4, borderRadius: 2, background: C.gold, transformOrigin: 'left', transform: `scaleX(${ramp(local, 4, 16)})`}}/></span>
      : <span key={i}>{s.text}</span>)}
  </div>;
};

export const StockVideo: React.FC<any> = (props) => {
  const tracks = props.scenes.flatMap((scene: Scene) => scene.shots.map((shot: Shot) => ({...shot, absoluteFrom: scene.from + shot.from, sceneId: scene.id})));
  const unitStarts = new Set((props.episodeUnits ?? []).map((u: any) => u.from));
  const kindFor = (i: number, t: any): Kind => i === 0 ? 'none' : unitStarts.has(t.absoluteFrom) ? (i % 2 ? 'mask' : 'whip') : 'zoom';
  const f = useCurrentFrame();
  const current = [...tracks].reverse().find((t: any) => t.absoluteFrom <= f);
  return <AbsoluteFill style={{background: C.black}}>
    <style>{`@font-face{font-family:StockSubtitle;src:url('${staticFile('fonts/SmileySans-Oblique.ttf')}')}@font-face{font-family:StockTitle;src:url('${staticFile('fonts/SourceHanSansSC-Heavy.otf')}');font-weight:900}@font-face{font-family:StockLabel;src:url('${staticFile('fonts/SourceHanSansSC-Bold.otf')}');font-weight:700}@font-face{font-family:StockNumeral;src:url('${staticFile('fonts/BarlowSemiCondensed-SemiBold.ttf')}');font-weight:600}`}</style>
    {tracks.map((shot: any, i: number) => <Sequence key={i} from={shot.absoluteFrom} durationInFrames={Math.min(shot.frames + TR, props.totalFrames - shot.absoluteFrom)}>
      <Footage shot={shot} idx={i} kind={kindFor(i, shot)}/>
    </Sequence>)}
    {/* 主窗内统一压暗渐层，图形可读 */}
    <div style={{position: 'absolute', left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h, borderRadius: 6, background: 'linear-gradient(180deg, rgba(7,8,10,.55) 0%, rgba(7,8,10,.18) 30%, rgba(7,8,10,.18) 70%, rgba(7,8,10,.6) 100%)', boxShadow: 'inset 0 0 120px rgba(0,0,0,.55)'}}/>
    {props.scenes.map((scene: Scene) => <Sequence key={scene.id} from={scene.from} durationInFrames={scene.frames}>
      <Audio src={staticFile(scene.audio)}/>
    </Sequence>)}
    {props.children}
    <WindowFrame total={props.totalFrames} label={current?.sourceLabel}/>
    {props.scenes.map((scene: Scene) => <Sequence key={'c' + scene.id} from={scene.from} durationInFrames={scene.frames}><Caption scene={scene}/></Sequence>)}
    {tracks.map((t: any, i: number) => i > 0 && <Sequence key={'l' + i} from={t.absoluteFrom} durationInFrames={18}><LeakAt seed={i} strong={unitStarts.has(t.absoluteFrom)}/></Sequence>)}
    <Audio src={staticFile(props.bgm)} volume={props.bgmVolume} loop/>
    <Img src={staticFile(props.logo)} style={{position: 'absolute', width: 130, top: 118, right: 76, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.6))'}}/>
    <Title lines={props.titleLines} keywords={props.titleHighlightKeywords ?? []}/>
    <Vignette strength={0.5}/>
    <Grain opacity={0.08}/>
  </AbsoluteFill>;
};
const LeakAt: React.FC<{seed: number; strong: boolean}> = ({seed, strong}) => {
  const f = useCurrentFrame();
  return <div style={{opacity: strong ? 1 : 0.5}}><LightLeak frame={f} len={16} seed={seed}/></div>;
};
