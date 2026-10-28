/**
 * 黄金观察 · Motion Design System v3
 * 一套色板 / 一套字阶 / 一套缓动 —— 所有组件只从这里取值。
 */
import {Easing, interpolate, spring} from 'remotion';

export const FPS = 30;
export const W = 1080, H = 1920;

/* ---------- Palette：深黑 + 香槟金，红/青只作语义色 ---------- */
export const C = {
  black: '#07080A',      // 底色
  ink: '#0E1013',        // 面板
  panel: 'rgba(10,11,14,0.62)',
  line: 'rgba(255,255,255,0.14)',
  white: '#F6F1E7',      // 暖白，避免纯白刺眼
  dim: 'rgba(246,241,231,0.62)',
  gold: '#E8C27A',       // 主强调：香槟金
  goldHi: '#FFE3A3',     // 高光
  goldLo: '#9C7A3C',     // 暗部
  red: '#FF6B5A',        // 下跌/风险
  mint: '#5FD4B0',       // 支撑/修复
};
export const GOLD_GRAD = `linear-gradient(180deg, ${C.goldHi} 0%, ${C.gold} 45%, ${C.goldLo} 100%)`;

/* ---------- Typography ---------- */
export const F = {
  title: 'StockTitle',     // 思源黑体 Heavy：主标题
  label: 'StockLabel',     // 思源黑体 Bold：标签/正文
  num: 'StockNumeral',     // Barlow Semi Condensed：数字（tabular）
  caption: 'StockLabel',   // 字幕统一为思源黑体，弃用斜体卡通字
};
// 字阶（px, 以1080宽为准）：Display 120 / H1 64 / H2 44 / Body 30 / Meta 20
export const T = {display: 120, h1: 64, h2: 44, body: 30, meta: 20};

/* ---------- Safe areas（竖屏 9:16） ---------- */
// 顶部 220px 给平台状态栏；底部 380px 给平台按钮/简介；右侧 140px 给点赞栏
export const SAFE = {top: 220, bottom: 380, side: 64, right: 140};
// 画面主窗（与v2保持一致，保证字幕/图形相对位置不变）
export const WIN = {x: 48, y: 724, w: 984, h: 676};

/* ---------- Motion：唯一的三条曲线 + 两档弹簧 ---------- */
export const EASE = {
  out: Easing.bezier(0.16, 1, 0.3, 1),     // expo-out：入场
  inOut: Easing.bezier(0.65, 0, 0.35, 1),  // 转场/遮罩
  in: Easing.bezier(0.7, 0, 0.84, 0),      // 出场
};
export const SPRING = {
  soft: {damping: 200, stiffness: 120, mass: 1},   // 无回弹，用于大面积
  pop: {damping: 14, stiffness: 160, mass: 0.7},   // 轻回弹，用于数字/柱子
};
// 时长（帧）：入场 18 / 遮罩 14 / 逐字间隔 2 / 出场 8
export const DUR = {enter: 18, wipe: 14, stagger: 2, exit: 8, transition: 12};

export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const ramp = (f: number, a: number, b: number, ease = EASE.out) =>
  interpolate(f, [a, Math.max(a + 1, b)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
export const sp = (f: number, delay = 0, cfg = SPRING.soft) => spring({frame: f - delay, fps: FPS, config: cfg});
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
