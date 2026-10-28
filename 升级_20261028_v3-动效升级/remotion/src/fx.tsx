/** 通用质感层：胶片颗粒 / 暗角 / 漏光 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';
import {C} from './design';

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.07}) => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2) % 12; // 15fps 颗粒更像胶片
  return <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity}}>
    <svg width="100%" height="100%"><filter id={`grain${seed}`}><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="100%" height="100%" filter={`url(#grain${seed})`}/></svg>
  </AbsoluteFill>;
};

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.55}) =>
  <AbsoluteFill style={{pointerEvents: 'none', background: `radial-gradient(ellipse 75% 60% at 50% 48%, rgba(0,0,0,0) 55%, rgba(0,0,0,${strength}) 100%)`}}/>;

/** 转场漏光：一束暖金光从一侧扫过，峰值在第 len*0.35 帧 */
export const LightLeak: React.FC<{frame: number; len?: number; seed?: number}> = ({frame, len = 16, seed = 0}) => {
  if (frame < 0 || frame > len) return null;
  const t = frame / len, a = Math.sin(Math.PI * Math.min(1, t * 1.4)) * 0.55;
  const dir = random(`leak${seed}`) > 0.5 ? 1 : -1;
  const x = 50 + dir * (t * 90 - 45);
  return <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen', opacity: Math.max(0, a),
    background: `radial-gradient(ellipse 45% 70% at ${x}% 40%, ${C.goldHi}cc 0%, ${C.gold}55 35%, rgba(0,0,0,0) 70%)`}}/>;
};
