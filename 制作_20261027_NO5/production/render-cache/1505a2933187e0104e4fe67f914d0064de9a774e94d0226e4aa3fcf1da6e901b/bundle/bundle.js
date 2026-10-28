/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3517
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ../../../../../我的开发项目/工作流运行时依赖/finance-video-ai/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5706);
// EXTERNAL MODULE: ../../../../../我的开发项目/工作流运行时依赖/finance-video-ai/node_modules/react/index.js
var react = __webpack_require__(9922);
// EXTERNAL MODULE: ../../../../../我的开发项目/工作流运行时依赖/finance-video-ai/node_modules/remotion/dist/esm/index.mjs
var esm = __webpack_require__(8661);
;// ./src/stock/CompositeFootage.tsx



const rect = { position: "absolute", left: 48, top: 724, width: 984, height: 676, overflow: "hidden" };
const ShotMedia = ({ shot, style }) => shot.mediaType === "image" ? /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Img, { src: (0,esm.staticFile)(shot.src), style }) : /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.OffthreadVideo, { muted: true, src: (0,esm.staticFile)(shot.src), startFrom: shot.trimBefore, style });
function cameraStyle(shot, f) {
  const p = (0,esm.interpolate)(f, [0, Math.max(1, shot.frames - 1)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: esm.Easing.bezier(0.32, 0.05, 0.68, 0.95) });
  const c = shot.camera ?? {}, scale = (c.startScale ?? 1) + ((c.endScale ?? 1.04) - (c.startScale ?? 1)) * p;
  return { transform: `translate(${(c.panX ?? 0) * p}px,${(c.panY ?? 0) * p}px) scale(${scale})`, transformOrigin: `${c.originX ?? 50}% ${c.originY ?? 50}%` };
}
const CompositeFootage = ({ shot }) => {
  const f = (0,esm.useCurrentFrame)(), transition = shot.transition ?? "cut";
  const enter = transition === "cut" || !shot.transitionFrames ? 1 : (0,esm.interpolate)(f, [0, shot.transitionFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: esm.Easing.bezier(0.65, 0, 0.24, 1) });
  const camera = cameraStyle(shot, f), cam = String(camera.transform);
  const strip = (i) => Math.min(1, Math.max(0, (enter - i * 0.09) / 0.82));
  const polygon = transition === "wipe" ? `polygon(0 0,${strip(0) * 100}% 0,${strip(0) * 100}% 33.34%,0 33.34%,0 33.33%,${strip(1) * 100}% 33.33%,${strip(1) * 100}% 66.67%,0 66.67%,0 66.66%,${strip(2) * 100}% 66.66%,${strip(2) * 100}% 100%,0 100%)` : void 0;
  const reveal = { opacity: transition === "dissolve" ? enter : 1, clipPath: polygon };
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(esm.AbsoluteFill, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.AbsoluteFill, { style: reveal, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(ShotMedia, { shot, style: { width: "100%", height: "100%", objectFit: "cover", filter: "blur(40px)", ...camera, transform: `scale(1.08) ${cam}` } }) }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { ...rect, ...reveal }, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(ShotMedia, { shot, style: { position: "absolute", width: "100%", height: "100%", objectFit: "contain", ...camera } }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", right: 16, bottom: 12, fontFamily: "StockSubtitle", fontSize: 20, color: "white", textShadow: "0 2px 3px #000,0 0 3px #000" }, children: shot.sourceLabel })
    ] })
  ] });
};

;// ./src/stock/MotionGraphics.tsx




const C = { ivory: "#FFFFFF", gold: "#FFD86A", red: "#FF806C", mint: "#73EAC5", ink: "#10151B", muted: "#E4E7EA" };
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const num = (v, d) => typeof v === "number" && Number.isFinite(v) ? v : d;
const p = (f, s, d) => clamp((f - s) / Math.max(1, d));
const ease = (v) => 1 - Math.pow(1 - clamp(v), 3);
const settle = (v) => 1 - Math.exp(-6 * clamp(v)) * Math.cos(8 * clamp(v));
const display = (v, u = "") => v === void 0 ? "" : `${v}${u}`;
const palette = (color) => ({ "#FFD600": C.gold, "#FFD65C": C.gold, "#FF6767": C.red, "#FF4545": C.red, "#7DE6BD": C.mint, "#FFFFFF": C.ivory })[(color == null ? void 0 : color.toUpperCase()) ?? ""] ?? color ?? C.gold;
const path = (ps) => ps.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
function pointAt(ps, t) {
  const lens = ps.slice(1).map((q, i) => Math.hypot(q[0] - ps[i][0], q[1] - ps[i][1]));
  let left = clamp(t) * lens.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lens.length; i++) {
    if (left <= lens[i] || i === lens.length - 1) {
      const f = lens[i] ? left / lens[i] : 0;
      return [ps[i][0] + (ps[i + 1][0] - ps[i][0]) * f, ps[i][1] + (ps[i + 1][1] - ps[i][1]) * f];
    }
    left -= lens[i];
  }
  return ps[0] ?? [0, 0];
}
function smoothPoints(ps) {
  if (ps.length < 3) return ps;
  const result = [];
  for (let i = 0; i < ps.length - 1; i++) {
    const a = ps[Math.max(0, i - 1)], b = ps[i], c = ps[i + 1], d = ps[Math.min(ps.length - 1, i + 2)];
    for (let j = 0; j < 18; j++) {
      const t = j / 18, t2 = t * t, t3 = t2 * t;
      result.push([0.5 * (2 * b[0] + (-a[0] + c[0]) * t + (2 * a[0] - 5 * b[0] + 4 * c[0] - d[0]) * t2 + (-a[0] + 3 * b[0] - 3 * c[0] + d[0]) * t3), 0.5 * (2 * b[1] + (-a[1] + c[1]) * t + (2 * a[1] - 5 * b[1] + 4 * c[1] - d[1]) * t2 + (-a[1] + 3 * b[1] - 3 * c[1] + d[1]) * t3)]);
    }
  }
  result.push(ps[ps.length - 1]);
  return result;
}
const points = (e, w, h, fallback) => {
  const data = (e.points ?? fallback).filter((q) => q.length >= 2 && q.slice(0, 2).every(Number.isFinite));
  return (data.length >= 2 ? data : fallback).map((q) => [clamp(q[0]) * w, clamp(q[1]) * h]);
};
const Label = ({ x, y, children, size = 28, color = C.ivory, anchor = "start", opacity = 1, numeral = false, family }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, fill: color, fontSize: size, textAnchor: anchor, opacity, style: { fontFamily: family ?? (numeral ? "StockNumeral, DIN Alternate, sans-serif" : "StockLabel, sans-serif"), fontWeight: numeral ? 600 : 700, letterSpacing: numeral ? "-.025em" : ".06em", fontVariantNumeric: "tabular-nums", paintOrder: "stroke fill", stroke: "#111722", strokeWidth: 0.65, strokeOpacity: 0.8 }, children });
const Stroke = ({ d, color = C.gold, width = 2.6, draw = 1, opacity = 1, dash = false }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d, fill: "none", stroke: "#111924", strokeWidth: width + 3, opacity: 0.46, strokeLinecap: "round", strokeLinejoin: "round", pathLength: 1, strokeDasharray: dash ? ".012 .018" : 1, strokeDashoffset: dash ? 0 : 1 - clamp(draw) }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d, fill: "none", stroke: color, strokeWidth: width, strokeLinecap: "round", strokeLinejoin: "round", pathLength: 1, strokeDasharray: dash ? ".012 .018" : 1, strokeDashoffset: dash ? 0 : 1 - clamp(draw) })
] });
const Event = ({ event: e, frame }) => {
  var _a;
  const uid = (0,react.useId)().replace(/:/g, "");
  const ref = (name) => `url(#${uid}-${name})`;
  const w = Math.max(80, num(e.width, 824)), h = Math.max(80, num(e.height, 460)), f = frame - e.from, d = e.to - e.from;
  const fade = Math.max(1, Math.min(num(e.fadeFrames, 9), d / 3));
  const opacity = Math.min(p(f, 0, fade), p(d - f, 0, fade));
  const draw = ease(p(f, 3, Math.max(1, Math.min(num(e.drawFrames, 30), d - fade - 3)))), color = palette(e.color), size = Math.min(34, num(e.fontSize, 30));
  const reveal = (i, start) => {
    var _a2;
    return ease(p(f, ((_a2 = e.revealFrames) == null ? void 0 : _a2[i]) ?? start, 17));
  };
  const heading = e.text ? /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.06, y: h * 0.085, size, children: e.text }) : null;
  let graphic;
  switch (e.kind) {
    case "trend": {
      const ps = smoothPoints(points(e, w, h, [[0.08, 0.75], [0.27, 0.56], [0.43, 0.65], [0.61, 0.36], [0.78, 0.42], [0.92, 0.19]])), tip = pointAt(ps, draw);
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        heading,
        /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { stroke: C.ivory, strokeWidth: 0.7, opacity: 0.15, children: [0.2, 0.4, 0.6, 0.8].map((v) => /* @__PURE__ */ (0,jsx_runtime.jsxs)(react.Fragment, { children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: w * 0.06, y1: h * v, x2: w * 0.94, y2: h * v }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: w * v, y1: h * 0.14, x2: w * v, y2: h * 0.84 })
        ] }, v)) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("clipPath", { id: `${uid}-reveal`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 0, y: 0, width: w * draw, height: h }) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `${path(ps)} L${ps[ps.length - 1][0]},${h * 0.85} L${ps[0][0]},${h * 0.85} Z`, fill: ref("area"), clipPath: ref("reveal") }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { filter: ref("glow"), opacity: 0.35, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: path(ps), width: 4, color, draw }) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: path(ps), width: 3.8, color, draw }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: tip[0], cy: tip[1], r: 4, fill: C.ivory }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: tip[0], cy: tip[1], r: 8, fill: "none", stroke: color, strokeWidth: 1, opacity: 0.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.94, y: h * 0.96, anchor: "end", size: 22, color: C.muted, children: e.subtext ? `\u8D70\u52BF\u793A\u610F \xB7 ${e.subtext}` : "\u8D70\u52BF\u793A\u610F" })
      ] });
      break;
    }
    case "arrow": {
      const ps = points(e, w, h, [[0.12, 0.2], [0.47, 0.45], [0.9, 0.82]]), tip = pointAt(ps, draw), before = pointAt(ps, Math.max(0, draw - 0.02));
      const angle = Math.atan2(tip[1] - before[1], tip[0] - before[0]) * 180 / Math.PI;
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: path(ps), color, width: 3, draw }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: draw, transform: `translate(${tip[0]} ${tip[1]}) rotate(${angle})`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-15,-8 L0,0 L-15,8", fill: "none", stroke: color, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" }) }),
        e.text && /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.1, y: h * 0.96, size, color, children: e.text })
      ] });
      break;
    }
    case "priceCut": {
      const start = e.changeFrame ?? 28, strike = ease(p(f, start - 9, 14)), change = ease(p(f, start + 5, 22)), land = settle(p(f, start + 10, 28)), delta = reveal(1, start + 24);
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        heading,
        /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: 1 - change * 0.35, children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.12, y: h * 0.34, size: 64, color: C.muted, numeral: true, family: e.fontFamily, children: display(e.value, e.unit) }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: `M${w * 0.1},${h * 0.3} H${w * 0.36}`, color: C.red, width: 2, draw: strike })
        ] }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: `M${w * 0.42},${h * 0.3} C${w * 0.49},${h * 0.3} ${w * 0.49},${h * 0.59} ${w * 0.56},${h * 0.59}`, color: C.muted, width: 2.8, draw: change }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${w * 0.55 - 6},${h * 0.59 - 5} l8,5 l-8,5`, fill: "none", stroke: C.muted, opacity: change }),
        /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: change, transform: `translate(0 ${(1 - land) * -24})`, children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.58, y: h * 0.68, size: 110, color, numeral: true, family: e.fontFamily, children: display(e.endValue, e.unit) }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: w * 0.58, x2: w * 0.94, y1: h * 0.73, y2: h * 0.73, stroke: color, strokeWidth: 1, opacity: 0.75 }),
          [0.58, 0.76, 0.94].map((t) => /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: w * t, x2: w * t, y1: h * 0.73 - 4, y2: h * 0.73 + 4, stroke: color, strokeWidth: 1.1 }, t))
        ] }),
        e.deltaText && /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: delta, transform: `translate(0 ${(1 - delta) * 9})`, children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.12, y: h * 0.66, size: 56, color: C.red, numeral: true, family: e.fontFamily, children: e.deltaText }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.12, y: h * 0.76, size: 22, color: C.muted, children: "\u8C03\u6574\u5E45\u5EA6" })
        ] }),
        e.subtext && /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.94, y: h * 0.95, anchor: "end", size: 22, color: C.muted, children: e.subtext })
      ] });
      break;
    }
    case "forecast": {
      const values = (e.values ?? [num(e.value, 0), num(e.endValue, 0)]).slice(0, 2);
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        e.text ? heading : /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.06, y: h * 0.085, size, children: "\u5E74\u5EA6\u9884\u6D4B" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: `M${w * 0.1},${h * 0.7} H${w * 0.93}`, color: C.muted, width: 0.8, draw }),
        Array.from({ length: 25 }, (_, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: w * (0.1 + i * 0.83 / 24), x2: w * (0.1 + i * 0.83 / 24), y1: h * 0.7, y2: h * 0.7 + (i % 6 ? 5 : 10), stroke: C.ivory, strokeWidth: 0.7, opacity: 0.24 * draw }, i)),
        values.map((v, i) => {
          var _a2;
          const a = reveal(i, 8 + i * 40), x = w * (0.27 + i * 0.46);
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: a, children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: x, x2: x, y1: h * 0.7, y2: h * (0.39 + (1 - a) * 0.24), stroke: color, strokeWidth: 1, opacity: 0.6 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x, cy: h * 0.7, r: 4, fill: color }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x, cy: h * 0.7, r: 9 + 16 * (1 - a), fill: "none", stroke: color, strokeWidth: 1.8, opacity: (1 - a) * 0.7 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x, cy: h * 0.7, r: 8, fill: "none", stroke: color, opacity: 0.5 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { transform: `translate(0 ${(1 - a) * 14})`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x, y: h * 0.43, size: 78, color, anchor: "middle", numeral: true, family: e.fontFamily, children: display(v, e.unit) }) }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x, y: h * 0.84, size: 30, anchor: "middle", numeral: true, children: ((_a2 = e.labels) == null ? void 0 : _a2[i]) ?? "" })
          ] }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.93, y: h * 0.98, anchor: "end", size: 22, color: C.muted, children: e.subtext ? `\u9884\u6D4B \xB7 ${e.subtext}` : "\u9884\u6D4B\u503C\uFF0C\u975E\u5386\u53F2\u884C\u60C5" })
      ] });
      break;
    }
    case "flow": {
      let ps = points(e, w, h, [[0.08, 0.65], [0.3, 0.45], [0.65, 0.45], [0.9, 0.25]]);
      if (e.direction === "out") ps = [...ps].reverse();
      const count = Math.round(clamp(num(e.particleCount, 11), 3, 20)), end = ps[ps.length - 1], pulse = f % 42 / 42;
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        heading,
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: path(ps), width: 1.5, color, opacity: 0.58, draw }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: end[0], cy: end[1], r: 7, fill: ref("particle") }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: end[0], cy: end[1], r: 9 + pulse * 15, fill: "none", stroke: color, strokeWidth: 0.8, opacity: (1 - pulse) * 0.35 * draw }),
        Array.from({ length: count }, (_, i) => {
          const elapsed = f - i * 5;
          if (elapsed < 0) return null;
          const t = elapsed % 88 / 88, at = pointAt(ps, t), tail = pointAt(ps, Math.max(0, t - 0.045)), alpha = Math.min(t * 9, (1 - t) * 8, 1);
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: alpha, children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${tail[0]},${tail[1]} L${at[0]},${at[1]}`, stroke: color, strokeWidth: i % 3 ? 1.5 : 2.5, strokeLinecap: "round", opacity: 0.45 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: at[0], cy: at[1], r: i % 3 ? 4 : 5.7, fill: ref("particle") }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: at[0], cy: at[1], r: 2, fill: C.ivory })
          ] }, i);
        }),
        (_a = e.labels) == null ? void 0 : _a.slice(0, 2).map((label, i) => {
          const q = ps[i ? ps.length - 1 : 0];
          return /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: q[0], y: q[1] + 35, anchor: q[0] > w * 0.5 ? "end" : "start", size: 28, color: C.muted, children: label }, i);
        })
      ] });
      break;
    }
    case "balance": {
      const change = e.changeFrame ?? 28;
      const angle = clamp(num(e.tilt, 0.45), -1, 1) * 12 * settle(p(f, change, 45)), cx = w * 0.5, cy = h * 0.34, arm = w * 0.29, rad = angle * Math.PI / 180;
      const ends = [[-arm, 0], [arm, 0]].map(([x, y]) => [cx + x * Math.cos(rad) - y * Math.sin(rad), cy + x * Math.sin(rad) + y * Math.cos(rad)]);
      const panW = w * 0.2, drop = h * 0.26;
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        heading,
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${cx - 9},${h * 0.81} L${cx - 3},${cy} Q${cx},${cy - 8} ${cx + 3},${cy} L${cx + 9},${h * 0.81}Z`, fill: ref("metal") }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx, cy: h * 0.84, rx: w * 0.105, ry: h * 0.018, fill: ref("metal") }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx, cy: h * 0.835, rx: w * 0.088, ry: h * 9e-3, fill: C.ivory, opacity: 0.3 }),
        /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `rotate(${angle} ${cx} ${cy})`, children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${cx - arm - 10},${cy} Q${cx},${cy - 12} ${cx + arm + 10},${cy} L${cx + arm + 10},${cy + 4} Q${cx},${cy - 6} ${cx - arm - 10},${cy + 4}Z`, fill: ref("metal") }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: cx - arm, x2: cx + arm, y1: cy - 1, y2: cy - 1, stroke: C.ivory, strokeWidth: 0.8, opacity: 0.6 })
        ] }),
        ends.map(([x, y], i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x, cy: y, r: 3, fill: C.gold }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x},${y + 2} L${x - panW * 0.45},${y + drop} M${x},${y + 2} L${x + panW * 0.45},${y + drop}`, fill: "none", stroke: C.gold, strokeWidth: 1.1 }),
          i === 0 ? /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: ease(p(f, 3, 18)), transform: `translate(${x - 49} ${y + drop - 39}) scale(1.25)`, children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M0,21 L12,0 H67 L80,21 L72,29 H7Z", fill: ref("metal") }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M12,0 H67 L57,18 H0Z", fill: "#F0DDB0" }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M0,21 H80 L72,29 H7Z", fill: "#AA8953" }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M12,1 H66 M2,21 H78", stroke: "#FFF1CD", strokeWidth: 1 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M28,8 H48 M33,11 H44", stroke: "#B79A63", strokeWidth: 1 })
          ] }) : /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: ease(p(f, change - 18, 20)), transform: `translate(${x - 40} ${y + drop - 67}) scale(1.25) rotate(-5 32 27)`, children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { width: 65, height: 50, rx: 2, fill: ref("paper"), stroke: "#A4ADA7", strokeWidth: 0.8 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 5, y: 5, width: 55, height: 40, fill: "none", stroke: "#A6ADA1", strokeWidth: 0.6 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M13,13 H49 M13,18 H43 M13,25 H33 M13,30 H36", stroke: "#74887D", strokeWidth: 1.2 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 48, cy: 33, r: 7, fill: "none", stroke: "#9DAB99", strokeWidth: 1 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M46,39 l-2,7 4,-2 4,2 -2,-7", fill: "#A8B6A6" })
          ] }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - panW * 0.5},${y + drop} Q${x},${y + drop + 23} ${x + panW * 0.5},${y + drop} L${x + panW * 0.45},${y + drop + 9} Q${x},${y + drop + 30} ${x - panW * 0.45},${y + drop + 9}Z`, fill: ref("metal") }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - panW * 0.49},${y + drop} Q${x},${y + drop + 20} ${x + panW * 0.49},${y + drop}`, fill: "none", stroke: C.ivory, strokeWidth: 0.8, opacity: 0.8 })
        ] }, i)),
        [0, 1, 2].map((i) => {
          const a = ease(p(f, change + i * 10, 20)), end = ends[1];
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: Math.min(1, p(f, change + i * 10, 6)) * (1 - p(f, change + 35 + i * 10, 20)), children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: end[0] + (i - 1) * 19, cy: end[1] + drop - 85 + a * 38, r: 7, fill: C.gold, stroke: C.ivory, strokeWidth: 1 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: end[0] + (i - 1) * 19, cy: end[1] + drop - 85 + a * 38, r: 3.8, fill: "none", stroke: "#A97521", strokeWidth: 0.8 })
          ] }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx, cy, r: 7, fill: ref("metal"), stroke: C.ivory, strokeWidth: 0.7 }),
        [0.21, 0.79].map((x, i) => {
          var _a2;
          return /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * x, y: h * 0.94, size: 28, color: i ? C.mint : C.gold, anchor: "middle", children: ((_a2 = e.labels) == null ? void 0 : _a2[i]) ?? (i ? "\u503A\u5238\u5229\u606F" : "\u9EC4\u91D1") }, i);
        }),
        e.subtext && /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: cx, y: h * 1.015, size: 21, anchor: "middle", color: C.muted, children: e.subtext })
      ] });
      break;
    }
    case "threshold": {
      const threshold = num(e.value, 2), end = num(e.endValue, threshold * 0.65), max = Math.max(num(e.maxValue, threshold * 1.8), threshold + 0.1, end + 0.1), vy = (n) => h * 0.82 - clamp(n / max) * h * 0.58;
      const y = vy(threshold), cross = ease(p(f, e.changeFrame ?? 20, 35)), x = w * (0.18 + 0.62 * cross), start = threshold + (max - threshold) * 0.5, dotY = vy(start) + (vy(end) - vy(start)) * cross;
      const crossT = (start - threshold) / (start - end), hit = clamp((cross - crossT) * 4), pulse = clamp((cross - crossT) * 2.5);
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: w * 0.08, y, width: w * 0.86, height: h * 0.84 - y, fill: ref("mintArea"), opacity: 0.55 * hit }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: `M${w * 0.08},${y} H${w * 0.94}`, color: C.gold, width: 1, dash: true, opacity: 0.8 }),
        [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: w * 0.08 - 5, x2: w * 0.08, y1: h * (0.24 + i * 0.145), y2: h * (0.24 + i * 0.145), stroke: C.muted, strokeWidth: 1, opacity: 0.7 }, i)),
        /* @__PURE__ */ (0,jsx_runtime.jsxs)(Label, { x: w * 0.92, y: y - 17, size: 30, anchor: "end", color: C.gold, numeral: true, children: [
          display(e.value ?? 2, e.unit ?? "%"),
          "\u9608\u503C"
        ] }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: `M${w * 0.18},${vy(start)} L${x},${dotY}`, color: C.mint, width: 2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: w * (0.18 + 0.62 * crossT), cy: y, r: 5 + pulse * 24, fill: "none", stroke: C.mint, strokeWidth: 1, opacity: hit * (1 - pulse) * 0.7 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x, cy: dotY, r: 4.5, fill: C.ivory }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x, cy: dotY, r: 8, fill: "none", stroke: C.mint, strokeWidth: 0.8, opacity: 0.6 }),
        e.text ? heading : /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.06, y: h * 0.085, size, children: "\u5B9E\u9645\u5229\u7387" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.9, y: h * 0.96, size: 28, anchor: "end", color: C.mint, opacity: cross, children: e.subtext ?? `\u4F4E\u4E8E\u9608\u503C \xB7 ${display(e.endValue ?? end, e.unit ?? "%")}` })
      ] });
      break;
    }
    case "check": {
      const s = 0.96 + 0.04 * settle(p(f, 2, 22)), cx = w * 0.5, cy = h * 0.42, r = Math.min(w, h) * 0.18;
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${cx} ${cy}) scale(${s})`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: r * 1.3, fill: "none", stroke: C.mint, strokeWidth: 0.7, opacity: 0.22 * draw }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: `M${-r * 0.66},0 L${-r * 0.12},${r * 0.5} L${r * 0.83},${-r * 0.6}`, color: e.color ? color : C.mint, width: 4, draw: ease(p(f, 3, 16)) }),
        e.text && /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: 0, y: r * 2.15, anchor: "middle", size, children: e.text })
      ] });
      break;
    }
    case "bars": {
      const values = (e.values ?? []).slice(0, 4).map((v) => Math.max(0, num(v, 0))), max = Math.max(1, num(e.maxValue, Math.max(...values, 1)), ...values), spacing = w * 0.8 / Math.max(values.length, 1);
      graphic = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        heading,
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Stroke, { d: `M${w * 0.08},${h * 0.81} H${w * 0.94}`, color: C.muted, width: 0.8, opacity: 0.6 }),
        [0.3, 0.5, 0.7].map((y) => /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: w * 0.08, x2: w * 0.94, y1: h * y, y2: h * y, stroke: C.ivory, strokeWidth: 0.6, opacity: 0.1 }, y)),
        values.map((v, i) => {
          var _a2;
          const a = reveal(i, 8 + i * 12), height = h * 0.52 * (v / max) * a, x = w * 0.1 + spacing * (i + 0.5), bw = spacing * 0.36;
          const digits = String(v).includes(".") ? Math.min(2, String(v).split(".")[1].length) : 0;
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: x - bw / 2, y: h * 0.8 - height, width: bw, height, rx: 1.5, fill: ref(i === values.length - 1 ? "metal" : "silver") }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x + bw / 2},${h * 0.8 - height} l7,-5 v${height} l-7,5Z`, fill: "#92713A", opacity: a * 0.9 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - bw / 2},${h * 0.8 - height} l7,-5 h${bw} l-7,5Z`, fill: i === values.length - 1 ? "#FFF2BE" : "#EAF1EF", opacity: a }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: x - bw / 2 + 1, x2: x - bw / 2 + 1, y1: h * 0.8 - height + 2, y2: h * 0.8 - 1, stroke: C.ivory, strokeWidth: 0.8, opacity: 0.6 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: x - bw / 2, x2: x + bw / 2, y1: h * 0.8 - height, y2: h * 0.8 - height, stroke: C.ivory, strokeWidth: 1, opacity: 0.6 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x, y: h * 0.8 - height - 14, size: 40, anchor: "middle", color: i === values.length - 1 ? color : C.ivory, opacity: a, numeral: true, family: e.fontFamily, children: display(Number((v * a).toFixed(digits)), e.unit) }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x, y: h * 0.92, size: 28, anchor: "middle", opacity: a, children: ((_a2 = e.labels) == null ? void 0 : _a2[i]) ?? "" })
          ] }, i);
        }),
        e.subtext && /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, { x: w * 0.94, y: h * 1.01, size: 21, anchor: "end", color: C.muted, children: e.subtext })
      ] });
      break;
    }
  }
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${num(e.x, 80)} ${num(e.y, 100) + (1 - ease(p(f, 0, 14))) * 6})`, opacity, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${uid}-metal`, x1: "0", y1: "0", x2: "1", y2: ".3", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#9C6E24" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".23", stopColor: "#F1CD6B" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".48", stopColor: "#FFF6D9" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".65", stopColor: "#E1AE44" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#9B8052" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${uid}-silver`, x1: "0", y1: "0", x2: "1", y2: ".2", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#8D9994" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".45", stopColor: "#D6DDD6" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#A6B3AA" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${uid}-paper`, x2: ".7", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#F3F0DF" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#C6CDBE" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${uid}-area`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: color, stopOpacity: 0.22 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: color, stopOpacity: 0 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${uid}-mintArea`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: C.mint, stopOpacity: 0.15 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.mint, stopOpacity: 0 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("radialGradient", { id: `${uid}-particle`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#FFFFFF" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".4", stopColor: "#FFE291" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#BAA375", stopOpacity: 0.25 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("filter", { id: `${uid}-shadow`, x: "-20%", y: "-30%", width: "140%", height: "160%", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "2", stdDeviation: "1.6", floodColor: C.ink, floodOpacity: 0.75 }) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("filter", { id: `${uid}-glow`, x: "-20%", y: "-20%", width: "140%", height: "140%", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "3" }) })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { filter: ref("shadow"), children: graphic })
  ] });
};
const MotionGraphics = ({ events }) => {
  const frame = (0,esm.useCurrentFrame)();
  return /* @__PURE__ */ (0,jsx_runtime.jsx)("svg", { width: "100%", height: "100%", viewBox: "0 0 984 676", preserveAspectRatio: "xMidYMid meet", style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: events.map((event, i) => Number.isFinite(event.from) && Number.isFinite(event.to) && frame >= event.from && frame < event.to && event.to > event.from ? /* @__PURE__ */ (0,jsx_runtime.jsx)(Event, { event, frame }, event.id ?? `${event.kind}-${event.from}-${i}`) : null) });
};

;// ./src/stock/EditorialGraphics.tsx



const EditorialGraphics_C = { ivory: "#FFFFFF", gold: "#FFD86A", coral: "#FF806C", mint: "#73EAC5", ink: "#17232B", muted: "#DFE9E5" };
const EditorialGraphics_clamp = (v) => Math.max(0, Math.min(1, v));
const EditorialGraphics_ease = (v) => 1 - Math.pow(1 - EditorialGraphics_clamp(v), 3);
const progress = (f, s, d = 20) => EditorialGraphics_clamp((f - s) / d);
const EditorialGraphics_settle = (v) => 1 - Math.exp(-6 * EditorialGraphics_clamp(v)) * Math.cos(7 * EditorialGraphics_clamp(v));
const EditorialGraphics_Label = ({ x, y, children, color = EditorialGraphics_C.ivory, size = 29, anchor = "middle" }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, textAnchor: anchor, fill: color, fontSize: size, style: { fontFamily: "StockLabel, sans-serif", fontWeight: 700, letterSpacing: ".035em", paintOrder: "stroke fill", stroke: "#15232BCC", strokeWidth: 2, strokeLinejoin: "round" }, children });
const EditorialGraphics_Stroke = ({ d, color = EditorialGraphics_C.gold, width = 1.5, draw = 1, opacity = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d, fill: "none", stroke: color, strokeWidth: width, strokeLinecap: "round", strokeLinejoin: "round", pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - EditorialGraphics_clamp(draw), opacity });
const Stage = ({ x, y, frame, cue, children }) => {
  const t = progress(frame, cue, 27), a = EditorialGraphics_ease(progress(frame, cue, 12)), s = EditorialGraphics_settle(t);
  return /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: a, transform: `translate(${x} ${y + (1 - s) * 17}) scale(${0.965 + 0.035 * s})`, children });
};
const Building = ({ metal, size = 1, government = false }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `scale(${size})`, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-85,28 L0,-18 L85,28 L76,37 H-76Z", fill: metal, stroke: "#17232B", strokeWidth: 1.1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-67,25 L0,-8 L67,25Z", fill: "#343E41", fillOpacity: 0.38, stroke: EditorialGraphics_C.gold, strokeWidth: 0.8 }),
  government ? /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-17,-10 Q-17,-40 0,-44 Q17,-40 17,-10", fill: metal, stroke: "#17232B", strokeWidth: 1.1 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M0,-44 v-16 h22 v12 H0", fill: EditorialGraphics_C.ivory, fillOpacity: 0.75, stroke: EditorialGraphics_C.gold, strokeWidth: 1 })
  ] }) : /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 0, cy: 12, r: 8, fill: "none", stroke: EditorialGraphics_C.ivory, strokeWidth: 1 }),
  [-54, -18, 18, 54].map((x) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: x - 8, y: 37, width: 16, height: 82, rx: 1, fill: metal, stroke: "#17232B", strokeWidth: 1.1 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: x - 3, x2: x - 3, y1: 42, y2: 113, stroke: EditorialGraphics_C.ivory, strokeWidth: 1, opacity: 0.5 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: x - 12, y: 35, width: 24, height: 5, fill: EditorialGraphics_C.gold }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: x - 12, y: 117, width: 24, height: 5, fill: EditorialGraphics_C.gold })
  ] }, x)),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-80,124 H80 L90,133 H-90Z M-90,136 H90 L98,145 H-98Z", fill: metal, stroke: "#17232B", strokeWidth: 1.1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-87,133 H87 M-95,145 H95", stroke: EditorialGraphics_C.ivory, strokeWidth: 0.8, opacity: 0.6 })
] });
const GoldBar = ({ metal }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-35,0 L-24,-18 H29 L42,0 L32,11 H-27Z", fill: metal, stroke: "#17232B", strokeWidth: 1.1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-24,-18 H29 L19,-2 H-35Z", fill: "#FFF2C2" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-35,0 H42 L32,11 H-27Z", fill: "#E1AD37" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-24,-17 H28 M-33,0 H40", stroke: "#FFF0CB", strokeWidth: 0.8 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-7,-11 H12 M-3,-7 H8", stroke: "#9E7526", strokeWidth: 0.8 })
] });
const Rate = ({ metal, draw }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx: 2, cy: 65, rx: 65, ry: 12, fill: EditorialGraphics_C.ink, opacity: 0.2 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 0, cy: 29, r: 54, fill: metal, stroke: "#17232B", strokeWidth: 1.2 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 0, cy: 29, r: 46, fill: "#202C2D", fillOpacity: 0.76, stroke: EditorialGraphics_C.gold, strokeWidth: 1 }),
  Array.from({ length: 12 }, (_, i) => {
    const t = i * Math.PI / 6;
    return /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: Math.cos(t) * 39, x2: Math.cos(t) * 43, y1: 29 + Math.sin(t) * 39, y2: 29 + Math.sin(t) * 43, stroke: EditorialGraphics_C.ivory, strokeWidth: 1, opacity: 0.65 }, i);
  }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x: 0, y: 48, textAnchor: "middle", fill: EditorialGraphics_C.gold, fontSize: 57, style: { fontFamily: "StockNumeral, sans-serif", fontWeight: 600 }, children: "%" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 0, cy: 29, r: 58 + 10 * (1 - draw), fill: "none", stroke: EditorialGraphics_C.gold, strokeWidth: 1, opacity: (1 - draw) * 0.5 })
] });
const EditorialGraphics = ({ kind, frame: inputFrame, frames: inputFrames, cues: inputCues }) => {
  const tempo = 180 / Math.max(1, inputFrames), frame = inputFrame * tempo, frames = 180, cues = inputCues == null ? void 0 : inputCues.map((v) => v * tempo);
  const id = (0,react.useId)().replace(/:/g, "");
  const ref = (s) => `url(#${id}-${s})`;
  const defaults = [Math.round(frames * 0.06), Math.round(frames * 0.27), Math.round(frames * 0.48)];
  const cue = (i) => Number.isFinite(cues == null ? void 0 : cues[i]) ? cues[i] : defaults[i];
  const act = (i, d = 24) => EditorialGraphics_ease(progress(frame, cue(i), d));
  const link = (i) => EditorialGraphics_ease(progress(frame, cue(i) - 13, 17));
  const alpha = Math.min(EditorialGraphics_ease(progress(frame, 0, 8)), EditorialGraphics_clamp((frames - frame) / 9));
  const metal = ref("metal");
  let content;
  if (kind === "transmission") {
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M272,389 C324,388 325,282 378,278", color: EditorialGraphics_C.gold, draw: link(1) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M586,268 C641,265 637,196 692,194", color: EditorialGraphics_C.coral, draw: link(2) }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: 184, y: 344, frame, cue: cue(0), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx: 2, cy: 105, rx: 75, ry: 12, fill: EditorialGraphics_C.ink, opacity: 0.18 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-43,-38 Q0,-52 43,-38 V85 Q0,101 -43,85Z", fill: metal, stroke: "#17232B", strokeWidth: 1.1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M0,-43 Q23,-44 43,-38 V85 Q22,94 0,94Z", fill: "#343C40", fillOpacity: 0.55 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cy: -38, rx: 43, ry: 10, fill: "#E8D8B4" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cy: -38, rx: 32, ry: 5, fill: "#BCA576" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-44,-11 Q0,2 44,-11 M-44,55 Q0,70 44,55", fill: "none", stroke: EditorialGraphics_C.ivory, strokeWidth: 3, opacity: 0.6 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("clipPath", { id: `${id}-barrelClip`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-43,-38 Q0,-52 43,-38 V85 Q0,101 -43,85Z" }) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { clipPath: ref("barrelClip"), opacity: Math.sin(progress(frame, cue(0) + 8, 31) * Math.PI) * 0.7, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: -85 + 160 * EditorialGraphics_ease(progress(frame, cue(0) + 8, 31)), y: -52, width: 24, height: 160, fill: ref("shine"), transform: "rotate(14)" }) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-33,-27 V76", stroke: EditorialGraphics_C.ivory, strokeWidth: 1, opacity: 0.45 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M8,1 C8,1 -11,27 -11,38 C-11,62 27,62 27,38 C27,27 8,1Z", fill: "#2B3438", stroke: EditorialGraphics_C.gold, strokeWidth: 0.9 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M2,29 Q-6,43 3,48", stroke: EditorialGraphics_C.ivory, fill: "none", strokeWidth: 1.2, opacity: 0.55 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 147, children: "\u6CB9\u4EF7" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: 481, y: 265, frame, cue: cue(1), children: [
        [0, 1, 2].map((i) => {
          const a = progress(frame, cue(1) + i * 8, 25);
          return /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: 45 + i * 16 + 8 * EditorialGraphics_ease(a), fill: "none", stroke: EditorialGraphics_C.coral, strokeWidth: i ? 1 : 1.8, pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - EditorialGraphics_ease(a), opacity: a * (0.7 - i * 0.15) }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: "rotate(-12)", children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-43,-24 H19 L46,0 L19,25 H-43Z", fill: ref("paper"), stroke: EditorialGraphics_C.gold, strokeWidth: 0.8 }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 28, r: 4, fill: "#686E68" }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-28,-8 H9 M-28,0 H3 M-28,8 H12", stroke: "#737A71", strokeWidth: 1 })
        ] }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 119, color: EditorialGraphics_C.coral, children: "\u901A\u80C0\u538B\u529B" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: 791, y: 169, frame, cue: cue(2), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Building, { metal, size: 0.68 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { transform: "translate(63 68) scale(.7)", children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Rate, { metal, draw: act(2) }) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 181, color: EditorialGraphics_C.coral, children: "\u5229\u7387" })
      ] })
    ] });
  } else if (kind === "reserve") {
    const bars = Array.from({ length: 9 }, (_, i) => {
      const row = i < 4 ? 0 : i < 7 ? 1 : 2, col = i - (row === 0 ? 0 : row === 1 ? 4 : 7), start = cue(Math.min(row, 2)) + col * 6, a = progress(frame, start + 4, 29), s = EditorialGraphics_settle(a);
      return { row, col, a, s, i };
    });
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: 250, y: 179, frame, cue: cue(0), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Building, { metal, size: 1.1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 203, children: "\u592E\u884C\u50A8\u5907" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M366,312 C450,312 441,404 533,404", color: EditorialGraphics_C.gold, draw: link(1) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx: 685, cy: 463, rx: 152, ry: 19, fill: EditorialGraphics_C.ink, opacity: 0.2 }),
      [...bars].sort((a, b) => b.row - a.row).map(({ row, col, a, s, i }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: EditorialGraphics_ease(a), transform: `translate(${568 + col * 72 + row * 36 + (1 - s) * 95} ${447 - row * 31 - (1 - s) * 32}) scale(1.13)`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(GoldBar, { metal }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("clipPath", { id: `${id}-bar-${i}`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-35,0 L-24,-18 H29 L42,0 L32,11 H-27Z" }) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { clipPath: ref(`bar-${i}`), opacity: Math.sin(progress(frame, cue(row) + 22 + col * 6, 24) * Math.PI) * 0.8, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: -65 + 115 * progress(frame, cue(row) + 22 + col * 6, 24), y: -25, width: 18, height: 46, fill: ref("shine"), transform: "rotate(16)" }) })
      ] }, i)),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: act(2), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M555,489 H815", color: EditorialGraphics_C.gold, width: 0.8, draw: act(2) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 685, y: 535, color: EditorialGraphics_C.gold, children: "\u957F\u671F\u50A8\u5907" })
      ] })
    ] });
  } else if (kind === "debt") {
    const flow = progress(frame, cue(2), Math.max(30, frames - cue(2) - 12));
    const startX = 591, startY = 295, endX = 817, endY = 422;
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M277,244 C340,244 336,304 390,305", color: EditorialGraphics_C.gold, draw: link(1) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M583,306 C719,255 725,401 825,414", color: EditorialGraphics_C.coral, width: 1, draw: link(2), opacity: 0.7 }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: 190, y: 148, frame, cue: cue(0), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Building, { metal, government: true, size: 0.9 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 187, children: "\u653F\u5E9C\u878D\u8D44" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: 483, y: 231, frame, cue: cue(1), children: [
        [2, 1, 0].map((i) => {
          const fan = EditorialGraphics_ease(progress(frame, cue(1) + 5, 18)) * (1 - EditorialGraphics_ease(progress(frame, cue(2) - 8, 20)));
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${i * 7 + (i - 1) * 39 * fan} ${-i * 7 - Math.abs(i - 1) * 9 * fan}) rotate(${i * 2 + (i - 1) * 9 * fan})`, children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: -65, y: -12, width: 130, height: 166, rx: 3, fill: ref("paper"), stroke: "#9BA399", strokeWidth: 0.8 }),
            i === 0 && /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-50,4 H50 V136 H-50Z", fill: "none", stroke: "#A3AC9C", strokeWidth: 0.7 }),
              /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-35,27 H33 M-35,37 H20 M-35,61 H34 M-35,71 H29", stroke: "#7A8A7A", strokeWidth: 1.3 }),
              /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 28, cy: 105, r: 15, fill: "none", stroke: "#AAB49E", strokeWidth: 1.2 }),
              /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M22,118 l-5,20 11,-5 10,5 -4,-20", fill: "#A8B3A0" }),
              /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x: -35, y: 112, fill: "#67786C", fontSize: 19, style: { fontFamily: "StockNumeral,sans-serif" }, children: "T" })
            ] })
          ] }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 207, children: "\u671F\u9650\u503A\u5238" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: 821, y: 386, frame, cue: cue(2), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-58,71 H60", stroke: EditorialGraphics_C.muted, strokeWidth: 1 }),
        [0, 1, 2, 3, 4].map((i) => {
          const a = EditorialGraphics_ease(progress(frame, cue(2) + 12 + i * 3, 16));
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${-48 + i * 21},70 v${-(18 + i * 10) * a}`, stroke: EditorialGraphics_C.coral, strokeWidth: 10, opacity: 0.45 + i * 0.08 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${-52 + i * 21},${70 - (18 + i * 10) * a} h8`, stroke: EditorialGraphics_C.ivory, strokeWidth: 0.8, opacity: a * 0.7 })
          ] }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 119, color: EditorialGraphics_C.coral, children: "\u5229\u606F\u652F\u51FA" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 151, size: 23, color: EditorialGraphics_C.muted, children: "\u9AD8\u5229\u7387\u589E\u52A0\u8D1F\u62C5" })
      ] }),
      Array.from({ length: 11 }, (_, i) => {
        const elapsed = frame - cue(2) - i * 2;
        if (elapsed < 0) return null;
        const t = EditorialGraphics_clamp(elapsed / Math.max(10, Math.min(28, frames - cue(2) - 16) - i * 0.5)), u = 1 - t;
        const targetX = 821 - 48 + i % 5 * 21, targetY = 456 - (18 + i % 5 * 10);
        const x = u * u * u * startX + 3 * u * u * t * 713 + 3 * u * t * t * 726 + t * t * t * targetX, y = u * u * u * startY + 3 * u * u * t * 260 + 3 * u * t * t * 403 + t * t * t * targetY;
        return /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x, cy: y, r: 2.2 + i * 0.1, fill: EditorialGraphics_C.coral, opacity: Math.min(t * 9, 1) * (t === 1 ? 0.15 : 1) * flow }, i);
      })
    ] });
  } else {
    const xs = [195, 490, 790], ys = [231, 161, 270];
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M286,393 C353,393 345,329 392,329", color: EditorialGraphics_C.muted, width: 0.8, draw: link(1), opacity: 0.45 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M591,330 C646,330 641,411 691,411", color: EditorialGraphics_C.muted, width: 0.8, draw: link(2), opacity: 0.45 }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: xs[0], y: ys[0], frame, cue: cue(0), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Rate, { metal, draw: act(0) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 181, children: "\u5B9E\u9645\u5229\u7387" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: xs[1], y: ys[1], frame, cue: cue(1), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Building, { metal, size: 0.92 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M-78,132 H78 M-66,25 L0,-11 L66,25", color: EditorialGraphics_C.ivory, width: 1.4, draw: EditorialGraphics_ease(progress(frame, cue(1) + 17, 20)) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 206, children: "\u592E\u884C\u8D2D\u91D1" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(Stage, { x: xs[2], y: ys[2], frame, cue: cue(2), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx: 0, cy: 62, rx: 77, ry: 31, fill: "none", stroke: EditorialGraphics_C.gold, strokeWidth: 1.5, pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - EditorialGraphics_ease(progress(frame, cue(2) + 9, 26)) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx: 0, cy: 62, rx: 55, ry: 19, fill: "none", stroke: EditorialGraphics_C.gold, strokeWidth: 0.7, opacity: 0.35 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-23,42 L-14,18 H18 L27,42 L18,53 H-15Z", fill: metal, stroke: "#17232B", strokeWidth: 1.1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x: 2, y: 38, fill: "#5D553F", textAnchor: "middle", fontSize: 15, style: { fontFamily: "StockNumeral,sans-serif" }, children: "ETF" }),
        [0, 1, 2, 3].map((i) => {
          const a = EditorialGraphics_ease(progress(frame, cue(2) + i * 5, 40)), angle = (-150 + i * 26 + 135 * a) * Math.PI / 180;
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: a, children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 77 * Math.cos(angle), cy: 62 + 31 * Math.sin(angle), r: 3, fill: EditorialGraphics_C.ivory }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 77 * Math.cos(angle), cy: 62 + 31 * Math.sin(angle), r: 6, fill: "none", stroke: EditorialGraphics_C.gold, strokeWidth: 0.7, opacity: 0.4 })
          ] }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 0, y: 156, children: "ETF \u8D44\u91D1" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: act(2), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Stroke, { d: "M195,445 V505 Q195,535 225,535 H759 Q790,535 790,505 V463 M490,397 V535", color: EditorialGraphics_C.gold, width: 1.2, draw: EditorialGraphics_ease(progress(frame, cue(2) + 27, 25)), opacity: 0.85 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 490, cy: 535, r: 3, fill: EditorialGraphics_C.ivory, opacity: EditorialGraphics_ease(progress(frame, cue(2) + 44, 10)) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics_Label, { x: 492, y: 578, size: 27, color: EditorialGraphics_C.muted, children: "\u6301\u7EED\u89C2\u5BDF\u4E09\u6761\u7EBF\u7D22" })
      ] })
    ] });
  }
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { width: "100%", height: "100%", viewBox: "0 0 984 676", style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-metal`, x1: "0", y1: "0", x2: "1", y2: ".3", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#D5A839" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".25", stopColor: "#FFE6A1" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".52", stopColor: "#FFF9E8" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".74", stopColor: "#F4D270" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#B88B2D" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-shine`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#FFFFFF", stopOpacity: 0 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".5", stopColor: "#FFFFFF", stopOpacity: 0.95 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#FFFFFF", stopOpacity: 0 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-paper`, x2: ".7", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#EEEDE1" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#BBC8B9" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("filter", { id: `${id}-shadow`, x: "-20%", y: "-20%", width: "140%", height: "140%", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "2", stdDeviation: "2.4", floodColor: EditorialGraphics_C.ink, floodOpacity: 0.85 }) })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: alpha, filter: ref("shadow"), children: content })
  ] });
};

;// ./src/stock/EconomicSeriesChart.tsx



const EconomicSeriesChart_clamp = (v) => Math.max(0, Math.min(1, v));
const day = (s) => {
  const ms = Date.parse(`${s}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || !Number.isFinite(ms) || new Date(ms).toISOString().slice(0, 10) !== s) throw new Error(`Invalid economic observation date: ${s}`);
  return ms;
};
const wrap = (text, max = 45) => {
  const result = [];
  let row = "", count = 0;
  for (const ch of text) {
    const w = /[\u0000-\u00ff]/.test(ch) ? 0.53 : 1;
    if (count + w > max) {
      result.push(row);
      row = "";
      count = 0;
    }
    row += ch;
    count += w;
  }
  if (row) result.push(row);
  return result;
};
const EconomicSeriesChart_Label = ({ x, y, children, size = 21, color = "#FFFFFF", anchor = "start", num = false }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, fill: color, fontSize: size, textAnchor: anchor, style: { fontFamily: num ? "StockNumeral,sans-serif" : "StockLabel,sans-serif", fontWeight: 700, paintOrder: "stroke fill", stroke: "#15232B", strokeWidth: 2.1, strokeLinejoin: "round", fontVariantNumeric: "tabular-nums" }, children });
const EconomicSeriesChart = ({ data: d, frame }) => {
  const id = (0,react.useId)().replace(/:/g, "");
  if (frame < d.from || frame >= d.to) return null;
  const length = d.to - d.from, hold = Math.min(30, Math.floor(length * 0.2));
  if (![d.from, d.to, d.drawFrom, d.drawTo, ...d.domain].every(Number.isFinite) || length <= 0 || d.domain[1] <= d.domain[0] || d.drawFrom < 0 || d.drawTo <= d.drawFrom || d.drawTo > length - hold) throw new Error("Invalid economic chart domain/timing; reserve a final reading hold");
  if (d.series.length < 1 || d.series.length > 2 || new Set(d.series.map((s) => s.id)).size !== d.series.length) throw new Error("Economic chart requires one or two uniquely identified series");
  const decimals = d.valueDecimals ?? (d.frequency === "monthly" ? 1 : 2);
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 4) throw new Error("valueDecimals must be an integer from 0 to 4");
  const format = (v) => v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const series = d.series.map((s) => {
    if (s.points.length < 2) throw new Error(`Series ${s.id} requires at least two observations`);
    const points = s.points.map((r, i) => {
      const time = day(r.date);
      if (i && time <= day(s.points[i - 1].date)) throw new Error(`Series ${s.id} dates must be unique and ascending`);
      if (!Number.isFinite(r.value) || r.value < d.domain[0] || r.value > d.domain[1]) throw new Error(`Series ${s.id} observation is missing or outside domain: ${r.date}`);
      return { ...r, time };
    });
    return { ...s, points };
  });
  const first = Math.min(...series.map((s) => s.points[0].time)), last = Math.max(...series.map((s) => s.points[s.points.length - 1].time));
  if (last <= first) throw new Error("Economic chart date range must be positive");
  const left = 88, right = 800, top = 140, bottom = 460;
  const x = (time) => left + (time - first) / (last - first) * (right - left), y = (value) => bottom - (value - d.domain[0]) / (d.domain[1] - d.domain[0]) * (bottom - top);
  const local = frame - d.from, progress = EconomicSeriesChart_clamp((local - d.drawFrom) / (d.drawTo - d.drawFrom)), now = first + (last - first) * progress, cursor = x(now);
  const alpha = EconomicSeriesChart_clamp(local / 9) * EconomicSeriesChart_clamp((length - local) / 8);
  const stepRaw = (d.domain[1] - d.domain[0]) / 4, magnitude = 10 ** Math.floor(Math.log10(stepRaw)), step = ([1, 2, 2.5, 5, 10].find((n) => n >= stepRaw / magnitude) ?? 10) * magnitude;
  const valueTicks = [];
  for (let n = Math.ceil(d.domain[0] / step) * step; n <= d.domain[1] + step * 1e-4; n += step) valueTicks.push(n);
  let ticks;
  if (d.tickDates) {
    ticks = d.tickDates;
    for (const tick of ticks) {
      const t = day(tick.date);
      if (t < first || t > last) throw new Error("Date tick falls outside the economic series domain");
    }
  } else if (d.frequency === "monthly") {
    const candidates = [];
    const begin = new Date(first);
    let year = begin.getUTCFullYear(), month = Math.ceil(begin.getUTCMonth() / 3) * 3;
    if (month >= 12) {
      year++;
      month = 0;
    }
    for (let t = Date.UTC(year, month, 1); t <= last; month += 3, t = Date.UTC(year, month, 1)) {
      if (t < first) continue;
      const date = new Date(t);
      candidates.push({ date: date.toISOString().slice(0, 10), label: `${date.getUTCFullYear()} Q${Math.floor(date.getUTCMonth() / 3) + 1}` });
    }
    const stride = Math.max(1, Math.ceil(candidates.length / 5));
    ticks = candidates.filter((_, i) => i % stride === 0);
    if (!ticks.length) ticks = [{ date: new Date(first).toISOString().slice(0, 10), label: new Date(first).toISOString().slice(0, 7) }, { date: new Date(last).toISOString().slice(0, 10), label: new Date(last).toISOString().slice(0, 7) }];
  } else ticks = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(first + Math.round((last - first) / 864e5 * i / 4) * 864e5).toISOString().slice(0, 10);
    return { date, label: date.slice(5) };
  });
  const source = wrap(`\u6570\u636E\uFF1A${d.source}`);
  if (source.length > 2) throw new Error("Source label exceeds two readable lines; keep the full source in the provenance manifest");
  const note = wrap(d.contextNote ?? "");
  if (note.length > 1) throw new Error("contextNote should be one short line");
  const event = d.annotation ? { ...d.annotation, time: day(d.annotation.date), lines: wrap(d.annotation.label, 44) } : void 0;
  if (event && (event.time < first || event.time > last || event.lines.length > 2 || !Number.isFinite(event.from) || event.from < 0 || event.from >= length)) throw new Error("Invalid economic chart annotation date/timing or label length");
  const active = series.map((s) => ({ ...s, observation: [...s.points].reverse().find((r) => r.time <= now) })).filter((s) => s.observation !== void 0);
  const labels = active.map((s) => ({ series: s, at: y(s.observation.value) })).sort((a, b) => a.at - b.at);
  if (labels.length === 2 && labels[1].at - labels[0].at < 56) {
    const mid = (labels[0].at + labels[1].at) / 2;
    labels[0].at = mid - 28;
    labels[1].at = mid + 28;
  }
  if (labels.length) {
    const shiftTop = Math.max(0, top + 16 - labels[0].at);
    labels.forEach((l) => l.at += shiftTop);
    const shiftBottom = Math.max(0, labels[labels.length - 1].at - (bottom - 6));
    labels.forEach((l) => l.at -= shiftBottom);
  }
  const showEvent = event && local >= event.from && now >= event.time;
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { width: "100%", height: "100%", viewBox: "0 0 984 676", style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("clipPath", { id: `${id}-reveal`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: left - 2, y: top - 5, width: Math.max(0, cursor - left + 3), height: bottom - top + 10 }) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("filter", { id: `${id}-shadow`, x: "-15%", y: "-20%", width: "130%", height: "140%", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "1.5", stdDeviation: "1.4", floodColor: "#15232B", floodOpacity: 0.8 }) })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: alpha, filter: `url(#${id}-shadow)`, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart_Label, { x: left, y: 43, size: 31, children: d.title }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(EconomicSeriesChart_Label, { x: left, y: 77, size: 20, color: "#E4EEE9", children: [
        "\u5355\u4F4D\uFF1A",
        d.unit
      ] }),
      series.map((s, i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: left + i * 340, x2: left + i * 340 + 28, y1: 110, y2: 110, stroke: s.color, strokeWidth: 3 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart_Label, { x: left + i * 340 + 40, y: 117, size: 22, children: s.label })
      ] }, s.id)),
      valueTicks.map((v) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: left, x2: right, y1: y(v), y2: y(v), stroke: "#FFFFFF", strokeWidth: 0.8, opacity: 0.19 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart_Label, { x: left - 15, y: y(v) + 7, anchor: "end", size: 21, num: true, children: Number(v.toPrecision(10)).toLocaleString("en-US", { maximumFractionDigits: decimals }) })
      ] }, v)),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: left, x2: right, y1: bottom, y2: bottom, stroke: "#FFFFFF", opacity: 0.4 }),
      ticks.map((tick, i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: x(day(tick.date)), x2: x(day(tick.date)), y1: bottom, y2: bottom + 7, stroke: "#FFFFFF", opacity: 0.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart_Label, { x: x(day(tick.date)), y: 491, size: 20, anchor: x(day(tick.date)) < left + 65 ? "start" : x(day(tick.date)) > right - 65 ? "end" : "middle", num: true, children: tick.label })
      ] }, `${tick.date}-${i}`)),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { clipPath: `url(#${id}-reveal)`, children: series.map((s) => {
        const line = s.points.map((r, i) => {
          const prev = s.points[i - 1];
          const gap = prev && d.frequency === "monthly" && (new Date(r.time).getUTCFullYear() - new Date(prev.time).getUTCFullYear()) * 12 + new Date(r.time).getUTCMonth() - new Date(prev.time).getUTCMonth() > 1;
          return `${!i || gap ? "M" : "L"}${x(r.time)},${y(r.value)}`;
        }).join(" ");
        return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: line, fill: "none", stroke: "#15232B", strokeWidth: 6.5, opacity: 0.7, strokeLinejoin: "round" }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: line, fill: "none", stroke: s.color, strokeWidth: 7, opacity: 0.1, strokeLinejoin: "round" }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: line, fill: "none", stroke: s.color, strokeWidth: 3.4, strokeLinejoin: "round", strokeLinecap: "round" }),
          d.frequency === "monthly" && s.points.map((r) => /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x(r.time), cy: y(r.value), r: 2.4, fill: s.color }, r.date))
        ] }, s.id);
      }) }),
      local >= d.drawFrom && /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: cursor, x2: cursor, y1: top, y2: bottom, stroke: "#FFFFFF", opacity: 0.24, strokeDasharray: "3 6", strokeWidth: 0.8 }),
      active.map((s) => /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x(s.observation.time), cy: y(s.observation.value), r: 4, fill: s.color, stroke: "#FFFFFF", strokeWidth: 0.8 }, s.id)),
      (d.endLabels !== false || progress < 1) && labels.map(({ series: s, at }) => {
        const q = s.observation;
        return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${right + 3},${y(q.value)} L${right + 13},${at - 6} H${right + 23}`, fill: "none", stroke: s.color, strokeWidth: 0.8, opacity: 0.6 }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart_Label, { x: right + 31, y: at, size: 29, color: s.color, num: true, children: format(q.value) }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart_Label, { x: right + 31, y: at + 21, size: 17, color: "#E4EEE9", num: true, children: d.frequency === "monthly" ? q.date.slice(0, 7) : q.date.slice(5) })
        ] }, s.id);
      }),
      showEvent && event ? /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: EconomicSeriesChart_clamp((local - event.from) / 10), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: x(event.time), x2: x(event.time), y1: top, y2: bottom, stroke: "#FFFFFF", strokeWidth: 0.7, strokeDasharray: "2 7", opacity: 0.3 }),
        event.lines.map((line, i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)(EconomicSeriesChart_Label, { x: left, y: 530 + i * 24, size: 21, children: [
          i === 0 ? `${event.date.slice(0, d.frequency === "monthly" ? 7 : 10)} \xB7 ` : "",
          line
        ] }, i))
      ] }) : /* @__PURE__ */ (0,jsx_runtime.jsxs)(EconomicSeriesChart_Label, { x: left, y: 530, size: 21, num: true, children: [
        new Date(first).toISOString().slice(0, 10),
        " \u2014 ",
        new Date(last).toISOString().slice(0, 10)
      ] }),
      note[0] && /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart_Label, { x: left, y: 586, size: 20, color: "#E4EEE9", children: note[0] }),
      source.map((line, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart_Label, { x: left, y: 620 + i * 25, size: 20, children: line }, i))
    ] })
  ] });
};

;// ./src/stock/AssetMechanisms.tsx



const AssetMechanisms_C = { white: "#FFFFFF", gold: "#FFD86A", mint: "#73EAC5", coral: "#FF806C", ink: "#14232D" };
const AssetMechanisms_clamp = (n) => Math.max(0, Math.min(1, n));
const AssetMechanisms_ease = (n) => 1 - Math.pow(1 - AssetMechanisms_clamp(n), 3);
const phase = (f, a, b) => AssetMechanisms_ease((f - a) / Math.max(1, b - a));
const Text = ({ x, y, children, size = 27, color = AssetMechanisms_C.white, number = false, anchor = "middle", opacity = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, textAnchor: anchor, fill: color, fontSize: size, opacity, style: { fontFamily: number ? "StockNumeral,sans-serif" : "StockLabel,sans-serif", fontWeight: 700, fontVariantNumeric: "tabular-nums", paintOrder: "stroke fill", stroke: AssetMechanisms_C.ink, strokeWidth: 2, strokeLinejoin: "round" }, children });
const Bar = ({ x, y, metal, scale = 1, shine = 0 }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) scale(${scale})`, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-61,0 L-43,-31 H45 L65,0 L51,17 H-48Z", fill: metal, stroke: AssetMechanisms_C.ink, strokeWidth: 1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-43,-31 H45 L27,-4 H-61Z", fill: "#FFF0BE" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-61,0 H65 L51,17 H-48Z", fill: "#E4B33C" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-42,-30 H44 M-59,0 H63", stroke: AssetMechanisms_C.white, strokeWidth: 1.1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-15,-20 H21 M-8,-14 H13", stroke: "#AC812B", strokeWidth: 1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${-45 + 90 * shine},-29 l-17,28`, stroke: AssetMechanisms_C.white, strokeWidth: 9, opacity: Math.sin(shine * Math.PI) * 0.55 })
] });
const Coin = ({ x, y, r = 13, metal, opacity = 1, rotate = 0 }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity, transform: `translate(${x} ${y}) rotate(${rotate})`, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx: 2, rx: r, ry: r * 0.94, fill: "#AE8030" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r, fill: metal, stroke: "#FFF1C9", strokeWidth: 0.8 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: r * 0.76, fill: "none", stroke: "#B99344", strokeWidth: 0.7 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${-r * 0.24},${-r * 0.42} v${r * 0.84} M${r * 0.24},${-r * 0.42} v${r * 0.84} M${-r * 0.3},0 H${r * 0.3}`, stroke: "#A37C30", strokeWidth: 1 })
] });
const AssetMechanisms_Building = ({ x, y, metal, scale = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) scale(${scale})`, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-85,0 L0,-42 L85,0 l-9,12 H-76Z", fill: metal, stroke: AssetMechanisms_C.ink }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-62,-1 L0,-29 L62,-1Z", fill: "#253239", fillOpacity: 0.48 }),
  [-54, -18, 18, 54].map((x2) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x2 - 8},14 h16 v91 h-16Z`, fill: metal, stroke: AssetMechanisms_C.ink }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x2 - 4},20 v76`, stroke: AssetMechanisms_C.white, opacity: 0.6 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x2 - 12},12 h24 v5 h-24Z M${x2 - 12},104 h24 v5 h-24Z`, fill: "#FFE4A0" })
  ] }, x2)),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-80,111 H80 l12,13 H-92Z M-92,127 H92 l9,9 H-101Z", fill: metal, stroke: AssetMechanisms_C.ink })
] });
const AssetMechanisms = ({ kind, frame, frames, cues }) => {
  const id = (0,react.useId)().replace(/:/g, ""), ref = (s) => `url(#${id}-${s})`, metal = ref("gold"), silver = ref("silver");
  const f = frame / Math.max(1, frames) * 180, at = (i, fallback) => (cues == null ? void 0 : cues[i]) === void 0 ? fallback : cues[i] / Math.max(1, frames) * 180;
  const alpha = Math.min(phase(frame, 0, 8), AssetMechanisms_clamp((frames - frame) / 8));
  let body;
  if (kind === "priceAnchor") {
    const arrive = phase(f, 4, 32), focus = phase(f, 18, 54), price = phase(f, at(0, 25), at(0, 25) + 20), sweep = AssetMechanisms_clamp((f - 38) / 55);
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: arrive, transform: `translate(0 ${(1 - arrive) * 35})`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx: 489, cy: 466, rx: 231, ry: 27, fill: AssetMechanisms_C.ink, opacity: 0.28 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M244,425 L492,343 L741,425 L492,507Z", fill: silver, opacity: 0.8 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M244,425 L492,507 V520 L244,438Z M492,507 L741,425 V438 L492,520Z", fill: "#91AAA4" }),
        [[390, 419], [503, 455], [503, 384], [615, 419]].map(([x, y], i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x, y, metal, scale: 1.08, shine: AssetMechanisms_clamp(sweep * 1.7 - i * 0.18) }, i)),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x: 503, y: 391 - 38 * focus, metal, scale: 1.12, shine: sweep })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: price, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M503,292 V321 M354,291 H650", stroke: AssetMechanisms_C.gold, strokeWidth: 1.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 503, cy: 321, r: 4, fill: AssetMechanisms_C.white }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 503, y: 215, size: 83, color: AssetMechanisms_C.gold, number: true, children: "4,000" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 503, y: 256, size: 27, children: "\u7F8E\u5143\uFF0F\u76CE\u53F8\u9644\u8FD1" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: focus, children: [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, y], i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${492 + x * 270},${390 + y * 125} h${-x * 25} M${492 + x * 270},${390 + y * 125} v${-y * 25}`, stroke: AssetMechanisms_C.white, strokeWidth: 1.8, fill: "none" }, i)) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 492, y: 578, size: 23, children: "\u73B0\u8D27\u4EF7\u683C\u533A\u95F4 \xB7 \u975E\u5373\u65F6\u884C\u60C5" })
    ] });
  } else if (kind === "bondYield") {
    const paper = phase(f, 0, 30), maturity = phase(f, 8, 57), yieldIn = phase(f, at(0, 88), at(0, 88) + 20);
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: paper, transform: `translate(${(1 - paper) * -45} 0)`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M176,143 L366,128 L390,397 L200,414Z", fill: ref("paper"), stroke: "#D2DED5" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M193,161 L350,148 L371,380 L215,394Z", fill: "none", stroke: "#8B9C8C" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(AssetMechanisms_Building, { x: 277, y: 215, metal, scale: 0.64 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 288, y: 350, size: 28, color: "#344A43", children: "U.S. TREASURY" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: maturity, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M160,472 H422", stroke: AssetMechanisms_C.white, strokeWidth: 1, opacity: 0.5 }),
        Array.from({ length: 10 }, (_, i) => {
          const a = phase(f, 10 + i * 3, 24 + i * 3);
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: a, children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 163 + i * 26, y: 450, width: 17, height: 13, rx: 2, fill: i === 9 ? metal : AssetMechanisms_C.white, opacity: 0.8 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${171 + i * 26},470 v7`, stroke: AssetMechanisms_C.white })
          ] }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 292, y: 520, size: 31, children: "10\u5E74\u671F\u7F8E\u503A" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: yieldIn, transform: `translate(0 ${(1 - yieldIn) * 22})`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 680, cy: 306, r: 119, fill: ref("glass"), stroke: AssetMechanisms_C.gold, strokeWidth: 2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 680, cy: 306, r: 109, fill: "none", stroke: AssetMechanisms_C.white, strokeWidth: 0.8, opacity: 0.55 }),
        Array.from({ length: 36 }, (_, i) => {
          const a = i * Math.PI / 18;
          return /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: 680 + Math.sin(a) * 99, y1: 306 - Math.cos(a) * 99, x2: 680 + Math.sin(a) * (i % 3 ? 104 : 108), y2: 306 - Math.cos(a) * (i % 3 ? 104 : 108), stroke: AssetMechanisms_C.gold, strokeWidth: 1 }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 680, y: 326, number: true, size: 83, color: AssetMechanisms_C.coral, children: " >5%" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 680, y: 482, size: 27, children: "\u540D\u4E49\u6536\u76CA\u7387" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M426,307 C482,307 485,307 532,307", stroke: AssetMechanisms_C.white, strokeWidth: 1, opacity: yieldIn * 0.55 }),
      [0, 1, 2].map((i) => {
        const t = AssetMechanisms_clamp((f - at(0, 88) - i * 8) / 30);
        return /* @__PURE__ */ (0,jsx_runtime.jsx)(Coin, { x: 438 + 84 * t, y: 307 - 23 * Math.sin(t * Math.PI), r: 10, metal, opacity: Math.sin(t * Math.PI) * yieldIn }, i);
      })
    ] });
  } else if (kind === "reserveAccumulation") {
    const door = phase(f, 8, 53), stock = phase(f, at(0, 92), at(0, 92) + 12);
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(AssetMechanisms_Building, { x: 214, y: 280, metal, scale: 1.12 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 214, y: 495, size: 29, children: "\u592E\u884C\u50A8\u5907" }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M495,198 H787 V458 H495Z", fill: ref("glass"), stroke: AssetMechanisms_C.white, strokeWidth: 1.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M509,212 H773 V444 H509Z", fill: "#0D1A1F", fillOpacity: 0.22 }),
        /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${494 - 102 * door} 0) scale(${1 - 0.63 * door} 1)`, children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 0, y: 198, width: 292, height: 260, rx: 6, fill: silver, stroke: AssetMechanisms_C.ink }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 146, cy: 328, r: 61, fill: ref("glass"), stroke: AssetMechanisms_C.gold, strokeWidth: 1.5 }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { transform: `rotate(${door * 80} 146 328)`, children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M146,288 V368 M106,328 H186", transform: `rotate(${i * 45} 146 328)`, stroke: AssetMechanisms_C.white, strokeWidth: 3 }, i)) })
        ] })
      ] }),
      Array.from({ length: 9 }, (_, i) => {
        const t = phase(f, 35 + i * 6, 59 + i * 6), row = Math.floor(i / 3), col = i % 3;
        return /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: t, transform: `translate(${(1 - t) * -275} ${-(1 - t) * Math.sin(t * Math.PI) * 55})`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x: 552 + col * 70 + row * 7, y: 416 - row * 44, metal, scale: 0.55, shine: AssetMechanisms_clamp((f - 90 - i * 3) / 30) }) }, i);
      }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: stock, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 640, y: 530, size: 73, color: AssetMechanisms_C.gold, number: true, children: "289\u5428" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 640, y: 575, size: 26, children: "\u4E8C\u5B63\u5EA6\u51C0\u8D2D\u91D1" })
      ] })
    ] });
  } else if (kind === "etfInflow") {
    const receive = phase(f, 8, 46), money = phase(f, at(0, 65), at(0, 65) + 20), holding = phase(f, at(1, 120), at(1, 120) + 12);
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: receive, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("ellipse", { cx: 537, cy: 445, rx: 196, ry: 32, fill: AssetMechanisms_C.ink, opacity: 0.3 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M390,263 L649,263 L709,304 L450,304Z", fill: silver, stroke: AssetMechanisms_C.ink }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M450,304 H709 V442 H450Z", fill: ref("glass"), stroke: AssetMechanisms_C.white, strokeWidth: 1.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M390,263 L450,304 V442 L390,401Z", fill: "#A5BDB3", opacity: 0.8 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M477,328 H682 V415 H477Z", fill: "none", stroke: AssetMechanisms_C.gold }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 580, y: 383, size: 47, color: AssetMechanisms_C.gold, number: true, children: "GOLD ETF" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M466,292 H648", stroke: AssetMechanisms_C.ink, strokeWidth: 4 })
      ] }),
      Array.from({ length: 13 }, (_, i) => {
        const t = AssetMechanisms_clamp((f - 15 - i * 5) / 45), x = 169 + 370 * t, y = 400 - 250 * Math.sin(t * Math.PI * 0.75);
        return /* @__PURE__ */ (0,jsx_runtime.jsx)(Coin, { x, y, r: 15, metal, opacity: Math.min(t * 8, (1 - t) * 8, 1), rotate: t * 180 }, i);
      }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: money, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 215, y: 260, size: 62, color: AssetMechanisms_C.gold, number: true, children: "310\u4EBF\u7F8E\u5143" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 215, y: 302, size: 27, children: "\u4E09\u5B63\u5EA6\u51C0\u6D41\u5165" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: holding, children: [
        [0, 1, 2].map((i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x: 566 + i * 88, y: 496 - i % 2 * 34, metal, scale: 0.68, shine: phase(f, 125 + i * 3, 160 + i * 3) }, i)),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 672, y: 575, size: 61, color: AssetMechanisms_C.mint, number: true, children: "+211\u5428\u6301\u4ED3" })
      ] })
    ] });
  } else if (kind === "realRateBoundary") {
    const open = phase(f, 12, 95), reveal = phase(f, at(0, 43), at(0, 43) + 29);
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M245,448 H739", stroke: AssetMechanisms_C.white, strokeWidth: 1.2, opacity: 0.45 }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: open, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M320,174 H664 V448 H320Z", fill: "none", stroke: silver, strokeWidth: 12 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M320,174 H664", stroke: AssetMechanisms_C.white, strokeWidth: 1 }),
        [0, 1].map((i) => {
          const width = 160 * (1 - 0.82 * open), x = i ? 655 - width : 329;
          return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x, y: 187, width, height: 251, fill: ref("glass"), stroke: silver, strokeWidth: 3 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x + width * 0.15},196 V429 M${x + width * 0.85},196 V429`, stroke: i ? AssetMechanisms_C.mint : AssetMechanisms_C.coral, strokeWidth: 1.8, opacity: 0.6 }),
            [212, 282, 352, 422].map((y) => /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: i ? x + width - 4 : x + 4, cy: y, r: 2.2, fill: AssetMechanisms_C.white }, y)),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: i ? x + 5 : x + width - 10, y: 308, width: 5, height: 22, rx: 2.5, fill: metal })
          ] }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M492,188 V438", stroke: AssetMechanisms_C.gold, strokeWidth: 1, strokeDasharray: "5 8", opacity: 0.25 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: reveal, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 492, cy: 269, r: 70, fill: ref("glass"), stroke: AssetMechanisms_C.gold, strokeWidth: 2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 492, y: 294, size: 78, number: true, color: AssetMechanisms_C.gold, children: "2%" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x: 492, y: 426 - 18 * open, scale: 0.5 + 0.4 * open, metal, shine: AssetMechanisms_clamp((f - 94) / 45) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 492, y: 518, size: 33, children: "\u5B9E\u9645\u5229\u7387\u95E8\u69DB" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 492, y: 571, size: 23, children: "CIBC\u5173\u6CE8\u6761\u4EF6" })
    ] });
  } else if (kind === "bottomSearch") {
    const scan = phase(f, 5, 110), question = phase(f, at(0, 112), at(0, 112) + 22), cx = 390 + 156 * scan, cy = 300 + 22 * Math.sin(scan * Math.PI);
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: "translate(492 391)", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x: -115, y: 12, metal, scale: 1.18 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x: 11, y: 46, metal, scale: 1.18 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x: 114, y: 12, metal, scale: 1.18 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M260,472 H725", stroke: AssetMechanisms_C.white, strokeWidth: 1, opacity: 0.55 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M300,485 V528 H685 V485", stroke: AssetMechanisms_C.gold, strokeWidth: 1.5, strokeDasharray: "5 9", fill: "none", opacity: question * 0.6 }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${cx} ${cy}) rotate(${-20 + 30 * scan})`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M58,62 l88,103", stroke: AssetMechanisms_C.ink, strokeWidth: 31, strokeLinecap: "round" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M58,62 l88,103", stroke: silver, strokeWidth: 23, strokeLinecap: "round" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: 99, fill: ref("glass"), stroke: silver, strokeWidth: 10 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: 89, fill: "none", stroke: AssetMechanisms_C.white, strokeWidth: 1.2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-67,-26 A72,72 0 0 1 -18,-70", fill: "none", stroke: AssetMechanisms_C.white, strokeWidth: 5, opacity: 0.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 0, y: 11, size: 58, number: true, color: AssetMechanisms_C.gold, children: "4,000" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: question, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 770, y: 417, size: 94, color: AssetMechanisms_C.coral, children: "?" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 492, y: 580, size: 29, children: "\u4EF7\u683C\u4F4D\u7F6E \u2260 \u5DF2\u786E\u8BA4\u5E95\u90E8" })
      ] })
    ] });
  } else {
    const out = kind === "capitalExit", receive = phase(f, 9, 76), move = phase(f, 60, 126);
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(0 ${out ? 15 * move : 0}) rotate(${out ? 4 * move : 0} 492 414)`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M312,408 H676 l25,20 H287Z", fill: silver, stroke: AssetMechanisms_C.ink }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M287,428 H701 v12 H287Z", fill: "#A4BBB1" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Bar, { x: 492, y: 390, metal, scale: 1.8, shine: AssetMechanisms_clamp((f - 50) / 50) })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: phase(f, 0, 18), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M492,135 V238 m-9,-12 l9,12 9,-12", fill: "none", stroke: AssetMechanisms_C.coral, strokeWidth: 2.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 492, cy: 127, r: 38, fill: ref("glass"), stroke: AssetMechanisms_C.coral }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 492, y: 141, size: 42, number: true, color: AssetMechanisms_C.coral, children: "%" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 625, y: 167, color: AssetMechanisms_C.coral, children: "\u9AD8\u5229\u7387" })
      ] }),
      [0, 1, 2, 3, 4, 5].map((i) => {
        const t = out ? phase(f, 55 + i * 4, 100 + i * 4) : phase(f, 10 + i * 7, 50 + i * 7), x = out ? 355 + i % 3 * 43 - 230 * t : 155 + (200 + i % 3 * 43) * t, y = out ? 484 - Math.floor(i / 3) * 25 + 34 * Math.sin(t * Math.PI) : 530 + (484 - Math.floor(i / 3) * 25 - 530) * t - 45 * Math.sin(t * Math.PI);
        return /* @__PURE__ */ (0,jsx_runtime.jsx)(Coin, { x, y, r: 19, metal, opacity: out ? 1 - t * 0.8 : t, rotate: t * 150 }, i);
      }),
      [0, 1, 2, 3, 4, 5].map((i) => {
        const t = out ? phase(f, 62 + i * 4, 108 + i * 4) : phase(f, 15 + i * 7, 55 + i * 7), x = out ? 587 + i % 3 * 28 + 210 * t : 850 - (263 - i % 3 * 28) * t, y = out ? 484 - Math.floor(i / 3) * 25 + 34 * Math.sin(t * Math.PI) : 530 + (484 - Math.floor(i / 3) * 25 - 530) * t - 45 * Math.sin(t * Math.PI);
        return /* @__PURE__ */ (0,jsx_runtime.jsx)(Coin, { x, y, r: 19, metal, opacity: out ? 1 - t * 0.8 : t, rotate: -t * 150 }, i);
      }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M322,527 H665`, stroke: out ? AssetMechanisms_C.coral : AssetMechanisms_C.mint, strokeWidth: 2, opacity: (out ? 1 - move : receive) * 0.8 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 492, y: 584, size: 32, color: out ? AssetMechanisms_C.coral : AssetMechanisms_C.mint, children: out ? "\u8D44\u91D1\u64A4\u51FA \xB7 \u627F\u63A5\u51CF\u5F31" : "\u957F\u94B1\u8FDB\u5165 \xB7 \u5F62\u6210\u627F\u63A5" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Text, { x: 492, y: 76, size: 24, children: "\u6761\u4EF6\u60C5\u666F\u793A\u610F" })
    ] });
  }
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { width: "100%", height: "100%", viewBox: "0 0 984 676", style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-gold`, x1: "0", y1: "0", x2: "1", y2: ".25", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#B58A2E" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".24", stopColor: "#FFE396" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".48", stopColor: "#FFF8DF" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".69", stopColor: "#F2CA61" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#AC7F25" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-silver`, x1: "0", y1: "0", x2: "1", y2: ".35", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#8FA89F" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".28", stopColor: "#EDF5EA" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".5", stopColor: "#FFFFFF" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".77", stopColor: "#B9CDC1" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#829A91" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-paper`, x2: ".7", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#F8F6E7" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#BECFC0" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-glass`, x1: "0", y1: "0", x2: ".8", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#CBE5DF", stopOpacity: 0.22 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".45", stopColor: "#18252B", stopOpacity: 0.45 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#091B21", stopOpacity: 0.65 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("filter", { id: `${id}-shadow`, x: "-25%", y: "-25%", width: "150%", height: "155%", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "3", stdDeviation: "2.4", floodColor: AssetMechanisms_C.ink, floodOpacity: 0.85 }) })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: alpha, filter: ref("shadow"), children: body })
  ] });
};

;// ./src/stock/MacroMechanisms.tsx



const MacroMechanisms_C = { white: "#FFFFFF", gold: "#FFD86A", red: "#FF806C", mint: "#73EAC5", ink: "#17252C", soft: "#DDEAE4" };
const MacroMechanisms_clamp = (v) => Math.max(0, Math.min(1, v));
const MacroMechanisms_ease = (v) => 1 - Math.pow(1 - MacroMechanisms_clamp(v), 3);
const MacroMechanisms_phase = (t, start, end) => MacroMechanisms_ease((t - start) / Math.max(1e-3, end - start));
const MacroMechanisms_Text = ({ x, y, children, color = MacroMechanisms_C.white, size = 28, num = false, opacity = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, fill: color, opacity, textAnchor: "middle", fontSize: size, style: { fontFamily: num ? "StockNumeral,sans-serif" : "StockLabel,sans-serif", fontWeight: 700, paintOrder: "stroke fill", stroke: MacroMechanisms_C.ink, strokeWidth: 2, strokeLinejoin: "round" }, children });
const Gold = ({ metal, x, y, scale = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) scale(${scale})`, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-76,0 L-54,-36 H54 L78,0 L61,20 H-59Z", fill: metal, stroke: MacroMechanisms_C.ink, strokeWidth: 1.2 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-54,-36 H54 L33,-5 H-76Z", fill: "#FFF0BB" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-76,0 H78 L61,20 H-59Z", fill: "#D8A72D" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-53,-35 H53 M-74,0 H76", stroke: MacroMechanisms_C.white, strokeWidth: 1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-18,-23 H20 M-9,-16 H13", stroke: "#A48135", strokeWidth: 1 })
] });
const Bond = ({ paper, x, y, rotation = 0 }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) rotate(${rotation})`, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: -58, y: -75, width: 116, height: 150, rx: 3, fill: paper, stroke: "#729182", strokeWidth: 1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: -48, y: -64, width: 96, height: 128, fill: "none", stroke: "#9BAD9C", strokeWidth: 1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-32,-39 H33 M-32,-30 H25 M-32,-9 H32 M-32,1 H15", stroke: "#718675", strokeWidth: 1.7 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 23, cy: 37, r: 13, fill: "none", stroke: "#9EA986", strokeWidth: 1.2 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M17,48 l-5,19 11,-5 10,5 -4,-19", fill: "#A9BA9D" })
] });
const Bank = ({ metal, x, y }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y})`, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-83,-23 L0,-67 L83,-23 L73,-14 H-73Z", fill: metal, stroke: MacroMechanisms_C.ink, strokeWidth: 1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-59,-26 L0,-56 L59,-26Z", fill: "#FBE8B8" }),
  [-51, -17, 17, 51].map((x2) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: x2 - 8, y: -12, width: 16, height: 82, fill: metal }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: x2 - 4, x2: x2 - 4, y1: -8, y2: 65, stroke: MacroMechanisms_C.white, strokeWidth: 1, opacity: 0.7 })
  ] }, x2)),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-77,71 H77 l13,11 H-90Z M-90,85 H90 l8,8 H-98Z", fill: metal })
] });
const Arc = ({ cx, cy, r, draw, color = MacroMechanisms_C.gold, width = 2, start = -135, sweep = 270 }) => {
  const angle = (start + sweep * MacroMechanisms_clamp(draw)) * Math.PI / 180, a = start * Math.PI / 180;
  return /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${cx + r * Math.cos(a)},${cy + r * Math.sin(a)} A${r},${r} 0 ${sweep * draw > 180 ? 1 : 0} 1 ${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`, fill: "none", stroke: color, strokeWidth: width, strokeLinecap: "round" });
};
const MacroMechanisms = ({ kind, frame, frames, cues }) => {
  const id = (0,react.useId)().replace(/:/g, ""), url = (name) => `url(#${id}-${name})`, metal = url("metal"), paper = url("paper");
  const duration = Math.max(1, frames), t = MacroMechanisms_clamp(frame / duration), alpha = Math.min(MacroMechanisms_phase(t, 0, 0.07), MacroMechanisms_clamp((1 - t) / 0.07));
  const cue = (i, fallback) => Math.min(0.65, Math.max(0, ((cues == null ? void 0 : cues[i]) ?? fallback * duration) / duration));
  const a = cue(0, 0.08), b = cue(1, 0.29), c = cue(2, 0.49);
  let content;
  if (kind === "debtStock") {
    const emerge = MacroMechanisms_phase(t, a, a + 0.15), issue = MacroMechanisms_phase(t, b, b + 0.25);
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: emerge, transform: `translate(0 ${(1 - emerge) * 15})`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Bank, { metal, x: 266, y: 249 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 266, y: 389, children: "\u653F\u5E9C\u53D1\u884C" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M365,322 H553", stroke: MacroMechanisms_C.soft, strokeWidth: 1, opacity: issue * 0.3 }),
      [5, 4, 3, 2, 1, 0].map((i) => {
        const arrive = MacroMechanisms_phase(t, b + i * 0.025, b + i * 0.025 + 0.15);
        return /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: arrive, transform: `translate(${-(1 - arrive) * 175} ${(1 - arrive) * -22})`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Bond, { paper, x: 645 + i * 10, y: 287 - i * 7, rotation: -4 + i * 1.4 }) }, i);
      }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: MacroMechanisms_phase(t, c, c + 0.14), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M568,398 H765", stroke: MacroMechanisms_C.gold, strokeWidth: 1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 666, y: 445, color: MacroMechanisms_C.gold, children: "\u503A\u52A1\u5B58\u91CF" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 492, y: 553, size: 24, color: MacroMechanisms_C.soft, children: "\u53D1\u884C \u2192 \u7D2F\u79EF" })
      ] })
    ] });
  } else if (kind === "havenShift") {
    const push = MacroMechanisms_phase(t, a, b), change = MacroMechanisms_phase(t, b, c + 0.17), release = MacroMechanisms_phase(t, c, c + 0.18), gx = 370 + 215 * change, gy = 357 - 25 * change;
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: 1 - release * 0.65, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M273,${201 + 47 * push} H467 l13,14 H260Z`, fill: url("silver"), stroke: MacroMechanisms_C.ink, strokeWidth: 1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M370,131 V${199 + 47 * push}`, stroke: MacroMechanisms_C.red, strokeWidth: 11 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M368,131 V${199 + 47 * push}`, stroke: MacroMechanisms_C.white, strokeWidth: 1, opacity: 0.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 367, y: 429, color: MacroMechanisms_C.red, opacity: 1 - change, children: "\u5F53\u524D\u538B\u529B" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: release, transform: `translate(588 ${299 + (1 - release) * 22}) scale(${0.93 + 0.07 * release})`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-116,-102 Q0,-69 116,-102 V18 Q104,96 0,144 Q-104,96 -116,18Z", fill: url("shield"), stroke: MacroMechanisms_C.mint, strokeWidth: 2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-99,-83 Q0,-56 99,-83 V16 Q87,81 0,124 Q-87,81 -99,16Z", fill: "none", stroke: MacroMechanisms_C.white, strokeWidth: 0.9, opacity: 0.55 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Gold, { metal, x: gx, y: gy, scale: 1.35 }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: release, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M490,402 H686 l14,12 H476Z", fill: metal }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 588, y: 495, color: MacroMechanisms_C.mint, children: "\u53EF\u80FD\u8F6C\u4E3A\u907F\u9669\u652F\u6491" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 492, y: 565, size: 24, color: MacroMechanisms_C.soft, children: "\u538B\u529B\u4E0E\u907F\u9669 \xB7 \u673A\u5236\u793A\u610F" })
    ] });
  } else if (kind === "tomorrowHorizon") {
    const enter = MacroMechanisms_phase(t, a, a + 0.14), flip = MacroMechanisms_phase(t, b, b + 0.14), ring = MacroMechanisms_phase(t, c, c + 0.23);
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: enter, transform: `translate(${338 - 25 * (1 - enter)} 285)`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: -91, y: -98, width: 182, height: 190, rx: 6, fill: paper, stroke: MacroMechanisms_C.ink, strokeWidth: 1.5 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-91,-98 H91 v39 H-91Z", fill: "#BECEC3" }),
        [-52, 52].map((x) => /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: x - 4, y: -112, width: 8, height: 30, rx: 4, fill: metal }, x)),
        /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(0 ${-5 * flip})`, children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { y: 23, textAnchor: "middle", fill: "#374B43", fontSize: 35, style: { fontFamily: "StockLabel,sans-serif", fontWeight: 700 }, children: "\u660E\u5929" }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-35,51 H35", stroke: "#7C9385", strokeWidth: 1 })
        ] }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M-91,92 Q0,${92 - 33 * flip} 91,92`, fill: "none", stroke: MacroMechanisms_C.white, strokeWidth: 2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: flip, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M112,-22 v56 M125,-22 v56", stroke: MacroMechanisms_C.red, strokeWidth: 6, strokeLinecap: "round" }) })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: ring, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Arc, { cx: 688, cy: 300, r: 107, draw: ring, color: MacroMechanisms_C.gold, width: 3 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Arc, { cx: 688, cy: 300, r: 88, draw: ring, color: MacroMechanisms_C.white, width: 0.8 }),
        Array.from({ length: 13 }, (_, i) => {
          const an = (-135 + i * 22.5) * Math.PI / 180;
          return /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: 688 + 96 * Math.cos(an), y1: 300 + 96 * Math.sin(an), x2: 688 + 104 * Math.cos(an), y2: 300 + 104 * Math.sin(an), stroke: MacroMechanisms_C.gold, opacity: MacroMechanisms_clamp(ring * 13 - i) }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Gold, { metal, x: 688, y: 305, scale: 0.8 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 688, y: 449, color: MacroMechanisms_C.gold, children: "\u66F4\u957F\u5468\u671F" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 338, y: 447, color: MacroMechanisms_C.red, children: "\u4E0D\u7B49\u4E8E\u660E\u5929\u66B4\u6DA8" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 492, y: 560, size: 24, color: MacroMechanisms_C.soft, children: "\u77ED\u671F\u65F6\u70B9 \u2260 \u957F\u671F\u903B\u8F91" })
    ] });
  } else if (kind === "capitalRotation") {
    const time = MacroMechanisms_phase(t, a, c), turn = MacroMechanisms_phase(t, b, c + 0.12), flow = MacroMechanisms_phase(t, c, c + 0.22), angle = (-58 + 96 * turn) * Math.PI / 180;
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: "translate(264 281)", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Arc, { cx: 0, cy: 0, r: 113, draw: time, color: MacroMechanisms_C.gold, width: 2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Arc, { cx: 0, cy: 0, r: 94, draw: time, color: MacroMechanisms_C.soft, width: 0.7 }),
        Array.from({ length: 9 }, (_, i) => {
          const an = (-135 + i * 33.75) * Math.PI / 180;
          return /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: 102 * Math.cos(an), y1: 102 * Math.sin(an), x2: 113 * Math.cos(an), y2: 113 * Math.sin(an), stroke: MacroMechanisms_C.gold, opacity: MacroMechanisms_clamp(time * 9 - i) }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 0, y: 15, size: 49, num: true, color: MacroMechanisms_C.gold, children: "1\u20142" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 0, y: 52, size: 24, children: "\u5E74" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 0, y: 176, children: "\u89C2\u5BDF\u7A97\u53E3" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: "translate(544 246)", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: 69, fill: url("silver"), stroke: MacroMechanisms_C.ink, strokeWidth: 1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: 56, fill: "#536B64", fillOpacity: 0.6, stroke: MacroMechanisms_C.white, strokeWidth: 1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: 0, y1: 0, x2: 43 * Math.sin(angle), y2: -43 * Math.cos(angle), stroke: MacroMechanisms_C.gold, strokeWidth: 4, strokeLinecap: "round" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: 6, fill: metal }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 0, y: 113, size: 25, children: "\u5229\u7387\u73AF\u5883" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: flow, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M637,322 Q694,322 694,380 H834", fill: "none", stroke: MacroMechanisms_C.soft, strokeWidth: 16, opacity: 0.28 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M637,322 Q694,322 694,380 H834", fill: "none", stroke: MacroMechanisms_C.mint, strokeWidth: 2 }),
        [0, 1, 2, 3, 4].map((i) => {
          const q = MacroMechanisms_phase(t, c + i * 0.018, c + i * 0.018 + 0.15), x = 637 + 197 * q, y = 322 + 58 * MacroMechanisms_ease(q);
          return /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: x, cy: y, r: 3, fill: MacroMechanisms_C.white, opacity: q > 0 ? 1 : 0 }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Gold, { metal, x: 826, y: 361, scale: 0.55 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 768, y: 453, size: 25, color: MacroMechanisms_C.mint, children: "\u8D44\u91D1\u8F6C\u5411\u6761\u4EF6" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 492, y: 558, size: 24, color: MacroMechanisms_C.soft, children: "\u5229\u7387\u4E0E\u8D44\u91D1 \xB7 \u6761\u4EF6\u53D8\u5316" })
    ] });
  } else {
    const gate = MacroMechanisms_phase(t, a, a + 0.19), approach = MacroMechanisms_phase(t, b, c + 0.13), clock = MacroMechanisms_phase(t, c, c + 0.24), gx = 275 + 113 * approach;
    content = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: gate, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M488,155 V431 M627,155 V431", stroke: url("silver"), strokeWidth: 14 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M482,155 V431 M621,155 V431", stroke: MacroMechanisms_C.white, strokeWidth: 1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M477,155 H639 l12,13 H465Z", fill: metal }),
        [215, 267, 319, 371].map((y) => /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 491, y, width: 133, height: 12, fill: url("silver"), stroke: MacroMechanisms_C.ink, strokeWidth: 1 }, y)),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 557, y: 134, color: MacroMechanisms_C.red, size: 48, num: true, children: "%" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Gold, { metal, x: gx, y: 368, scale: 1.05 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M199,412 H690", stroke: MacroMechanisms_C.soft, strokeWidth: 1, opacity: 0.4 }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: clock, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Arc, { cx: 785, cy: 298, r: 69, draw: clock, color: MacroMechanisms_C.gold, width: 1.8 }),
        [0, 1, 2, 3, 4, 5, 6].map((i) => {
          const an = (-135 + i * 45) * Math.PI / 180;
          return /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: 785 + 59 * Math.cos(an), y1: 298 + 59 * Math.sin(an), x2: 785 + 67 * Math.cos(an), y2: 298 + 67 * Math.sin(an), stroke: MacroMechanisms_C.white, opacity: MacroMechanisms_clamp(clock * 7 - i) }, i);
        }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 785, y: 314, size: 38, color: MacroMechanisms_C.gold, children: "?" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 785, y: 407, size: 25, children: "\u5468\u671F\u5EF6\u540E\uFF1F" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 350, y: 474, color: MacroMechanisms_C.gold, children: "\u9EC4\u91D1" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 557, y: 474, color: MacroMechanisms_C.red, children: "\u9AD8\u5229\u7387\u7EA6\u675F" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms_Text, { x: 492, y: 565, size: 24, color: MacroMechanisms_C.soft, children: "\u6761\u4EF6\u5C1A\u672A\u6210\u719F\uFF1F" })
    ] });
  }
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { width: "100%", height: "100%", viewBox: "0 0 984 676", style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-metal`, x1: "0", y1: "0", x2: "1", y2: ".3", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#D3AA43" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".25", stopColor: "#FFE6A1" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".5", stopColor: "#FFF8E1" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".75", stopColor: "#F3D06A" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#B28731" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-silver`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#9FB7AB" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".45", stopColor: "#F6FFF5" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#B1C9BD" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-paper`, x2: ".8", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#F6F3DF" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#BFCFB9" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-shield`, x2: ".7", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: MacroMechanisms_C.mint, stopOpacity: 0.22 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".5", stopColor: "#E9FFF3", stopOpacity: 0.08 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: MacroMechanisms_C.mint, stopOpacity: 0.3 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("filter", { id: `${id}-shadow`, x: "-20%", y: "-25%", width: "140%", height: "150%", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "2.5", stdDeviation: "2", floodColor: MacroMechanisms_C.ink, floodOpacity: 0.8 }) })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: alpha, filter: url("shadow"), children: content })
  ] });
};

;// ./src/stock/NarrativeGraphics.tsx




const assets = /* @__PURE__ */ new Set(["priceAnchor", "bondYield", "reserveAccumulation", "etfInflow", "realRateBoundary", "bottomSearch", "capitalSupport", "capitalExit"]);
const NarrativeGraphics = ({ event: e, frame }) => assets.has(e.kind) ? /* @__PURE__ */ (0,jsx_runtime.jsx)(AssetMechanisms, { kind: e.kind, frame: frame - e.from, frames: e.to - e.from, cues: e.cues }) : /* @__PURE__ */ (0,jsx_runtime.jsx)(MacroMechanisms, { kind: e.kind, frame: frame - e.from, frames: e.to - e.from, cues: e.cues });

;// ./src/stock/SemanticMotion.tsx



const SemanticMotion_C = { white: "#FFFFFF", gold: "#FFD86A", coral: "#FF806C", mint: "#73EAC5", ink: "#14242D" };
const SemanticMotion_clamp = (v) => Math.max(0, Math.min(1, v));
const SemanticMotion_ease = (v) => 1 - Math.pow(1 - SemanticMotion_clamp(v), 3);
const SemanticMotion_p = (f, a, b) => SemanticMotion_clamp((f - a) / (b - a));
const SemanticMotion_Label = ({ x, y, children, size = 27, color = SemanticMotion_C.white, num = false, anchor = "middle", opacity = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, fill: color, fontSize: size, textAnchor: anchor, opacity, style: { fontFamily: num ? "StockNumeral,sans-serif" : "StockLabel,sans-serif", fontWeight: 700, paintOrder: "stroke fill", stroke: SemanticMotion_C.ink, strokeWidth: 2, strokeLinejoin: "round", fontVariantNumeric: "tabular-nums" }, children });
const SemanticMotion_Gold = ({ metal, x, y, scale = 1, compression = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) scale(${scale} ${scale * compression})`, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-74,0 L-52,-37 H55 L79,0 L62,20 H-58Z", fill: metal, stroke: SemanticMotion_C.ink, strokeWidth: 1.1 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-52,-37 H55 L34,-5 H-74Z", fill: "#FFF0BD" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-74,0 H79 L62,20 H-58Z", fill: "#DDAF3A" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-51,-36 H54 M-72,0 H77", stroke: SemanticMotion_C.white, strokeWidth: 1.2 }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-17,-23 H22 M-9,-16 H15", stroke: "#B18A3A", strokeWidth: 1.2 })
] });
const springPath = (x, top, bottom) => {
  const step = (bottom - top) / 9;
  return `M${x},${top} ` + Array.from({ length: 8 }, (_, i) => `L${x + (i % 2 ? 10 : -10)},${top + (i + 1) * step}`).join(" ") + ` L${x},${bottom}`;
};
const SemanticMotion = ({ kind, frame, frames, cues }) => {
  const id = (0,react.useId)().replace(/:/g, ""), ref = (s) => `url(#${id}-${s})`, metal = ref("metal");
  const opacity = Math.min(SemanticMotion_ease(SemanticMotion_p(frame, 0, 9)), SemanticMotion_clamp((frames - frame) / 8));
  let body;
  if (kind === "forecastRevision") {
    const oldCue = (cues == null ? void 0 : cues[0]) ?? 55, shrinkCue = (cues == null ? void 0 : cues[1]) ?? 84, settleCue = (cues == null ? void 0 : cues[2]) ?? 112;
    const appear = SemanticMotion_ease(SemanticMotion_p(frame, oldCue, oldCue + 13)), shrink = SemanticMotion_ease(SemanticMotion_p(frame, shrinkCue, settleCue)), oldHeight = 290 * appear, newHeight = (290 - 290 * (1 - 4500 / 6500) * shrink) * appear;
    const base = 476, left = 318, right = 629, bw = 120, depth = 19;
    const bar = (x, height, tint) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - bw / 2},${base - height} h${bw} v${height} h${-bw}Z`, fill: tint, stroke: SemanticMotion_C.ink, strokeWidth: 1 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x + bw / 2},${base - height} l${depth},-${depth / 2} v${height} l-${depth},${depth / 2}Z`, fill: "#AA8133" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - bw / 2},${base - height} l${depth},-${depth / 2} h${bw} l-${depth},${depth / 2}Z`, fill: "#FFF0BE" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - bw / 2 + 2},${base - height + 1} v${Math.max(0, height - 2)}`, stroke: SemanticMotion_C.white, opacity: 0.65 })
    ] });
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 74, size: 30, children: "CIBC \xB7 \u7B2C\u56DB\u5B63\u5EA6\u91D1\u4EF7\u9884\u6D4B" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 111, size: 22, color: "#E2ECE8", children: "\u673A\u6784\u9884\u6D4B \xB7 2026\u5E74\u7B2C\u56DB\u5B63\u5EA6" }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: appear, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M225,480 H739", stroke: SemanticMotion_C.white, strokeWidth: 1, opacity: 0.5 }),
        bar(left, oldHeight, ref("silver")),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${right - bw / 2},${base - 290} h${bw} v290 h${-bw}Z`, fill: "none", stroke: SemanticMotion_C.white, strokeWidth: 1.2, strokeDasharray: "5 5", opacity: 0.5 }),
        bar(right, newHeight, metal),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: left, y: base - oldHeight - 31, size: 57, num: true, children: "6,500" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: right + 7, y: base - newHeight - 30, size: 60, color: SemanticMotion_C.gold, num: true, children: Math.round(6500 - 2e3 * shrink).toLocaleString("en-US") }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: left, y: 524, size: 25, children: "\u539F\u76EE\u6807" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: right, y: 524, size: 25, color: SemanticMotion_C.gold, children: "\u8C03\u6574\u540E" }),
        /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: SemanticMotion_ease(SemanticMotion_p(frame, settleCue + 4, settleCue + 14)), children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M771,${base - 290} h10 v${290 - newHeight} h-10`, fill: "none", stroke: SemanticMotion_C.coral, strokeWidth: 1.5 }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 792, y: base - 248, size: 28, color: SemanticMotion_C.coral, num: true, anchor: "start", children: "\u221230.8%" }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 792, y: base - 215, size: 24, color: SemanticMotion_C.coral, num: true, anchor: "start", children: "\u2248 \u221231%" })
        ] })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 589, size: 23, color: "#E2ECE8", children: "CIBC\u9884\u6D4B \xB7 Kitco 2026.10.20 \xB7 \u7F8E\u5143\uFF0F\u76CE\u53F8" })
    ] });
  } else if (kind === "ratePressure") {
    const push = SemanticMotion_ease(SemanticMotion_p(frame, 25, 55)), release = SemanticMotion_ease(SemanticMotion_p(frame, 80, 92)), pressure = push * (1 - 0.22 * release), plateY = 217 + 104 * pressure, goldY = 425 + 13 * pressure;
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 69, size: 30, children: "\u9AD8\u5229\u7387 \xB7 \u6301\u6709\u9EC4\u91D1\u7684\u673A\u4F1A\u6210\u672C" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M316,145 V472 M668,145 V472", fill: "none", stroke: "#DCE7E3", strokeWidth: 7, opacity: 0.65 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M312,145 V472 M664,145 V472", stroke: SemanticMotion_C.white, strokeWidth: 1 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M492,118 V${plateY - 16}`, stroke: SemanticMotion_C.coral, strokeWidth: 16 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M489,118 V${plateY - 16}`, stroke: SemanticMotion_C.white, strokeWidth: 1.2, opacity: 0.7 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M339,${plateY} h306 l16,13 H323Z`, fill: ref("silver"), stroke: SemanticMotion_C.ink, strokeWidth: 1 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M323,${plateY + 13} H661 v12 H323Z`, fill: "#BBCBC5" }),
      [374, 610].map((x) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: springPath(x, plateY + 27, goldY - 18), fill: "none", stroke: SemanticMotion_C.ink, strokeWidth: 6 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: springPath(x, plateY + 27, goldY - 18), fill: "none", stroke: SemanticMotion_C.gold, strokeWidth: 2.6 })
      ] }, x)),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Gold, { metal, x: 492, y: goldY, scale: 1.35, compression: 1 - pressure * 0.1 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M326,474 H658 l18,13 H308Z", fill: metal }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: push, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M727,207 V${270 + 70 * pressure} m-7,-10 l7,10 7,-10`, fill: "none", stroke: SemanticMotion_C.coral, strokeWidth: 2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 757, y: 276, anchor: "start", size: 27, color: SemanticMotion_C.coral, children: "\u538B\u529B\u6301\u7EED" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 526, size: 27, color: SemanticMotion_C.gold, children: "\u9EC4\u91D1\u627F\u538B" }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: SemanticMotion_ease(SemanticMotion_p(frame, 20, 35)), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M355,552 H629", stroke: SemanticMotion_C.white, strokeWidth: 1, opacity: 0.4 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M355,552 H${355 + 274 * SemanticMotion_clamp((frame - 20) / 65)}`, stroke: SemanticMotion_C.gold, strokeWidth: 3 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 355 + 274 * SemanticMotion_clamp((frame - 20) / 65), cy: 552, r: 4, fill: SemanticMotion_C.white }),
        [355, 423, 492, 560, 629].map((x) => /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x},548 v8`, stroke: SemanticMotion_C.white, strokeWidth: 1, opacity: 0.5 }, x))
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 589, size: 21, color: "#E2ECE8", children: "\u9AD8\u5229\u7387\u6301\u7EED\u65F6\u95F4 \xB7 \u673A\u5236\u793A\u610F" })
    ] });
  } else if (kind === "horizon") {
    const t = frame / Math.max(1, frames), support = SemanticMotion_ease(SemanticMotion_p(t, 0.3, 0.58)), press = SemanticMotion_ease(SemanticMotion_p(t, 0.08, 0.32)) * (1 - 0.15 * SemanticMotion_ease(SemanticMotion_p(t, 0.65, 0.82)));
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 70, size: 30, children: "\u77ED\u671F\u538B\u529B\u4E0E\u957F\u671F\u652F\u6491" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Gold, { metal, x: 492, y: 291 + 16 * press, scale: 1.8 }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: SemanticMotion_ease(SemanticMotion_p(t, 0.06, 0.2)), children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M492,121 V${193 + 20 * press} m-9,-13 l9,13 9,-13`, fill: "none", stroke: SemanticMotion_C.coral, strokeWidth: 3 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 618, y: 174, size: 26, color: SemanticMotion_C.coral, children: "\u77ED\u671F\u627F\u538B" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: support, children: [
        [348, 636].map((x, i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(0 ${(1 - support) * 46})`, children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - 25},447 V369 L${x - 8},354 h37 v93Z`, fill: metal, stroke: SemanticMotion_C.ink, strokeWidth: 1 }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - 25},369 h54 l-17,-15 h-37Z`, fill: "#FFF0BE" }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${x - 23},370 V445`, stroke: SemanticMotion_C.white, opacity: 0.7 }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x, y: 493, size: 25, color: i ? SemanticMotion_C.mint : SemanticMotion_C.gold, children: i ? "\u7ED3\u6784\u6027\u9700\u6C42" : "\u957F\u671F\u50A8\u5907" })
        ] }, x)),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M303,344 H681 l16,15 H287Z", fill: ref("silver"), stroke: SemanticMotion_C.ink, strokeWidth: 1 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M287,359 H697 v14 H287Z", fill: "#ABBFB6" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M287,359 H697", stroke: SemanticMotion_C.white, strokeWidth: 1 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 569, size: 25, children: "\u77ED\u671F\u53D7\u538B\uFF0C\u652F\u6491\u56E0\u7D20\u4ECD\u9700\u6301\u7EED\u89C2\u5BDF" })
    ] });
  } else {
    const t = frame / Math.max(1, frames), a = SemanticMotion_ease(SemanticMotion_p(t, 0.08, 0.5)), angle = -120 + 222 * a, rad = angle * Math.PI / 180, cx = 492, cy = 343, r = 175;
    body = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 69, size: 30, children: "\u5229\u7387\u5904\u4E8E\u9AD8\u4F4D" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M340,431 A175,175 0 1 1 644,431", fill: "none", stroke: SemanticMotion_C.white, strokeWidth: 1, opacity: 0.35 }),
      Array.from({ length: 25 }, (_, i) => {
        const ar = (-150 + i * 12) * Math.PI / 180;
        return /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: cx + Math.cos(ar) * (r - (i % 4 ? 9 : 18)), y1: cy + Math.sin(ar) * (r - (i % 4 ? 9 : 18)), x2: cx + Math.cos(ar) * r, y2: cy + Math.sin(ar) * r, stroke: i > 16 ? SemanticMotion_C.coral : SemanticMotion_C.white, strokeWidth: i % 4 ? 1 : 2, opacity: 0.9 }, i);
      }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${cx},${cy} L${cx + Math.sin(rad) * 137},${cy - Math.cos(rad) * 137}`, stroke: SemanticMotion_C.ink, strokeWidth: 7 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${cx},${cy} L${cx + Math.sin(rad) * 137},${cy - Math.cos(rad) * 137}`, stroke: SemanticMotion_C.gold, strokeWidth: 3 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx, cy, r: 12, fill: metal, stroke: SemanticMotion_C.white, strokeWidth: 1 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: cx, y: cy + 72, size: 44, num: true, color: SemanticMotion_C.gold, children: "%" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 697, y: 307, size: 27, color: SemanticMotion_C.coral, children: "\u9AD8\u4F4D" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion_Label, { x: 492, y: 564, size: 23, children: "\u72B6\u6001\u793A\u610F \xB7 \u975E\u5386\u53F2\u5229\u7387\u8BFB\u6570" })
    ] });
  }
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { width: "100%", height: "100%", viewBox: "0 0 984 676", style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-metal`, x1: "0", y1: "0", x2: "1", y2: ".3", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#D5AA42" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".25", stopColor: "#FFE6A0" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".5", stopColor: "#FFF7DE" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".75", stopColor: "#F6CF66" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#B58A2B" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-silver`, x1: "0", y1: "0", x2: "1", y2: ".2", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: "#A3B6AF" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: ".4", stopColor: "#F5FBF5" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#BCCFC6" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("filter", { id: `${id}-shadow`, x: "-20%", y: "-25%", width: "140%", height: "150%", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "3", stdDeviation: "2.2", floodColor: SemanticMotion_C.ink, floodOpacity: 0.75 }) })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity, filter: ref("shadow"), children: body })
  ] });
};

;// ./src/stock/HistoricalPriceChart.tsx



const GOLD = "#FFD86A", WHITE = "#FFFFFF", INK = "#15232B";
const HistoricalPriceChart_clamp = (v) => Math.max(0, Math.min(1, v));
const dateMs = (s) => {
  const ms = Date.parse(`${s}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || !Number.isFinite(ms) || new Date(ms).toISOString().slice(0, 10) !== s) throw new Error(`Invalid price date: ${s}`);
  return ms;
};
const number = (v) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
const fieldName = { close: "\u6536\u76D8\u4EF7", high: "\u76D8\u4E2D\u9AD8\u70B9", low: "\u76D8\u4E2D\u4F4E\u70B9" };
const HistoricalPriceChart_Label = ({ x, y, children, size = 22, anchor = "start", color = WHITE, numeral = false }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, fill: color, fontSize: size, textAnchor: anchor, style: { fontFamily: numeral ? "StockNumeral, sans-serif" : "StockLabel, sans-serif", fontWeight: 700, paintOrder: "stroke fill", stroke: INK, strokeWidth: 2.2, strokeLinejoin: "round", fontVariantNumeric: "tabular-nums" }, children });
const sourceLines = (source) => {
  const lines = [];
  let line = "", weight = 0;
  for (const char of source) {
    const n = /[\u0000-\u00ff]/.test(char) ? 0.53 : 1;
    if (weight + n > 43) {
      lines.push(line);
      line = "";
      weight = 0;
    }
    line += char;
    weight += n;
  }
  if (line) lines.push(line);
  if (lines.length > 2) throw new Error("Historical chart source must fit two readable lines; shorten the source label and retain full provenance in the manifest");
  return lines;
};
const HistoricalPriceChart = ({ data: d, frame }) => {
  const id = (0,react.useId)().replace(/:/g, "");
  if (frame < d.from || frame >= d.to) return null;
  const duration = d.to - d.from, hold = Math.min(30, Math.floor(duration * 0.2));
  if (![d.from, d.to, d.drawFrom, d.drawTo, ...d.domain].every(Number.isFinite) || duration <= 0 || d.drawFrom < 0 || d.drawTo <= d.drawFrom || d.drawTo > duration - hold) throw new Error("Invalid chart timing: drawTo must leave a final reading hold");
  if (d.domain[1] <= d.domain[0] || d.points.length < 2) throw new Error("Chart requires an increasing domain and at least two observations");
  const rows = d.points.map((p, i) => {
    const time = dateMs(p.date);
    if (i && time <= dateMs(d.points[i - 1].date)) throw new Error("Price observations must be unique and in ascending date order");
    if (!Number.isFinite(p.close) || p.close < d.domain[0] || p.close > d.domain[1]) throw new Error(`Close is missing or outside domain: ${p.date}`);
    if (p.high !== void 0 && (!Number.isFinite(p.high) || p.high < p.close)) throw new Error(`Invalid intraday high: ${p.date}`);
    if (p.low !== void 0 && (!Number.isFinite(p.low) || p.low > p.close)) throw new Error(`Invalid intraday low: ${p.date}`);
    return { ...p, time };
  });
  const first = d.startDate ? dateMs(d.startDate) : rows[0].time, last = d.endDate ? dateMs(d.endDate) : rows[rows.length - 1].time;
  if (first > rows[0].time || last < rows[rows.length - 1].time || last <= first) throw new Error("Chart date range must contain every supplied observation");
  const markers = (d.markers ?? []).map((m) => {
    const row = rows.find((r) => r.date === m.date), value = row == null ? void 0 : row[m.field];
    if (!row || value === void 0 || !Number.isFinite(value) || value < d.domain[0] || value > d.domain[1]) throw new Error(`Marker requires the actual ${m.field} observation inside domain: ${m.date}`);
    if (!Number.isFinite(m.from) || m.from < 0 || m.from >= duration || m.to !== void 0 && (!Number.isFinite(m.to) || m.to <= m.from || m.to > duration)) throw new Error("Marker timing must be relative to chart start");
    return { ...m, row, value };
  });
  const f = frame - d.from, a = HistoricalPriceChart_clamp(f / 10) * HistoricalPriceChart_clamp((duration - f) / 9), progress = HistoricalPriceChart_clamp((f - d.drawFrom) / (d.drawTo - d.drawFrom));
  let now = first + (last - first) * progress;
  if (d.timeStops) {
    const stops = d.timeStops.map((s) => ({ ...s, time: dateMs(s.date) }));
    if (stops.length < 2 || stops[0].frame !== d.drawFrom || stops[0].time !== first || stops[stops.length - 1].frame !== d.drawTo || stops[stops.length - 1].time !== last || stops.some((s, i) => !Number.isInteger(s.frame) || s.frame < d.drawFrom || s.frame > d.drawTo || i > 0 && (s.frame <= stops[i - 1].frame || s.time < stops[i - 1].time))) throw new Error("Invalid historical chart narration stops");
    now = f <= stops[0].frame ? first : last;
    for (let i = 1; i < stops.length; i++) if (f >= stops[i - 1].frame && f < stops[i].frame) {
      const a2 = stops[i - 1], b = stops[i];
      now = a2.time + (b.time - a2.time) * (f - a2.frame) / (b.frame - a2.frame);
      break;
    }
  }
  const visible = rows.filter((r) => r.time <= now), active = visible[visible.length - 1];
  const left = 96, right = 908, top = 139, bottom = 477;
  const x = (t) => left + (t - first) / (last - first) * (right - left);
  const y = (v) => bottom - (v - d.domain[0]) / (d.domain[1] - d.domain[0]) * (bottom - top);
  const line = rows.map((r, i) => `${i ? "L" : "M"}${x(r.time)},${y(r.close)}`).join(" ");
  const rawStep = (d.domain[1] - d.domain[0]) / 4, magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = ([1, 2, 2.5, 5, 10].find((v) => v >= rawStep / magnitude) ?? 10) * magnitude;
  const ticks = [];
  for (let v = Math.ceil(d.domain[0] / step) * step; v <= d.domain[1] + step * 1e-4; v += step) ticks.push(v);
  const dateTicks = [];
  for (let t = Date.UTC(new Date(first).getUTCFullYear(), new Date(first).getUTCMonth(), 1); t <= last; t = Date.UTC(new Date(t).getUTCFullYear(), new Date(t).getUTCMonth() + 1, 1)) dateTicks.push({ time: Math.max(first, t), label: `${new Date(t).getUTCMonth() + 1}\u6708` });
  const sources = sourceLines(`\u6570\u636E\uFF1A${d.source}`);
  const activeMarkers = markers.filter((m) => f >= m.from && f < (m.to ?? duration) && m.row.time <= now);
  const markerOwnsQuote = active && activeMarkers.some((m) => m.row.date === active.date && m.field === "close");
  const quoteX = active ? x(active.time) : left, quoteY = active ? y(active.close) : bottom;
  const nearbyMarker = activeMarkers.some((m) => Math.abs(x(m.row.time) - quoteX) < 145 && Math.abs(y(m.value) - quoteY) < 70);
  const quoteBelow = quoteY < top + 70 || nearbyMarker;
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { width: d.width ?? 984, height: d.height ?? 676, viewBox: "0 0 984 676", style: { position: "absolute", left: d.x ?? 0, top: d.y ?? 0, pointerEvents: "none", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("clipPath", { id: `${id}-reveal`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: left - 1, y: top - 8, width: Math.max(0, x(now) - left + 1), height: bottom - top + 17 }) }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("linearGradient", { id: `${id}-area`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { stopColor: GOLD, stopOpacity: 0.14 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: GOLD, stopOpacity: 0 })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("filter", { id: `${id}-shadow`, x: "-15%", y: "-30%", width: "130%", height: "160%", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "1.5", stdDeviation: "1.5", floodColor: INK, floodOpacity: 0.8 }) })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: a, filter: `url(#${id}-shadow)`, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: left, y: 48, size: 31, children: d.title }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)(HistoricalPriceChart_Label, { x: left, y: 83, size: 20, color: "#E3ECE7", children: [
        d.instrument,
        " \xB7 ",
        d.unit
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: left, x2: left + 27, y1: 111, y2: 111, stroke: GOLD, strokeWidth: 3 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: left + 38, y: 118, size: 20, children: "\u65E5\u6536\u76D8\u4EF7" }),
        markers.some((m) => m.field !== "close") && /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: right, y: 118, size: 18, anchor: "end", color: "#E3ECE7", children: "\u25C7 \u76D8\u4E2D\u9AD8\u4F4E\u70B9" })
      ] }),
      ticks.map((v) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: left, x2: right, y1: y(v), y2: y(v), stroke: WHITE, strokeWidth: 0.8, opacity: 0.2 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: left - 15, y: y(v) + 7, size: 21, anchor: "end", numeral: true, children: Number(v.toPrecision(10)).toLocaleString("en-US") })
      ] }, v)),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: left, x2: right, y1: bottom, y2: bottom, stroke: WHITE, strokeWidth: 1, opacity: 0.45 }),
      dateTicks.map((t, i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: x(t.time), x2: x(t.time), y1: bottom, y2: bottom + 7, stroke: WHITE, opacity: 0.55 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: x(t.time), y: 511, size: 22, anchor: i === 0 ? "start" : "middle", children: t.label })
      ] }, i)),
      f >= d.drawFrom && /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { clipPath: `url(#${id}-reveal)`, children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `${line} L${right},${bottom} L${left},${bottom} Z`, fill: `url(#${id}-area)` }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: line, fill: "none", stroke: INK, strokeWidth: 7, strokeOpacity: 0.65, strokeLinejoin: "round" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: line, fill: "none", stroke: GOLD, strokeWidth: 10, strokeOpacity: 0.12, strokeLinejoin: "round" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: line, fill: "none", stroke: GOLD, strokeWidth: 3.6, strokeLinejoin: "round", strokeLinecap: "round" })
      ] }),
      active && /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: quoteX, x2: quoteX, y1: top, y2: bottom, stroke: WHITE, strokeWidth: 0.8, strokeDasharray: "3 6", opacity: 0.38 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: quoteX, cy: quoteY, r: 8, fill: GOLD, fillOpacity: 0.18 }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: quoteX, cy: quoteY, r: 4, fill: WHITE }),
        !markerOwnsQuote && /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: Math.min(right - 6, Math.max(left + 12, quoteX + (quoteX > right - 150 ? -15 : 15))), y: Math.min(bottom - 10, Math.max(top + 26, quoteY + (quoteBelow ? 35 : -19))), anchor: quoteX > right - 150 ? "end" : "start", size: 31, color: GOLD, numeral: true, children: number(active.close) }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: left, y: 555, size: 24, numeral: true, children: active.date }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: left + 175, y: 555, size: 21, color: "#E3ECE7", children: "\u73B0\u8D27\u9EC4\u91D1 \xB7 \u65E5\u6536\u76D8" })
      ] }),
      activeMarkers.map((m, i) => {
        const mx = x(m.row.time), my = y(m.value), below = m.field === "low" || my < top + 45, side = mx > right - 225 ? -1 : 1;
        const tx = Math.max(left + 12, Math.min(right - 12, mx + side * (42 + i % 2 * 16))), ty = Math.max(top + 26, Math.min(bottom - 28, my + (below ? 55 : -45)));
        const reveal = Math.min(HistoricalPriceChart_clamp((f - m.from) / 10), HistoricalPriceChart_clamp(((m.to ?? duration) - f) / 8));
        return /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: reveal, children: [
          m.field === "close" ? /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: mx, cy: my, r: 5, fill: GOLD }) : /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1: mx, x2: mx, y1: y(m.row.close), y2: my, stroke: WHITE, strokeWidth: 1, strokeDasharray: "2 3", opacity: 0.65 }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${mx},${my - 5} l5,5 l-5,5 l-5,-5Z`, fill: WHITE, stroke: INK, strokeWidth: 1 })
          ] }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M${mx},${my} L${tx},${ty - 14}`, fill: "none", stroke: WHITE, strokeWidth: 0.9 }),
          /* @__PURE__ */ (0,jsx_runtime.jsxs)(HistoricalPriceChart_Label, { x: tx, y: ty, size: 21, anchor: side === 1 ? "start" : "end", children: [
            m.label,
            " \xB7 ",
            fieldName[m.field]
          ] }),
          /* @__PURE__ */ (0,jsx_runtime.jsxs)(HistoricalPriceChart_Label, { x: tx, y: ty + 25, size: 24, color: GOLD, anchor: side === 1 ? "start" : "end", numeral: true, children: [
            m.date.slice(5),
            " \xB7 ",
            number(m.value)
          ] })
        ] }, `${m.date}-${m.field}-${i}`);
      }),
      d.contextNote && /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: left, y: 590, size: 20, color: "#E3ECE7", children: d.contextNote }),
      sources.map((s, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart_Label, { x: left, y: 625 + i * 25, size: 20, color: "#F0F5F1", children: s }, i))
    ] })
  ] });
};

;// ./src/stock/SceneOverlays.tsx










const SceneOverlays_clamp = (v) => Math.min(1, Math.max(0, v));
const mix = (f, a, b, x, y) => (0,esm.interpolate)(f, [a, Math.max(a + 1, b)], [x, y], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: esm.Easing.bezier(0.22, 0.72, 0.16, 1) });
const tone = (s) => ({ "#FFD65C": "#FFD86A", "#FF6767": "#FF806C", "#7DE6BD": "#73EAC5" })[s ?? ""] ?? s ?? "#FFFFFF";
const Word = ({ word: w, frame: f }) => {
  if (f < w.from || f >= w.to) return null;
  const p = mix(f, w.from, w.from + 18, 0, 1), alpha = Math.min(1, mix(f, w.to - 6, w.to, 1, 0));
  const size = w.size ?? 44, number = /^[\d\s%>+−—？?.]+$/.test(w.text), color = tone(w.color);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { position: "absolute", left: w.x, top: w.y, fontFamily: number ? "StockNumeral" : "StockLabel", fontSize: size, fontWeight: number ? 600 : 700, color, lineHeight: 1.2, whiteSpace: "pre", opacity: alpha, letterSpacing: number ? "-.025em" : ".015em", fontVariantNumeric: "tabular-nums", filter: "drop-shadow(0 3px 4px #080f18)", WebkitTextStroke: ".65px #101720", paintOrder: "stroke fill" }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { overflow: "hidden", paddingBottom: 3, paddingRight: 5 }, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { transform: `translateY(${(1 - p) * 105}%)`, filter: `blur(${(1 - p) * 3}px)` }, children: w.text.split(/([\d,.%>+−—]+)/g).map((part, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("span", { style: { fontFamily: /[\d]/.test(part) ? "StockNumeral" : void 0 }, children: part }, i)) }) }),
    w.underline && /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { height: 2, background: `linear-gradient(90deg,${color},${color}44)`, marginTop: 8, transform: `scaleX(${mix(f, w.from + 12, w.from + 36, 0, 1)})`, transformOrigin: "left" } })
  ] });
};
const Evidence = ({ data: e, frame: f }) => {
  if (f < e.from || f >= e.to) return null;
  const local = f - e.from, p = mix(local, e.zoomStart ?? 24, e.zoomEnd ?? 90, 0, 1), scale = (e.zoomFrom ?? 1) + ((e.zoomTo ?? 1.6) - (e.zoomFrom ?? 1)) * p;
  const a = Math.min(mix(local, 0, 12, 0, 1), mix(f, e.to - 8, e.to, 1, 0)), arrive = mix(local, 0, 25, 0, 1), mark = mix(local, e.markerFrom ?? 50, (e.markerFrom ?? 50) + 22, 0, 1);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { position: "absolute", inset: 0, background: "#eeece5", opacity: a, overflow: "hidden", perspective: 1600 }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { viewBox: `0 0 ${e.width} ${e.height}`, width: "100%", height: "100%", style: { transform: `translateY(${(1 - arrive) * 30}px) rotateX(${(1 - arrive) * 12}deg) scale(${scale})`, transformOrigin: `${e.originX ?? 80}% ${e.originY ?? 50}%` }, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("image", { href: (0,esm.staticFile)(e.src), x: 0, y: 0, width: e.width, height: e.height }),
      e.marker && /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: e.marker[0], y: e.marker[1], width: e.marker[2], height: e.marker[3], rx: 3, fill: "#DAB66B", fillOpacity: 0.13 * mark }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: e.marker[0], y: e.marker[1], width: e.marker[2], height: e.marker[3], rx: 3, fill: "none", stroke: "#B65742", strokeWidth: 2.1, pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - mark, opacity: mark })
      ] })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", left: 18, bottom: 12, fontFamily: "StockLabel", fontSize: 18, color: "#282b29", textShadow: "0 1px 2px white,0 0 3px white" }, children: e.source })
  ] });
};
const EvidenceBackdrop = ({ data: e }) => {
  const f = (0,esm.useCurrentFrame)();
  if (f < e.from || f >= e.to) return null;
  const local = f - e.from, p = mix(local, e.zoomStart ?? 24, e.zoomEnd ?? 90, 0, 1), scale = (e.zoomFrom ?? 1) + ((e.zoomTo ?? 1.6) - (e.zoomFrom ?? 1)) * p;
  const a = Math.min(mix(local, 0, 12, 0, 1), mix(f, e.to - 8, e.to, 1, 0));
  return /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Img, { src: (0,esm.staticFile)(e.src), style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(40px)", opacity: a, transform: `scale(${scale * 1.08})`, transformOrigin: `${e.originX ?? 80}% ${e.originY ?? 50}%` } });
};
const SceneOverlays = ({ scene }) => {
  const f = (0,esm.useCurrentFrame)(), ev = scene.evidenceFocus, evidence = ev && f >= ev.from && f < ev.to;
  const active = !!(scene.economicSeries && f >= scene.economicSeries.from && f < scene.economicSeries.to) || (scene.narrativeGraphics ?? []).some((e) => f >= e.from && f < e.to) || (scene.semanticMotion ?? []).some((e) => f >= e.from && f < e.to) || (scene.motionEvents ?? []).some((e) => f >= e.from && f < e.to) || (scene.visualWords ?? []).some((w) => f >= w.from && f < w.to) || !!(scene.editorial && f >= scene.editorial.from && f < scene.editorial.to) || !!(scene.priceHistory && f >= scene.priceHistory.from && f < scene.priceHistory.to);
  const shot = [...scene.shots].reverse().find((s) => s.from <= f), cam = shot ? cameraStyle(shot, f - shot.from) : {};
  const ed = scene.editorial;
  const aspect = (shot == null ? void 0 : shot.aspectRatio) ?? 16 / 9, iw = Math.min(984, 676 * aspect), ih = iw / aspect;
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { position: "absolute", left: 48, top: 724, width: 984, height: 676, overflow: "hidden" }, children: [
    active && !evidence && /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", inset: 0, ...cam }, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", left: (984 - iw) / 2, top: (676 - ih) / 2, width: iw, height: ih, background: `radial-gradient(ellipse at 50% 46%,rgba(14,13,11,${scene.overlayStrength ?? 0.3}) 0%,rgba(14,13,11,${(scene.overlayStrength ?? 0.3) * 0.9}) 65%,rgba(14,13,11,${(scene.overlayStrength ?? 0.3) * 0.65}) 100%)`, opacity: SceneOverlays_clamp(f / 12) } }) }),
    ev && /* @__PURE__ */ (0,jsx_runtime.jsx)(Evidence, { data: ev, frame: f }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { position: "absolute", inset: 0, ...cam }, children: [
      ed && f >= ed.from && f < ed.to && /* @__PURE__ */ (0,jsx_runtime.jsx)(EditorialGraphics, { kind: ed.kind, frame: f - ed.from, frames: ed.to - ed.from, cues: ed.cues }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(MotionGraphics, { events: scene.motionEvents ?? [] }),
      (scene.visualWords ?? []).map((w, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(Word, { word: w, frame: f }, i))
    ] }),
    (scene.semanticMotion ?? []).filter((e) => f >= e.from && f < e.to).map((e, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(SemanticMotion, { kind: e.kind, frame: f - e.from, frames: e.to - e.from, cues: e.cues }, i)),
    (scene.narrativeGraphics ?? []).filter((e) => f >= e.from && f < e.to).map((e, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(NarrativeGraphics, { event: e, frame: f }, i)),
    scene.economicSeries && /* @__PURE__ */ (0,jsx_runtime.jsx)(EconomicSeriesChart, { data: scene.economicSeries, frame: f }),
    scene.priceHistory && /* @__PURE__ */ (0,jsx_runtime.jsx)(HistoricalPriceChart, { data: scene.priceHistory, frame: f }),
    scene.sourceNote && !evidence && /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", left: 20, bottom: 12, fontFamily: "StockLabel", fontSize: 17, color: "#f0eee7", textShadow: "0 2px 4px #000,0 0 3px #000" }, children: scene.sourceNote })
  ] });
};

;// ./src/stock/StockVideo.tsx





const media = { position: "absolute", left: 48, top: 724, width: 984, height: 676, overflow: "hidden" };
const Footage = ({ shot }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)(esm.AbsoluteFill, { children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)(ShotMedia, { shot, style: { width: "100%", height: "100%", objectFit: "cover", filter: "blur(40px)", transform: "scale(1.08)" } }),
  /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: media, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(ShotMedia, { shot, style: { position: "absolute", width: "100%", height: "100%", objectFit: "contain" } }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", right: 16, bottom: 12, fontFamily: "StockSubtitle", fontSize: 20, color: "white", background: "#00000088", padding: "6px 10px" }, children: shot.sourceLabel })
  ] })
] });
const Explain = ({ data }) => {
  const frame = (0,esm.useCurrentFrame)();
  const start = data.from ?? 0;
  if (frame < start) return null;
  const progress = (0,esm.interpolate)(frame - start, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { position: "absolute", left: 72, top: data.top ?? 1110, width: 900, boxSizing: "border-box", padding: "14px 20px", borderRadius: 10, background: "#000000cc", fontFamily: "StockTitle", color: "white", opacity: progress, transform: `translateY(${(1 - progress) * 10}px)` }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { fontSize: 23, marginBottom: 8, color: "#eee" }, children: data.heading }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 16, alignItems: "center" }, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
        data.lines.map((line, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { fontSize: data.image ? 29 : 34, lineHeight: 1.35, color: i === 0 ? "#FFD600" : "white", whiteSpace: "pre-wrap" }, children: line }, i)),
        data.kind === "bars" && data.bars && /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { marginTop: 8 }, children: data.bars.map((bar, i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 12, margin: "7px 0", fontSize: 23 }, children: [
          /* @__PURE__ */ (0,jsx_runtime.jsx)("span", { style: { width: 45 }, children: bar.label }),
          /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { width: bar.value / Math.max(...data.bars.map((b) => b.value)) * 530 * progress, height: 21, background: i ? "#FFD600" : "#ccc" } }),
          /* @__PURE__ */ (0,jsx_runtime.jsxs)("span", { children: [
            bar.value,
            bar.unit
          ] })
        ] }, i)) })
      ] }),
      data.image && /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Img, { src: (0,esm.staticFile)(data.image), style: { width: data.kind === "evidence" ? 520 : 470, maxHeight: 360, objectFit: "contain", background: "white" } })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { fontFamily: "StockSubtitle", fontSize: 20, marginTop: 9, color: "#ddd" }, children: data.source })
  ] });
};
const Scene = ({ scene, composite }) => {
  const frame = (0,esm.useCurrentFrame)();
  const caption = scene.captions.find((c) => frame >= c.from && frame < c.to);
  const call = scene.callouts.find((c) => frame >= c.from && frame < c.to);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(esm.AbsoluteFill, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Audio, { src: (0,esm.staticFile)(scene.audio) }),
    !composite && scene.shots.map((shot, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Sequence, { from: shot.from, durationInFrames: shot.frames, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Footage, { shot }) }, i)),
    composite && scene.evidenceFocus && /* @__PURE__ */ (0,jsx_runtime.jsx)(EvidenceBackdrop, { data: scene.evidenceFocus }),
    composite && /* @__PURE__ */ (0,jsx_runtime.jsx)(SceneOverlays, { scene }),
    scene.explanation && /* @__PURE__ */ (0,jsx_runtime.jsx)(Explain, { data: scene.explanation }),
    call && /* @__PURE__ */ (0,jsx_runtime.jsxs)("div", { style: { position: "absolute", top: 808, left: 72, maxWidth: 560, background: "#000000b8", borderLeft: "5px solid #FFD600", borderRadius: 8, color: "white", padding: "12px 18px", lineHeight: 1.25, fontFamily: "StockTitle" }, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { fontSize: 24 }, children: call.heading }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { fontSize: 40, color: "#FFD600", whiteSpace: "pre-wrap", marginTop: 5 }, children: call.value }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { fontSize: 22, marginTop: 6 }, children: call.source_label })
    ] }),
    caption && /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: 410, left: 64, width: 952, textAlign: "center", fontFamily: "StockSubtitle", fontSize: 46, lineHeight: 1.18, color: "white", whiteSpace: "nowrap", textShadow: "0 3px 7px #000, 0 0 3px #000", WebkitTextStroke: "1px #000" }, children: caption.segments.map((s, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("span", { style: { color: s.highlight ? "#FFD600" : "white" }, children: s.text }, i)) })
  ] });
};
const StockVideo = (props) => {
  const tracks = props.scenes.flatMap((scene) => scene.shots.map((shot) => ({ ...shot, absoluteFrom: scene.from + shot.from })));
  const legacyHighlights = props.titleHighlightKeywords === void 0;
  const keywords = (props.titleHighlightKeywords ?? ["31%", "5200"]).filter(Boolean).sort((a, b) => b.length - a.length);
  const titlePattern = keywords.length ? new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g") : null;
  const titleColor = (part) => {
    var _a;
    return ((_a = props.titleHighlightColors) == null ? void 0 : _a[part]) ?? (legacyHighlights ? part === "31%" ? "#FF4545" : part === "5200" ? "#FFD600" : "white" : keywords.includes(part) ? "#FFD600" : "white");
  };
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(esm.AbsoluteFill, { style: { background: "#000000" }, children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)("style", { children: `@font-face{font-family:StockSubtitle;src:url('${(0,esm.staticFile)("fonts/SmileySans-Oblique.ttf")}')}@font-face{font-family:StockTitle;src:url('${(0,esm.staticFile)("fonts/SourceHanSansSC-Heavy.otf")}');font-weight:900}` }),
    props.compositeMode && /* @__PURE__ */ (0,jsx_runtime.jsx)("style", { children: `@font-face{font-family:StockLabel;src:url('${(0,esm.staticFile)("fonts/SourceHanSansSC-Bold.otf")}');font-weight:700}@font-face{font-family:StockNumeral;src:url('${(0,esm.staticFile)("fonts/BarlowSemiCondensed-SemiBold.ttf")}');font-weight:600}` }),
    props.compositeMode && tracks.map((shot, i) => {
      var _a;
      return /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Sequence, { from: shot.absoluteFrom, durationInFrames: Math.min(shot.frames + (((_a = tracks[i + 1]) == null ? void 0 : _a.transitionFrames) ?? 0), props.totalFrames - shot.absoluteFrom), children: /* @__PURE__ */ (0,jsx_runtime.jsx)(CompositeFootage, { shot }) }, i);
    }),
    props.scenes.map((scene) => /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Sequence, { from: scene.from, durationInFrames: scene.frames, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Scene, { scene, composite: props.compositeMode }) }, scene.id)),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Audio, { src: (0,esm.staticFile)(props.bgm), volume: props.bgmVolume, loop: true }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Img, { src: (0,esm.staticFile)(props.logo), style: { position: "absolute", width: 130, top: 118, right: 76, filter: "drop-shadow(0 1px 2px #000) drop-shadow(0 0 1px #000)" } }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: 1220, left: 48, width: 984, textAlign: "center", fontFamily: "StockTitle", fontWeight: 900, fontSize: 70, lineHeight: 1.2, color: "white", WebkitTextStroke: "2px black", paintOrder: "stroke fill", textShadow: "0 5px 8px #000" }, children: props.titleLines.map((line, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { children: (titlePattern ? line.split(titlePattern) : [line]).map((part, j) => /* @__PURE__ */ (0,jsx_runtime.jsx)("span", { style: { color: titleColor(part) }, children: part }, j)) }, i)) })
  ] });
};

;// ../../../../02_内容生产/视频/金价跌破4000美元后神准分析师最新预判3950美元可能是最后一跌/制作_20261027_NO5/renderer/src/Episode5.tsx





const Episode5_C = { blue: "#1B4565", ink: "#123149", white: "#FAF8EE", gold: "#E6C17B", red: "#FF967F", mint: "#AEDECE" };
const cap = (n) => Math.max(0, Math.min(1, n));
const q = (f, a, b) => 1 - Math.pow(1 - cap((f - a) / Math.max(1, b - a)), 3);
const lerp = (a, b, p) => a + (b - a) * p;
const Episode5_Text = ({ x, y, size = 32, color = Episode5_C.white, anchor = "start", children, opacity = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, fontSize: size, fill: color, textAnchor: anchor, opacity, fontFamily: "StockLabel", fontWeight: "700", style: { paintOrder: "stroke fill", stroke: "#09233B90", strokeWidth: 1.5, filter: "drop-shadow(0px 2px 2px #081B2B88)" }, children });
const Num = ({ x, y, size = 100, color = Episode5_C.gold, children, anchor = "middle" }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x, y, fontSize: size, fill: color, textAnchor: anchor, fontFamily: "StockNumeral", fontWeight: "600", style: { paintOrder: "stroke fill", stroke: "#09233B77", strokeWidth: 1.2, filter: "drop-shadow(0px 2px 2px #081B2B88)" }, children });
const Line = ({ x1, y1, x2, y2, color = Episode5_C.white, opacity = 0.65, width = 2, dash }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("line", { x1, y1, x2, y2, stroke: color, opacity, strokeWidth: width, strokeDasharray: dash });
const Head = ({ title, kicker = "\u9EC4\u91D1\u89C2\u5BDF \xB7 NO.5" }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 42, y1: 63, x2: 76, y2: 63, color: Episode5_C.gold }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 90, y: 70, size: 23, color: Episode5_C.gold, children: kicker }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 42, y: 128, size: 43, children: title })
] });
const Foot = ({ children }) => /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 42, y: 621, size: 20, children });
const Episode5_Gold = ({ x, y, s = 1, opacity = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) scale(${s})`, opacity, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-65 -25H42L65 21H-85Z", fill: Episode5_C.gold, fillOpacity: ".68", stroke: Episode5_C.white, strokeWidth: "2" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-85 21V42H65V21M42 -25V-4L65 42M-65 -25V-4L-85 42", fill: Episode5_C.blue, fillOpacity: ".55", stroke: Episode5_C.white, strokeWidth: "1.5" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { x: "-11", y: "10", textAnchor: "middle", fontFamily: "Georgia", fontSize: "21", fill: Episode5_C.ink, children: "GOLD" })
] });
const Cash = ({ x, y, opacity = 1, s = 1 }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) scale(${s})`, opacity, children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: "-31", y: "-17", width: "62", height: "34", rx: "1", fill: Episode5_C.blue, fillOpacity: ".75", stroke: Episode5_C.mint, strokeWidth: "2" }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: "-25", y: "-11", width: "50", height: "22", fill: "none", stroke: Episode5_C.mint }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("text", { y: "8", textAnchor: "middle", fill: Episode5_C.mint, fontSize: "24", fontFamily: "Georgia", children: "$" })
] });
const Portrait = ({ x = 575, y = 137, w = 345, h = 440 }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("image", { href: (0,esm.staticFile)("evidence/ag-thorson-cutout.png"), x, y, width: w, height: h, preserveAspectRatio: "xMidYMax meet" });
const Arrow = ({ x, y, down = true, p = 1, color = Episode5_C.gold }) => /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: p, transform: `translate(${x} ${y}) ${down ? "" : "rotate(180)"}`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M0 0V${70 * p}M-10 ${60 * p}L0 ${70 * p}L10 ${60 * p}`, fill: "none", stroke: color, strokeWidth: "3" }) });
function Author({ f, u }) {
  const gauge = f > 155;
  const p = q(f, 155, 205);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: gauge ? "GCI\u8FDB\u5165\u4E0B\u56DB\u5206\u4F4D" : "10\u670825\u65E5 \xB7 \u6700\u65B0\u5224\u65AD", kicker: "GoldPredict \xB7 \u5206\u6790\u5E08\u89C2\u70B9" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Portrait, {}),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 205, size: 45, children: "AG Thorson" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 250, size: 31, children: "\u6258\u5C14\u68EE \xB7 CMT" }),
    gauge ? /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: "translate(255 401)", children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: "104", fill: Episode5_C.blue, fillOpacity: ".42", stroke: Episode5_C.white, strokeOpacity: ".55", strokeWidth: "2" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { r: "104", fill: "none", stroke: Episode5_C.gold, strokeWidth: "17", strokeDasharray: `${654 * 0.25 * p} 654`, transform: "rotate(-90)" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 0, y: 26, size: 104, children: "25" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 0, y: 75, size: 24, anchor: "middle", children: "\u6DF1\u5EA6\u8D85\u5356\u533A" })
      ] }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 562, size: 25, children: "\u4F5C\u8005\u81EA\u6709\u9EC4\u91D1\u5468\u671F\u6307\u6807" })
    ] }) : /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 348, size: 36, color: Episode5_C.gold, children: "Weekend" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 398, size: 36, color: Episode5_C.gold, children: "Gold Update" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 52, y1: 435, x2: 465 * q(f, 14, 70) + 52, y2: 435, color: Episode5_C.gold }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 489, size: 28, children: "3950\u9644\u8FD1 \xB7 \u6700\u540E\u4E00\u6B21\u6D17\u76D8\uFF1F" })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u6765\u6E90\uFF1AAG Thorson \xB7 2026.10.25\uFF5C\u4EBA\u7269\u539F\u7167\uFF1AGoldPredict" })
  ] });
}
function Washout({ f, u }) {
  const p = q(f, 18, 105), p2 = q(f, 108, 173);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "\u8DCC\u78343950\uFF0C\u6050\u614C\u4F1A\u88AB\u89E6\u53D1\uFF1F", kicker: "\u6258\u5C14\u68EE\u9884\u6D4B \xB7 \u6761\u4EF6\u673A\u5236\u793A\u610F" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 170, y: 223, anchor: "middle", size: 29, children: "\u9EC4\u91D1\u6301\u4ED3" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 775, y: 223, anchor: "middle", size: 29, children: "\u73B0\u91D1\u56DE\u6D41" }),
    [0, 1, 2].map((i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)(react.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Gold, { x: lerp(170 + i * 30, 475, p), y: lerp(300 + i * 42, 410 + i * 15, p), s: 0.65, opacity: 1 - p2 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Cash, { x: lerp(500, 730 + i * 34, p2), y: lerp(340, 314 + i * 45, p2), opacity: p2 })
    ] }, i)),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 58, y1: 485, x2: 922, y2: 485, color: Episode5_C.gold, width: 3 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 492, y: 554, size: 68, children: "3950 \u7F8E\u5143/\u76CE\u53F8" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { opacity: q(f, 105, 145), children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 492, y: 293, size: 34, anchor: "middle", color: Episode5_C.red, children: "\u6700\u540E\u4E00\u8F6E\u629B\u552E\uFF1F" }) }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u201C\u6700\u7EC8\u6D17\u76D8\u201D\u5C5E\u4E8E\u5206\u6790\u5E08\u5224\u65AD\uFF0C\u662F\u5426\u7B51\u5E95\u4ECD\u5F85\u89C2\u5BDF" })
  ] });
}
function Calendar({ f, u, interaction = false }) {
  const p = q(f, 10, 70), p2 = q(f, 85, 150);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: interaction ? "\u672A\u6765\u4E00\u5230\u4E24\u5468\uFF0C\u76EF\u4F4F3950" : "\u7B51\u5E95\u7A97\u53E3 \xB7 \u73B0\u5728\u81F311\u6708\u4E0A\u65EC", kicker: "\u6258\u5C14\u68EE \xB7 \u9884\u6D4B\u7A97\u53E3" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 85, y1: 380, x2: 900, y2: 380, width: 3 }),
    [["10\u6708\u5E95", 100], ["11\u6708\u7B2C1\u5468", 490], ["\u7B2C2\u5468", 870]].map(([label, x], i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: Number(x), cy: 380, r: 10, fill: Episode5_C.gold }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: Number(x), y: 440, size: 29, anchor: i === 0 ? "start" : i === 2 ? "end" : "middle", children: label })
    ] }, i)),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 100, y: 330, width: 770 * p, height: 100, fill: Episode5_C.blue, fillOpacity: ".34", stroke: Episode5_C.gold, strokeWidth: "1.5" }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: p2, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 492, y: 285, size: 50, anchor: "middle", color: Episode5_C.gold, children: interaction ? "\u4F1A\u662F\u6700\u540E\u4E00\u8DCC\u5417\uFF1F" : "3950\u9644\u8FD1\u662F\u89C2\u5BDF\u533A" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 492, y: 533, size: 31, anchor: "middle", children: interaction ? "\u8BC4\u8BBA\u533A\u6253\u51FA\u4F60\u7684\u5224\u65AD" : "\u7A97\u53E3\u662F\u9884\u6D4B\uFF0C\u4E0D\u662F\u5230\u65F6\u5FC5\u6DA8" })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u6765\u6E90\uFF1AWeekend Gold Update \xB7 2026.10.25" })
  ] });
}
function Earlier({ f, u, title = false }) {
  const p = q(f, 10, 65);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: title ? "10\u670815\u65E5\uFF0C\u5DF2\u7ECF\u63D0\u524D\u7ED9\u51FA\u76EE\u6807" : "\u5F53\u65F6\u7684\u56DE\u8C03\u76EE\u6807\uFF1A3950\u9644\u8FD1", kicker: "\u5386\u53F2\u9884\u5224 \xB7 \u5317\u4EAC\u65F6\u95F42026.10.15" }),
    title ? /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 48, y: 236, size: 38, children: "The Final Washout" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 48, y: 291, size: 38, children: "into an October Bottom" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 48, y1: 329, x2: 48 + 858 * p, y2: 329, color: Episode5_C.gold }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 48, y: 407, size: 42, color: Episode5_C.gold, children: "10\u6708\u7B51\u5E95\u524D\u7684\u6700\u540E\u4E00\u6B21\u6D17\u76D8" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 48, y: 502, size: 30, children: "\u5F7C\u65F6\u91D1\u4EF7\u5C1A\u672A\u8DCC\u78344000\u7F8E\u5143" })
    ] }) : /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("svg", { x: "490", y: "166", width: "440", height: "385", viewBox: "0 0 937 833", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("image", { href: (0,esm.staticFile)("evidence/thorson-1-chart-3.png"), width: "937", height: "833" }) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 240, y: 336, size: 126, children: "3950" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 240, y: 387, size: 29, anchor: "middle", children: "\u7F8E\u5143/\u76CE\u53F8 \xB7 \u5F53\u65F6\u9884\u6D4B" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 48, y: 471, size: 28, children: "\u5141\u8BB8\u77ED\u6682\u8DCC\u7A7F" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 48, y: 516, size: 28, children: "\u7B49\u5F8510\u6708\u5E95\u9644\u8FD1\u7B51\u5E95" })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u6765\u6E90\uFF1AAG Thorson \xB7 \u539F\u62A5\u544AUTC 10.14 18:31\uFF1D\u5317\u4EAC\u65F6\u95F410.15" })
  ] });
}
function Distance({ f, u }) {
  const p = q(f, 12, 96);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "\u5B9E\u9645\u4F4E\u70B9\uFF0C\u8DDD\u79BB\u9884\u6D4B\u53EA\u5DEE25\u7F8E\u5143", kicker: "\u5B9E\u9645\u884C\u60C5 vs. \u9884\u6D4B\u76EE\u6807" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 90, y1: 375, x2: 900, y2: 375, width: 3 }),
    [[3950, 240, "\u9884\u6D4B\u89C2\u5BDF\u4F4D", Episode5_C.gold], [3975, 730, "\u5B9E\u9645\u76D8\u4E2D\u4F4E\u70B9", Episode5_C.white]].map(([v, x, label, color], i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: i ? p : 1, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: x, y1: 348, x2: x, y2: 402, color }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x, y: 320, size: 96, color, children: v }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x, y: 449, size: 27, anchor: "middle", children: label })
    ] }, i)),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: q(f, 100, 145), children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M240 478V496H730V478", fill: "none", stroke: Episode5_C.gold, strokeWidth: "2" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 490, y: 552, size: 43, color: Episode5_C.gold, anchor: "middle", children: "25\u7F8E\u5143 \u2248 0.6%" })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "Kitco \xB7 10\u670823\u65E5\u4F4E\u70B9\u7EA63975\uFF5C3950\u4E3A\u6258\u5C14\u68EE\u9884\u6D4B\uFF0C\u5C1A\u672A\u5230\u8FBE" })
  ] });
}
function Support({ f, u, deep = false }) {
  const p = q(f, 10, 95);
  const y = (v) => 190 + (4e3 - v) / 130 * 343;
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: deep ? "\u5931\u5B88\u4E4B\u540E\uFF0C\u518D\u770B\u66F4\u6DF1\u4E00\u6863" : "3950\uFF0C\u843D\u5728\u6280\u672F\u652F\u6491\u5E26\u4E4B\u5185", kicker: "Kitco \xB7 2026.10.26 \u6280\u672F\u5206\u6790" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 168, y1: 174, x2: 168, y2: 557 }),
    [4e3, 3963, 3950, 3946, 3890].map((v) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 158, y1: y(v), x2: 180, y2: y(v) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 144, y: y(v) + 9, size: 26, anchor: "end", children: v })
    ] }, v)),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 185, y: y(3963), width: 600 * p, height: y(3946) - y(3963), fill: Episode5_C.gold, fillOpacity: ".38", stroke: Episode5_C.gold }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 185, y1: y(3950), x2: 880, y2: y(3950), color: Episode5_C.gold, width: 3 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 845, y: 257, size: 35, anchor: "end", color: Episode5_C.gold, children: "3963\u20143946 \u652F\u6491\u5E26" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 730, y: 438, size: 91, children: "3950" }),
    deep && /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: q(f, 30, 100), children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 185, y1: y(3890), x2: 800, y2: y(3890), color: Episode5_C.red, dash: "8 8" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 797, y: y(3890) - 13, size: 27, color: Episode5_C.red, anchor: "end", children: "3890 \xB7 \u66F4\u6DF1\u652F\u6491" })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u5355\u4F4D\uFF1A\u7F8E\u5143/\u76CE\u53F8\uFF5C\u6280\u672F\u4F4D\u4E0D\u4EE3\u8868\u5FC5\u7136\u6B62\u8DCC" })
  ] });
}
function Stress({ f, u }) {
  const p = q(f, 15, 90), sell = q(f, 100, 180);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "3500\uFF1A\u9700\u8981\u4E25\u91CD\u80A1\u5E02\u4E0B\u8DCC\u8FD9\u4E00\u524D\u63D0", kicker: "\u6781\u7AEF\u60C5\u666F \xB7 \u4E0D\u662F\u6258\u5C14\u68EE\u4E3B\u5224\u65AD" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { transform: "translate(150 408)", children: [0, 1, 2].map((i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: i * 53, y: -lerp(140 + i * 35, 50 + i * 12, p), width: "34", height: lerp(140 + i * 35, 50 + i * 12, p), fill: Episode5_C.blue, fillOpacity: ".7", stroke: Episode5_C.red, strokeWidth: "2" }, i)) }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 217, y: 465, anchor: "middle", size: 29, children: "\u6743\u76CA\u8D44\u4EA7\u7F29\u6C34" }),
    [0, 1, 2, 3].map((i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(Cash, { x: lerp(340, 600 + i % 2 * 65, sell), y: lerp(330, 310 + Math.floor(i / 2) * 57, sell), opacity: sell, s: 0.8 }, i)),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Gold, { x: lerp(808, 573, sell), y: 446, s: 0.9 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 808, y: 281, size: 29, anchor: "middle", children: "\u9EC4\u91D1\u4E5F\u88AB\u53D8\u73B0" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 790, y: 540, size: 76, color: Episode5_C.red, children: "3500\uFF1F" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u6761\u4EF6\uFF1A\u4E2D\u671F\u9009\u4E3E\u540E\u7F8E\u80A1\u4E25\u91CD\u4E0B\u8DCC\uFF5C\u6765\u6E90\uFF1AAG Thorson 10.25" })
  ] });
}
function Maincase({ f, u }) {
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "\u4E3B\u5224\u65AD\uFF1A10\u6708\u5E95\u81F311\u6708\u4E0A\u65EC\u7B51\u5E95", kicker: "\u56DE\u5230\u5206\u6790\u5E08\u7684\u4E3B\u8981\u60C5\u666F" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Portrait, { x: 598, y: 163, w: 330, h: 409 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 278, size: 44, color: Episode5_C.gold, children: "10\u6708\u5E95" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 58, y1: 328, x2: 470 * q(f, 8, 75) + 58, y2: 328, color: Episode5_C.gold, width: 3 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 403, size: 44, children: "11\u6708\u4E0A\u65EC" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 500, size: 29, children: "\u6301\u7EED\u89C2\u5BDF\uFF0C\u7B49\u5F85\u9A8C\u8BC1" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u6765\u6E90\uFF1AAG Thorson \xB7 2026.10.25\uFF5C\u5206\u6790\u5E08\u5224\u65AD" })
  ] });
}
function Silver({ f, u }) {
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "\u767D\u94F6\uFF1A55\u4E0B\u65B9\uFF0C\u4E0B\u4E00\u7AD9\u770B50\u652F\u6491\uFF1F", kicker: "\u6258\u5C14\u68EE \xB7 \u767D\u94F6\u6280\u672F\u5224\u65AD" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("svg", { x: "42", y: "155", width: "483", height: "411", viewBox: "0 0 1340 1192", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("image", { href: (0,esm.staticFile)("evidence/thorson-0-chart-4.png"), width: "1340", height: "1192" }) }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 742, y: 273, size: 108, children: "55" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 742, y: 317, size: 25, anchor: "middle", children: "\u5DF2\u8DCC\u7834\u7684\u6574\u6570\u4F4D" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Arrow, { x: 742, y: 343, p: q(f, 18, 93) }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 742, y: 504, size: 108, color: Episode5_C.mint, children: "50" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 742, y: 545, size: 25, anchor: "middle", children: "\u8D8B\u52BF\u7EBF\u652F\u6491 \xB7 \u9884\u6D4B" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u5355\u4F4D\uFF1A\u7F8E\u5143/\u76CE\u53F8\uFF5C\u539F\u56FE\uFF1AStockCharts / AG Thorson \xB7 10.25" })
  ] });
}
function YieldChart({ f, u }) {
  const p = q(f, 15, u.frames - 45);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "10\u5E74\u671F\u7F8E\u503A\uFF1A\u5468\u6536\u76D8\u5DF2\u57285%\u4E0B\u65B9", kicker: "\u771F\u5B9ETNX\u5468\u7EBF \xB7 \u622A\u81F32026.10.23" }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { x: "42", y: "173", width: "602", height: "393", viewBox: "0 250 1340 730", children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0,jsx_runtime.jsx)("clipPath", { id: "yield-reveal", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: "0", y: "250", width: 1340 * p, height: "730" }) }) }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("image", { href: (0,esm.staticFile)("evidence/thorson-0-chart-1.png"), width: "1340", height: "1192", opacity: ".19" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { clipPath: "url(#yield-reveal)", children: /* @__PURE__ */ (0,jsx_runtime.jsx)("image", { href: (0,esm.staticFile)("evidence/thorson-0-chart-1.png"), width: "1340", height: "1192" }) })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: q(f, u.frames * 0.55, u.frames * 0.7), children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 800, y: 325, size: 83, children: "4.988%" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 694, y1: 354, x2: 914, y2: 354, color: Episode5_C.gold }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 800, y: 410, size: 30, anchor: "middle", children: "\u4F4E\u4E8E5%\u5173\u53E3" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 800, y: 474, size: 25, anchor: "middle", children: "10\u6708\u9636\u6BB5\u9AD8\u70B9\uFF1F" })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "StockCharts / Thorson\uFF5CTNX\u8BFB\u657049.88\uFF1D4.988%\uFF1B\u9AD8\u70B9\u4ECD\u5C5E\u5224\u65AD" })
  ] });
}
function Probability({ f, u }) {
  const p = q(f, 15, 145), n = Math.round(lerp(70, 9, p));
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "\u672C\u6B21\u52A0\u606F\u6982\u7387\uFF0C\u4ECE\u7EA670%\u964D\u81F3\u4E0D\u8DB310%", kicker: "\u4E16\u754C\u9EC4\u91D1\u534F\u4F1A \xB7 2026.10.26" }),
    Array.from({ length: 100 }, (_, i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 46 + i % 20 * 28, y: 213 + Math.floor(i / 20) * 47, width: "19", height: "31", rx: "1", fill: i < n ? Episode5_C.gold : Episode5_C.blue, fillOpacity: i < n ? 0.86 : 0.3, stroke: Episode5_C.white, strokeOpacity: i < n ? 0.8 : 0.25, strokeWidth: "1" }, i)),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)(Num, { x: 787, y: 333, size: 107, children: [
      p > 0.98 ? "<10" : n,
      "%"
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 787, y: 385, anchor: "middle", size: 29, children: "\u672C\u5468FOMC\u52A0\u606F\u6982\u7387" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 48, y: 529, size: 30, color: Episode5_C.gold, children: "\u4E00\u4E2A\u6708\u524D\u7EA670% \u2192 \u672C\u5468\u4E0D\u8DB310%" }),
    f > u.frames * 0.66 && /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 48, y: 577, size: 29, color: Episode5_C.red, children: "12\u6708\u52A0\u606F\u98CE\u9669\u4ECD\u5728" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "WGC Weekly Markets Monitor \xB7 \u6570\u636E\uFF1ACME\uFF5C100\u683C\u4E3A\u6BD4\u4F8B\u793A\u610F" })
  ] });
}
function Fed({ f, u }) {
  const p = q(f, 12, 65);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "\u63A5\u4E0B\u6765\uFF1A\u672C\u5468\u7F8E\u8054\u50A8\u51B3\u8BAE", kicker: "\u5F85\u53D1\u751F\u50AC\u5316 \xB7 2026.10.28 \u7F8E\u4E1C\u65F6\u95F4" }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: `translate(245 354) rotate(${lerp(-5, 0, p)})`, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-150 -146H150V145H-150Z", fill: Episode5_C.blue, fillOpacity: ".48", stroke: Episode5_C.white, strokeWidth: "2" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: -150, y1: -90, x2: 150, y2: -90 }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 0, y: -108, anchor: "middle", size: 29, children: "OCTOBER" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 0, y: 70, size: 160, children: "28" })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 511, y: 299, size: 42, color: Episode5_C.gold, children: "\u653F\u7B56\u58F0\u660E" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 511, y: 372, size: 42, children: "\u5229\u7387\u8DEF\u5F84" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 511, y: 461, size: 29, children: "\u5E02\u573A\u53CD\u5E94\u51B3\u5B9A\u4E0B\u4E00\u6B65" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u4F1A\u8BAE\u4FE1\u606F\uFF1AKitco / \u7F8E\u8054\u50A8\uFF5C\u8D44\u6599\u753B\u9762\u4E3A\u7F8E\u5143\u73B0\u949E" })
  ] });
}
function Inflation({ f, u }) {
  const p = q(f, 15, 95);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "PCE\uFF0C\u4F1A\u4E0D\u4F1A\u91CD\u65B0\u63A8\u5347\u52A0\u606F\u9884\u671F\uFF1F", kicker: "\u901A\u80C0 \u2192 \u5229\u7387\u9884\u671F \xB7 \u6761\u4EF6\u673A\u5236" }),
    /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { transform: "translate(255 411)", children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: "M-119 -170H119V109H-119Z", fill: Episode5_C.blue, fillOpacity: ".3", stroke: Episode5_C.white, strokeWidth: "2" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: "-110", y: 85 - 170 * p, width: "220", height: 24 + 170 * p, fill: Episode5_C.red, fillOpacity: ".45" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M-130 ${80 - 170 * p}H130`, stroke: Episode5_C.white, strokeWidth: "5" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 0, y: -202, anchor: "middle", size: 32, children: "\u901A\u80C0\u538B\u529B" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 0, y: 154, anchor: "middle", size: 28, children: "PCE\u6570\u636E\u516C\u5E03\u540E\u9A8C\u8BC1" })
    ] }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 388, y1: 410 - 170 * p, x2: 714, y2: 410 - 170 * p, color: Episode5_C.gold, width: 3 }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Arrow, { x: 746, y: 415 - 110 * p, down: false, p }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 746, y: 495, anchor: "middle", size: 36, color: Episode5_C.gold, children: "\u52A0\u606F\u9884\u671F" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u673A\u5236\u793A\u610F\uFF5C\u5B9E\u9645\u6570\u636E\u5C1A\u5F85\u516C\u5E03\uFF0C\u672A\u865A\u6784PCE\u8BFB\u6570" })
  ] });
}
function SequenceLogic({ f, u }) {
  const p = q(f, 10, 65), p2 = q(f, 65, 120), p3 = q(f, 120, 165);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: "\u6536\u76CA\u7387\u3001\u6D17\u76D8\u3001\u7B51\u5E95\uFF1A\u4ED6\u5728\u7B49\u8FD9\u6761\u94FE", kicker: "\u6258\u5C14\u68EE\u903B\u8F91 \xB7 \u6761\u4EF6\u673A\u5236" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 200, y: 231, anchor: "middle", size: 29, children: "\u9884\u671F\u5229\u606F\u5438\u5F15\u529B" }),
    [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ (0,jsx_runtime.jsx)(Cash, { x: 135 + i % 3 * 59, y: 302 + Math.floor(i / 3) * 55, s: 0.75, opacity: i < 2 ? 1 : 1 - p }, i)),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("g", { transform: `translate(510 ${lerp(307, 400, p2)})`, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Gold, { x: 0, y: 0, s: 1.35 }) }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("path", { d: `M397 471Q510 ${471 + 29 * (1 - p3)} 623 471`, fill: "none", stroke: Episode5_C.gold, strokeWidth: "4" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 706, y1: 469, x2: 892, y2: 469, color: Episode5_C.mint, width: 4 }),
    [0, 1, 2].map((i) => /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { x: 724 + i * 52, y: 425 - 40 * p3, width: "31", height: 44 + 40 * p3, fill: Episode5_C.blue, fillOpacity: ".4", stroke: Episode5_C.mint, strokeWidth: "2", opacity: p3 }, i)),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 200, y: 538, anchor: "middle", size: 30, children: "\u6536\u76CA\u7387\u5148\u89C1\u9876" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 510, y: 538, anchor: "middle", size: 30, children: "\u6700\u540E\u4E00\u8F6E\u6D17\u76D8" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 802, y: 538, anchor: "middle", size: 30, children: "\u7B51\u5E95\u7A97\u53E3" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: "\u4EC5\u4E3A\u5206\u6790\u5E08\u60C5\u666F\u903B\u8F91\uFF1B\u5229\u7387\u53D8\u5316\u4E0D\u4FDD\u8BC1\u9EC4\u91D1\u4E0A\u6DA8" })
  ] });
}
function Timeline({ f, u, latest = false }) {
  const p = q(f, 10, 120);
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Head, { title: latest ? "10\u670825\u65E5\uFF1A\u518D\u6B21\u5F3A\u8C033950\u9644\u8FD1" : "10\u670815\u65E5 \u2192 23\u65E5\uFF1A\u76F8\u96948\u5929", kicker: "\u5224\u65AD\u8BB0\u5F55 \xB7 \u6301\u7EED\u8FFD\u8E2A" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 86, y1: 367, x2: 897, y2: 367, color: Episode5_C.gold, width: 3 }),
    (latest ? ["10\u670825\u65E5", "\u672A\u67651\u20142\u5468"] : ["10\u670815\u65E5", "10\u670823\u65E5"]).map((v, i) => /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: i ? p : 1, children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("circle", { cx: 140 + i * 672, cy: 367, r: 12, fill: Episode5_C.gold }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 140 + i * 672, y: 304, anchor: "middle", size: 34, children: v }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Num, { x: 140 + i * 672, y: 482, size: 83, children: latest ? i ? "\u89C2\u5BDF" : "3950" : i ? "3975" : "3950" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 140 + i * 672, y: 528, anchor: "middle", size: 25, children: latest ? i ? "\u7B49\u5F85\u7ED3\u679C" : "\u6D17\u76D8\u5224\u65AD" : i ? "\u5B9E\u9645\u76D8\u4E2D\u4F4E\u70B9" : "\u63D0\u524D\u7ED9\u51FA\u76EE\u6807" })
    ] }, i)),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Foot, { children: latest ? "\u6765\u6E90\uFF1AWeekend Gold Update \xB7 \u9884\u6D4B\u6709\u4E0D\u786E\u5B9A\u6027" : "\u539F\u62A5\u544A10.15\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09\uFF1BKitco10.23\u4F4E\u70B9\uFF5C\u5355\u4F4D\uFF1A\u7F8E\u5143/\u76CE\u53F8" })
  ] });
}
const Close = ({ f, u }) => /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
  /* @__PURE__ */ (0,jsx_runtime.jsxs)("g", { opacity: q(f, 5, 28), children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 269, size: 58, children: "\u6301\u7EED\u8DDF\u8E2A\u9EC4\u91D1" }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Line, { x1: 52, y1: 310, x2: 52 + 810 * q(f, 10, 65), y2: 310, color: Episode5_C.gold }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 393, size: 43, color: Episode5_C.gold, children: f < 85 ? "\u5148\u77E5\u5148\u89C9\uFF0C\u5EFA\u7ACB\u81EA\u5DF1\u7684\u5224\u65AD" : "\u65B0\u53D8\u5316\uFF0C\u7B2C\u4E00\u65F6\u95F4\u66F4\u65B0" })
  ] }),
  /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 52, y: 530, size: 32, children: "\u79D2\u61C2\u91D1\u878D\u9EC4\u91D1\u89C2\u5BDF \xB7 NO.5" })
] });
function Overlay({ u }) {
  const f = (0,esm.useCurrentFrame)();
  let el = null;
  switch (u.kind) {
    case "question":
      el = /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 492, y: 295, size: 58, anchor: "middle", children: "\u8FD9\u8F6E\u9EC4\u91D1" }),
        /* @__PURE__ */ (0,jsx_runtime.jsx)(Episode5_Text, { x: 492, y: 392, size: 59, color: Episode5_C.gold, anchor: "middle", children: "\u8FD8\u8981\u8DCC\u591A\u4E45\uFF1F" })
      ] });
      break;
    case "author":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Author, { f, u });
      break;
    case "washout":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Washout, { f, u });
      break;
    case "window":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Calendar, { f, u });
      break;
    case "earlier_title":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Earlier, { f, u, title: true });
      break;
    case "earlier":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Earlier, { f, u });
      break;
    case "distance":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Distance, { f, u });
      break;
    case "support":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Support, { f, u });
      break;
    case "support_deep":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Support, { f, u, deep: true });
      break;
    case "stress":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Stress, { f, u });
      break;
    case "maincase":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Maincase, { f, u });
      break;
    case "silver":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Silver, { f, u });
      break;
    case "yield":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(YieldChart, { f, u });
      break;
    case "probability":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Probability, { f, u });
      break;
    case "fed":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Fed, { f, u });
      break;
    case "pce":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Inflation, { f, u });
      break;
    case "sequence":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(SequenceLogic, { f, u });
      break;
    case "timeline1":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Timeline, { f, u });
      break;
    case "timeline2":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Timeline, { f, u, latest: true });
      break;
    case "interaction":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Calendar, { f, u, interaction: true });
      break;
    case "close":
      el = /* @__PURE__ */ (0,jsx_runtime.jsx)(Close, { f, u });
      break;
  }
  if (!el) return null;
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)("svg", { style: { position: "absolute", left: 48, top: 724, width: 984, height: 676 }, viewBox: "0 0 984 676", children: [
    /* @__PURE__ */ (0,jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0,jsx_runtime.jsxs)("radialGradient", { id: "supportShade", children: [
      /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#10314C", stopOpacity: ".4" }),
      /* @__PURE__ */ (0,jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#10314C", stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ (0,jsx_runtime.jsx)("rect", { width: "984", height: "676", fill: "url(#supportShade)" }),
    el
  ] });
}
const Episode = (props) => /* @__PURE__ */ (0,jsx_runtime.jsxs)(esm.AbsoluteFill, { children: [
  /* @__PURE__ */ (0,jsx_runtime.jsx)(StockVideo, { ...props }),
  props.episodeUnits.map((u) => /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Sequence, { from: u.from, durationInFrames: u.frames, children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Overlay, { u }) }, u.first)),
  /* @__PURE__ */ (0,jsx_runtime.jsx)("div", { style: { position: "absolute", left: 57, top: 200, color: "#FFFFFF", textShadow: "0 2px 5px #000", fontSize: 26, fontFamily: "StockLabel" }, children: "\u9EC4\u91D1\u89C2\u5BDF \xB7 NO.5" })
] });
const Root = () => /* @__PURE__ */ (0,jsx_runtime.jsx)(esm.Composition, { id: "StockVideo", component: Episode, width: 1080, height: 1920, fps: 30, durationInFrames: 1, defaultProps: { scenes: [], episodeUnits: [], totalFrames: 1 }, calculateMetadata: ({ props }) => ({ durationInFrames: props.totalFrames }) });
(0,esm.registerRoot)(Root);


/***/ },

/***/ 5565
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

// https://github.com/remotion-dev/remotion/issues/3412#issuecomment-1910120552
__webpack_unused_export__ = ({ value: true });
exports.d = void 0;
function getEnvVar() {
    const parts = ['proc', 'ess', '.', 'en', 'v', '.', 'NOD', 'E_EN', 'V'];
    return parts.join('');
}
const getEnvVariables = () => {
    if (window.remotion_isStudio) {
        // For the Studio, we already set the environment variables in index-html.ts.
        // We just add NODE_ENV here.
        if (false) // removed by dead control flow
{}
        return {
            NODE_ENV: "production",
        };
    }
    const param = window.remotion_envVariables;
    if (!param) {
        return {};
    }
    return { ...JSON.parse(param), NODE_ENV: "production" };
};
const setupEnvVariables = () => {
    const env = getEnvVariables();
    if (!window.process) {
        window.process = {};
    }
    if (!window.process.env) {
        window.process.env = {};
    }
    Object.keys(env).forEach((key) => {
        window.process.env[key] = env[key];
    });
};
setupEnvVariables();
const injected = {};
const injectCSS = (css) => {
    // Skip in node
    if (typeof document === 'undefined') {
        return;
    }
    if (injected[css]) {
        return;
    }
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    head.prepend(style);
    injected[css] = true;
};
exports.d = injectCSS;
(0, exports.d)(`
  .css-reset, .css-reset * {
    font-size: 16px;
    line-height: 1.5;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    background: transparent;
    box-sizing: border-box;
  }

  .algolia-docsearch-suggestion--highlight {
    font-size: 15px;
    line-height: 1.25;
  }

  .__remotion-info-button-container code {
    font-family: monospace;
    font-size: 14px;
    color: #0584f2
  }

  .__remotion-vertical-scrollbar::-webkit-scrollbar {
      width: 6px;
  }
  .__remotion-vertical-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.0);
  }
  .__remotion-vertical-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.6);
  }
  .__remotion-vertical-scrollbar:hover::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 1);
  }


  .__remotion-horizontal-scrollbar::-webkit-scrollbar {
    height: 6px;
  }
  .__remotion-horizontal-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.0);
  }
  .__remotion-horizontal-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.6);
  }
  .__remotion-horizontal-scrollbar:hover::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 1);
  }


  @-moz-document url-prefix() {
    .__remotion-vertical-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.6) rgba(0, 0, 0, 0);
    }

    .__remotion-vertical-scrollbar:hover {
      scrollbar-color: rgba(0, 0, 0, 1) rgba(0, 0, 0, 0);
    }

    .__remotion-horizontal-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.6) rgba(0, 0, 0, 0);
    }

    .__remotion-horizontal-scrollbar:hover {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 1) rgba(0, 0, 0, 0);
    }
  }


  .__remotion-timeline-slider {
    appearance: none;
    width: 100px;
    border-radius: 3px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    accent-color: #ffffff;
  }
  
  .__remotion-timeline-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ffffff;
    appearance: none;
  }
`);


/***/ },

/***/ 3540
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9922);


if (typeof globalThis === 'undefined') {
	window.React = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)));
} else {
	globalThis.React = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)));
}


/***/ },

/***/ 8853
(__unused_webpack_module, exports, __webpack_require__) {

/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(9922),ca=__webpack_require__(3352);function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b)}
function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a])}
var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
{},ma={};function oa(a){if(ja.call(ma,a))return!0;if(ja.call(la,a))return!1;if(ka.test(a))return ma[a]=!0;la[a]=!0;return!1}function pa(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var z={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){z[a]=new v(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,!1,a.toLowerCase(),null,!1,!1)});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
sa);z[b]=new v(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!1,!1)});
z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!0,!0)});
function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}
var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");
var Ia=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return"function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||""}return"\n"+La+a}var Na=!1;
function Oa(a,b){if(!a||Na)return"";Na=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(l){var d=l}Reflect.construct(a,[],b)}else{try{b.call()}catch(l){d=l}a.call(b.prototype)}else{try{throw Error();}catch(l){d=l}a()}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Ma(a):""}
function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,!1),a;case 11:return a=Oa(a.type.render,!1),a;case 1:return a=Oa(a.type,!0),a;default:return""}}
function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return"Fragment";case wa:return"Portal";case Aa:return"Profiler";case za:return"StrictMode";case Ea:return"Suspense";case Fa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return(a.displayName||"Context")+".Consumer";case Ba:return(a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
function Ra(a){var b=a.type;switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return"Offscreen";
case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}
function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,!1)}
function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}var eb=Array.isArray;
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function kb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var mb,nb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,
zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a]})});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
function vb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(){}var Ib=!1;function Jb(a,b,c){if(Ib)return a(b,c);Ib=!0;try{return Gb(a,b,c)}finally{if(Ib=!1,null!==zb||null!==Ab)Hb(),Fb()}}
function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(p(231,b,typeof c));return c}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb)}catch(a){Lb=!1}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(a){Ob=!0;Pb=a}};function Tb(a,b,c,d,e,f,g,h,k){Ob=!1;Pb=null;Nb.apply(Sb,arguments)}
function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=!1;Pb=null}else throw Error(p(198));Qb||(Qb=!0,Rb=l)}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling}return null}
var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128))}catch(b){}}
var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)))}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}
function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}
function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId)}}
function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),!0;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),!0;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),!0}return!1}
function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,!1;b.shift()}return!0}function Zc(a,b,c){Xc(a)&&c.delete(b)}function $c(){Jc=!1;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc)}
function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)))}
function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift()}var cd=ua.ReactCurrentBatchConfig,dd=!0;
function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d)}finally{C=e,cd.transition=f}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d)}finally{C=e,cd.transition=f}}
function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else hd(a,b,d,null,c)}}var id=null;
function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);id=a;return null}
function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b)}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
function Ie(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return!1}return!0}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Je(c)}}function Le(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}
var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a,b){df.set(a,b);fa(b,[a])}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf)}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}}}if(Qb)throw a=Rb,Qb=!1,Rb=null,a;}
function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,!1),c.add(d))}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b)}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=!0;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,!1,a),qf(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=!0,qf("selectionchange",!1,b))}}
function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Jb(function(){var d=f,e=xb(c),g=[];
a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x)}t=null}else t=null;null!==k&&wf(g,h,k,t,!1);null!==n&&null!==J&&wf(g,J,n,t,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else{na=De;var xa=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
xa.controlled&&"number"===h.type&&cb(h,"number",h.value)}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a)}se(g,b)})}function tf(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
var Cf=null,Df=null;function Ef(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;})}
function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);bd(b)}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[Of]||a[uf];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return{current:a}}
function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--)}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H)}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c)}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return!0}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c)}var eg=null,fg=!1,gg=!1;function hg(a){null===eg?eg=[a]:eg.push(a)}function ig(a){fg=!0;hg(a)}
function jg(){if(!gg&&null!==eg){gg=!0;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=!1}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b}
function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a}else rg=1<<f|c<<e|d,sg=a}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0))}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null}var xg=null,yg=null,I=!1,zg=null;
function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}
function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
null,!0):!1;default:return!1}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=!1,xg=a)}}else{if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=!1;xg=a}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a}
function Gg(a){if(a!==xg)return!1;if(!I)return Fg(a),I=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling)}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}yg=
null}}else yg=xg?Lf(a.stateNode.nextSibling):null;return!0}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling)}function Ig(){yg=xg=null;I=!1}function Jg(a){null===zg?zg=[a]:zg.push(a)}var Kg=ua.ReactCurrentBatchConfig;
function Lg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
function Mg(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ng(a){var b=a._init;return b(a._payload)}
function Og(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Pg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Qg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&Ng(f)===b.type))return d=e(b,c.props),d.ref=Lg(a,b,c),d.return=a,d;d=Rg(c.type,c.key,c.props,null,a.mode,d);d.ref=Lg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=Sg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Tg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=Qg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=Rg(b.type,b.key,b.props,null,a.mode,c),
c.ref=Lg(a,null,b),c.return=a,c;case wa:return b=Sg(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Tg(b,a.mode,c,null),b.return=a,b;Mg(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);Mg(a,c)}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);Mg(b,d)}return null}
function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x}if(n.done)return c(e,
m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&Ng(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=Lg(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling}f.type===ya?(d=Tg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Rg(f.type,f.key,f.props,null,a.mode,h),h.ref=Lg(a,d,f),h.return=a,a=h)}return g(a);case wa:a:{for(l=f.key;null!==
d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Sg(f,a.mode,h);d.return=a;a=d}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);Mg(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
(c(a,d),d=Qg(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Ug=Og(!0),Vg=Og(!1),Wg=Uf(null),Xg=null,Yg=null,Zg=null;function $g(){Zg=Yg=Xg=null}function ah(a){var b=Wg.current;E(Wg);a._currentValue=b}function bh(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}
function ch(a,b){Xg=a;Zg=Yg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(dh=!0),a.firstContext=null)}function eh(a){var b=a._currentValue;if(Zg!==a)if(a={context:a,memoizedValue:b,next:null},null===Yg){if(null===Xg)throw Error(p(308));Yg=a;Xg.dependencies={lanes:0,firstContext:a}}else Yg=Yg.next=a;return b}var fh=null;function gh(a){null===fh?fh=[a]:fh.push(a)}
function hh(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,gh(b)):(c.next=e.next,e.next=c);b.interleaved=c;return ih(a,d)}function ih(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var jh=!1;function kh(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}
function lh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function mh(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
function nh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return ih(a,c)}e=d.interleaved;null===e?(b.next=b,gh(d)):(b.next=e.next,e.next=b);d.interleaved=b;return ih(a,c)}function oh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
function ph(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function qh(a,b,c,d){var e=a.updateQueue;jh=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k))}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:jh=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h))}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);rh|=g;a.lanes=g;a.memoizedState=q}}
function sh(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d)}}}var th={},uh=Uf(th),vh=Uf(th),wh=Uf(th);function xh(a){if(a===th)throw Error(p(174));return a}
function yh(a,b){G(wh,b);G(vh,a);G(uh,th);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a)}E(uh);G(uh,b)}function zh(){E(uh);E(vh);E(wh)}function Ah(a){xh(wh.current);var b=xh(uh.current);var c=lb(b,a.type);b!==c&&(G(vh,a),G(uh,c))}function Bh(a){vh.current===a&&(E(uh),E(vh))}var L=Uf(0);
function Ch(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var Dh=[];
function Eh(){for(var a=0;a<Dh.length;a++)Dh[a]._workInProgressVersionPrimary=null;Dh.length=0}var Fh=ua.ReactCurrentDispatcher,Gh=ua.ReactCurrentBatchConfig,Hh=0,M=null,N=null,O=null,Ih=!1,Jh=!1,Kh=0,Lh=0;function P(){throw Error(p(321));}function Mh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Nh(a,b,c,d,e,f){Hh=f;M=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Fh.current=null===a||null===a.memoizedState?Oh:Ph;a=c(d,e);if(Jh){f=0;do{Jh=!1;Kh=0;if(25<=f)throw Error(p(301));f+=1;O=N=null;b.updateQueue=null;Fh.current=Qh;a=c(d,e)}while(Jh)}Fh.current=Rh;b=null!==N&&null!==N.next;Hh=0;O=N=M=null;Ih=!1;if(b)throw Error(p(300));return a}function Sh(){var a=0!==Kh;Kh=0;return a}
function Th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===O?M.memoizedState=O=a:O=O.next=a;return O}function Uh(){if(null===N){var a=M.alternate;a=null!==a?a.memoizedState:null}else a=N.next;var b=null===O?M.memoizedState:O.next;if(null!==b)O=b,N=a;else{if(null===a)throw Error(p(310));N=a;a={memoizedState:N.memoizedState,baseState:N.baseState,baseQueue:N.baseQueue,queue:N.queue,next:null};null===O?M.memoizedState=O=a:O=O.next=a}return O}
function Vh(a,b){return"function"===typeof b?b(a):b}
function Wh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=N,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Hh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else{var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;M.lanes|=m;rh|=m}l=l.next}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(dh=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,M.lanes|=f,rh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}
function Xh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(dh=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Yh(){}
function Zh(a,b){var c=M,d=Uh(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,dh=!0);d=d.queue;$h(ai.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==O&&O.memoizedState.tag&1){c.flags|=2048;bi(9,ci.bind(null,c,d,e,b),void 0,null);if(null===Q)throw Error(p(349));0!==(Hh&30)||di(c,b,e)}return e}function di(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}
function ci(a,b,c,d){b.value=c;b.getSnapshot=d;ei(b)&&fi(a)}function ai(a,b,c){return c(function(){ei(b)&&fi(a)})}function ei(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!He(a,c)}catch(d){return!0}}function fi(a){var b=ih(a,1);null!==b&&gi(b,a,1,-1)}
function hi(a){var b=Th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vh,lastRenderedState:a};b.queue=a;a=a.dispatch=ii.bind(null,M,a);return[b.memoizedState,a]}
function bi(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function ji(){return Uh().memoizedState}function ki(a,b,c,d){var e=Th();M.flags|=a;e.memoizedState=bi(1|b,c,void 0,void 0===d?null:d)}
function li(a,b,c,d){var e=Uh();d=void 0===d?null:d;var f=void 0;if(null!==N){var g=N.memoizedState;f=g.destroy;if(null!==d&&Mh(d,g.deps)){e.memoizedState=bi(b,c,f,d);return}}M.flags|=a;e.memoizedState=bi(1|b,c,f,d)}function mi(a,b){return ki(8390656,8,a,b)}function $h(a,b){return li(2048,8,a,b)}function ni(a,b){return li(4,2,a,b)}function oi(a,b){return li(4,4,a,b)}
function pi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function qi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return li(4,4,pi.bind(null,b,a),c)}function ri(){}function si(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function ti(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function ui(a,b,c){if(0===(Hh&21))return a.baseState&&(a.baseState=!1,dh=!0),a.memoizedState=c;He(c,b)||(c=yc(),M.lanes|=c,rh|=c,a.baseState=!0);return b}function vi(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Gh.transition;Gh.transition={};try{a(!1),b()}finally{C=c,Gh.transition=d}}function wi(){return Uh().memoizedState}
function xi(a,b,c){var d=yi(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,c);else if(c=hh(a,b,c,d),null!==c){var e=R();gi(c,a,d,e);Bi(c,b,d)}}
function ii(a,b,c){var d=yi(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,gh(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=hh(a,b,e,d);null!==c&&(e=R(),gi(c,a,d,e),Bi(c,b,d))}}
function zi(a){var b=a.alternate;return a===M||null!==b&&b===M}function Ai(a,b){Jh=Ih=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function Bi(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
var Rh={readContext:eh,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useInsertionEffect:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useDeferredValue:P,useTransition:P,useMutableSource:P,useSyncExternalStore:P,useId:P,unstable_isNewReconciler:!1},Oh={readContext:eh,useCallback:function(a,b){Th().memoizedState=[a,void 0===b?null:b];return a},useContext:eh,useEffect:mi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ki(4194308,
4,pi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ki(4194308,4,a,b)},useInsertionEffect:function(a,b){return ki(4,2,a,b)},useMemo:function(a,b){var c=Th();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=xi.bind(null,M,a);return[d.memoizedState,a]},useRef:function(a){var b=
Th();a={current:a};return b.memoizedState=a},useState:hi,useDebugValue:ri,useDeferredValue:function(a){return Th().memoizedState=a},useTransition:function(){var a=hi(!1),b=a[0];a=vi.bind(null,a[1]);Th().memoizedState=a;return[b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=M,e=Th();if(I){if(void 0===c)throw Error(p(407));c=c()}else{c=b();if(null===Q)throw Error(p(349));0!==(Hh&30)||di(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;mi(ai.bind(null,d,
f,a),[a]);d.flags|=2048;bi(9,ci.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Th(),b=Q.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Kh++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=Lh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Ph={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Wh,useRef:ji,useState:function(){return Wh(Vh)},
useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return ui(b,N.memoizedState,a)},useTransition:function(){var a=Wh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1},Qh={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Xh,useRef:ji,useState:function(){return Xh(Vh)},useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return null===
N?b.memoizedState=a:ui(b,N.memoizedState,a)},useTransition:function(){var a=Xh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1};function Ci(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function Di(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Ei={isMounted:function(a){return(a=a._reactInternals)?Vb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=R(),d=
yi(a),e=mh(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=nh(a,e,d);null!==b&&(gi(b,a,d,c),oh(b,a,d))}};function Fi(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):!0}
function Gi(a,b,c){var d=!1,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=eh(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Ei;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Hi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Ei.enqueueReplaceState(b,b.state,null)}
function Ii(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};kh(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=eh(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Di(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Ei.enqueueReplaceState(e,e.state,null),qh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ji(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}
function Ki(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function Li(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Mi="function"===typeof WeakMap?WeakMap:Map;function Ni(a,b,c){c=mh(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Oi||(Oi=!0,Pi=d);Li(a,b)};return c}
function Qi(a,b,c){c=mh(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Li(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Li(a,b);"function"!==typeof d&&(null===Ri?Ri=new Set([this]):Ri.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
function Si(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Mi;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ti.bind(null,a,b,c),b.then(a,a))}function Ui(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}
function Vi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=mh(-1,1),b.tag=2,nh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Wi=ua.ReactCurrentOwner,dh=!1;function Xi(a,b,c,d){b.child=null===a?Vg(b,null,c,d):Ug(b,a.child,c,d)}
function Yi(a,b,c,d,e){c=c.render;var f=b.ref;ch(b,e);d=Nh(a,b,c,d,f,e);c=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&c&&vg(b);b.flags|=1;Xi(a,b,d,e);return b.child}
function $i(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!aj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,bj(a,b,f,d,e);a=Rg(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return Zi(a,b,e)}b.flags|=1;a=Pg(f,d);a.ref=b.ref;a.return=b;return b.child=a}
function bj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(dh=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(dh=!0);else return b.lanes=a.lanes,Zi(a,b,e)}return cj(a,b,c,d,e)}
function dj(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(ej,fj),fj|=c;else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(ej,fj),fj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(ej,fj);fj|=d}else null!==
f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(ej,fj),fj|=d;Xi(a,b,e,c);return b.child}function gj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function cj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);ch(b,e);c=Nh(a,b,c,d,f,e);d=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&d&&vg(b);b.flags|=1;Xi(a,b,c,e);return b.child}
function hj(a,b,c,d,e){if(Zf(c)){var f=!0;cg(b)}else f=!1;ch(b,e);if(null===b.stateNode)ij(a,b),Gi(b,c,d),Ii(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=eh(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
(h!==d||k!==l)&&Hi(b,g,d,l);jh=!1;var r=b.memoizedState;g.state=r;qh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||jh?("function"===typeof m&&(Di(b,c,m,d),k=b.memoizedState),(h=jh||Fi(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;lh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Ci(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=eh(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&Hi(b,g,d,k);jh=!1;r=b.memoizedState;g.state=r;qh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||jh?("function"===typeof y&&(Di(b,c,y,d),n=b.memoizedState),(l=jh||Fi(b,c,l,d,r,n,k)||!1)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return jj(a,b,c,d,f,e)}
function jj(a,b,c,d,e,f){gj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,!1),Zi(a,b,f);d=b.stateNode;Wi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Ug(b,a.child,null,f),b.child=Ug(b,null,h,f)):Xi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,!0);return b.child}function kj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,!1);yh(a,b.containerInfo)}
function lj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Xi(a,b,c,d);return b.child}var mj={dehydrated:null,treeContext:null,retryLane:0};function nj(a){return{baseLanes:a,cachePool:null,transitions:null}}
function oj(a,b,c){var d=b.pendingProps,e=L.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(L,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
g):f=pj(g,d,0,null),a=Tg(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=nj(c),b.memoizedState=mj,a):qj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return rj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=Pg(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=Pg(h,f):(f=Tg(f,g,c,null),f.flags|=2);f.return=
b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?nj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=mj;return d}f=a.child;a=f.sibling;d=Pg(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function qj(a,b){b=pj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function sj(a,b,c,d){null!==d&&Jg(d);Ug(b,a.child,null,c);a=qj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
function rj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Ki(Error(p(422))),sj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=pj({mode:"visible",children:d.children},e,0,null);f=Tg(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Ug(b,a.child,null,g);b.child.memoizedState=nj(g);b.memoizedState=mj;return f}if(0===(b.mode&1))return sj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
if(d)var h=d.dgst;d=h;f=Error(p(419));d=Ki(f,d,void 0);return sj(a,b,g,d)}h=0!==(g&a.childLanes);if(dh||h){d=Q;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;
0!==e&&e!==f.retryLane&&(f.retryLane=e,ih(a,e),gi(d,a,e,-1))}tj();d=Ki(Error(p(421)));return sj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=uj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=!0;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=qj(b,d.children);b.flags|=4096;return b}function vj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);bh(a.return,b,c)}
function wj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}
function xj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Xi(a,b,d.children,c);d=L.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&vj(a,c,b);else if(19===a.tag)vj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}G(L,d);if(0===(b.mode&1))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Ch(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);wj(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Ch(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}wj(b,!0,c,null,f);break;case "together":wj(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}
function ij(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Zi(a,b,c){null!==a&&(b.dependencies=a.dependencies);rh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=Pg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Pg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}
function yj(a,b,c){switch(b.tag){case 3:kj(b);Ig();break;case 5:Ah(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:yh(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Wg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(L,L.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return oj(a,b,c);G(L,L.current&1);a=Zi(a,b,c);return null!==a?a.sibling:null}G(L,L.current&1);break;case 19:d=0!==(c&
b.childLanes);if(0!==(a.flags&128)){if(d)return xj(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(L,L.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,dj(a,b,c)}return Zi(a,b,c)}var zj,Aj,Bj,Cj;
zj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Aj=function(){};
Bj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;xh(uh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf)}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,
c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4}};Cj=function(a,b,c,d){c!==d&&(b.flags|=4)};
function Dj(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
function Ej(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;zh();E(Wf);E(H);Eh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Fj(zg),zg=null));Aj(a,b);S(b);return null;case 5:Bh(b);var e=xh(wh.current);
c=b.type;if(null!==a&&null!=b.stateNode)Bj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d)}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,
h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d)}switch(c){case "input":Va(d);db(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;zj(a,b,!1,!1);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g))}switch(c){case "input":Va(a);db(a,d,!1);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
!0);break;default:"function"===typeof e.onClick&&(a.onclick=Bf)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}S(b);return null;case 6:if(a&&null!=b.stateNode)Cj(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=xh(wh.current);xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d}S(b);return null;case 13:E(L);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=!1;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=!1}else null!==zg&&(Fj(zg),zg=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(L.current&1)?0===T&&(T=3):tj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return zh(),
Aj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return ah(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(L);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dj(f,!1);else{if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Ch(a);if(null!==g){b.flags|=128;Dj(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(L,L.current&1|2);return b.child}a=
a.sibling}null!==f.tail&&B()>Gj&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304)}else{if(!d)if(a=Ch(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dj(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Gj&&1073741824!==c&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=
b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=L.current,G(L,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Hj(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(fj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
function Ij(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return zh(),E(Wf),E(H),Eh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Bh(b),null;case 13:E(L);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(L),null;case 4:return zh(),null;case 10:return ah(b.type._context),null;case 22:case 23:return Hj(),
null;case 24:return null;default:return null}}var Jj=!1,U=!1,Kj="function"===typeof WeakSet?WeakSet:Set,V=null;function Lj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){W(a,b,d)}else c.current=null}function Mj(a,b,c){try{c()}catch(d){W(a,b,d)}}var Nj=!1;
function Oj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode}q=y}c=-1===h||-1===k?null:{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Df={focusedElem:a,selectionRange:c};dd=!1;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Ci(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F)}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return}n=Nj;Nj=!1;return n}
function Pj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Mj(b,c,f)}e=e.next}while(e!==d)}}function Qj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Rj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}
function Sj(a){var b=a.alternate;null!==b&&(a.alternate=null,Sj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Tj(a){return 5===a.tag||3===a.tag||4===a.tag}
function Uj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Tj(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}
function Vj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Vj(a,b,c),a=a.sibling;null!==a;)Vj(a,b,c),a=a.sibling}
function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling}var X=null,Xj=!1;function Yj(a,b,c){for(c=c.child;null!==c;)Zj(a,b,c),c=c.sibling}
function Zj(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c)}catch(h){}switch(c.tag){case 5:U||Lj(c,b);case 6:var d=X,e=Xj;X=null;Yj(a,b,c);X=d;Xj=e;null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Xj;X=c.stateNode.containerInfo;Xj=!0;
Yj(a,b,c);X=d;Xj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Mj(c,b,g):0!==(f&4)&&Mj(c,b,g));e=e.next}while(e!==d)}Yj(a,b,c);break;case 1:if(!U&&(Lj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){W(c,b,h)}Yj(a,b,c);break;case 21:Yj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
c.memoizedState,Yj(a,b,c),U=d):Yj(a,b,c);break;default:Yj(a,b,c)}}function ak(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Kj);b.forEach(function(b){var d=bk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function ck(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Xj=!1;break a;case 3:X=h.stateNode.containerInfo;Xj=!0;break a;case 4:X=h.stateNode.containerInfo;Xj=!0;break a}h=h.return}if(null===X)throw Error(p(160));Zj(f,g,e);X=null;Xj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(l){W(e,b,l)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)dk(b,a),b=b.sibling}
function dk(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:ck(b,a);ek(a);if(d&4){try{Pj(3,a,a.return),Qj(3,a)}catch(t){W(a,a.return,t)}try{Pj(5,a,a.return)}catch(t){W(a,a.return,t)}}break;case 1:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);break;case 5:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"")}catch(t){W(a,a.return,t)}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l)}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1))}e[Pf]=f}catch(t){W(a,a.return,t)}}break;case 6:ck(b,a);ek(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(t){W(a,a.return,t)}}break;case 3:ck(b,a);ek(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo)}catch(t){W(a,a.return,t)}break;case 4:ck(b,a);ek(a);break;case 13:ck(b,a);ek(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
null!==e.alternate&&null!==e.alternate.memoizedState||(fk=B()));d&4&&ak(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,ck(b,a),U=l):ck(b,a);ek(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Pj(4,r,r.return);break;case 1:Lj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount()}catch(t){W(d,c,t)}}break;case 5:Lj(r,r.return);break;case 22:if(null!==r.memoizedState){gk(q);continue}}null!==y?(y.return=r,V=y):gk(q)}m=m.sibling}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
rb("display",g))}catch(t){W(a,a.return,t)}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps}catch(t){W(a,a.return,t)}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling}}break;case 19:ck(b,a);ek(a);d&4&&ak(a);break;case 21:break;default:ck(b,
a),ek(a)}}function ek(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Tj(c)){var d=c;break a}c=c.return}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Uj(a);Wj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Uj(a);Vj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function hk(a,b,c){V=a;ik(a,b,c)}
function ik(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Jj;var l=U;Jj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?jk(e):null!==k?(k.return=g,V=k):jk(e);for(;null!==f;)V=f,ik(f,b,c),f=f.sibling;V=e;Jj=h;U=l}kk(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):kk(a,b,c)}}
function kk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Qj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else{var e=b.elementType===b.type?c.memoizedProps:Ci(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&sh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
b.child.stateNode;break;case 1:c=b.child.stateNode}sh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
default:throw Error(p(163));}U||b.flags&512&&Rj(b)}catch(r){W(b,b.return,r)}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}function gk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}
function jk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Qj(4,b)}catch(k){W(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){W(b,e,k)}}var f=b.return;try{Rj(b)}catch(k){W(b,f,k)}break;case 5:var g=b.return;try{Rj(b)}catch(k){W(b,g,k)}}}catch(k){W(b,b.return,k)}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return}}
var lk=Math.ceil,mk=ua.ReactCurrentDispatcher,nk=ua.ReactCurrentOwner,ok=ua.ReactCurrentBatchConfig,K=0,Q=null,Y=null,Z=0,fj=0,ej=Uf(0),T=0,pk=null,rh=0,qk=0,rk=0,sk=null,tk=null,fk=0,Gj=Infinity,uk=null,Oi=!1,Pi=null,Ri=null,vk=!1,wk=null,xk=0,yk=0,zk=null,Ak=-1,Bk=0;function R(){return 0!==(K&6)?B():-1!==Ak?Ak:Ak=B()}
function yi(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Bk&&(Bk=yc()),Bk;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function gi(a,b,c,d){if(50<yk)throw yk=0,zk=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==Q)a===Q&&(0===(K&2)&&(qk|=c),4===T&&Ck(a,Z)),Dk(a,d),1===c&&0===K&&0===(b.mode&1)&&(Gj=B()+500,fg&&jg())}
function Dk(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===Q?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Ek.bind(null,a)):hg(Ek.bind(null,a)),Jf(function(){0===(K&6)&&jg()}),c=null;else{switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc}c=Fk(c,Gk.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}
function Gk(a,b){Ak=-1;Bk=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Hk()&&a.callbackNode!==c)return null;var d=uc(a,a===Q?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Ik(a,d);else{b=d;var e=K;K|=2;var f=Jk();if(Q!==a||Z!==b)uk=null,Gj=B()+500,Kk(a,b);do try{Lk();break}catch(h){Mk(a,h)}while(1);$g();mk.current=f;K=e;null!==Y?b=0:(Q=null,Z=0,b=T)}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Nk(a,e)));if(1===b)throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;if(6===b)Ck(a,d);
else{e=a.current.alternate;if(0===(d&30)&&!Ok(e)&&(b=Ik(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Nk(a,f))),1===b))throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Pk(a,tk,uk);break;case 3:Ck(a,d);if((d&130023424)===d&&(b=fk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){R();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),b);break}Pk(a,tk,uk);break;case 4:Ck(a,d);if((d&4194240)===
d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*lk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),d);break}Pk(a,tk,uk);break;case 5:Pk(a,tk,uk);break;default:throw Error(p(329));}}}Dk(a,B());return a.callbackNode===c?Gk.bind(null,a):null}
function Nk(a,b){var c=sk;a.current.memoizedState.isDehydrated&&(Kk(a,b).flags|=256);a=Ik(a,b);2!==a&&(b=tk,tk=c,null!==b&&Fj(b));return a}function Fj(a){null===tk?tk=a:tk.push.apply(tk,a)}
function Ok(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}
function Ck(a,b){b&=~rk;b&=~qk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d}}function Ek(a){if(0!==(K&6))throw Error(p(327));Hk();var b=uc(a,0);if(0===(b&1))return Dk(a,B()),null;var c=Ik(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Nk(a,d))}if(1===c)throw c=pk,Kk(a,0),Ck(a,b),Dk(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Pk(a,tk,uk);Dk(a,B());return null}
function Qk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Gj=B()+500,fg&&jg())}}function Rk(a){null!==wk&&0===wk.tag&&0===(K&6)&&Hk();var b=K;K|=1;var c=ok.transition,d=C;try{if(ok.transition=null,C=1,a)return a()}finally{C=d,ok.transition=c,K=b,0===(K&6)&&jg()}}function Hj(){fj=ej.current;E(ej)}
function Kk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:zh();E(Wf);E(H);Eh();break;case 5:Bh(d);break;case 4:zh();break;case 13:E(L);break;case 19:E(L);break;case 10:ah(d.type._context);break;case 22:case 23:Hj()}c=c.return}Q=a;Y=a=Pg(a.current,null);Z=fj=b;T=0;pk=null;rk=qk=rh=0;tk=sk=null;if(null!==fh){for(b=
0;b<fh.length;b++)if(c=fh[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}fh=null}return a}
function Mk(a,b){do{var c=Y;try{$g();Fh.current=Rh;if(Ih){for(var d=M.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ih=!1}Hh=0;O=N=M=null;Jh=!1;Kh=0;nk.current=null;if(null===c||null===c.return){T=1;pk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Ui(g);if(null!==y){y.flags&=-257;Vi(y,g,h,f,b);y.mode&1&&Si(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t}else n.add(k);break a}else{if(0===(b&1)){Si(f,l,b);tj();break a}k=Error(p(426))}}else if(I&&h.mode&1){var J=Ui(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Vi(J,g,h,f,b);Jg(Ji(k,h));break a}}f=k=Ji(k,h);4!==T&&(T=2);null===sk?sk=[f]:sk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
b&=-b;f.lanes|=b;var x=Ni(f,k,b);ph(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Ri||!Ri.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Qi(f,h,b);ph(f,F);break a}}f=f.return}while(null!==f)}Sk(c)}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Jk(){var a=mk.current;mk.current=Rh;return null===a?Rh:a}
function tj(){if(0===T||3===T||2===T)T=4;null===Q||0===(rh&268435455)&&0===(qk&268435455)||Ck(Q,Z)}function Ik(a,b){var c=K;K|=2;var d=Jk();if(Q!==a||Z!==b)uk=null,Kk(a,b);do try{Tk();break}catch(e){Mk(a,e)}while(1);$g();K=c;mk.current=d;if(null!==Y)throw Error(p(261));Q=null;Z=0;return T}function Tk(){for(;null!==Y;)Uk(Y)}function Lk(){for(;null!==Y&&!cc();)Uk(Y)}function Uk(a){var b=Vk(a.alternate,a,fj);a.memoizedProps=a.pendingProps;null===b?Sk(a):Y=b;nk.current=null}
function Sk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Ej(c,b,fj),null!==c){Y=c;return}}else{c=Ij(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===T&&(T=5)}function Pk(a,b,c){var d=C,e=ok.transition;try{ok.transition=null,C=1,Wk(a,b,c,d)}finally{ok.transition=e,C=d}return null}
function Wk(a,b,c,d){do Hk();while(null!==wk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===Q&&(Y=Q=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||vk||(vk=!0,Fk(hc,function(){Hk();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ok.transition;ok.transition=null;
var g=C;C=1;var h=K;K|=4;nk.current=null;Oj(a,c);dk(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;hk(c,a,e);dc();K=h;C=g;ok.transition=f}else a.current=c;vk&&(vk=!1,wk=a,xk=e);f=a.pendingLanes;0===f&&(Ri=null);mc(c.stateNode,d);Dk(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Oi)throw Oi=!1,a=Pi,Pi=null,a;0!==(xk&1)&&0!==a.tag&&Hk();f=a.pendingLanes;0!==(f&1)?a===zk?yk++:(yk=0,zk=a):yk=0;jg();return null}
function Hk(){if(null!==wk){var a=Dc(xk),b=ok.transition,c=C;try{ok.transition=null;C=16>a?16:a;if(null===wk)var d=!1;else{a=wk;wk=null;xk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Pj(8,m,f)}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Sj(m);if(m===
l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J}while(null!==t)}}V=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Pj(9,f,f.return)}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Qj(9,h)}}catch(na){W(h,h.return,na)}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a)}catch(na){}d=!0}return d}finally{C=c,ok.transition=b}}return!1}function Xk(a,b,c){b=Ji(c,b);b=Ni(a,b,1);a=nh(a,b,1);b=R();null!==a&&(Ac(a,1,b),Dk(a,b))}
function W(a,b,c){if(3===a.tag)Xk(a,a,c);else for(;null!==b;){if(3===b.tag){Xk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ri||!Ri.has(d))){a=Ji(c,a);a=Qi(b,a,1);b=nh(b,a,1);a=R();null!==b&&(Ac(b,1,a),Dk(b,a));break}}b=b.return}}
function Ti(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=R();a.pingedLanes|=a.suspendedLanes&c;Q===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-fk?Kk(a,0):rk|=c);Dk(a,b)}function Yk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=R();a=ih(a,b);null!==a&&(Ac(a,b,c),Dk(a,c))}function uj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Yk(a,c)}
function bk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Yk(a,c)}var Vk;
Vk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)dh=!0;else{if(0===(a.lanes&c)&&0===(b.flags&128))return dh=!1,yj(a,b,c);dh=0!==(a.flags&131072)?!0:!1}else dh=!1,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;ij(a,b);a=b.pendingProps;var e=Yf(b,H.current);ch(b,c);e=Nh(null,b,d,a,e,c);var f=Sh();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
null,Zf(d)?(f=!0,cg(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,kh(b),e.updater=Ei,b.stateNode=e,e._reactInternals=b,Ii(b,d,a,c),b=jj(null,b,d,!0,f,c)):(b.tag=0,I&&f&&vg(b),Xi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{ij(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Zk(d);a=Ci(d,a);switch(e){case 0:b=cj(null,b,d,a,c);break a;case 1:b=hj(null,b,d,a,c);break a;case 11:b=Yi(null,b,d,a,c);break a;case 14:b=$i(null,b,d,Ci(d.type,a),c);break a}throw Error(p(306,
d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),cj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),hj(a,b,d,e,c);case 3:a:{kj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;lh(a,b);qh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
f,b.memoizedState=f,b.flags&256){e=Ji(Error(p(423)),b);b=lj(a,b,d,c,e);break a}else if(d!==e){e=Ji(Error(p(424)),b);b=lj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=!0,zg=null,c=Vg(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Ig();if(d===e){b=Zi(a,b,c);break a}Xi(a,b,d,c)}b=b.child}return b;case 5:return Ah(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
gj(a,b),Xi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return oj(a,b,c);case 4:return yh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Ug(b,null,d,c):Xi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),Yi(a,b,d,e,c);case 7:return Xi(a,b,b.pendingProps,c),b.child;case 8:return Xi(a,b,b.pendingProps.children,c),b.child;case 12:return Xi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
g=e.value;G(Wg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=Zi(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=mh(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);bh(f.return,
c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);bh(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}Xi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,ch(b,c),e=eh(e),d=d(e),b.flags|=1,Xi(a,b,d,c),
b.child;case 14:return d=b.type,e=Ci(d,b.pendingProps),e=Ci(d.type,e),$i(a,b,d,e,c);case 15:return bj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),ij(a,b),b.tag=1,Zf(d)?(a=!0,cg(b)):a=!1,ch(b,c),Gi(b,d,e),Ii(b,d,e,c),jj(null,b,d,!0,a,c);case 19:return xj(a,b,c);case 22:return dj(a,b,c)}throw Error(p(156,b.tag));};function Fk(a,b){return ac(a,b)}
function $k(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function Bg(a,b,c,d){return new $k(a,b,c,d)}function aj(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function Zk(a){if("function"===typeof a)return aj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
function Pg(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Rg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)aj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Tg(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return pj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Tg(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function pj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:!1};return a}function Qg(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
function Sg(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function al(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
null}function bl(a,b,c,d,e,f,g,h,k){a=new al(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};kh(f);return a}function cl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function dl(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
function el(a,b,c,d,e,f,g,h,k){a=bl(c,d,!0,a,e,f,g,h,k);a.context=dl(null);c=a.current;d=R();e=yi(c);f=mh(d,e);f.callback=void 0!==b&&null!==b?b:null;nh(c,f,e);a.current.lanes=e;Ac(a,e,d);Dk(a,d);return a}function fl(a,b,c,d){var e=b.current,f=R(),g=yi(e);c=dl(c);null===b.context?b.context=c:b.pendingContext=c;b=mh(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=nh(e,b,g);null!==a&&(gi(a,e,g,f),oh(a,e,g));return g}
function gl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function hl(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function il(a,b){hl(a,b);(a=a.alternate)&&hl(a,b)}function jl(){return null}var kl="function"===typeof reportError?reportError:function(a){console.error(a)};function ll(a){this._internalRoot=a}
ml.prototype.render=ll.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));fl(a,b,null,null)};ml.prototype.unmount=ll.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Rk(function(){fl(null,a,null,null)});b[uf]=null}};function ml(a){this._internalRoot=a}
ml.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a)}};function nl(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function ol(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function pl(){}
function ql(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=gl(g);f.call(a)}}var g=el(b,d,a,0,null,!1,!1,"",pl);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Rk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=gl(k);h.call(a)}}var k=bl(a,0,!1,null,null,!1,!1,"",pl);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Rk(function(){fl(b,k,c,d)});return k}
function rl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=gl(g);h.call(a)}}fl(b,g,a,e)}else g=ql(c,b,a,e,d);return gl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Dk(b,B()),0===(K&6)&&(Gj=B()+500,jg()))}break;case 13:Rk(function(){var b=ih(a,1);if(null!==b){var c=R();gi(b,a,1,c)}}),il(a,1)}};
Fc=function(a){if(13===a.tag){var b=ih(a,134217728);if(null!==b){var c=R();gi(b,a,134217728,c)}il(a,134217728)}};Gc=function(a){if(13===a.tag){var b=yi(a),c=ih(a,b);if(null!==c){var d=R();gi(c,a,b,d)}il(a,b)}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c}};
yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Qk;Hb=Rk;
var sl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Qk]},tl={findFiberByHostInstance:Wc,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"};
var ul={bundleType:tl.bundleType,version:tl.version,rendererPackageName:tl.rendererPackageName,rendererConfig:tl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:tl.findFiberByHostInstance||
jl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{kc=vl.inject(ul),lc=vl}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sl;
exports.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!nl(b))throw Error(p(200));return cl(a,b,null,c)};exports.createRoot=function(a,b){if(!nl(a))throw Error(p(299));var c=!1,d="",e=kl;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=bl(a,1,!1,null,null,c,!1,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ll(b)};
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a){return Rk(a)};exports.hydrate=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!0,c)};
exports.hydrateRoot=function(a,b,c){if(!nl(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=kl;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=el(b,null,a,1,null!=c?c:null,e,!1,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
e);return new ml(b)};exports.render=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!ol(a))throw Error(p(40));return a._reactRootContainer?(Rk(function(){rl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null})}),!0):!1};exports.unstable_batchedUpdates=Qk;
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!ol(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return rl(a,b,c,!1,d)};exports.version="18.3.1-next-f1338f8080-20240426";


/***/ },

/***/ 9612
(__unused_webpack_module, exports, __webpack_require__) {



var m = __webpack_require__(5075);
if (true) {
  exports.createRoot = m.createRoot;
  exports.hydrateRoot = m.hydrateRoot;
} else // removed by dead control flow
{ var i; }


/***/ },

/***/ 5075
(module, __unused_webpack_exports, __webpack_require__) {



function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) // removed by dead control flow
{}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(8853);
} else // removed by dead control flow
{}


/***/ },

/***/ 9506
(__unused_webpack_module, exports, __webpack_require__) {

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(9922),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;


/***/ },

/***/ 7357
(__unused_webpack_module, exports) {

/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};function X(){throw Error("act(...) is not supported in production builds of React.");}
exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;exports.act=X;
exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=X;exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};
exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};
exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};exports.useTransition=function(){return U.current.useTransition()};exports.version="18.3.1";


/***/ },

/***/ 9922
(module, __unused_webpack_exports, __webpack_require__) {



if (true) {
  module.exports = __webpack_require__(7357);
} else // removed by dead control flow
{}


/***/ },

/***/ 5706
(module, __unused_webpack_exports, __webpack_require__) {



if (true) {
  module.exports = __webpack_require__(9506);
} else // removed by dead control flow
{}


/***/ },

/***/ 2237
(__unused_webpack_module, exports) {

/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t)}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else{var b=h(t);null!==b&&K(H,b.startTime-a)}}
function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b)}else k(r);v=h(r)}if(null!==v)var w=!0;else{var m=h(t);null!==m&&K(H,m.startTime-b);w=!1}return w}finally{v=null,y=c,z=!1}}var N=!1,O=null,L=-1,P=5,Q=-1;
function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a)}finally{b?S():(N=!1,O=null)}}else N=!1}var S;if("function"===typeof F)S=function(){F(R)};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null)}}else S=function(){D(R,0)};function I(a){O=a;N||(N=!0,S())}function K(a,b){L=D(function(){a(exports.unstable_now())},b)}
exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J))};
exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y}var c=y;y=b;try{return a()}finally{y=c}};exports.unstable_pauseExecution=function(){};
exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=y;y=a;try{return b()}finally{y=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c}}};


/***/ },

/***/ 3352
(module, __unused_webpack_exports, __webpack_require__) {



if (true) {
  module.exports = __webpack_require__(2237);
} else // removed by dead control flow
{}


/***/ },

/***/ 9512
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* unused harmony export setBundleModeAndUpdate */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9922);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9612);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8661);
/* harmony import */ var remotion_no_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3016);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5706);


// src/renderEntry.tsx





var currentBundleMode = {
  type: "index"
};
var setBundleMode = (state) => {
  currentBundleMode = state;
};
var getBundleMode = () => {
  return currentBundleMode;
};
remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.CSSUtils.injectCSS(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.CSSUtils.makeDefaultPreviewCSS(null, "#1f2428"));
var getCanSerializeDefaultProps = (object) => {
  try {
    const str = JSON.stringify(object);
    return str.length < 256 * 1024 * 1024 * 0.9;
  } catch (err) {
    if (err.message.includes("Invalid string length")) {
      return false;
    }
    throw err;
  }
};
var isInHeadlessBrowser = () => {
  return typeof window.remotion_puppeteerTimeout !== "undefined";
};
var DelayedSpinner = () => {
  const [show, setShow] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  if (!show) {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(remotion__WEBPACK_IMPORTED_MODULE_2__.AbsoluteFill, {
    style: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 13,
      opacity: 0.6,
      color: "white",
      fontFamily: "Helvetica, Arial, sans-serif"
    },
    children: "Loading Studio"
  });
};
var GetVideoComposition = ({ state }) => {
  const { compositions, currentCompositionMetadata, canvasContent } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.CompositionManager);
  const { setCanvasContent } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.CompositionSetters);
  const portalContainer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const { delayRender, continueRender } = (0,remotion__WEBPACK_IMPORTED_MODULE_2__.useDelayRender)();
  const [handle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => delayRender(`Waiting for Composition "${state.compositionName}"`));
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => continueRender(handle);
  }, [handle, continueRender]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (compositions.length === 0) {
      return;
    }
    const foundComposition = compositions.find((c) => c.id === state.compositionName);
    if (!foundComposition) {
      throw new Error(`Found no composition with the name ${state.compositionName}. The following compositions were found instead: ${compositions.map((c) => c.id).join(", ")}. All compositions must have their ID calculated deterministically and must be mounted at the same time.`);
    }
    setCanvasContent({
      type: "composition",
      compositionId: foundComposition.id
    });
  }, [compositions, state, currentCompositionMetadata, setCanvasContent]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!canvasContent) {
      return;
    }
    const { current } = portalContainer;
    if (!current) {
      throw new Error("portal did not render");
    }
    current.appendChild(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.portalNode());
    continueRender(handle);
    return () => {
      current.removeChild(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.portalNode());
    };
  }, [canvasContent, handle, continueRender]);
  if (!currentCompositionMetadata) {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    ref: portalContainer,
    id: "remotion-canvas",
    style: {
      width: currentCompositionMetadata.width,
      height: currentCompositionMetadata.height,
      display: "flex",
      backgroundColor: "transparent"
    }
  });
};
var DEFAULT_ROOT_COMPONENT_TIMEOUT = 1e4;
var waitForRootHandle = (0,remotion__WEBPACK_IMPORTED_MODULE_2__.delayRender)("Loading root component - See https://remotion.dev/docs/troubleshooting/loading-root-component if you experience a timeout", {
  timeoutInMilliseconds: typeof window === "undefined" ? DEFAULT_ROOT_COMPONENT_TIMEOUT : window.remotion_puppeteerTimeout ?? DEFAULT_ROOT_COMPONENT_TIMEOUT
});
var videoContainer = document.getElementById("video-container");
var root = null;
var getRootForElement = () => {
  if (root) {
    return root;
  }
  root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(videoContainer);
  return root;
};
var renderToDOM = (content) => {
  if (!react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot) {
    if (remotion_no_react__WEBPACK_IMPORTED_MODULE_3__.NoReactInternals.ENABLE_V5_BREAKING_CHANGES) {
      throw new Error("Remotion 5.0 does only support React 18+. However, ReactDOM.createRoot() is undefined.");
    }
    react_dom_client__WEBPACK_IMPORTED_MODULE_1__.render(content, videoContainer);
    return;
  }
  getRootForElement().render(content);
};
var renderContent = (Root) => {
  const bundleMode = getBundleMode();
  if (bundleMode.type === "composition") {
    const markup = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.CompositionManagerProvider, {
      initialCanvasContent: null,
      onlyRenderComposition: bundleMode.compositionName,
      currentCompositionMetadata: {
        props: remotion_no_react__WEBPACK_IMPORTED_MODULE_3__.NoReactInternals.deserializeJSONWithSpecialTypes(bundleMode.serializedResolvedPropsWithSchema),
        durationInFrames: bundleMode.compositionDurationInFrames,
        fps: bundleMode.compositionFps,
        height: bundleMode.compositionHeight,
        width: bundleMode.compositionWidth,
        defaultCodec: bundleMode.compositionDefaultCodec,
        defaultOutName: bundleMode.compositionDefaultOutName,
        defaultVideoImageFormat: bundleMode.compositionDefaultVideoImageFormat,
        defaultPixelFormat: bundleMode.compositionDefaultPixelFormat,
        defaultProResProfile: bundleMode.compositionDefaultProResProfile
      },
      initialCompositions: [],
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.RemotionRootContexts, {
        frameState: null,
        audioEnabled: window.remotion_audioEnabled,
        videoEnabled: window.remotion_videoEnabled,
        logLevel: window.remotion_logLevel,
        numberOfAudioTags: 0,
        nonceContextSeed: 0,
        audioLatencyHint: window.remotion_audioLatencyHint ?? "interactive",
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.RenderAssetManagerProvider, {
          collectAssets: null,
          children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Root, {}),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(GetVideoComposition, {
              state: bundleMode
            })
          ]
        })
      })
    });
    renderToDOM(markup);
  }
  if (bundleMode.type === "evaluation") {
    const markup = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.CompositionManagerProvider, {
      initialCanvasContent: null,
      onlyRenderComposition: null,
      currentCompositionMetadata: null,
      initialCompositions: [],
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.RemotionRootContexts, {
        frameState: null,
        audioEnabled: window.remotion_audioEnabled,
        videoEnabled: window.remotion_videoEnabled,
        logLevel: window.remotion_logLevel,
        numberOfAudioTags: 0,
        audioLatencyHint: window.remotion_audioLatencyHint ?? "interactive",
        nonceContextSeed: 0,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.RenderAssetManagerProvider, {
          collectAssets: null,
          children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Root, {})
        })
      })
    });
    renderToDOM(markup);
  }
  if (bundleMode.type === "index") {
    if (isInHeadlessBrowser()) {
      return;
    }
    renderToDOM(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(DelayedSpinner, {})
    }));
    Promise.all(/* import() */[__webpack_require__.e(962), __webpack_require__.e(771)]).then(__webpack_require__.bind(__webpack_require__, 5962)).then(({ StudioInternals }) => {
      window.remotion_isStudio = true;
      window.remotion_isReadOnlyStudio = true;
      window.remotion_inputProps = "{}";
      remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.enableSequenceStackTraces();
      renderToDOM(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(StudioInternals.Studio, {
        readOnly: true,
        rootComponent: Root
      }));
    }).catch((err) => {
      renderToDOM(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        children: [
          "Failed to load Remotion Studio: ",
          err.message
        ]
      }));
    });
  }
};
remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.waitForRoot((Root) => {
  renderContent(Root);
  (0,remotion__WEBPACK_IMPORTED_MODULE_2__.continueRender)(waitForRootHandle);
});
var setBundleModeAndUpdate = (state) => {
  setBundleMode(state);
  const delay = (0,remotion__WEBPACK_IMPORTED_MODULE_2__.delayRender)("Waiting for root component to load - See https://remotion.dev/docs/troubleshooting/loading-root-component if you experience a timeout");
  remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.waitForRoot((Root) => {
    renderContent(Root);
    requestAnimationFrame(() => {
      (0,remotion__WEBPACK_IMPORTED_MODULE_2__.continueRender)(delay);
    });
  });
};
if (typeof window !== "undefined") {
  const getUnevaluatedComps = () => {
    if (!remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.getRoot()) {
      throw new Error("registerRoot() was never called. 1. Make sure you specified the correct entrypoint for your bundle. 2. If your registerRoot() call is deferred, use the delayRender/continueRender pattern to tell Remotion to wait.");
    }
    if (!remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.compositionsRef.current) {
      throw new Error("Unexpectedly did not have a CompositionManager");
    }
    const compositions = remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.compositionsRef.current.getCompositions();
    const canSerializeDefaultProps = getCanSerializeDefaultProps(compositions);
    if (!canSerializeDefaultProps) {
      remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.Log.warn({ logLevel: window.remotion_logLevel, tag: null }, "defaultProps are too big to serialize - trying to find the problematic composition...");
      remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.Log.warn({ logLevel: window.remotion_logLevel, tag: null }, "Serialization:", compositions);
      for (const comp of compositions) {
        if (!getCanSerializeDefaultProps(comp)) {
          throw new Error(`defaultProps too big - could not serialize - the defaultProps of composition with ID ${comp.id} - the object that was passed to defaultProps was too big. Learn how to mitigate this error by visiting https://remotion.dev/docs/troubleshooting/serialize-defaultprops`);
        }
      }
      remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.Log.warn({ logLevel: window.remotion_logLevel, tag: null }, "Could not single out a problematic composition -  The composition list as a whole is too big to serialize.");
      throw new Error("defaultProps too big - Could not serialize - an object that was passed to defaultProps was too big. Learn how to mitigate this error by visiting https://remotion.dev/docs/troubleshooting/serialize-defaultprops");
    }
    return compositions;
  };
  window.getStaticCompositions = () => {
    const compositions = getUnevaluatedComps();
    const inputProps = typeof window === "undefined" || (0,remotion__WEBPACK_IMPORTED_MODULE_2__.getRemotionEnvironment)().isPlayer ? {} : (0,remotion__WEBPACK_IMPORTED_MODULE_2__.getInputProps)() ?? {};
    return Promise.all(compositions.map(async (c) => {
      const handle = (0,remotion__WEBPACK_IMPORTED_MODULE_2__.delayRender)(`Running calculateMetadata() for composition ${c.id}. If you didn't want to evaluate this composition, use "selectComposition()" instead of "getCompositions()"`);
      const originalProps = {
        ...c.defaultProps ?? {},
        ...inputProps ?? {}
      };
      const comp = remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.resolveVideoConfig({
        calculateMetadata: c.calculateMetadata,
        compositionDurationInFrames: c.durationInFrames ?? null,
        compositionFps: c.fps ?? null,
        compositionHeight: c.height ?? null,
        compositionWidth: c.width ?? null,
        signal: new AbortController().signal,
        inputProps: originalProps,
        defaultProps: c.defaultProps ?? {},
        compositionId: c.id
      });
      const resolved = await Promise.resolve(comp);
      (0,remotion__WEBPACK_IMPORTED_MODULE_2__.continueRender)(handle);
      const { props, defaultProps, ...data } = resolved;
      return {
        ...data,
        serializedResolvedPropsWithCustomSchema: remotion_no_react__WEBPACK_IMPORTED_MODULE_3__.NoReactInternals.serializeJSONWithSpecialTypes({
          data: props,
          indent: undefined,
          staticBase: null
        }).serializedString,
        serializedDefaultPropsWithCustomSchema: remotion_no_react__WEBPACK_IMPORTED_MODULE_3__.NoReactInternals.serializeJSONWithSpecialTypes({
          data: defaultProps,
          indent: undefined,
          staticBase: null
        }).serializedString
      };
    }));
  };
  window.remotion_getCompositionNames = () => {
    return getUnevaluatedComps().map((c) => c.id);
  };
  window.remotion_calculateComposition = async (compId) => {
    const compositions = getUnevaluatedComps();
    const selectedComp = compositions.find((c) => c.id === compId);
    if (!selectedComp) {
      throw new Error(`Could not find composition with ID ${compId}. Available compositions: ${compositions.map((c) => c.id).join(", ")}`);
    }
    const abortController = new AbortController;
    const handle = (0,remotion__WEBPACK_IMPORTED_MODULE_2__.delayRender)(`Running the calculateMetadata() function for composition ${compId}`);
    const inputProps = typeof window === "undefined" || (0,remotion__WEBPACK_IMPORTED_MODULE_2__.getRemotionEnvironment)().isPlayer ? {} : (0,remotion__WEBPACK_IMPORTED_MODULE_2__.getInputProps)() ?? {};
    const originalProps = {
      ...selectedComp.defaultProps ?? {},
      ...inputProps ?? {}
    };
    const prom = await Promise.resolve(remotion__WEBPACK_IMPORTED_MODULE_2__.Internals.resolveVideoConfig({
      calculateMetadata: selectedComp.calculateMetadata,
      compositionDurationInFrames: selectedComp.durationInFrames ?? null,
      compositionFps: selectedComp.fps ?? null,
      compositionHeight: selectedComp.height ?? null,
      compositionWidth: selectedComp.width ?? null,
      inputProps: originalProps,
      signal: abortController.signal,
      defaultProps: selectedComp.defaultProps ?? {},
      compositionId: selectedComp.id
    }));
    (0,remotion__WEBPACK_IMPORTED_MODULE_2__.continueRender)(handle);
    const { props, defaultProps, ...data } = prom;
    return {
      ...data,
      serializedResolvedPropsWithCustomSchema: remotion_no_react__WEBPACK_IMPORTED_MODULE_3__.NoReactInternals.serializeJSONWithSpecialTypes({
        data: props,
        indent: undefined,
        staticBase: null
      }).serializedString,
      serializedDefaultPropsWithCustomSchema: remotion_no_react__WEBPACK_IMPORTED_MODULE_3__.NoReactInternals.serializeJSONWithSpecialTypes({
        data: defaultProps,
        indent: undefined,
        staticBase: null
      }).serializedString
    };
  };
  window.remotion_setBundleMode = setBundleModeAndUpdate;
}



/***/ },

/***/ 8661
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbsoluteFill: () => (/* binding */ AbsoluteFill),
/* harmony export */   AnimatedImage: () => (/* binding */ AnimatedImage),
/* harmony export */   Artifact: () => (/* binding */ Artifact),
/* harmony export */   Audio: () => (/* binding */ Audio),
/* harmony export */   Composition: () => (/* binding */ Composition),
/* harmony export */   Config: () => (/* binding */ Config),
/* harmony export */   Easing: () => (/* binding */ Easing),
/* harmony export */   Experimental: () => (/* binding */ Experimental),
/* harmony export */   Folder: () => (/* binding */ Folder),
/* harmony export */   FolderContext: () => (/* binding */ FolderContext),
/* harmony export */   Freeze: () => (/* binding */ Freeze),
/* harmony export */   Html5Audio: () => (/* binding */ Html5Audio),
/* harmony export */   Html5Video: () => (/* binding */ Html5Video),
/* harmony export */   IFrame: () => (/* binding */ IFrame),
/* harmony export */   Img: () => (/* binding */ Img),
/* harmony export */   Internals: () => (/* binding */ Internals),
/* harmony export */   Loop: () => (/* binding */ Loop),
/* harmony export */   OffthreadVideo: () => (/* binding */ OffthreadVideo),
/* harmony export */   Sequence: () => (/* binding */ Sequence),
/* harmony export */   Series: () => (/* binding */ Series),
/* harmony export */   Still: () => (/* binding */ Still),
/* harmony export */   VERSION: () => (/* binding */ VERSION),
/* harmony export */   Video: () => (/* binding */ Video),
/* harmony export */   cancelRender: () => (/* binding */ cancelRender),
/* harmony export */   continueRender: () => (/* binding */ continueRender),
/* harmony export */   delayRender: () => (/* binding */ delayRender),
/* harmony export */   getInputProps: () => (/* binding */ getInputProps),
/* harmony export */   getRemotionEnvironment: () => (/* binding */ getRemotionEnvironment),
/* harmony export */   getStaticFiles: () => (/* binding */ getStaticFiles),
/* harmony export */   interpolate: () => (/* binding */ interpolate),
/* harmony export */   interpolateColors: () => (/* binding */ interpolateColors),
/* harmony export */   measureSpring: () => (/* binding */ measureSpring),
/* harmony export */   prefetch: () => (/* binding */ prefetch),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   registerRoot: () => (/* binding */ registerRoot),
/* harmony export */   spring: () => (/* binding */ spring),
/* harmony export */   staticFile: () => (/* binding */ staticFile),
/* harmony export */   useBufferState: () => (/* binding */ useBufferState),
/* harmony export */   useCurrentFrame: () => (/* binding */ useCurrentFrame),
/* harmony export */   useCurrentScale: () => (/* binding */ useCurrentScale),
/* harmony export */   useDelayRender: () => (/* binding */ useDelayRender),
/* harmony export */   useRemotionEnvironment: () => (/* binding */ useRemotionEnvironment),
/* harmony export */   useVideoConfig: () => (/* binding */ useVideoConfig),
/* harmony export */   watchStaticFile: () => (/* binding */ watchStaticFile)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9922);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5706);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5075);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/_check-rsc.ts

if (typeof react__WEBPACK_IMPORTED_MODULE_0__.createContext !== "function") {
  const err = [
    'Remotion requires React.createContext, but it is "undefined".',
    'If you are in a React Server Component, turn it into a client component by adding "use client" at the top of the file.',
    "",
    "Before:",
    '  import {useCurrentFrame} from "remotion";',
    "",
    "After:",
    '  "use client";',
    '  import {useCurrentFrame} from "remotion";'
  ];
  throw new Error(err.join(`
`));
}

// src/Clipper.tsx
var Clipper = () => {
  throw new Error("<Clipper> has been removed as of Remotion v4.0.228. The native clipping APIs were experimental and subject to removal at any time. We removed them because they were sparingly used and made rendering often slower rather than faster.");
};

// src/enable-sequence-stack-traces.ts



// src/get-remotion-environment.ts
function getNodeEnvString() {
  return ["NOD", "E_EN", "V"].join("");
}
var getEnvString = () => {
  return ["e", "nv"].join("");
};
var getRemotionEnvironment = () => {
  const isPlayer = typeof window !== "undefined" && window.remotion_isPlayer;
  const isRendering = typeof window !== "undefined" && typeof window.process !== "undefined" && typeof window.process.env !== "undefined" && (window.process[getEnvString()][getNodeEnvString()] === "test" || window.process[getEnvString()][getNodeEnvString()] === "production" && typeof window !== "undefined" && typeof window.remotion_puppeteerTimeout !== "undefined");
  const isStudio = typeof window !== "undefined" && window.remotion_isStudio;
  const isReadOnlyStudio = typeof window !== "undefined" && window.remotion_isReadOnlyStudio;
  return {
    isStudio,
    isRendering,
    isPlayer,
    isReadOnlyStudio,
    isClientSideRendering: false
  };
};

// src/enable-sequence-stack-traces.ts
var originalCreateElement = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
var originalJsx = react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx;
var componentsToAddStacksTo = [];
var enableProxy = (api) => {
  return new Proxy(api, {
    apply(target, thisArg, argArray) {
      if (componentsToAddStacksTo.includes(argArray[0])) {
        const [first, props, ...rest] = argArray;
        const newProps = props.stack ? props : {
          ...props ?? {},
          stack: new Error().stack
        };
        return Reflect.apply(target, thisArg, [first, newProps, ...rest]);
      }
      return Reflect.apply(target, thisArg, argArray);
    }
  });
};
var enableSequenceStackTraces = () => {
  if (!getRemotionEnvironment().isStudio) {
    return;
  }
  react__WEBPACK_IMPORTED_MODULE_0__.createElement = enableProxy(originalCreateElement);
  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx = enableProxy(originalJsx);
};
var addSequenceStackTraces = (component) => {
  componentsToAddStacksTo.push(component);
  enableSequenceStackTraces();
};

// src/is-player.tsx


var IsPlayerContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);
var IsPlayerContextProvider = ({
  children
}) => {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(IsPlayerContext.Provider, {
    value: true,
    children
  });
};
var useIsPlayer = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(IsPlayerContext);
};

// src/truthy.ts
function truthy(value) {
  return Boolean(value);
}

// src/version.ts
var VERSION = "4.0.421";

// src/multiple-versions-warning.ts
var checkMultipleRemotionVersions = () => {
  if (typeof globalThis === "undefined") {
    return;
  }
  const set = () => {
    globalThis.remotion_imported = VERSION;
    if (typeof window !== "undefined") {
      window.remotion_imported = VERSION;
    }
  };
  const alreadyImported = globalThis.remotion_imported || typeof window !== "undefined" && window.remotion_imported;
  if (alreadyImported) {
    if (alreadyImported === VERSION) {
      return;
    }
    if (typeof alreadyImported === "string" && alreadyImported.includes("webcodecs")) {
      set();
      return;
    }
    throw new TypeError(`\uD83D\uDEA8 Multiple versions of Remotion detected: ${[
      VERSION,
      typeof alreadyImported === "string" ? alreadyImported : "an older version"
    ].filter(truthy).join(" and ")}. This will cause things to break in an unexpected way.
Check that all your Remotion packages are on the same version. If your dependencies depend on Remotion, make them peer dependencies. You can also run \`npx remotion versions\` from your terminal to see which versions are mismatching.`);
  }
  set();
};

// src/Null.tsx
var Null = () => {
  throw new Error("<Null> has been removed as of Remotion v4.0.228. The native clipping APIs were experimental and subject to removal at any time. We removed them because they were sparingly used and made rendering often slower rather than faster.");
};

// src/Sequence.tsx


// src/AbsoluteFill.tsx


var hasTailwindClassName = ({
  className,
  classPrefix,
  type
}) => {
  if (!className) {
    return false;
  }
  if (type === "exact") {
    const split = className.split(" ");
    return classPrefix.some((token) => {
      return split.some((part) => {
        return part.trim() === token || part.trim().endsWith(`:${token}`) || part.trim().endsWith(`!${token}`);
      });
    });
  }
  return classPrefix.some((prefix) => {
    return className.startsWith(prefix) || className.includes(` ${prefix}`) || className.includes(`!${prefix}`) || className.includes(`:${prefix}`);
  });
};
var AbsoluteFillRefForwarding = (props, ref) => {
  const { style, ...other } = props;
  const actualStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      position: "absolute",
      top: hasTailwindClassName({
        className: other.className,
        classPrefix: ["top-", "inset-"],
        type: "prefix"
      }) ? undefined : 0,
      left: hasTailwindClassName({
        className: other.className,
        classPrefix: ["left-", "inset-"],
        type: "prefix"
      }) ? undefined : 0,
      right: hasTailwindClassName({
        className: other.className,
        classPrefix: ["right-", "inset-"],
        type: "prefix"
      }) ? undefined : 0,
      bottom: hasTailwindClassName({
        className: other.className,
        classPrefix: ["bottom-", "inset-"],
        type: "prefix"
      }) ? undefined : 0,
      width: hasTailwindClassName({
        className: other.className,
        classPrefix: ["w-"],
        type: "prefix"
      }) ? undefined : "100%",
      height: hasTailwindClassName({
        className: other.className,
        classPrefix: ["h-"],
        type: "prefix"
      }) ? undefined : "100%",
      display: hasTailwindClassName({
        className: other.className,
        classPrefix: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden"
        ],
        type: "exact"
      }) ? undefined : "flex",
      flexDirection: hasTailwindClassName({
        className: other.className,
        classPrefix: [
          "flex-row",
          "flex-col",
          "flex-row-reverse",
          "flex-col-reverse"
        ],
        type: "exact"
      }) ? undefined : "column",
      ...style
    };
  }, [other.className, style]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ref,
    style: actualStyle,
    ...other
  });
};
var AbsoluteFill = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(AbsoluteFillRefForwarding);

// src/SequenceContext.tsx

var SequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);

// src/SequenceManager.tsx


var SequenceManager = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  registerSequence: () => {
    throw new Error("SequenceManagerContext not initialized");
  },
  unregisterSequence: () => {
    throw new Error("SequenceManagerContext not initialized");
  },
  sequences: []
});
var SequenceVisibilityToggleContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  hidden: {},
  setHidden: () => {
    throw new Error("SequenceVisibilityToggle not initialized");
  }
});
var SequenceManagerProvider = ({ children }) => {
  const [sequences, setSequences] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [hidden, setHidden] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const registerSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((seq) => {
    setSequences((seqs) => {
      return [...seqs, seq];
    });
  }, []);
  const unregisterSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((seq) => {
    setSequences((seqs) => seqs.filter((s) => s.id !== seq));
  }, []);
  const sequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      registerSequence,
      sequences,
      unregisterSequence
    };
  }, [registerSequence, sequences, unregisterSequence]);
  const hiddenContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      hidden,
      setHidden
    };
  }, [hidden]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SequenceManager.Provider, {
    value: sequenceContext,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SequenceVisibilityToggleContext.Provider, {
      value: hiddenContext,
      children
    })
  });
};

// src/TimelineContext.tsx


// src/random.ts
function mulberry32(a) {
  let t = a + 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function hashCode(str) {
  let i = 0;
  let chr = 0;
  let hash = 0;
  for (i = 0;i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}
var random = (seed, dummy) => {
  if (dummy !== undefined) {
    throw new TypeError("random() takes only one argument");
  }
  if (seed === null) {
    return Math.random();
  }
  if (typeof seed === "string") {
    return mulberry32(hashCode(seed));
  }
  if (typeof seed === "number") {
    return mulberry32(seed * 10000000000);
  }
  throw new Error("random() argument must be a number or a string");
};

// src/timeline-position-state.ts
var exports_timeline_position_state = {};
__export(exports_timeline_position_state, {
  useTimelineSetFrame: () => useTimelineSetFrame,
  useTimelinePosition: () => useTimelinePosition,
  usePlayingState: () => usePlayingState,
  persistCurrentFrame: () => persistCurrentFrame,
  getInitialFrameState: () => getInitialFrameState,
  getFrameForComposition: () => getFrameForComposition
});


// src/use-remotion-environment.ts


// src/remotion-environment-context.ts

var RemotionEnvironmentContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

// src/use-remotion-environment.ts
var useRemotionEnvironment = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(RemotionEnvironmentContext);
  const [env] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => getRemotionEnvironment());
  return context ?? env;
};

// src/use-video.ts


// src/CompositionManagerContext.tsx

var CompositionManager = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  compositions: [],
  folders: [],
  currentCompositionMetadata: null,
  canvasContent: null
});
var CompositionSetters = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  registerComposition: () => {
    return;
  },
  unregisterComposition: () => {
    return;
  },
  registerFolder: () => {
    return;
  },
  unregisterFolder: () => {
    return;
  },
  setCanvasContent: () => {
    return;
  },
  updateCompositionDefaultProps: () => {
    return;
  },
  onlyRenderComposition: null
});

// src/ResolveCompositionConfig.tsx


// src/EditorProps.tsx


var EditorPropsContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  props: {},
  updateProps: () => {
    throw new Error("Not implemented");
  },
  resetUnsaved: () => {
    throw new Error("Not implemented");
  }
});
var editorPropsProviderRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
var timeValueRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
var EditorPropsProvider = ({ children }) => {
  const [props, setProps] = react__WEBPACK_IMPORTED_MODULE_0__.useState({});
  const updateProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({
    defaultProps,
    id,
    newProps
  }) => {
    setProps((prev) => {
      return {
        ...prev,
        [id]: typeof newProps === "function" ? newProps(prev[id] ?? defaultProps) : newProps
      };
    });
  }, []);
  const resetUnsaved = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((compositionId) => {
    setProps((prev) => {
      if (prev[compositionId]) {
        const newProps = { ...prev };
        delete newProps[compositionId];
        return newProps;
      }
      return prev;
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(editorPropsProviderRef, () => {
    return {
      getProps: () => props,
      setProps
    };
  }, [props]);
  const ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return { props, updateProps, resetUnsaved };
  }, [props, resetUnsaved, updateProps]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(EditorPropsContext.Provider, {
    value: ctx,
    children
  });
};

// src/input-props-override.ts
var getKey = () => {
  return `remotion_inputPropsOverride` + window.location.origin;
};
var getInputPropsOverride = () => {
  if (typeof localStorage === "undefined")
    return null;
  const override = localStorage.getItem(getKey());
  if (!override)
    return null;
  return JSON.parse(override);
};
var setInputPropsOverride = (override) => {
  if (typeof localStorage === "undefined")
    return;
  if (override === null) {
    localStorage.removeItem(getKey());
    return;
  }
  localStorage.setItem(getKey(), JSON.stringify(override));
};

// src/input-props-serialization.ts
var DATE_TOKEN = "remotion-date:";
var FILE_TOKEN = "remotion-file:";
var serializeJSONWithSpecialTypes = ({
  data,
  indent,
  staticBase
}) => {
  let customDateUsed = false;
  let customFileUsed = false;
  let mapUsed = false;
  let setUsed = false;
  try {
    const serializedString = JSON.stringify(data, function(key, value) {
      const item = this[key];
      if (item instanceof Date) {
        customDateUsed = true;
        return `${DATE_TOKEN}${item.toISOString()}`;
      }
      if (item instanceof Map) {
        mapUsed = true;
        return value;
      }
      if (item instanceof Set) {
        setUsed = true;
        return value;
      }
      if (typeof item === "string" && staticBase !== null && item.startsWith(staticBase)) {
        customFileUsed = true;
        return `${FILE_TOKEN}${item.replace(staticBase + "/", "")}`;
      }
      return value;
    }, indent);
    return { serializedString, customDateUsed, customFileUsed, mapUsed, setUsed };
  } catch (err) {
    throw new Error("Could not serialize the passed input props to JSON: " + err.message);
  }
};
var deserializeJSONWithSpecialTypes = (data) => {
  return JSON.parse(data, (_, value) => {
    if (typeof value === "string" && value.startsWith(DATE_TOKEN)) {
      return new Date(value.replace(DATE_TOKEN, ""));
    }
    if (typeof value === "string" && value.startsWith(FILE_TOKEN)) {
      return `${window.remotion_staticBase}/${value.replace(FILE_TOKEN, "")}`;
    }
    return value;
  });
};
var serializeThenDeserialize = (props) => {
  return deserializeJSONWithSpecialTypes(serializeJSONWithSpecialTypes({
    data: props,
    indent: 2,
    staticBase: window.remotion_staticBase
  }).serializedString);
};
var serializeThenDeserializeInStudio = (props) => {
  if (getRemotionEnvironment().isStudio) {
    return serializeThenDeserialize(props);
  }
  return props;
};

// src/config/input-props.ts
var didWarnSSRImport = false;
var warnOnceSSRImport = () => {
  if (didWarnSSRImport) {
    return;
  }
  didWarnSSRImport = true;
  console.warn("Called `getInputProps()` on the server. This function is not available server-side and has returned an empty object.");
  console.warn("To hide this warning, don't call this function on the server:");
  console.warn("  typeof window === 'undefined' ? {} : getInputProps()");
};
var getInputProps = () => {
  if (typeof window === "undefined") {
    warnOnceSSRImport();
    return {};
  }
  if (getRemotionEnvironment().isPlayer) {
    throw new Error("You cannot call `getInputProps()` from a <Player>. Instead, the props are available as React props from component that you passed as `component` prop.");
  }
  const override = getInputPropsOverride();
  if (override) {
    return override;
  }
  if (typeof window === "undefined" || typeof window.remotion_inputProps === "undefined") {
    throw new Error("Cannot call `getInputProps()` - window.remotion_inputProps is not set. This API is only available if you are in the Studio, or while you are rendering server-side.");
  }
  const param = window.remotion_inputProps;
  if (!param) {
    return {};
  }
  const parsed = deserializeJSONWithSpecialTypes(param);
  return parsed;
};

// src/validation/validate-dimensions.ts
function validateDimension(amount, nameOfProp, location) {
  if (typeof amount !== "number") {
    throw new Error(`The "${nameOfProp}" prop ${location} must be a number, but you passed a value of type ${typeof amount}`);
  }
  if (isNaN(amount)) {
    throw new TypeError(`The "${nameOfProp}" prop ${location} must not be NaN, but is NaN.`);
  }
  if (!Number.isFinite(amount)) {
    throw new TypeError(`The "${nameOfProp}" prop ${location} must be finite, but is ${amount}.`);
  }
  if (amount % 1 !== 0) {
    throw new TypeError(`The "${nameOfProp}" prop ${location} must be an integer, but is ${amount}.`);
  }
  if (amount <= 0) {
    throw new TypeError(`The "${nameOfProp}" prop ${location} must be positive, but got ${amount}.`);
  }
}

// src/validation/validate-duration-in-frames.ts
function validateDurationInFrames(durationInFrames, options) {
  const { allowFloats, component } = options;
  if (typeof durationInFrames === "undefined") {
    throw new Error(`The "durationInFrames" prop ${component} is missing.`);
  }
  if (typeof durationInFrames !== "number") {
    throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
  }
  if (durationInFrames <= 0) {
    throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
  }
  if (!allowFloats && durationInFrames % 1 !== 0) {
    throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
  }
  if (!Number.isFinite(durationInFrames)) {
    throw new TypeError(`The "durationInFrames" prop ${component} must be finite, but got ${durationInFrames}.`);
  }
}

// src/validation/validate-fps.ts
function validateFps(fps, location, isGif) {
  if (typeof fps !== "number") {
    throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
  }
  if (!Number.isFinite(fps)) {
    throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
  }
  if (isNaN(fps)) {
    throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
  }
  if (fps <= 0) {
    throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
  }
  if (isGif && fps > 50) {
    throw new TypeError(`The FPS for a GIF cannot be higher than 50. Use the --every-nth-frame option to lower the FPS: https://remotion.dev/docs/render-as-gif`);
  }
}

// src/ResolveCompositionConfig.tsx
var ResolveCompositionContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
var resolveCompositionsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
var needsResolution = (composition) => {
  return Boolean(composition.calculateMetadata);
};
var PROPS_UPDATED_EXTERNALLY = "remotion.propsUpdatedExternally";
var useResolvedVideoConfig = (preferredCompositionId) => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ResolveCompositionContext);
  const { props: allEditorProps } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EditorPropsContext);
  const { compositions, canvasContent, currentCompositionMetadata } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(CompositionManager);
  const currentComposition = canvasContent?.type === "composition" ? canvasContent.compositionId : null;
  const compositionId = preferredCompositionId ?? currentComposition;
  const composition = compositions.find((c) => c.id === compositionId);
  const selectedEditorProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return composition ? allEditorProps[composition.id] ?? {} : {};
  }, [allEditorProps, composition]);
  const env = useRemotionEnvironment();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!composition) {
      return null;
    }
    if (currentCompositionMetadata) {
      return {
        type: "success",
        result: {
          ...currentCompositionMetadata,
          id: composition.id,
          defaultProps: composition.defaultProps ?? {}
        }
      };
    }
    if (!needsResolution(composition)) {
      validateDurationInFrames(composition.durationInFrames, {
        allowFloats: false,
        component: `in <Composition id="${composition.id}">`
      });
      validateFps(composition.fps, `in <Composition id="${composition.id}">`, false);
      validateDimension(composition.width, "width", `in <Composition id="${composition.id}">`);
      validateDimension(composition.height, "height", `in <Composition id="${composition.id}">`);
      return {
        type: "success",
        result: {
          width: composition.width,
          height: composition.height,
          fps: composition.fps,
          id: composition.id,
          durationInFrames: composition.durationInFrames,
          defaultProps: composition.defaultProps ?? {},
          props: {
            ...composition.defaultProps ?? {},
            ...selectedEditorProps ?? {},
            ...typeof window === "undefined" || env.isPlayer || !window.remotion_inputProps ? {} : getInputProps() ?? {}
          },
          defaultCodec: null,
          defaultOutName: null,
          defaultVideoImageFormat: null,
          defaultPixelFormat: null,
          defaultProResProfile: null
        }
      };
    }
    if (!context) {
      return null;
    }
    if (!context[composition.id]) {
      return null;
    }
    return context[composition.id];
  }, [
    composition,
    context,
    currentCompositionMetadata,
    selectedEditorProps,
    env.isPlayer
  ]);
};

// src/use-video.ts
var useVideo = () => {
  const { canvasContent, compositions, currentCompositionMetadata } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(CompositionManager);
  const selected = compositions.find((c) => {
    return canvasContent?.type === "composition" && c.id === canvasContent.compositionId;
  });
  const resolved = useResolvedVideoConfig(selected?.id ?? null);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!resolved) {
      return null;
    }
    if (resolved.type === "error") {
      return null;
    }
    if (resolved.type === "loading") {
      return null;
    }
    if (!selected) {
      return null;
    }
    return {
      ...resolved.result,
      defaultProps: selected.defaultProps ?? {},
      id: selected.id,
      ...currentCompositionMetadata ?? {},
      component: selected.component
    };
  }, [currentCompositionMetadata, resolved, selected]);
};

// src/timeline-position-state.ts
var makeKey = () => {
  return `remotion.time-all`;
};
var persistCurrentFrame = (time) => {
  localStorage.setItem(makeKey(), JSON.stringify(time));
};
var getInitialFrameState = () => {
  const item = localStorage.getItem(makeKey()) ?? "{}";
  const obj = JSON.parse(item);
  return obj;
};
var getFrameForComposition = (composition) => {
  const item = localStorage.getItem(makeKey()) ?? "{}";
  const obj = JSON.parse(item);
  if (obj[composition] !== undefined) {
    return Number(obj[composition]);
  }
  if (typeof window === "undefined") {
    return 0;
  }
  return window.remotion_initialFrame ?? 0;
};
var useTimelinePosition = () => {
  const videoConfig = useVideo();
  const state = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TimelineContext);
  const env = useRemotionEnvironment();
  if (!videoConfig) {
    return typeof window === "undefined" ? 0 : window.remotion_initialFrame ?? 0;
  }
  const unclamped = state.frame[videoConfig.id] ?? (env.isPlayer ? 0 : getFrameForComposition(videoConfig.id));
  return Math.min(videoConfig.durationInFrames - 1, unclamped);
};
var useTimelineSetFrame = () => {
  const { setFrame } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SetTimelineContext);
  return setFrame;
};
var usePlayingState = () => {
  const { playing, imperativePlaying } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TimelineContext);
  const { setPlaying } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SetTimelineContext);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => [playing, setPlaying, imperativePlaying], [imperativePlaying, playing, setPlaying]);
};

// src/use-delay-render.tsx


// src/cancel-render.ts
var getErrorStackWithMessage = (error) => {
  const stack = error.stack ?? "";
  return stack.startsWith("Error:") ? stack : `${error.message}
${stack}`;
};
var isErrorLike = (err) => {
  if (err instanceof Error) {
    return true;
  }
  if (err === null) {
    return false;
  }
  if (typeof err !== "object") {
    return false;
  }
  if (!("stack" in err)) {
    return false;
  }
  if (typeof err.stack !== "string") {
    return false;
  }
  if (!("message" in err)) {
    return false;
  }
  if (typeof err.message !== "string") {
    return false;
  }
  return true;
};
function cancelRenderInternal(scope, err) {
  let error;
  if (isErrorLike(err)) {
    error = err;
    if (!error.stack) {
      error.stack = new Error(error.message).stack;
    }
  } else if (typeof err === "string") {
    error = Error(err);
  } else {
    error = Error("Rendering was cancelled");
  }
  if (scope) {
    scope.remotion_cancelledError = getErrorStackWithMessage(error);
  }
  throw error;
}
function cancelRender(err) {
  return cancelRenderInternal(typeof window !== "undefined" ? window : undefined, err);
}

// src/log.ts
var logLevels = ["trace", "verbose", "info", "warn", "error"];
var getNumberForLogLevel = (level) => {
  return logLevels.indexOf(level);
};
var isEqualOrBelowLogLevel = (currentLevel, level) => {
  return getNumberForLogLevel(currentLevel) <= getNumberForLogLevel(level);
};
var transformArgs = ({
  args,
  logLevel,
  tag
}) => {
  const arr = [...args];
  if (getRemotionEnvironment().isRendering && !getRemotionEnvironment().isClientSideRendering) {
    arr.unshift(Symbol.for(`__remotion_level_${logLevel}`));
  }
  if (tag && getRemotionEnvironment().isRendering && !getRemotionEnvironment().isClientSideRendering) {
    arr.unshift(Symbol.for(`__remotion_tag_${tag}`));
  }
  return arr;
};
var verbose = (options, ...args) => {
  if (isEqualOrBelowLogLevel(options.logLevel, "verbose")) {
    return console.debug(...transformArgs({ args, logLevel: "verbose", tag: options.tag }));
  }
};
var trace = (options, ...args) => {
  if (isEqualOrBelowLogLevel(options.logLevel, "trace")) {
    return console.debug(...transformArgs({ args, logLevel: "trace", tag: options.tag }));
  }
};
var info = (options, ...args) => {
  if (isEqualOrBelowLogLevel(options.logLevel, "info")) {
    return console.log(...transformArgs({ args, logLevel: "info", tag: options.tag }));
  }
};
var warn = (options, ...args) => {
  if (isEqualOrBelowLogLevel(options.logLevel, "warn")) {
    return console.warn(...transformArgs({ args, logLevel: "warn", tag: options.tag }));
  }
};
var error = (options, ...args) => {
  return console.error(...transformArgs({ args, logLevel: "error", tag: options.tag }));
};
var Log = {
  trace,
  verbose,
  info,
  warn,
  error
};

// src/delay-render.ts
if (typeof window !== "undefined") {
  window.remotion_renderReady = false;
  if (!window.remotion_delayRenderTimeouts) {
    window.remotion_delayRenderTimeouts = {};
  }
  window.remotion_delayRenderHandles = [];
}
var DELAY_RENDER_CALLSTACK_TOKEN = "The delayRender was called:";
var DELAY_RENDER_RETRIES_LEFT = "Retries left: ";
var DELAY_RENDER_RETRY_TOKEN = "- Rendering the frame will be retried.";
var DELAY_RENDER_CLEAR_TOKEN = "handle was cleared after";
var defaultTimeout = 30000;
var delayRenderInternal = ({
  scope,
  environment,
  label,
  options
}) => {
  if (typeof label !== "string" && label !== null) {
    throw new Error("The label parameter of delayRender() must be a string or undefined, got: " + JSON.stringify(label));
  }
  const handle = Math.random();
  scope.remotion_delayRenderHandles.push(handle);
  const called = Error().stack?.replace(/^Error/g, "") ?? "";
  if (environment.isRendering) {
    const timeoutToUse = (options?.timeoutInMilliseconds ?? scope.remotion_puppeteerTimeout ?? defaultTimeout) - 2000;
    const retriesLeft = (options?.retries ?? 0) - (scope.remotion_attempt - 1);
    scope.remotion_delayRenderTimeouts[handle] = {
      label: label ?? null,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        const message = [
          `A delayRender()`,
          label ? `"${label}"` : null,
          `was called but not cleared after ${timeoutToUse}ms. See https://remotion.dev/docs/timeout for help.`,
          retriesLeft > 0 ? DELAY_RENDER_RETRIES_LEFT + retriesLeft : null,
          retriesLeft > 0 ? DELAY_RENDER_RETRY_TOKEN : null,
          DELAY_RENDER_CALLSTACK_TOKEN,
          called
        ].filter(truthy).join(" ");
        if (environment.isClientSideRendering) {
          scope.remotion_cancelledError = getErrorStackWithMessage(Error(message));
        } else {
          cancelRenderInternal(scope, Error(message));
        }
      }, timeoutToUse)
    };
  }
  scope.remotion_renderReady = false;
  return handle;
};
var delayRender = (label, options) => {
  if (typeof window === "undefined") {
    return Math.random();
  }
  return delayRenderInternal({
    scope: window,
    environment: getRemotionEnvironment(),
    label: label ?? null,
    options: options ?? {}
  });
};
var continueRenderInternal = ({
  scope,
  handle,
  environment,
  logLevel
}) => {
  if (typeof handle === "undefined") {
    throw new TypeError("The continueRender() method must be called with a parameter that is the return value of delayRender(). No value was passed.");
  }
  if (typeof handle !== "number") {
    throw new TypeError("The parameter passed into continueRender() must be the return value of delayRender() which is a number. Got: " + JSON.stringify(handle));
  }
  scope.remotion_delayRenderHandles = scope.remotion_delayRenderHandles.filter((h) => {
    if (h === handle) {
      if (environment.isRendering && scope !== undefined) {
        if (!scope.remotion_delayRenderTimeouts[handle]) {
          return false;
        }
        const { label, startTime, timeout } = scope.remotion_delayRenderTimeouts[handle];
        clearTimeout(timeout);
        const message = [
          label ? `"${label}"` : "A handle",
          DELAY_RENDER_CLEAR_TOKEN,
          `${Date.now() - startTime}ms`
        ].filter(truthy).join(" ");
        Log.verbose({ logLevel, tag: "delayRender()" }, message);
        delete scope.remotion_delayRenderTimeouts[handle];
      }
      return false;
    }
    return true;
  });
  if (scope.remotion_delayRenderHandles.length === 0) {
    scope.remotion_renderReady = true;
  }
};
var continueRender = (handle) => {
  if (typeof window === "undefined") {
    return;
  }
  continueRenderInternal({
    scope: window,
    handle,
    environment: getRemotionEnvironment(),
    logLevel: window.remotion_logLevel ?? "info"
  });
};

// src/log-level-context.tsx


var LogLevelContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  logLevel: "info",
  mountTime: 0
});
var useLogLevel = () => {
  const { logLevel } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(LogLevelContext);
  if (logLevel === null) {
    throw new Error("useLogLevel must be used within a LogLevelProvider");
  }
  return logLevel;
};
var useMountTime = () => {
  const { mountTime } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(LogLevelContext);
  if (mountTime === null) {
    throw new Error("useMountTime must be used within a LogLevelProvider");
  }
  return mountTime;
};

// src/use-delay-render.tsx
var DelayRenderContextType = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
var useDelayRender = () => {
  const environment = useRemotionEnvironment();
  const scope = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DelayRenderContextType) ?? (typeof window !== "undefined" ? window : undefined);
  const logLevel = useLogLevel();
  const delayRender2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((label, options) => {
    if (!scope) {
      return Math.random();
    }
    return delayRenderInternal({
      scope,
      environment,
      label: label ?? null,
      options: options ?? {}
    });
  }, [environment, scope]);
  const continueRender2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((handle) => {
    if (!scope) {
      return;
    }
    continueRenderInternal({
      scope,
      handle,
      environment,
      logLevel
    });
  }, [environment, logLevel, scope]);
  const cancelRender2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((err) => {
    return cancelRenderInternal(scope ?? (typeof window !== "undefined" ? window : undefined), err);
  }, [scope]);
  return { delayRender: delayRender2, continueRender: continueRender2, cancelRender: cancelRender2 };
};

// src/TimelineContext.tsx

var SetTimelineContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  setFrame: () => {
    throw new Error("default");
  },
  setPlaying: () => {
    throw new Error("default");
  }
});
var TimelineContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  frame: {},
  playing: false,
  playbackRate: 1,
  rootId: "",
  imperativePlaying: {
    current: false
  },
  setPlaybackRate: () => {
    throw new Error("default");
  },
  audioAndVideoTags: { current: [] }
});
var TimelineContextProvider = ({ children, frameState }) => {
  const [playing, setPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const imperativePlaying = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const [playbackRate, setPlaybackRate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const audioAndVideoTags = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  const [remotionRootId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => String(random(null)));
  const [_frame, setFrame] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => getInitialFrameState());
  const frame = frameState ?? _frame;
  const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
  if (typeof window !== "undefined") {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
      window.remotion_setFrame = (f, composition, attempt) => {
        window.remotion_attempt = attempt;
        const id = delayRender2(`Setting the current frame to ${f}`);
        let asyncUpdate = true;
        setFrame((s) => {
          const currentFrame = s[composition] ?? window.remotion_initialFrame;
          if (currentFrame === f) {
            asyncUpdate = false;
            return s;
          }
          return {
            ...s,
            [composition]: f
          };
        });
        if (asyncUpdate) {
          requestAnimationFrame(() => continueRender2(id));
        } else {
          continueRender2(id);
        }
      };
      window.remotion_isPlayer = false;
    }, [continueRender2, delayRender2]);
  }
  const timelineContextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      frame,
      playing,
      imperativePlaying,
      rootId: remotionRootId,
      playbackRate,
      setPlaybackRate,
      audioAndVideoTags
    };
  }, [frame, playbackRate, playing, remotionRootId]);
  const setTimelineContextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      setFrame,
      setPlaying
    };
  }, []);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TimelineContext.Provider, {
    value: timelineContextValue,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SetTimelineContext.Provider, {
      value: setTimelineContextValue,
      children
    })
  });
};

// src/nonce.ts

var NonceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  getNonce: () => 0
});
var useNonce = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(NonceContext);
  const [nonce, setNonce] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => context.getNonce());
  const lastContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(context);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (lastContext.current === context) {
      return;
    }
    lastContext.current = context;
    setNonce(context.getNonce);
  }, [context]);
  return nonce;
};

// src/use-video-config.ts


// src/CanUseRemotionHooks.tsx


var CanUseRemotionHooks = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);
var CanUseRemotionHooksProvider = ({ children }) => {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CanUseRemotionHooks.Provider, {
    value: true,
    children
  });
};

// src/use-unsafe-video-config.ts

var useUnsafeVideoConfig = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const ctxWidth = context?.width ?? null;
  const ctxHeight = context?.height ?? null;
  const ctxDuration = context?.durationInFrames ?? null;
  const video = useVideo();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!video) {
      return null;
    }
    const {
      id,
      durationInFrames,
      fps,
      height,
      width,
      defaultProps,
      props,
      defaultCodec,
      defaultOutName,
      defaultVideoImageFormat,
      defaultPixelFormat,
      defaultProResProfile
    } = video;
    return {
      id,
      width: ctxWidth ?? width,
      height: ctxHeight ?? height,
      fps,
      durationInFrames: ctxDuration ?? durationInFrames,
      defaultProps,
      props,
      defaultCodec,
      defaultOutName,
      defaultVideoImageFormat,
      defaultPixelFormat,
      defaultProResProfile
    };
  }, [ctxDuration, ctxHeight, ctxWidth, video]);
};

// src/use-video-config.ts
var useVideoConfig = () => {
  const videoConfig = useUnsafeVideoConfig();
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(CanUseRemotionHooks);
  const isPlayer = useIsPlayer();
  if (!videoConfig) {
    if (typeof window !== "undefined" && window.remotion_isPlayer || isPlayer) {
      throw new Error([
        "No video config found. Likely reasons:",
        "- You are probably calling useVideoConfig() from outside the component passed to <Player />. See https://www.remotion.dev/docs/player/examples for how to set up the Player correctly.",
        "- You have multiple versions of Remotion installed which causes the React context to get lost."
      ].join("-"));
    }
    throw new Error("No video config found. You are probably calling useVideoConfig() from a component which has not been registered as a <Composition />. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions for more information.");
  }
  if (!context) {
    throw new Error("Called useVideoConfig() outside a Remotion composition.");
  }
  return videoConfig;
};

// src/freeze.tsx


// src/use-current-frame.ts

var useCurrentFrame = () => {
  const canUseRemotionHooks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(CanUseRemotionHooks);
  const env = useRemotionEnvironment();
  if (!canUseRemotionHooks) {
    if (env.isPlayer) {
      throw new Error(`useCurrentFrame can only be called inside a component that was passed to <Player>. See: https://www.remotion.dev/docs/player/examples`);
    }
    throw new Error(`useCurrentFrame() can only be called inside a component that was registered as a composition. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions`);
  }
  const frame = useTimelinePosition();
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const contextOffset = context ? context.cumulatedFrom + context.relativeFrom : 0;
  return frame - contextOffset;
};

// src/freeze.tsx

var Freeze = ({
  frame: frameToFreeze,
  children,
  active = true
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  if (typeof frameToFreeze === "undefined") {
    throw new Error(`The <Freeze /> component requires a 'frame' prop, but none was passed.`);
  }
  if (typeof frameToFreeze !== "number") {
    throw new Error(`The 'frame' prop of <Freeze /> must be a number, but is of type ${typeof frameToFreeze}`);
  }
  if (Number.isNaN(frameToFreeze)) {
    throw new Error(`The 'frame' prop of <Freeze /> must be a real number, but it is NaN.`);
  }
  if (!Number.isFinite(frameToFreeze)) {
    throw new Error(`The 'frame' prop of <Freeze /> must be a finite number, but it is ${frameToFreeze}.`);
  }
  const isActive = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (typeof active === "boolean") {
      return active;
    }
    if (typeof active === "function") {
      return active(frame);
    }
  }, [active, frame]);
  const timelineContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TimelineContext);
  const sequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const relativeFrom = sequenceContext?.relativeFrom ?? 0;
  const timelineValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!isActive) {
      return timelineContext;
    }
    return {
      ...timelineContext,
      playing: false,
      imperativePlaying: {
        current: false
      },
      frame: {
        [videoConfig.id]: frameToFreeze + relativeFrom
      }
    };
  }, [isActive, timelineContext, videoConfig.id, frameToFreeze, relativeFrom]);
  const newSequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!sequenceContext) {
      return null;
    }
    if (!isActive) {
      return sequenceContext;
    }
    return {
      ...sequenceContext,
      cumulatedFrom: 0
    };
  }, [sequenceContext, isActive]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TimelineContext.Provider, {
    value: timelineValue,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SequenceContext.Provider, {
      value: newSequenceContext,
      children
    })
  });
};

// src/Sequence.tsx

var RegularSequenceRefForwardingFunction = ({
  from = 0,
  durationInFrames = Infinity,
  children,
  name,
  height,
  width,
  showInTimeline = true,
  _remotionInternalLoopDisplay: loopDisplay,
  _remotionInternalStack: stack,
  _remotionInternalPremountDisplay: premountDisplay,
  _remotionInternalPostmountDisplay: postmountDisplay,
  ...other
}, ref) => {
  const { layout = "absolute-fill" } = other;
  const [id] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => String(Math.random()));
  const parentSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const { rootId } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TimelineContext);
  const cumulatedFrom = parentSequence ? parentSequence.cumulatedFrom + parentSequence.relativeFrom : 0;
  const nonce = useNonce();
  if (layout !== "absolute-fill" && layout !== "none") {
    throw new TypeError(`The layout prop of <Sequence /> expects either "absolute-fill" or "none", but you passed: ${layout}`);
  }
  if (layout === "none" && typeof other.style !== "undefined") {
    throw new TypeError('If layout="none", you may not pass a style.');
  }
  if (typeof durationInFrames !== "number") {
    throw new TypeError(`You passed to durationInFrames an argument of type ${typeof durationInFrames}, but it must be a number.`);
  }
  if (durationInFrames <= 0) {
    throw new TypeError(`durationInFrames must be positive, but got ${durationInFrames}`);
  }
  if (typeof from !== "number") {
    throw new TypeError(`You passed to the "from" props of your <Sequence> an argument of type ${typeof from}, but it must be a number.`);
  }
  if (!Number.isFinite(from)) {
    throw new TypeError(`The "from" prop of a sequence must be finite, but got ${from}.`);
  }
  const absoluteFrame = useTimelinePosition();
  const videoConfig = useVideoConfig();
  const parentSequenceDuration = parentSequence ? Math.min(parentSequence.durationInFrames - from, durationInFrames) : durationInFrames;
  const actualDurationInFrames = Math.max(0, Math.min(videoConfig.durationInFrames - from, parentSequenceDuration));
  const { registerSequence, unregisterSequence } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceManager);
  const { hidden } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceVisibilityToggleContext);
  const premounting = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return parentSequence?.premounting || Boolean(other._remotionInternalIsPremounting);
  }, [other._remotionInternalIsPremounting, parentSequence?.premounting]);
  const postmounting = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return parentSequence?.postmounting || Boolean(other._remotionInternalIsPostmounting);
  }, [other._remotionInternalIsPostmounting, parentSequence?.postmounting]);
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      cumulatedFrom,
      relativeFrom: from,
      durationInFrames: actualDurationInFrames,
      parentFrom: parentSequence?.relativeFrom ?? 0,
      id,
      height: height ?? parentSequence?.height ?? null,
      width: width ?? parentSequence?.width ?? null,
      premounting,
      postmounting,
      premountDisplay: premountDisplay ?? null,
      postmountDisplay: postmountDisplay ?? null
    };
  }, [
    cumulatedFrom,
    from,
    actualDurationInFrames,
    parentSequence,
    id,
    height,
    width,
    premounting,
    postmounting,
    premountDisplay,
    postmountDisplay
  ]);
  const timelineClipName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return name ?? "";
  }, [name]);
  const env = useRemotionEnvironment();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!env.isStudio) {
      return;
    }
    registerSequence({
      from,
      duration: actualDurationInFrames,
      id,
      displayName: timelineClipName,
      parent: parentSequence?.id ?? null,
      type: "sequence",
      rootId,
      showInTimeline,
      nonce,
      loopDisplay,
      stack: stack ?? null,
      premountDisplay: premountDisplay ?? null,
      postmountDisplay: postmountDisplay ?? null
    });
    return () => {
      unregisterSequence(id);
    };
  }, [
    durationInFrames,
    id,
    name,
    registerSequence,
    timelineClipName,
    unregisterSequence,
    parentSequence?.id,
    actualDurationInFrames,
    rootId,
    from,
    showInTimeline,
    nonce,
    loopDisplay,
    stack,
    premountDisplay,
    postmountDisplay,
    env.isStudio
  ]);
  const endThreshold = Math.ceil(cumulatedFrom + from + durationInFrames - 1);
  const content = absoluteFrame < cumulatedFrom + from ? null : absoluteFrame > endThreshold ? null : children;
  const styleIfThere = other.layout === "none" ? undefined : other.style;
  const defaultStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      flexDirection: undefined,
      ...width ? { width } : {},
      ...height ? { height } : {},
      ...styleIfThere ?? {}
    };
  }, [height, styleIfThere, width]);
  if (ref !== null && layout === "none") {
    throw new TypeError('It is not supported to pass both a `ref` and `layout="none"` to <Sequence />.');
  }
  const isSequenceHidden = hidden[id] ?? false;
  if (isSequenceHidden) {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SequenceContext.Provider, {
    value: contextValue,
    children: content === null ? null : other.layout === "none" ? content : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(AbsoluteFill, {
      ref,
      style: defaultStyle,
      className: other.className,
      children: content
    })
  });
};
var RegularSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(RegularSequenceRefForwardingFunction);
var PremountedPostmountedSequenceRefForwardingFunction = (props, ref) => {
  const frame = useCurrentFrame();
  if (props.layout === "none") {
    throw new Error('`<Sequence>` with `premountFor` and `postmountFor` props does not support layout="none"');
  }
  const {
    style: passedStyle,
    from = 0,
    durationInFrames = Infinity,
    premountFor = 0,
    postmountFor = 0,
    styleWhilePremounted,
    styleWhilePostmounted,
    ...otherProps
  } = props;
  const endThreshold = Math.ceil(from + durationInFrames - 1);
  const premountingActive = frame < from && frame >= from - premountFor;
  const postmountingActive = frame > endThreshold && frame <= endThreshold + postmountFor;
  const freezeFrame = premountingActive ? from : postmountingActive ? from + durationInFrames - 1 : 0;
  const isFreezingActive = premountingActive || postmountingActive;
  const style = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      ...passedStyle,
      opacity: premountingActive || postmountingActive ? 0 : 1,
      pointerEvents: premountingActive || postmountingActive ? "none" : passedStyle?.pointerEvents ?? undefined,
      ...premountingActive ? styleWhilePremounted : {},
      ...postmountingActive ? styleWhilePostmounted : {}
    };
  }, [
    passedStyle,
    premountingActive,
    postmountingActive,
    styleWhilePremounted,
    styleWhilePostmounted
  ]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Freeze, {
    frame: freezeFrame,
    active: isFreezingActive,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Sequence, {
      ref,
      from,
      durationInFrames,
      style,
      _remotionInternalPremountDisplay: premountFor,
      _remotionInternalPostmountDisplay: postmountFor,
      _remotionInternalIsPremounting: premountingActive,
      _remotionInternalIsPostmounting: postmountingActive,
      ...otherProps
    })
  });
};
var PremountedPostmountedSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(PremountedPostmountedSequenceRefForwardingFunction);
var SequenceRefForwardingFunction = (props, ref) => {
  const env = useRemotionEnvironment();
  if (props.layout !== "none" && !env.isRendering) {
    if (props.premountFor || props.postmountFor) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PremountedPostmountedSequence, {
        ...props,
        ref
      });
    }
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RegularSequence, {
    ...props,
    ref
  });
};
var Sequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(SequenceRefForwardingFunction);
// src/animated-image/AnimatedImage.tsx


// src/animated-image/canvas.tsx


var calcArgs = (fit, frameSize, canvasSize) => {
  switch (fit) {
    case "fill": {
      return [
        0,
        0,
        frameSize.width,
        frameSize.height,
        0,
        0,
        canvasSize.width,
        canvasSize.height
      ];
    }
    case "contain": {
      const ratio = Math.min(canvasSize.width / frameSize.width, canvasSize.height / frameSize.height);
      const centerX = (canvasSize.width - frameSize.width * ratio) / 2;
      const centerY = (canvasSize.height - frameSize.height * ratio) / 2;
      return [
        0,
        0,
        frameSize.width,
        frameSize.height,
        centerX,
        centerY,
        frameSize.width * ratio,
        frameSize.height * ratio
      ];
    }
    case "cover": {
      const ratio = Math.max(canvasSize.width / frameSize.width, canvasSize.height / frameSize.height);
      const centerX = (canvasSize.width - frameSize.width * ratio) / 2;
      const centerY = (canvasSize.height - frameSize.height * ratio) / 2;
      return [
        0,
        0,
        frameSize.width,
        frameSize.height,
        centerX,
        centerY,
        frameSize.width * ratio,
        frameSize.height * ratio
      ];
    }
    default:
      throw new Error("Unknown fit: " + fit);
  }
};
var CanvasRefForwardingFunction = ({ width, height, fit, className, style }, ref) => {
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const draw = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((imageData) => {
    const canvas = canvasRef.current;
    const canvasWidth = width ?? imageData.displayWidth;
    const canvasHeight = height ?? imageData.displayHeight;
    if (!canvas) {
      throw new Error("Canvas ref is not set");
    }
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2d context");
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.drawImage(imageData, ...calcArgs(fit, {
      height: imageData.displayHeight,
      width: imageData.displayWidth
    }, {
      width: canvasWidth,
      height: canvasHeight
    }));
  }, [fit, height, width]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, () => {
    return {
      draw,
      getCanvas: () => {
        if (!canvasRef.current) {
          throw new Error("Canvas ref is not set");
        }
        return canvasRef.current;
      },
      clear: () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) {
          throw new Error("Could not get 2d context");
        }
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
  }, [draw]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("canvas", {
    ref: canvasRef,
    className,
    style
  });
};
var Canvas = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(CanvasRefForwardingFunction);

// src/animated-image/decode-image.ts
var CACHE_SIZE = 5;
var getActualTime = ({
  loopBehavior,
  durationFound,
  timeInSec
}) => {
  return loopBehavior === "loop" ? durationFound ? timeInSec % durationFound : timeInSec : Math.min(timeInSec, durationFound || Infinity);
};
var decodeImage = async ({
  resolvedSrc,
  signal,
  currentTime,
  initialLoopBehavior
}) => {
  if (typeof ImageDecoder === "undefined") {
    throw new Error("Your browser does not support the WebCodecs ImageDecoder API.");
  }
  const res = await fetch(resolvedSrc, { signal });
  const { body } = res;
  if (!body) {
    throw new Error("Got no body");
  }
  const decoder = new ImageDecoder({
    data: body,
    type: res.headers.get("Content-Type") || "image/gif"
  });
  await decoder.completed;
  const { selectedTrack } = decoder.tracks;
  if (!selectedTrack) {
    throw new Error("No selected track");
  }
  const cache = [];
  let durationFound = null;
  const getFrameByIndex = async (frameIndex) => {
    const foundInCache = cache.find((c) => c.frameIndex === frameIndex);
    if (foundInCache && foundInCache.frame) {
      return foundInCache;
    }
    const frame = await decoder.decode({
      frameIndex,
      completeFramesOnly: true
    });
    if (foundInCache) {
      foundInCache.frame = frame.image;
    } else {
      cache.push({
        frame: frame.image,
        frameIndex,
        timeInSeconds: frame.image.timestamp / 1e6
      });
    }
    return {
      frame: frame.image,
      frameIndex,
      timeInSeconds: frame.image.timestamp / 1e6
    };
  };
  const clearCache = (closeToTimeInSec) => {
    const itemsInCache = cache.filter((c) => c.frame);
    const sortByClosestToCurrentTime = itemsInCache.sort((a, b) => {
      const aDiff = Math.abs(a.timeInSeconds - closeToTimeInSec);
      const bDiff = Math.abs(b.timeInSeconds - closeToTimeInSec);
      return aDiff - bDiff;
    });
    for (let i = 0;i < sortByClosestToCurrentTime.length; i++) {
      if (i < CACHE_SIZE) {
        continue;
      }
      const item = sortByClosestToCurrentTime[i];
      item.frame = null;
    }
  };
  const ensureFrameBeforeAndAfter = async ({
    timeInSec,
    loopBehavior
  }) => {
    const actualTimeInSec = getActualTime({
      durationFound,
      loopBehavior,
      timeInSec
    });
    const framesBefore = cache.filter((c) => c.timeInSeconds <= actualTimeInSec);
    const biggestIndex = framesBefore.map((c) => c.frameIndex).reduce((a, b) => Math.max(a, b), 0);
    let i = biggestIndex;
    while (true) {
      const f = await getFrameByIndex(i);
      i++;
      if (!f.frame) {
        throw new Error("No frame found");
      }
      if (!f.frame.duration) {
        break;
      }
      if (i === selectedTrack.frameCount && durationFound === null) {
        const duration = (f.frame.timestamp + f.frame.duration) / 1e6;
        durationFound = duration;
      }
      if (f.timeInSeconds > actualTimeInSec || i === selectedTrack.frameCount) {
        break;
      }
    }
    if (selectedTrack.frameCount - biggestIndex < 3 && loopBehavior === "loop") {
      await getFrameByIndex(0);
    }
    clearCache(actualTimeInSec);
  };
  await ensureFrameBeforeAndAfter({
    timeInSec: currentTime,
    loopBehavior: initialLoopBehavior
  });
  await ensureFrameBeforeAndAfter({
    timeInSec: currentTime,
    loopBehavior: initialLoopBehavior
  });
  const getFrame = async (timeInSec, loopBehavior) => {
    if (durationFound !== null && timeInSec > durationFound && loopBehavior === "clear-after-finish") {
      return null;
    }
    const actualTimeInSec = getActualTime({
      loopBehavior,
      durationFound,
      timeInSec
    });
    await ensureFrameBeforeAndAfter({ timeInSec: actualTimeInSec, loopBehavior });
    const itemsInCache = cache.filter((c) => c.frame);
    const closest = itemsInCache.reduce((a, b) => {
      const aDiff = Math.abs(a.timeInSeconds - actualTimeInSec);
      const bDiff = Math.abs(b.timeInSeconds - actualTimeInSec);
      return aDiff < bDiff ? a : b;
    });
    if (!closest.frame) {
      throw new Error("No frame found");
    }
    return closest;
  };
  return {
    getFrame,
    frameCount: selectedTrack.frameCount
  };
};

// src/animated-image/resolve-image-source.tsx
var resolveAnimatedImageSource = (src) => {
  if (typeof window === "undefined") {
    return src;
  }
  return new URL(src, window.origin).href;
};

// src/animated-image/AnimatedImage.tsx

var AnimatedImage = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  src,
  width,
  height,
  onError,
  loopBehavior = "loop",
  playbackRate = 1,
  fit = "fill",
  ...props
}, canvasRef) => {
  const mountState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({ isMounted: true });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const { current } = mountState;
    current.isMounted = true;
    return () => {
      current.isMounted = false;
    };
  }, []);
  const resolvedSrc = resolveAnimatedImageSource(src);
  const [imageDecoder, setImageDecoder] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
  const [decodeHandle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => delayRender2(`Rendering <AnimatedImage/> with src="${resolvedSrc}"`));
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / playbackRate / fps;
  const currentTimeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(currentTime);
  currentTimeRef.current = currentTime;
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(canvasRef, () => {
    const c = ref.current?.getCanvas();
    if (!c) {
      throw new Error("Canvas ref is not set");
    }
    return c;
  }, []);
  const [initialLoopBehavior] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => loopBehavior);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const controller = new AbortController;
    decodeImage({
      resolvedSrc,
      signal: controller.signal,
      currentTime: currentTimeRef.current,
      initialLoopBehavior
    }).then((d) => {
      setImageDecoder(d);
      continueRender2(decodeHandle);
    }).catch((err) => {
      if (err.name === "AbortError") {
        continueRender2(decodeHandle);
        return;
      }
      if (onError) {
        onError?.(err);
        continueRender2(decodeHandle);
      } else {
        cancelRender(err);
      }
    });
    return () => {
      controller.abort();
    };
  }, [
    resolvedSrc,
    decodeHandle,
    onError,
    initialLoopBehavior,
    continueRender2
  ]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    if (!imageDecoder) {
      return;
    }
    const delay = delayRender2(`Rendering frame at ${currentTime} of <AnimatedImage src="${src}"/>`);
    imageDecoder.getFrame(currentTime, loopBehavior).then((videoFrame) => {
      if (mountState.current.isMounted) {
        if (videoFrame === null) {
          ref.current?.clear();
        } else {
          ref.current?.draw(videoFrame.frame);
        }
      }
      continueRender2(delay);
    }).catch((err) => {
      if (onError) {
        onError(err);
        continueRender2(delay);
      } else {
        cancelRender(err);
      }
    });
  }, [
    currentTime,
    imageDecoder,
    loopBehavior,
    onError,
    src,
    continueRender2,
    delayRender2
  ]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Canvas, {
    ref,
    width,
    height,
    fit,
    ...props
  });
});
// src/Artifact.tsx


// src/RenderAssetManager.tsx


// src/validation/validate-artifact.ts
var validateArtifactFilename = (filename) => {
  if (typeof filename !== "string") {
    throw new TypeError(`The "filename" must be a string, but you passed a value of type ${typeof filename}`);
  }
  if (filename.trim() === "") {
    throw new Error("The `filename` must not be empty");
  }
  if (!filename.match(/^([0-9a-zA-Z-!_.*'()/:&$@=;+,?]+)/g)) {
    throw new Error('The `filename` must match "/^([0-9a-zA-Z-!_.*\'()/:&$@=;+,?]+)/g". Use forward slashes only, even on Windows.');
  }
};
var validateContent = (content) => {
  if (typeof content !== "string" && !(content instanceof Uint8Array)) {
    throw new TypeError(`The "content" must be a string or Uint8Array, but you passed a value of type ${typeof content}`);
  }
  if (typeof content === "string" && content.trim() === "") {
    throw new Error("The `content` must not be empty");
  }
};
var validateRenderAsset = (artifact) => {
  if (artifact.type !== "artifact") {
    return;
  }
  validateArtifactFilename(artifact.filename);
  if (artifact.contentType === "thumbnail") {
    return;
  }
  validateContent(artifact.content);
};

// src/RenderAssetManager.tsx

var RenderAssetManager = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  registerRenderAsset: () => {
    return;
  },
  unregisterRenderAsset: () => {
    return;
  },
  renderAssets: []
});
var RenderAssetManagerProvider = ({ children, collectAssets }) => {
  const [renderAssets, setRenderAssets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const renderAssetsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  const registerRenderAsset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((renderAsset) => {
    validateRenderAsset(renderAsset);
    renderAssetsRef.current = [...renderAssetsRef.current, renderAsset];
    setRenderAssets(renderAssetsRef.current);
  }, []);
  if (collectAssets) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(collectAssets, () => {
      return {
        collectAssets: () => {
          const assets = renderAssetsRef.current;
          renderAssetsRef.current = [];
          setRenderAssets([]);
          return assets;
        }
      };
    }, []);
  }
  const unregisterRenderAsset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id) => {
    renderAssetsRef.current = renderAssetsRef.current.filter((a) => a.id !== id);
    setRenderAssets(renderAssetsRef.current);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    if (typeof window !== "undefined") {
      window.remotion_collectAssets = () => {
        const assets = renderAssetsRef.current;
        renderAssetsRef.current = [];
        setRenderAssets([]);
        return assets;
      };
    }
  }, []);
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      registerRenderAsset,
      unregisterRenderAsset,
      renderAssets
    };
  }, [renderAssets, registerRenderAsset, unregisterRenderAsset]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RenderAssetManager.Provider, {
    value: contextValue,
    children
  });
};

// src/Artifact.tsx
var ArtifactThumbnail = Symbol("Thumbnail");
var Artifact = ({ filename, content, downloadBehavior }) => {
  const { registerRenderAsset, unregisterRenderAsset } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(RenderAssetManager);
  const env = useRemotionEnvironment();
  const frame = useCurrentFrame();
  const [id] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
    return String(Math.random());
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    if (!env.isRendering) {
      return;
    }
    if (content instanceof Uint8Array) {
      registerRenderAsset({
        type: "artifact",
        id,
        content: btoa(new TextDecoder("utf8").decode(content)),
        filename,
        frame,
        contentType: "binary",
        downloadBehavior: downloadBehavior ?? null
      });
    } else if (content === ArtifactThumbnail) {
      registerRenderAsset({
        type: "artifact",
        id,
        filename,
        frame,
        contentType: "thumbnail",
        downloadBehavior: downloadBehavior ?? null
      });
    } else {
      registerRenderAsset({
        type: "artifact",
        id,
        content,
        filename,
        frame,
        contentType: "text",
        downloadBehavior: downloadBehavior ?? null
      });
    }
    return () => {
      return unregisterRenderAsset(id);
    };
  }, [
    content,
    env.isRendering,
    filename,
    frame,
    id,
    registerRenderAsset,
    unregisterRenderAsset,
    downloadBehavior
  ]);
  return null;
};
Artifact.Thumbnail = ArtifactThumbnail;
// src/audio/Audio.tsx


// src/absolute-src.ts
var getAbsoluteSrc = (relativeSrc) => {
  if (typeof window === "undefined") {
    return relativeSrc;
  }
  if (relativeSrc.startsWith("http://") || relativeSrc.startsWith("https://") || relativeSrc.startsWith("file://") || relativeSrc.startsWith("blob:") || relativeSrc.startsWith("data:")) {
    return relativeSrc;
  }
  return new URL(relativeSrc, window.origin).href;
};

// src/calculate-media-duration.ts
var calculateMediaDuration = ({
  trimAfter,
  mediaDurationInFrames,
  playbackRate,
  trimBefore
}) => {
  let duration = mediaDurationInFrames;
  if (typeof trimAfter !== "undefined") {
    duration = trimAfter;
  }
  if (typeof trimBefore !== "undefined") {
    duration -= trimBefore;
  }
  const actualDuration = duration / playbackRate;
  return Math.floor(actualDuration);
};

// src/loop/index.tsx


var LoopContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
var useLoop = () => {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LoopContext);
};
var Loop = ({ durationInFrames, times = Infinity, children, name, ...props }) => {
  const currentFrame = useCurrentFrame();
  const { durationInFrames: compDuration } = useVideoConfig();
  validateDurationInFrames(durationInFrames, {
    component: "of the <Loop /> component",
    allowFloats: true
  });
  if (typeof times !== "number") {
    throw new TypeError(`You passed to "times" an argument of type ${typeof times}, but it must be a number.`);
  }
  if (times !== Infinity && times % 1 !== 0) {
    throw new TypeError(`The "times" prop of a loop must be an integer, but got ${times}.`);
  }
  if (times < 0) {
    throw new TypeError(`The "times" prop of a loop must be at least 0, but got ${times}`);
  }
  const maxTimes = Math.ceil(compDuration / durationInFrames);
  const actualTimes = Math.min(maxTimes, times);
  const style = props.layout === "none" ? undefined : props.style;
  const maxFrame = durationInFrames * (actualTimes - 1);
  const iteration = Math.floor(currentFrame / durationInFrames);
  const start = iteration * durationInFrames;
  const from = Math.min(start, maxFrame);
  const loopDisplay = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      numberOfTimes: Math.min(compDuration / durationInFrames, times),
      startOffset: -from,
      durationInFrames
    };
  }, [compDuration, durationInFrames, from, times]);
  const loopContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      iteration: Math.floor(currentFrame / durationInFrames),
      durationInFrames
    };
  }, [currentFrame, durationInFrames]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(LoopContext.Provider, {
    value: loopContext,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Sequence, {
      durationInFrames,
      from,
      name: name ?? "<Loop>",
      _remotionInternalLoopDisplay: loopDisplay,
      layout: props.layout,
      style,
      children
    })
  });
};
Loop.useLoop = useLoop;

// src/prefetch.ts


// src/playback-logging.ts
var playbackLogging = ({
  logLevel,
  tag,
  message,
  mountTime
}) => {
  const tags = [mountTime ? Date.now() - mountTime + "ms " : null, tag].filter(Boolean).join(" ");
  Log.trace({ logLevel, tag: null }, `[${tags}]`, message);
};

// src/prefetch-state.tsx


var PreloadContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
var preloads = {};
var updaters = [];
var setPreloads = (updater) => {
  preloads = updater(preloads);
  updaters.forEach((u) => u());
};
var PrefetchProvider = ({ children }) => {
  const [_preloads, _setPreloads] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => preloads);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updaterFunction = () => {
      _setPreloads(preloads);
    };
    updaters.push(updaterFunction);
    return () => {
      updaters = updaters.filter((u) => u !== updaterFunction);
    };
  }, []);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PreloadContext.Provider, {
    value: _preloads,
    children
  });
};

// src/prefetch.ts
var removeAndGetHashFragment = (src) => {
  const hashIndex = src.indexOf("#");
  if (hashIndex === -1) {
    return null;
  }
  return hashIndex;
};
var getSrcWithoutHash = (src) => {
  const hashIndex = removeAndGetHashFragment(src);
  if (hashIndex === null) {
    return src;
  }
  return src.slice(0, hashIndex);
};
var usePreload = (src) => {
  const preloads2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(PreloadContext);
  const hashFragmentIndex = removeAndGetHashFragment(src);
  const withoutHashFragment = getSrcWithoutHash(src);
  if (!preloads2[withoutHashFragment]) {
    return src;
  }
  if (hashFragmentIndex !== null) {
    return preloads2[withoutHashFragment] + src.slice(hashFragmentIndex);
  }
  return preloads2[withoutHashFragment];
};
var blobToBase64 = function(blob) {
  const reader = new FileReader;
  return new Promise((resolve, reject) => {
    reader.onload = function() {
      const dataUrl = reader.result;
      resolve(dataUrl);
    };
    reader.onerror = (err) => {
      return reject(err);
    };
    reader.readAsDataURL(blob);
  });
};
var getBlobFromReader = async ({
  reader,
  contentType,
  contentLength,
  onProgress
}) => {
  let receivedLength = 0;
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
    receivedLength += value.length;
    if (onProgress) {
      onProgress({ loadedBytes: receivedLength, totalBytes: contentLength });
    }
  }
  const chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for (const chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }
  return new Blob([chunksAll], {
    type: contentType ?? undefined
  });
};
var prefetch = (src, options) => {
  const method = options?.method ?? "blob-url";
  const logLevel = options?.logLevel ?? "info";
  const srcWithoutHash = getSrcWithoutHash(src);
  if (getRemotionEnvironment().isRendering) {
    return {
      free: () => {
        return;
      },
      waitUntilDone: () => Promise.resolve(srcWithoutHash)
    };
  }
  Log.verbose({ logLevel, tag: "prefetch" }, `Starting prefetch ${srcWithoutHash}`);
  let canceled = false;
  let objectUrl = null;
  let resolve = () => {
    return;
  };
  let reject = () => {
    return;
  };
  const waitUntilDone = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const controller = new AbortController;
  let canBeAborted = true;
  fetch(srcWithoutHash, {
    signal: controller.signal,
    credentials: options?.credentials ?? undefined
  }).then((res) => {
    canBeAborted = false;
    if (canceled) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`HTTP error, status = ${res.status}`);
    }
    const headerContentType = res.headers.get("Content-Type");
    const contentType = options?.contentType ?? headerContentType;
    const hasProperContentType = contentType && (contentType.startsWith("video/") || contentType.startsWith("audio/") || contentType.startsWith("image/"));
    if (!hasProperContentType) {
      console.warn(`Called prefetch() on ${srcWithoutHash} which returned a "Content-Type" of ${headerContentType}. Prefetched content should have a proper content type (video/... or audio/...) or a contentType passed the options of prefetch(). Otherwise, prefetching will not work properly in all browsers.`);
    }
    if (!res.body) {
      throw new Error(`HTTP response of ${srcWithoutHash} has no body`);
    }
    const reader = res.body.getReader();
    return getBlobFromReader({
      reader,
      contentType: options?.contentType ?? headerContentType ?? null,
      contentLength: res.headers.get("Content-Length") ? parseInt(res.headers.get("Content-Length"), 10) : null,
      onProgress: options?.onProgress
    });
  }).then((buf) => {
    if (!buf) {
      return;
    }
    const actualBlob = options?.contentType ? new Blob([buf], { type: options.contentType }) : buf;
    if (method === "base64") {
      return blobToBase64(actualBlob);
    }
    return URL.createObjectURL(actualBlob);
  }).then((url) => {
    if (canceled) {
      return;
    }
    playbackLogging({
      logLevel,
      tag: "prefetch",
      message: `Finished prefetch ${srcWithoutHash} with method ${method}`,
      mountTime: null
    });
    objectUrl = url;
    setPreloads((p) => ({
      ...p,
      [srcWithoutHash]: objectUrl
    }));
    resolve(objectUrl);
  }).catch((err) => {
    if (err?.message.includes("free() called")) {
      return;
    }
    reject(err);
  });
  return {
    free: () => {
      playbackLogging({
        logLevel,
        tag: "prefetch",
        message: `Freeing ${srcWithoutHash}`,
        mountTime: null
      });
      if (objectUrl) {
        if (method === "blob-url") {
          URL.revokeObjectURL(objectUrl);
        }
        setPreloads((p) => {
          const copy = { ...p };
          delete copy[srcWithoutHash];
          return copy;
        });
      } else {
        canceled = true;
        if (canBeAborted) {
          try {
            controller.abort(new Error("free() called"));
          } catch {}
        }
      }
    },
    waitUntilDone: () => {
      return waitUntilDone;
    }
  };
};

// src/validate-media-props.ts
var validateMediaProps = (props, component) => {
  if (typeof props.volume !== "number" && typeof props.volume !== "function" && typeof props.volume !== "undefined") {
    throw new TypeError(`You have passed a volume of type ${typeof props.volume} to your <${component} /> component. Volume must be a number or a function with the signature '(frame: number) => number' undefined.`);
  }
  if (typeof props.volume === "number" && props.volume < 0) {
    throw new TypeError(`You have passed a volume below 0 to your <${component} /> component. Volume must be between 0 and 1`);
  }
  if (typeof props.playbackRate !== "number" && typeof props.playbackRate !== "undefined") {
    throw new TypeError(`You have passed a playbackRate of type ${typeof props.playbackRate} to your <${component} /> component. Playback rate must a real number or undefined.`);
  }
  if (typeof props.playbackRate === "number" && (isNaN(props.playbackRate) || !Number.isFinite(props.playbackRate) || props.playbackRate <= 0)) {
    throw new TypeError(`You have passed a playbackRate of ${props.playbackRate} to your <${component} /> component. Playback rate must be a real number above 0.`);
  }
};

// src/validate-start-from-props.ts
var validateStartFromProps = (startFrom, endAt) => {
  if (typeof startFrom !== "undefined") {
    if (typeof startFrom !== "number") {
      throw new TypeError(`type of startFrom prop must be a number, instead got type ${typeof startFrom}.`);
    }
    if (isNaN(startFrom) || startFrom === Infinity) {
      throw new TypeError("startFrom prop can not be NaN or Infinity.");
    }
    if (startFrom < 0) {
      throw new TypeError(`startFrom must be greater than equal to 0 instead got ${startFrom}.`);
    }
  }
  if (typeof endAt !== "undefined") {
    if (typeof endAt !== "number") {
      throw new TypeError(`type of endAt prop must be a number, instead got type ${typeof endAt}.`);
    }
    if (isNaN(endAt)) {
      throw new TypeError("endAt prop can not be NaN.");
    }
    if (endAt <= 0) {
      throw new TypeError(`endAt must be a positive number, instead got ${endAt}.`);
    }
  }
  if (endAt < startFrom) {
    throw new TypeError("endAt prop must be greater than startFrom prop.");
  }
};
var validateTrimProps = (trimBefore, trimAfter) => {
  if (typeof trimBefore !== "undefined") {
    if (typeof trimBefore !== "number") {
      throw new TypeError(`type of trimBefore prop must be a number, instead got type ${typeof trimBefore}.`);
    }
    if (isNaN(trimBefore) || trimBefore === Infinity) {
      throw new TypeError("trimBefore prop can not be NaN or Infinity.");
    }
    if (trimBefore < 0) {
      throw new TypeError(`trimBefore must be greater than equal to 0 instead got ${trimBefore}.`);
    }
  }
  if (typeof trimAfter !== "undefined") {
    if (typeof trimAfter !== "number") {
      throw new TypeError(`type of trimAfter prop must be a number, instead got type ${typeof trimAfter}.`);
    }
    if (isNaN(trimAfter)) {
      throw new TypeError("trimAfter prop can not be NaN.");
    }
    if (trimAfter <= 0) {
      throw new TypeError(`trimAfter must be a positive number, instead got ${trimAfter}.`);
    }
  }
  if (trimAfter <= trimBefore) {
    throw new TypeError("trimAfter prop must be greater than trimBefore prop.");
  }
};
var validateMediaTrimProps = ({
  startFrom,
  endAt,
  trimBefore,
  trimAfter
}) => {
  if (typeof startFrom !== "undefined" && typeof trimBefore !== "undefined") {
    throw new TypeError("Cannot use both startFrom and trimBefore props. Use trimBefore instead as startFrom is deprecated.");
  }
  if (typeof endAt !== "undefined" && typeof trimAfter !== "undefined") {
    throw new TypeError("Cannot use both endAt and trimAfter props. Use trimAfter instead as endAt is deprecated.");
  }
  const hasNewProps = typeof trimBefore !== "undefined" || typeof trimAfter !== "undefined";
  const hasOldProps = typeof startFrom !== "undefined" || typeof endAt !== "undefined";
  if (hasNewProps) {
    validateTrimProps(trimBefore, trimAfter);
  } else if (hasOldProps) {
    validateStartFromProps(startFrom, endAt);
  }
};
var resolveTrimProps = ({
  startFrom,
  endAt,
  trimBefore,
  trimAfter
}) => {
  const trimBeforeValue = trimBefore ?? startFrom ?? undefined;
  const trimAfterValue = trimAfter ?? endAt ?? undefined;
  return { trimBeforeValue, trimAfterValue };
};

// src/video/duration-state.tsx


var durationReducer = (state, action) => {
  switch (action.type) {
    case "got-duration": {
      const absoluteSrc = getAbsoluteSrc(action.src);
      if (state[absoluteSrc] === action.durationInSeconds) {
        return state;
      }
      return {
        ...state,
        [absoluteSrc]: action.durationInSeconds
      };
    }
    default:
      return state;
  }
};
var DurationsContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  durations: {},
  setDurations: () => {
    throw new Error("context missing");
  }
});
var DurationsContextProvider = ({ children }) => {
  const [durations, setDurations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(durationReducer, {});
  const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      durations,
      setDurations
    };
  }, [durations]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DurationsContext.Provider, {
    value,
    children
  });
};

// src/audio/AudioForPreview.tsx


// src/get-cross-origin-value.ts
var getCrossOriginValue = ({
  crossOrigin,
  requestsVideoFrame,
  isClientSideRendering
}) => {
  if (crossOrigin !== undefined && crossOrigin !== null) {
    return crossOrigin;
  }
  if (isClientSideRendering) {
    return "anonymous";
  }
  if (requestsVideoFrame) {
    return "anonymous";
  }
  return;
};

// src/use-amplification.ts


// src/audio/shared-audio-tags.tsx


// src/play-and-handle-not-allowed-error.ts
var playAndHandleNotAllowedError = ({
  mediaRef,
  mediaType,
  onAutoPlayError,
  logLevel,
  mountTime,
  reason,
  isPlayer
}) => {
  const { current } = mediaRef;
  if (!current) {
    return;
  }
  playbackLogging({
    logLevel,
    tag: "play",
    message: `Attempting to play ${current.src}. Reason: ${reason}`,
    mountTime
  });
  const prom = current.play();
  if (!prom.catch) {
    return;
  }
  prom.catch((err) => {
    if (!current) {
      return;
    }
    if (err.message.includes("request was interrupted by a call to pause")) {
      return;
    }
    if (err.message.includes("The operation was aborted.")) {
      return;
    }
    if (err.message.includes("The fetching process for the media resource was aborted by the user agent")) {
      return;
    }
    if (err.message.includes("request was interrupted by a new load request")) {
      return;
    }
    if (err.message.includes("because the media was removed from the document")) {
      return;
    }
    if (err.message.includes("user didn't interact with the document") && current.muted) {
      return;
    }
    console.log(`Could not play ${mediaType} due to following error: `, err);
    if (!current.muted) {
      if (onAutoPlayError) {
        onAutoPlayError();
        return;
      }
      if (mediaType === "video" && isPlayer) {
        Log.info({ logLevel, tag: "<" + mediaType + ">" }, `The video will be muted and we'll retry playing it.`);
        Log.info({ logLevel, tag: "<" + mediaType + ">" }, "Use onAutoPlayError() to handle this error yourself.");
        current.muted = true;
        current.play();
      }
    }
  });
};

// src/audio/shared-element-source-node.ts
var makeSharedElementSourceNode = ({
  audioContext,
  ref
}) => {
  let connected = null;
  let disposed = false;
  return {
    attemptToConnect: () => {
      if (disposed) {
        throw new Error("SharedElementSourceNode has been disposed");
      }
      if (!connected && ref.current) {
        const mediaElementSourceNode = audioContext.createMediaElementSource(ref.current);
        connected = mediaElementSourceNode;
      }
    },
    get: () => {
      if (!connected) {
        throw new Error("Audio element not connected");
      }
      return connected;
    },
    cleanup: () => {
      if (connected) {
        connected.disconnect();
        connected = null;
      }
      disposed = true;
    }
  };
};

// src/audio/use-audio-context.ts

var warned = false;
var warnOnce = (logLevel) => {
  if (warned) {
    return;
  }
  warned = true;
  if (typeof window !== "undefined") {
    Log.warn({ logLevel, tag: null }, "AudioContext is not supported in this browser");
  }
};
var useSingletonAudioContext = ({
  logLevel,
  latencyHint,
  audioEnabled
}) => {
  const env = useRemotionEnvironment();
  const audioContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (env.isRendering) {
      return null;
    }
    if (!audioEnabled) {
      return null;
    }
    if (typeof AudioContext === "undefined") {
      warnOnce(logLevel);
      return null;
    }
    return new AudioContext({
      latencyHint,
      sampleRate: 48000
    });
  }, [logLevel, latencyHint, env.isRendering, audioEnabled]);
  return audioContext;
};

// src/audio/shared-audio-tags.tsx

var EMPTY_AUDIO = "data:audio/mp3;base64,/+MYxAAJcAV8AAgAABn//////+/gQ5BAMA+D4Pg+BAQBAEAwD4Pg+D4EBAEAQDAPg++hYBH///hUFQVBUFREDQNHmf///////+MYxBUGkAGIMAAAAP/29Xt6lUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDUAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
var compareProps = (obj1, obj2) => {
  const keysA = Object.keys(obj1).sort();
  const keysB = Object.keys(obj2).sort();
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0;i < keysA.length; i++) {
    if (keysA[i] !== keysB[i]) {
      return false;
    }
    if (obj1[keysA[i]] !== obj2[keysB[i]]) {
      return false;
    }
  }
  return true;
};
var didPropChange = (key, newProp, prevProp) => {
  if (key === "src" && !prevProp.startsWith("data:") && !newProp.startsWith("data:")) {
    return new URL(prevProp, window.origin).toString() !== new URL(newProp, window.origin).toString();
  }
  if (prevProp === newProp) {
    return false;
  }
  return true;
};
var SharedAudioContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
var SharedAudioContextProvider = ({ children, numberOfAudioTags, audioLatencyHint, audioEnabled }) => {
  const audios = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  const [initialNumberOfAudioTags] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(numberOfAudioTags);
  if (numberOfAudioTags !== initialNumberOfAudioTags) {
    throw new Error("The number of shared audio tags has changed dynamically. Once you have set this property, you cannot change it afterwards.");
  }
  const logLevel = useLogLevel();
  const audioContext = useSingletonAudioContext({
    logLevel,
    latencyHint: audioLatencyHint,
    audioEnabled
  });
  const refs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return new Array(numberOfAudioTags).fill(true).map(() => {
      const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
      return {
        id: Math.random(),
        ref,
        mediaElementSourceNode: audioContext ? makeSharedElementSourceNode({
          audioContext,
          ref
        }) : null
      };
    });
  }, [audioContext, numberOfAudioTags]);
  const effectToUse = react__WEBPACK_IMPORTED_MODULE_0__.useInsertionEffect ?? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
  effectToUse(() => {
    return () => {
      requestAnimationFrame(() => {
        refs.forEach(({ mediaElementSourceNode }) => {
          mediaElementSourceNode?.cleanup();
        });
      });
    };
  }, [refs]);
  const takenAudios = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Array(numberOfAudioTags).fill(false));
  const rerenderAudios = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    refs.forEach(({ ref, id }) => {
      const data = audios.current?.find((a) => a.id === id);
      const { current } = ref;
      if (!current) {
        return;
      }
      if (data === undefined) {
        current.src = EMPTY_AUDIO;
        return;
      }
      if (!data) {
        throw new TypeError("Expected audio data to be there");
      }
      Object.keys(data.props).forEach((key) => {
        if (didPropChange(key, data.props[key], current[key])) {
          current[key] = data.props[key];
        }
      });
    });
  }, [refs]);
  const registerAudio = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((options) => {
    const { aud, audioId, premounting, postmounting } = options;
    const found = audios.current?.find((a) => a.audioId === audioId);
    if (found) {
      return found;
    }
    const firstFreeAudio = takenAudios.current.findIndex((a) => a === false);
    if (firstFreeAudio === -1) {
      throw new Error(`Tried to simultaneously mount ${numberOfAudioTags + 1} <Html5Audio /> tags at the same time. With the current settings, the maximum amount of <Html5Audio /> tags is limited to ${numberOfAudioTags} at the same time. Remotion pre-mounts silent audio tags to help avoid browser autoplay restrictions. See https://remotion.dev/docs/player/autoplay#using-the-numberofsharedaudiotags-prop for more information on how to increase this limit.`);
    }
    const { id, ref, mediaElementSourceNode } = refs[firstFreeAudio];
    const cloned = [...takenAudios.current];
    cloned[firstFreeAudio] = id;
    takenAudios.current = cloned;
    const newElem = {
      props: aud,
      id,
      el: ref,
      audioId,
      mediaElementSourceNode,
      premounting,
      audioMounted: Boolean(ref.current),
      postmounting,
      cleanupOnMediaTagUnmount: () => {}
    };
    audios.current?.push(newElem);
    rerenderAudios();
    return newElem;
  }, [numberOfAudioTags, refs, rerenderAudios]);
  const unregisterAudio = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id) => {
    const cloned = [...takenAudios.current];
    const index = refs.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new TypeError("Error occured in ");
    }
    cloned[index] = false;
    takenAudios.current = cloned;
    audios.current = audios.current?.filter((a) => a.id !== id);
    rerenderAudios();
  }, [refs, rerenderAudios]);
  const updateAudio = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({
    aud,
    audioId,
    id,
    premounting,
    postmounting
  }) => {
    let changed = false;
    audios.current = audios.current?.map((prevA) => {
      const audioMounted = Boolean(prevA.el.current);
      if (prevA.audioMounted !== audioMounted) {
        changed = true;
      }
      if (prevA.id === id) {
        const isTheSame = compareProps(aud, prevA.props) && prevA.premounting === premounting && prevA.postmounting === postmounting;
        if (isTheSame) {
          return prevA;
        }
        changed = true;
        return {
          ...prevA,
          props: aud,
          premounting,
          postmounting,
          audioId,
          audioMounted
        };
      }
      return prevA;
    });
    if (changed) {
      rerenderAudios();
    }
  }, [rerenderAudios]);
  const mountTime = useMountTime();
  const env = useRemotionEnvironment();
  const playAllAudios = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    refs.forEach((ref) => {
      const audio = audios.current.find((a) => a.el === ref.ref);
      if (audio?.premounting) {
        return;
      }
      playAndHandleNotAllowedError({
        mediaRef: ref.ref,
        mediaType: "audio",
        onAutoPlayError: null,
        logLevel,
        mountTime,
        reason: "playing all audios",
        isPlayer: env.isPlayer
      });
    });
    audioContext?.resume();
  }, [audioContext, logLevel, mountTime, refs, env.isPlayer]);
  const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      registerAudio,
      unregisterAudio,
      updateAudio,
      playAllAudios,
      numberOfAudioTags,
      audioContext
    };
  }, [
    numberOfAudioTags,
    playAllAudios,
    registerAudio,
    unregisterAudio,
    updateAudio,
    audioContext
  ]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(SharedAudioContext.Provider, {
    value,
    children: [
      refs.map(({ id, ref }) => {
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("audio", {
          ref,
          preload: "metadata",
          src: EMPTY_AUDIO
        }, id);
      }),
      children
    ]
  });
};
var useSharedAudio = ({
  aud,
  audioId,
  premounting,
  postmounting
}) => {
  const ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SharedAudioContext);
  const [elem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
    if (ctx && ctx.numberOfAudioTags > 0) {
      return ctx.registerAudio({ aud, audioId, premounting, postmounting });
    }
    const el = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    const mediaElementSourceNode = ctx?.audioContext ? makeSharedElementSourceNode({
      audioContext: ctx.audioContext,
      ref: el
    }) : null;
    return {
      el,
      id: Math.random(),
      props: aud,
      audioId,
      mediaElementSourceNode,
      premounting,
      audioMounted: Boolean(el.current),
      postmounting,
      cleanupOnMediaTagUnmount: () => {
        mediaElementSourceNode?.cleanup();
      }
    };
  });
  const effectToUse = react__WEBPACK_IMPORTED_MODULE_0__.useInsertionEffect ?? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
  if (typeof document !== "undefined") {
    effectToUse(() => {
      if (ctx && ctx.numberOfAudioTags > 0) {
        ctx.updateAudio({ id: elem.id, aud, audioId, premounting, postmounting });
      }
    }, [aud, ctx, elem.id, audioId, premounting, postmounting]);
    effectToUse(() => {
      return () => {
        if (ctx && ctx.numberOfAudioTags > 0) {
          ctx.unregisterAudio(elem.id);
        }
      };
    }, [ctx, elem.id]);
  }
  return elem;
};

// src/is-approximately-the-same.ts
var FLOATING_POINT_ERROR_THRESHOLD = 0.00001;
var isApproximatelyTheSame = (num1, num2) => {
  return Math.abs(num1 - num2) < FLOATING_POINT_ERROR_THRESHOLD;
};

// src/video/video-fragment.ts

var toSeconds = (time, fps) => {
  return Math.round(time / fps * 100) / 100;
};
var isSafari = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const isAppleWebKit = /AppleWebKit/.test(window.navigator.userAgent);
  if (!isAppleWebKit) {
    return false;
  }
  const isNotChrome = !window.navigator.userAgent.includes("Chrome/");
  return isNotChrome;
};
var isIosSafari = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const isIpadIPodIPhone = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
  return isIpadIPodIPhone && isSafari();
};
var isIOSSafariAndBlob = (actualSrc) => {
  return isIosSafari() && actualSrc.startsWith("blob:");
};
var getVideoFragmentStart = ({
  actualFrom,
  fps
}) => {
  return toSeconds(Math.max(0, -actualFrom), fps);
};
var getVideoFragmentEnd = ({
  duration,
  fps
}) => {
  return toSeconds(duration, fps);
};
var appendVideoFragment = ({
  actualSrc,
  actualFrom,
  duration,
  fps
}) => {
  if (isIOSSafariAndBlob(actualSrc)) {
    return actualSrc;
  }
  if (actualSrc.startsWith("data:")) {
    return actualSrc;
  }
  const existingHash = Boolean(new URL(actualSrc, (typeof window === "undefined" ? null : window.location.href) ?? "http://localhost:3000").hash);
  if (existingHash) {
    return actualSrc;
  }
  if (!Number.isFinite(actualFrom)) {
    return actualSrc;
  }
  const withStartHash = `${actualSrc}#t=${getVideoFragmentStart({ actualFrom, fps })}`;
  if (!Number.isFinite(duration)) {
    return withStartHash;
  }
  return `${withStartHash},${getVideoFragmentEnd({ duration, fps })}`;
};
var isSubsetOfDuration = ({
  prevStartFrom,
  newStartFrom,
  prevDuration,
  newDuration,
  fps
}) => {
  const previousFrom = getVideoFragmentStart({ actualFrom: prevStartFrom, fps });
  const newFrom = getVideoFragmentStart({ actualFrom: newStartFrom, fps });
  const previousEnd = getVideoFragmentEnd({ duration: prevDuration, fps });
  const newEnd = getVideoFragmentEnd({ duration: newDuration, fps });
  if (newFrom < previousFrom) {
    return false;
  }
  if (newEnd > previousEnd) {
    return false;
  }
  return true;
};
var useAppendVideoFragment = ({
  actualSrc: initialActualSrc,
  actualFrom: initialActualFrom,
  duration: initialDuration,
  fps
}) => {
  const actualFromRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initialActualFrom);
  const actualDuration = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initialDuration);
  const actualSrc = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initialActualSrc);
  if (!isSubsetOfDuration({
    prevStartFrom: actualFromRef.current,
    newStartFrom: initialActualFrom,
    prevDuration: actualDuration.current,
    newDuration: initialDuration,
    fps
  }) || initialActualSrc !== actualSrc.current) {
    actualFromRef.current = initialActualFrom;
    actualDuration.current = initialDuration;
    actualSrc.current = initialActualSrc;
  }
  const appended = appendVideoFragment({
    actualSrc: actualSrc.current,
    actualFrom: actualFromRef.current,
    duration: actualDuration.current,
    fps
  });
  return appended;
};

// src/use-amplification.ts
var warned2 = false;
var warnSafariOnce = (logLevel) => {
  if (warned2) {
    return;
  }
  warned2 = true;
  Log.warn({ logLevel, tag: null }, "In Safari, setting a volume and a playback rate at the same time is buggy.");
  Log.warn({ logLevel, tag: null }, "In Desktop Safari, only volumes <= 1 will be applied.");
  Log.warn({ logLevel, tag: null }, logLevel, "In Mobile Safari, the volume will be ignored and set to 1 if a playbackRate is set.");
};
var useVolume = ({
  mediaRef,
  volume,
  logLevel,
  source,
  shouldUseWebAudioApi
}) => {
  const audioStuffRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const currentVolumeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(volume);
  currentVolumeRef.current = volume;
  const sharedAudioContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SharedAudioContext);
  if (!sharedAudioContext) {
    throw new Error("useAmplification must be used within a SharedAudioContext");
  }
  const { audioContext } = sharedAudioContext;
  if (typeof window !== "undefined") {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
      if (!audioContext) {
        return;
      }
      if (!mediaRef.current) {
        return;
      }
      if (!shouldUseWebAudioApi) {
        return;
      }
      if (mediaRef.current.playbackRate !== 1 && isSafari()) {
        warnSafariOnce(logLevel);
        return;
      }
      if (!source) {
        return;
      }
      const gainNode = new GainNode(audioContext, {
        gain: currentVolumeRef.current
      });
      source.attemptToConnect();
      source.get().connect(gainNode);
      gainNode.connect(audioContext.destination);
      audioStuffRef.current = {
        gainNode
      };
      Log.trace({ logLevel, tag: null }, `Starting to amplify ${mediaRef.current?.src}. Gain = ${currentVolumeRef.current}, playbackRate = ${mediaRef.current?.playbackRate}`);
      return () => {
        audioStuffRef.current = null;
        gainNode.disconnect();
        source.get().disconnect();
      };
    }, [logLevel, mediaRef, audioContext, source, shouldUseWebAudioApi]);
  }
  if (audioStuffRef.current) {
    const valueToSet = volume;
    if (!isApproximatelyTheSame(audioStuffRef.current.gainNode.gain.value, valueToSet)) {
      audioStuffRef.current.gainNode.gain.value = valueToSet;
      Log.trace({ logLevel, tag: null }, `Setting gain to ${valueToSet} for ${mediaRef.current?.src}`);
    }
  }
  const safariCase = isSafari() && mediaRef.current && mediaRef.current?.playbackRate !== 1;
  const shouldUseTraditionalVolume = safariCase || !shouldUseWebAudioApi;
  if (shouldUseTraditionalVolume && mediaRef.current && !isApproximatelyTheSame(volume, mediaRef.current?.volume)) {
    mediaRef.current.volume = Math.min(volume, 1);
  }
  return audioStuffRef;
};

// src/use-media-in-timeline.ts


// src/audio/use-audio-frame.ts

var useMediaStartsAt = () => {
  const parentSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const startsAt = Math.min(0, parentSequence?.relativeFrom ?? 0);
  return startsAt;
};
var useFrameForVolumeProp = (behavior) => {
  const loop = Loop.useLoop();
  const frame = useCurrentFrame();
  const startsAt = useMediaStartsAt();
  if (behavior === "repeat" || loop === null) {
    return frame + startsAt;
  }
  return frame + startsAt + loop.durationInFrames * loop.iteration;
};

// src/get-asset-file-name.ts
var getAssetDisplayName = (filename) => {
  if (/data:|blob:/.test(filename.substring(0, 5))) {
    return "Data URL";
  }
  const splitted = filename.split("/").map((s) => s.split("\\")).flat(1);
  return splitted[splitted.length - 1];
};

// src/volume-prop.ts
var evaluateVolume = ({
  frame,
  volume,
  mediaVolume = 1
}) => {
  if (typeof volume === "number") {
    return volume * mediaVolume;
  }
  if (typeof volume === "undefined") {
    return Number(mediaVolume);
  }
  const evaluated = volume(frame) * mediaVolume;
  if (typeof evaluated !== "number") {
    throw new TypeError(`You passed in a a function to the volume prop but it did not return a number but a value of type ${typeof evaluated} for frame ${frame}`);
  }
  if (Number.isNaN(evaluated)) {
    throw new TypeError(`You passed in a function to the volume prop but it returned NaN for frame ${frame}.`);
  }
  if (!Number.isFinite(evaluated)) {
    throw new TypeError(`You passed in a function to the volume prop but it returned a non-finite number for frame ${frame}.`);
  }
  return Math.max(0, evaluated);
};

// src/use-media-in-timeline.ts
var didWarn = {};
var warnOnce2 = (message) => {
  if (didWarn[message]) {
    return;
  }
  console.warn(message);
  didWarn[message] = true;
};
var useBasicMediaInTimeline = ({
  volume,
  mediaVolume,
  mediaType,
  src,
  displayName,
  trimBefore,
  trimAfter,
  playbackRate
}) => {
  if (!src) {
    throw new Error("No src passed");
  }
  const startsAt = useMediaStartsAt();
  const parentSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const videoConfig = useVideoConfig();
  const [initialVolume] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => volume);
  const mediaDuration = calculateMediaDuration({
    mediaDurationInFrames: videoConfig.durationInFrames,
    playbackRate,
    trimBefore,
    trimAfter
  });
  const duration = parentSequence ? Math.min(parentSequence.durationInFrames, mediaDuration) : mediaDuration;
  const volumes = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (typeof volume === "number") {
      return volume;
    }
    return new Array(Math.floor(Math.max(0, duration + startsAt))).fill(true).map((_, i) => {
      return evaluateVolume({
        frame: i + startsAt,
        volume,
        mediaVolume
      });
    }).join(",");
  }, [duration, startsAt, volume, mediaVolume]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (typeof volume === "number" && volume !== initialVolume) {
      warnOnce2(`Remotion: The ${mediaType} with src ${src} has changed it's volume. Prefer the callback syntax for setting volume to get better timeline display: https://www.remotion.dev/docs/audio/volume`);
    }
  }, [initialVolume, mediaType, src, volume]);
  const doesVolumeChange = typeof volume === "function";
  const nonce = useNonce();
  const { rootId } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TimelineContext);
  const env = useRemotionEnvironment();
  return {
    volumes,
    duration,
    doesVolumeChange,
    nonce,
    rootId,
    isStudio: env.isStudio,
    finalDisplayName: displayName ?? getAssetDisplayName(src)
  };
};
var useMediaInTimeline = ({
  volume,
  mediaVolume,
  src,
  mediaType,
  playbackRate,
  displayName,
  id,
  stack,
  showInTimeline,
  premountDisplay,
  postmountDisplay,
  loopDisplay
}) => {
  const parentSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const startsAt = useMediaStartsAt();
  const { registerSequence, unregisterSequence } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceManager);
  const {
    volumes,
    duration,
    doesVolumeChange,
    nonce,
    rootId,
    isStudio,
    finalDisplayName
  } = useBasicMediaInTimeline({
    volume,
    mediaVolume,
    mediaType,
    src,
    displayName,
    trimAfter: undefined,
    trimBefore: undefined,
    playbackRate
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!src) {
      throw new Error("No src passed");
    }
    if (!isStudio && window.process?.env?.NODE_ENV !== "test") {
      return;
    }
    if (!showInTimeline) {
      return;
    }
    registerSequence({
      type: mediaType,
      src,
      id,
      duration,
      from: 0,
      parent: parentSequence?.id ?? null,
      displayName: finalDisplayName,
      rootId,
      volume: volumes,
      showInTimeline: true,
      nonce,
      startMediaFrom: 0 - startsAt,
      doesVolumeChange,
      loopDisplay,
      playbackRate,
      stack,
      premountDisplay,
      postmountDisplay
    });
    return () => {
      unregisterSequence(id);
    };
  }, [
    duration,
    id,
    parentSequence,
    src,
    registerSequence,
    unregisterSequence,
    volumes,
    doesVolumeChange,
    nonce,
    mediaType,
    startsAt,
    playbackRate,
    stack,
    showInTimeline,
    premountDisplay,
    postmountDisplay,
    isStudio,
    loopDisplay,
    rootId,
    finalDisplayName
  ]);
};

// src/use-media-playback.ts


// src/buffer-until-first-frame.ts


// src/use-buffer-state.ts


// src/buffering.tsx


var useBufferManager = (logLevel, mountTime) => {
  const [blocks, setBlocks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [onBufferingCallbacks, setOnBufferingCallbacks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [onResumeCallbacks, setOnResumeCallbacks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const env = useRemotionEnvironment();
  const rendering = env.isRendering;
  const buffering = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const addBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((block) => {
    if (rendering) {
      return {
        unblock: () => {
          return;
        }
      };
    }
    setBlocks((b) => [...b, block]);
    return {
      unblock: () => {
        setBlocks((b) => {
          const newArr = b.filter((bx) => bx !== block);
          if (newArr.length === b.length) {
            return b;
          }
          return newArr;
        });
      }
    };
  }, [rendering]);
  const listenForBuffering = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((callback) => {
    setOnBufferingCallbacks((c) => [...c, callback]);
    return {
      remove: () => {
        setOnBufferingCallbacks((c) => c.filter((cb) => cb !== callback));
      }
    };
  }, []);
  const listenForResume = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((callback) => {
    setOnResumeCallbacks((c) => [...c, callback]);
    return {
      remove: () => {
        setOnResumeCallbacks((c) => c.filter((cb) => cb !== callback));
      }
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (rendering) {
      return;
    }
    if (blocks.length > 0) {
      onBufferingCallbacks.forEach((c) => c());
      playbackLogging({
        logLevel,
        message: "Player is entering buffer state",
        mountTime,
        tag: "player"
      });
    }
  }, [blocks]);
  if (typeof window !== "undefined") {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
      if (rendering) {
        return;
      }
      if (blocks.length === 0) {
        onResumeCallbacks.forEach((c) => c());
        playbackLogging({
          logLevel,
          message: "Player is exiting buffer state",
          mountTime,
          tag: "player"
        });
      }
    }, [blocks]);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return { addBlock, listenForBuffering, listenForResume, buffering };
  }, [addBlock, buffering, listenForBuffering, listenForResume]);
};
var BufferingContextReact = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
var BufferingProvider = ({ children }) => {
  const { logLevel, mountTime } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(LogLevelContext);
  const bufferManager = useBufferManager(logLevel ?? "info", mountTime);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(BufferingContextReact.Provider, {
    value: bufferManager,
    children
  });
};
var useIsPlayerBuffering = (bufferManager) => {
  const [isBuffering, setIsBuffering] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(bufferManager.buffering.current);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onBuffer = () => {
      setIsBuffering(true);
    };
    const onResume = () => {
      setIsBuffering(false);
    };
    bufferManager.listenForBuffering(onBuffer);
    bufferManager.listenForResume(onResume);
    return () => {
      bufferManager.listenForBuffering(() => {
        return;
      });
      bufferManager.listenForResume(() => {
        return;
      });
    };
  }, [bufferManager]);
  return isBuffering;
};

// src/use-buffer-state.ts
var useBufferState = () => {
  const buffer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(BufferingContextReact);
  const addBlock = buffer ? buffer.addBlock : null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    delayPlayback: () => {
      if (!addBlock) {
        throw new Error("Tried to enable the buffering state, but a Remotion context was not found. This API can only be called in a component that was passed to the Remotion Player or a <Composition>. Or you might have experienced a version mismatch - run `npx remotion versions` and ensure all packages have the same version. This error is thrown by the buffer state https://remotion.dev/docs/player/buffer-state");
      }
      const { unblock } = addBlock({
        id: String(Math.random())
      });
      return { unblock };
    }
  }), [addBlock]);
};

// src/buffer-until-first-frame.ts
var isSafariWebkit = () => {
  const isSafari2 = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
  return isSafari2;
};
var useBufferUntilFirstFrame = ({
  mediaRef,
  mediaType,
  onVariableFpsVideoDetected,
  pauseWhenBuffering,
  logLevel,
  mountTime
}) => {
  const bufferingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const { delayPlayback } = useBufferState();
  const bufferUntilFirstFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((requestedTime) => {
    if (mediaType !== "video") {
      return;
    }
    if (!pauseWhenBuffering) {
      return;
    }
    const current = mediaRef.current;
    if (!current) {
      return;
    }
    if (current.readyState >= current.HAVE_FUTURE_DATA && !isSafariWebkit()) {
      playbackLogging({
        logLevel,
        message: `Not using buffer until first frame, because readyState is ${current.readyState} and is not Safari or Desktop Chrome`,
        mountTime,
        tag: "buffer"
      });
      return;
    }
    if (!current.requestVideoFrameCallback) {
      playbackLogging({
        logLevel,
        message: `Not using buffer until first frame, because requestVideoFrameCallback is not supported`,
        mountTime,
        tag: "buffer"
      });
      return;
    }
    bufferingRef.current = true;
    playbackLogging({
      logLevel,
      message: `Buffering ${mediaRef.current?.src} until the first frame is received`,
      mountTime,
      tag: "buffer"
    });
    const playback = delayPlayback();
    const unblock = () => {
      playback.unblock();
      current.removeEventListener("ended", unblock, {
        once: true
      });
      current.removeEventListener("pause", unblock, {
        once: true
      });
      bufferingRef.current = false;
    };
    const onEndedOrPauseOrCanPlay = () => {
      unblock();
    };
    current.requestVideoFrameCallback((_, info2) => {
      const differenceFromRequested = Math.abs(info2.mediaTime - requestedTime);
      if (differenceFromRequested > 0.5) {
        onVariableFpsVideoDetected();
      }
      unblock();
    });
    current.addEventListener("ended", onEndedOrPauseOrCanPlay, { once: true });
    current.addEventListener("pause", onEndedOrPauseOrCanPlay, { once: true });
    current.addEventListener("canplay", onEndedOrPauseOrCanPlay, {
      once: true
    });
  }, [
    delayPlayback,
    logLevel,
    mediaRef,
    mediaType,
    mountTime,
    onVariableFpsVideoDetected,
    pauseWhenBuffering
  ]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      isBuffering: () => bufferingRef.current,
      bufferUntilFirstFrame
    };
  }, [bufferUntilFirstFrame]);
};

// src/media-tag-current-time-timestamp.ts

var useCurrentTimeOfMediaTagWithUpdateTimeStamp = (mediaRef) => {
  const lastUpdate = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
    time: mediaRef.current?.currentTime ?? 0,
    lastUpdate: performance.now()
  });
  const nowCurrentTime = mediaRef.current?.currentTime ?? null;
  if (nowCurrentTime !== null) {
    if (lastUpdate.current.time !== nowCurrentTime) {
      lastUpdate.current.time = nowCurrentTime;
      lastUpdate.current.lastUpdate = performance.now();
    }
  }
  return lastUpdate;
};

// src/seek.ts
var seek = ({
  mediaRef,
  time,
  logLevel,
  why,
  mountTime
}) => {
  const timeToSet = isIosSafari() ? Number(time.toFixed(1)) : time;
  playbackLogging({
    logLevel,
    tag: "seek",
    message: `Seeking from ${mediaRef.currentTime} to ${timeToSet}. src= ${mediaRef.src} Reason: ${why}`,
    mountTime
  });
  mediaRef.currentTime = timeToSet;
  return timeToSet;
};

// src/use-media-buffering.ts

var useMediaBuffering = ({
  element,
  shouldBuffer,
  isPremounting,
  isPostmounting,
  logLevel,
  mountTime,
  src
}) => {
  const buffer = useBufferState();
  const [isBuffering, setIsBuffering] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let cleanupFns = [];
    const { current } = element;
    if (!current) {
      return;
    }
    if (!shouldBuffer) {
      return;
    }
    if (isPremounting || isPostmounting) {
      if ((isPremounting || isPostmounting) && current.readyState < current.HAVE_FUTURE_DATA) {
        if (!navigator.userAgent.includes("Firefox/")) {
          playbackLogging({
            logLevel,
            message: `Calling .load() on ${current.src} because readyState is ${current.readyState} and it is not Firefox. Element is premounted ${current.playbackRate}`,
            tag: "load",
            mountTime
          });
          const previousPlaybackRate = current.playbackRate;
          current.load();
          current.playbackRate = previousPlaybackRate;
        }
      }
      return;
    }
    const cleanup = (reason) => {
      let didDoSomething = false;
      cleanupFns.forEach((fn) => {
        fn(reason);
        didDoSomething = true;
      });
      cleanupFns = [];
      setIsBuffering((previous) => {
        if (previous) {
          didDoSomething = true;
        }
        return false;
      });
      if (didDoSomething) {
        playbackLogging({
          logLevel,
          message: `Unmarking as buffering: ${current.src}. Reason: ${reason}`,
          tag: "buffer",
          mountTime
        });
      }
    };
    const blockMedia = (reason) => {
      setIsBuffering(true);
      playbackLogging({
        logLevel,
        message: `Marking as buffering: ${current.src}. Reason: ${reason}`,
        tag: "buffer",
        mountTime
      });
      const { unblock } = buffer.delayPlayback();
      const onCanPlay = () => {
        cleanup('"canplay" was fired');
        init();
      };
      const onError = () => {
        cleanup('"error" event was occurred');
        init();
      };
      current.addEventListener("canplay", onCanPlay, {
        once: true
      });
      cleanupFns.push(() => {
        current.removeEventListener("canplay", onCanPlay);
      });
      current.addEventListener("error", onError, {
        once: true
      });
      cleanupFns.push(() => {
        current.removeEventListener("error", onError);
      });
      cleanupFns.push((cleanupReason) => {
        playbackLogging({
          logLevel,
          message: `Unblocking ${current.src} from buffer. Reason: ${cleanupReason}`,
          tag: "buffer",
          mountTime
        });
        unblock();
      });
    };
    const init = () => {
      if (current.readyState < current.HAVE_FUTURE_DATA) {
        blockMedia(`readyState is ${current.readyState}, which is less than HAVE_FUTURE_DATA`);
        if (!navigator.userAgent.includes("Firefox/")) {
          playbackLogging({
            logLevel,
            message: `Calling .load() on ${src} because readyState is ${current.readyState} and it is not Firefox. ${current.playbackRate}`,
            tag: "load",
            mountTime
          });
          const previousPlaybackRate = current.playbackRate;
          current.load();
          current.playbackRate = previousPlaybackRate;
        }
      } else {
        const onWaiting = () => {
          blockMedia('"waiting" event was fired');
        };
        current.addEventListener("waiting", onWaiting);
        cleanupFns.push(() => {
          current.removeEventListener("waiting", onWaiting);
        });
      }
    };
    init();
    return () => {
      cleanup("element was unmounted or prop changed");
    };
  }, [
    buffer,
    src,
    element,
    isPremounting,
    isPostmounting,
    logLevel,
    shouldBuffer,
    mountTime
  ]);
  return isBuffering;
};

// src/use-request-video-callback-time.ts

var useRequestVideoCallbackTime = ({
  mediaRef,
  mediaType,
  lastSeek,
  onVariableFpsVideoDetected
}) => {
  const currentTime = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const { current } = mediaRef;
    if (current) {
      currentTime.current = {
        time: current.currentTime,
        lastUpdate: performance.now()
      };
    } else {
      currentTime.current = null;
      return;
    }
    if (mediaType !== "video") {
      currentTime.current = null;
      return;
    }
    const videoTag = current;
    if (!videoTag.requestVideoFrameCallback) {
      return;
    }
    let cancel = () => {
      return;
    };
    const request = () => {
      if (!videoTag) {
        return;
      }
      const cb = videoTag.requestVideoFrameCallback((_, info2) => {
        if (currentTime.current !== null) {
          const difference = Math.abs(currentTime.current.time - info2.mediaTime);
          const differenceToLastSeek = Math.abs(lastSeek.current === null ? Infinity : info2.mediaTime - lastSeek.current);
          if (difference > 0.5 && differenceToLastSeek > 0.5 && info2.mediaTime > currentTime.current.time) {
            onVariableFpsVideoDetected();
          }
        }
        currentTime.current = {
          time: info2.mediaTime,
          lastUpdate: performance.now()
        };
        request();
      });
      cancel = () => {
        videoTag.cancelVideoFrameCallback(cb);
        cancel = () => {
          return;
        };
      };
    };
    request();
    return () => {
      cancel();
    };
  }, [lastSeek, mediaRef, mediaType, onVariableFpsVideoDetected]);
  return currentTime;
};

// src/interpolate.ts
function interpolateFunction(input, inputRange, outputRange, options) {
  const { extrapolateLeft, extrapolateRight, easing } = options;
  let result = input;
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  if (result < inputMin) {
    if (extrapolateLeft === "identity") {
      return result;
    }
    if (extrapolateLeft === "clamp") {
      result = inputMin;
    } else if (extrapolateLeft === "wrap") {
      const range = inputMax - inputMin;
      result = ((result - inputMin) % range + range) % range + inputMin;
    } else if (extrapolateLeft === "extend") {}
  }
  if (result > inputMax) {
    if (extrapolateRight === "identity") {
      return result;
    }
    if (extrapolateRight === "clamp") {
      result = inputMax;
    } else if (extrapolateRight === "wrap") {
      const range = inputMax - inputMin;
      result = ((result - inputMin) % range + range) % range + inputMin;
    } else if (extrapolateRight === "extend") {}
  }
  if (outputMin === outputMax) {
    return outputMin;
  }
  result = (result - inputMin) / (inputMax - inputMin);
  result = easing(result);
  result = result * (outputMax - outputMin) + outputMin;
  return result;
}
function findRange(input, inputRange) {
  let i;
  for (i = 1;i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) {
      break;
    }
  }
  return i - 1;
}
function checkValidInputRange(arr) {
  for (let i = 1;i < arr.length; ++i) {
    if (!(arr[i] > arr[i - 1])) {
      throw new Error(`inputRange must be strictly monotonically increasing but got [${arr.join(",")}]`);
    }
  }
}
function checkInfiniteRange(name, arr) {
  if (arr.length < 2) {
    throw new Error(name + " must have at least 2 elements");
  }
  for (const element of arr) {
    if (typeof element !== "number") {
      throw new Error(`${name} must contain only numbers`);
    }
    if (!Number.isFinite(element)) {
      throw new Error(`${name} must contain only finite numbers, but got [${arr.join(",")}]`);
    }
  }
}
function interpolate(input, inputRange, outputRange, options) {
  if (typeof input === "undefined") {
    throw new Error("input can not be undefined");
  }
  if (typeof inputRange === "undefined") {
    throw new Error("inputRange can not be undefined");
  }
  if (typeof outputRange === "undefined") {
    throw new Error("outputRange can not be undefined");
  }
  if (inputRange.length !== outputRange.length) {
    throw new Error("inputRange (" + inputRange.length + ") and outputRange (" + outputRange.length + ") must have the same length");
  }
  checkInfiniteRange("inputRange", inputRange);
  checkInfiniteRange("outputRange", outputRange);
  checkValidInputRange(inputRange);
  const easing = options?.easing ?? ((num) => num);
  let extrapolateLeft = "extend";
  if (options?.extrapolateLeft !== undefined) {
    extrapolateLeft = options.extrapolateLeft;
  }
  let extrapolateRight = "extend";
  if (options?.extrapolateRight !== undefined) {
    extrapolateRight = options.extrapolateRight;
  }
  if (typeof input !== "number") {
    throw new TypeError("Cannot interpolate an input which is not a number");
  }
  const range = findRange(input, inputRange);
  return interpolateFunction(input, [inputRange[range], inputRange[range + 1]], [outputRange[range], outputRange[range + 1]], {
    easing,
    extrapolateLeft,
    extrapolateRight
  });
}

// src/video/get-current-time.ts
var getExpectedMediaFrameUncorrected = ({
  frame,
  playbackRate,
  startFrom
}) => {
  return interpolate(frame, [-1, startFrom, startFrom + 1], [-1, startFrom, startFrom + playbackRate]);
};
var getMediaTime = ({
  fps,
  frame,
  playbackRate,
  startFrom
}) => {
  const expectedFrame = getExpectedMediaFrameUncorrected({
    frame,
    playbackRate,
    startFrom
  });
  const msPerFrame = 1000 / fps;
  return expectedFrame * msPerFrame / 1000;
};

// src/warn-about-non-seekable-media.ts
var alreadyWarned = {};
var warnAboutNonSeekableMedia = (ref, type) => {
  if (ref === null) {
    return;
  }
  if (ref.seekable.length === 0) {
    return;
  }
  if (ref.seekable.length > 1) {
    return;
  }
  if (alreadyWarned[ref.src]) {
    return;
  }
  const range = { start: ref.seekable.start(0), end: ref.seekable.end(0) };
  if (range.start === 0 && range.end === 0) {
    const msg = [
      `The media ${ref.src} cannot be seeked. This could be one of few reasons:`,
      "1) The media resource was replaced while the video is playing but it was not loaded yet.",
      "2) The media does not support seeking.",
      "3) The media was loaded with security headers prventing it from being included.",
      "Please see https://remotion.dev/docs/non-seekable-media for assistance."
    ].join(`
`);
    if (type === "console-error") {
      console.error(msg);
    } else if (type === "console-warning") {
      console.warn(`The media ${ref.src} does not support seeking. The video will render fine, but may not play correctly in the Remotion Studio and in the <Player>. See https://remotion.dev/docs/non-seekable-media for an explanation.`);
    } else {
      throw new Error(msg);
    }
    alreadyWarned[ref.src] = true;
  }
};

// src/use-media-playback.ts
var useMediaPlayback = ({
  mediaRef,
  src,
  mediaType,
  playbackRate: localPlaybackRate,
  onlyWarnForMediaSeekingError,
  acceptableTimeshift,
  pauseWhenBuffering,
  isPremounting,
  isPostmounting,
  onAutoPlayError
}) => {
  const { playbackRate: globalPlaybackRate } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TimelineContext);
  const frame = useCurrentFrame();
  const absoluteFrame = useTimelinePosition();
  const [playing] = usePlayingState();
  const buffering = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(BufferingContextReact);
  const { fps } = useVideoConfig();
  const mediaStartsAt = useMediaStartsAt();
  const lastSeekDueToShift = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const lastSeek = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const logLevel = useLogLevel();
  const mountTime = useMountTime();
  if (!buffering) {
    throw new Error("useMediaPlayback must be used inside a <BufferingContext>");
  }
  const isVariableFpsVideoMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
  const onVariableFpsVideoDetected = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!src) {
      return;
    }
    if (isVariableFpsVideoMap.current[src]) {
      return;
    }
    Log.verbose({ logLevel, tag: null }, `Detected ${src} as a variable FPS video. Disabling buffering while seeking.`);
    isVariableFpsVideoMap.current[src] = true;
  }, [logLevel, src]);
  const rvcCurrentTime = useRequestVideoCallbackTime({
    mediaRef,
    mediaType,
    lastSeek,
    onVariableFpsVideoDetected
  });
  const mediaTagCurrentTime = useCurrentTimeOfMediaTagWithUpdateTimeStamp(mediaRef);
  const desiredUnclampedTime = getMediaTime({
    frame,
    playbackRate: localPlaybackRate,
    startFrom: -mediaStartsAt,
    fps
  });
  const isMediaTagBuffering = useMediaBuffering({
    element: mediaRef,
    shouldBuffer: pauseWhenBuffering,
    isPremounting,
    isPostmounting,
    logLevel,
    mountTime,
    src: src ?? null
  });
  const { bufferUntilFirstFrame, isBuffering } = useBufferUntilFirstFrame({
    mediaRef,
    mediaType,
    onVariableFpsVideoDetected,
    pauseWhenBuffering,
    logLevel,
    mountTime
  });
  const playbackRate = localPlaybackRate * globalPlaybackRate;
  const acceptableTimeShiftButLessThanDuration = (() => {
    const DEFAULT_ACCEPTABLE_TIMESHIFT_WITH_NORMAL_PLAYBACK = 0.45;
    const DEFAULT_ACCEPTABLE_TIMESHIFT_WITH_AMPLIFICATION = DEFAULT_ACCEPTABLE_TIMESHIFT_WITH_NORMAL_PLAYBACK + 0.2;
    const defaultAcceptableTimeshift = DEFAULT_ACCEPTABLE_TIMESHIFT_WITH_AMPLIFICATION;
    if (mediaRef.current?.duration) {
      return Math.min(mediaRef.current.duration, acceptableTimeshift ?? defaultAcceptableTimeshift);
    }
    return acceptableTimeshift ?? defaultAcceptableTimeshift;
  })();
  const isPlayerBuffering = useIsPlayerBuffering(buffering);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (mediaRef.current?.paused) {
      return;
    }
    if (!playing) {
      playbackLogging({
        logLevel,
        tag: "pause",
        message: `Pausing ${mediaRef.current?.src} because ${isPremounting ? "media is premounting" : isPostmounting ? "media is postmounting" : "Player is not playing"}`,
        mountTime
      });
      mediaRef.current?.pause();
      return;
    }
    const isMediaTagBufferingOrStalled = isMediaTagBuffering || isBuffering();
    const playerBufferingNotStateButLive = buffering.buffering.current;
    if (playerBufferingNotStateButLive && !isMediaTagBufferingOrStalled) {
      playbackLogging({
        logLevel,
        tag: "pause",
        message: `Pausing ${mediaRef.current?.src} because player is buffering but media tag is not`,
        mountTime
      });
      mediaRef.current?.pause();
    }
  }, [
    isBuffering,
    isMediaTagBuffering,
    buffering,
    isPlayerBuffering,
    isPremounting,
    logLevel,
    mediaRef,
    mediaType,
    mountTime,
    playing,
    isPostmounting
  ]);
  const env = useRemotionEnvironment();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    const playbackRateToSet = Math.max(0, playbackRate);
    if (mediaRef.current && mediaRef.current.playbackRate !== playbackRateToSet) {
      mediaRef.current.playbackRate = playbackRateToSet;
    }
  }, [mediaRef, playbackRate]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const tagName = mediaType === "audio" ? "<Html5Audio>" : "<Html5Video>";
    if (!mediaRef.current) {
      throw new Error(`No ${mediaType} ref found`);
    }
    if (!src) {
      throw new Error(`No 'src' attribute was passed to the ${tagName} element.`);
    }
    const { duration } = mediaRef.current;
    const shouldBeTime = !Number.isNaN(duration) && Number.isFinite(duration) ? Math.min(duration, desiredUnclampedTime) : desiredUnclampedTime;
    const mediaTagTime = mediaTagCurrentTime.current.time;
    const rvcTime = rvcCurrentTime.current?.time ?? null;
    const isVariableFpsVideo = isVariableFpsVideoMap.current[src];
    const timeShiftMediaTag = Math.abs(shouldBeTime - mediaTagTime);
    const timeShiftRvcTag = rvcTime ? Math.abs(shouldBeTime - rvcTime) : null;
    const mostRecentTimeshift = rvcCurrentTime.current?.lastUpdate && rvcCurrentTime.current.time > mediaTagCurrentTime.current.lastUpdate ? timeShiftRvcTag : timeShiftMediaTag;
    const timeShift = timeShiftRvcTag && !isVariableFpsVideo ? mostRecentTimeshift : timeShiftMediaTag;
    if (timeShift > acceptableTimeShiftButLessThanDuration && lastSeekDueToShift.current !== shouldBeTime) {
      lastSeek.current = seek({
        mediaRef: mediaRef.current,
        time: shouldBeTime,
        logLevel,
        why: `because time shift is too big. shouldBeTime = ${shouldBeTime}, isTime = ${mediaTagTime}, requestVideoCallbackTime = ${rvcTime}, timeShift = ${timeShift}${isVariableFpsVideo ? ", isVariableFpsVideo = true" : ""}, isPremounting = ${isPremounting}, isPostmounting = ${isPostmounting}, pauseWhenBuffering = ${pauseWhenBuffering}`,
        mountTime
      });
      lastSeekDueToShift.current = lastSeek.current;
      if (playing) {
        if (playbackRate > 0) {
          bufferUntilFirstFrame(shouldBeTime);
        }
        if (mediaRef.current.paused) {
          playAndHandleNotAllowedError({
            mediaRef,
            mediaType,
            onAutoPlayError,
            logLevel,
            mountTime,
            reason: "player is playing but media tag is paused, and just seeked",
            isPlayer: env.isPlayer
          });
        }
      }
      if (!onlyWarnForMediaSeekingError) {
        warnAboutNonSeekableMedia(mediaRef.current, onlyWarnForMediaSeekingError ? "console-warning" : "console-error");
      }
      return;
    }
    const seekThreshold = playing ? 0.15 : 0.01;
    const makesSenseToSeek = Math.abs(mediaRef.current.currentTime - shouldBeTime) > seekThreshold;
    const isMediaTagBufferingOrStalled = isMediaTagBuffering || isBuffering();
    const isSomethingElseBuffering = buffering.buffering.current && !isMediaTagBufferingOrStalled;
    if (!playing || isSomethingElseBuffering) {
      if (makesSenseToSeek) {
        lastSeek.current = seek({
          mediaRef: mediaRef.current,
          time: shouldBeTime,
          logLevel,
          why: `not playing or something else is buffering. time offset is over seek threshold (${seekThreshold})`,
          mountTime
        });
      }
      return;
    }
    if (!playing || buffering.buffering.current) {
      return;
    }
    const pausedCondition = mediaRef.current.paused && !mediaRef.current.ended;
    const firstFrameCondition = absoluteFrame === 0;
    if (pausedCondition || firstFrameCondition) {
      const reason = pausedCondition ? "media tag is paused" : "absolute frame is 0";
      if (makesSenseToSeek) {
        lastSeek.current = seek({
          mediaRef: mediaRef.current,
          time: shouldBeTime,
          logLevel,
          why: `is over timeshift threshold (threshold = ${seekThreshold}) and ${reason}`,
          mountTime
        });
      }
      playAndHandleNotAllowedError({
        mediaRef,
        mediaType,
        onAutoPlayError,
        logLevel,
        mountTime,
        reason: `player is playing and ${reason}`,
        isPlayer: env.isPlayer
      });
      if (!isVariableFpsVideo && playbackRate > 0) {
        bufferUntilFirstFrame(shouldBeTime);
      }
    }
  }, [
    absoluteFrame,
    acceptableTimeShiftButLessThanDuration,
    bufferUntilFirstFrame,
    buffering.buffering,
    rvcCurrentTime,
    logLevel,
    desiredUnclampedTime,
    isBuffering,
    isMediaTagBuffering,
    mediaRef,
    mediaType,
    onlyWarnForMediaSeekingError,
    playbackRate,
    playing,
    src,
    onAutoPlayError,
    isPremounting,
    isPostmounting,
    pauseWhenBuffering,
    mountTime,
    mediaTagCurrentTime,
    env.isPlayer
  ]);
};

// src/use-media-tag.ts

var useMediaTag = ({
  mediaRef,
  id,
  mediaType,
  onAutoPlayError,
  isPremounting,
  isPostmounting
}) => {
  const { audioAndVideoTags, imperativePlaying } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TimelineContext);
  const logLevel = useLogLevel();
  const mountTime = useMountTime();
  const env = useRemotionEnvironment();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const tag = {
      id,
      play: (reason) => {
        if (!imperativePlaying.current) {
          return;
        }
        if (isPremounting || isPostmounting) {
          return;
        }
        return playAndHandleNotAllowedError({
          mediaRef,
          mediaType,
          onAutoPlayError,
          logLevel,
          mountTime,
          reason,
          isPlayer: env.isPlayer
        });
      }
    };
    audioAndVideoTags.current.push(tag);
    return () => {
      audioAndVideoTags.current = audioAndVideoTags.current.filter((a) => a.id !== id);
    };
  }, [
    audioAndVideoTags,
    id,
    mediaRef,
    mediaType,
    onAutoPlayError,
    imperativePlaying,
    isPremounting,
    isPostmounting,
    logLevel,
    mountTime,
    env.isPlayer
  ]);
};

// src/volume-position-state.ts

var MediaVolumeContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  mediaMuted: false,
  mediaVolume: 1
});
var SetMediaVolumeContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  setMediaMuted: () => {
    throw new Error("default");
  },
  setMediaVolume: () => {
    throw new Error("default");
  }
});
var useMediaVolumeState = () => {
  const { mediaVolume } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MediaVolumeContext);
  const { setMediaVolume } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SetMediaVolumeContext);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return [mediaVolume, setMediaVolume];
  }, [mediaVolume, setMediaVolume]);
};
var useMediaMutedState = () => {
  const { mediaMuted } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MediaVolumeContext);
  const { setMediaMuted } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SetMediaVolumeContext);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return [mediaMuted, setMediaMuted];
  }, [mediaMuted, setMediaMuted]);
};

// src/volume-safeguard.ts
var warnAboutTooHighVolume = (volume) => {
  if (volume >= 100) {
    throw new Error(`Volume was set to ${volume}, but regular volume is 1, not 100. Did you forget to divide by 100? Set a volume of less than 100 to dismiss this error.`);
  }
};

// src/audio/AudioForPreview.tsx

var AudioForDevelopmentForwardRefFunction = (props, ref) => {
  const [initialShouldPreMountAudioElements] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.shouldPreMountAudioTags);
  if (props.shouldPreMountAudioTags !== initialShouldPreMountAudioElements) {
    throw new Error("Cannot change the behavior for pre-mounting audio tags dynamically.");
  }
  const logLevel = useLogLevel();
  const {
    volume,
    muted,
    playbackRate,
    shouldPreMountAudioTags,
    src,
    onDuration,
    acceptableTimeShiftInSeconds,
    _remotionInternalNeedsDurationCalculation,
    _remotionInternalNativeLoopPassed,
    _remotionInternalStack,
    allowAmplificationDuringRender,
    name,
    pauseWhenBuffering,
    showInTimeline,
    loopVolumeCurveBehavior,
    stack,
    crossOrigin,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    toneFrequency,
    useWebAudioApi,
    onError,
    onNativeError,
    audioStreamIndex,
    ...nativeProps
  } = props;
  const _propsValid = true;
  if (!_propsValid) {
    throw new Error("typecheck error");
  }
  const [mediaVolume] = useMediaVolumeState();
  const [mediaMuted] = useMediaMutedState();
  const volumePropFrame = useFrameForVolumeProp(loopVolumeCurveBehavior ?? "repeat");
  const { hidden } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceVisibilityToggleContext);
  if (!src) {
    throw new TypeError("No 'src' was passed to <Html5Audio>.");
  }
  const preloadedSrc = usePreload(src);
  const sequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const [timelineId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => String(Math.random()));
  const isSequenceHidden = hidden[timelineId] ?? false;
  const userPreferredVolume = evaluateVolume({
    frame: volumePropFrame,
    volume,
    mediaVolume
  });
  warnAboutTooHighVolume(userPreferredVolume);
  const crossOriginValue = getCrossOriginValue({
    crossOrigin,
    requestsVideoFrame: false,
    isClientSideRendering: false
  });
  const propsToPass = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      muted: muted || mediaMuted || isSequenceHidden || userPreferredVolume <= 0,
      src: preloadedSrc,
      loop: _remotionInternalNativeLoopPassed,
      crossOrigin: crossOriginValue,
      ...nativeProps
    };
  }, [
    _remotionInternalNativeLoopPassed,
    isSequenceHidden,
    mediaMuted,
    muted,
    nativeProps,
    preloadedSrc,
    userPreferredVolume,
    crossOriginValue
  ]);
  const id = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => `audio-${random(src ?? "")}-${sequenceContext?.relativeFrom}-${sequenceContext?.cumulatedFrom}-${sequenceContext?.durationInFrames}-muted:${props.muted}-loop:${props.loop}`, [
    src,
    sequenceContext?.relativeFrom,
    sequenceContext?.cumulatedFrom,
    sequenceContext?.durationInFrames,
    props.muted,
    props.loop
  ]);
  const {
    el: audioRef,
    mediaElementSourceNode,
    cleanupOnMediaTagUnmount
  } = useSharedAudio({
    aud: propsToPass,
    audioId: id,
    premounting: Boolean(sequenceContext?.premounting),
    postmounting: Boolean(sequenceContext?.postmounting)
  });
  useMediaInTimeline({
    volume,
    mediaVolume,
    src,
    mediaType: "audio",
    playbackRate: playbackRate ?? 1,
    displayName: name ?? null,
    id: timelineId,
    stack: _remotionInternalStack,
    showInTimeline,
    premountDisplay: sequenceContext?.premountDisplay ?? null,
    postmountDisplay: sequenceContext?.postmountDisplay ?? null,
    loopDisplay: undefined
  });
  useMediaPlayback({
    mediaRef: audioRef,
    src,
    mediaType: "audio",
    playbackRate: playbackRate ?? 1,
    onlyWarnForMediaSeekingError: false,
    acceptableTimeshift: acceptableTimeShiftInSeconds ?? null,
    isPremounting: Boolean(sequenceContext?.premounting),
    isPostmounting: Boolean(sequenceContext?.postmounting),
    pauseWhenBuffering,
    onAutoPlayError: null
  });
  useMediaTag({
    id: timelineId,
    isPostmounting: Boolean(sequenceContext?.postmounting),
    isPremounting: Boolean(sequenceContext?.premounting),
    mediaRef: audioRef,
    mediaType: "audio",
    onAutoPlayError: null
  });
  useVolume({
    logLevel,
    mediaRef: audioRef,
    source: mediaElementSourceNode,
    volume: userPreferredVolume,
    shouldUseWebAudioApi: useWebAudioApi ?? false
  });
  const effectToUse = react__WEBPACK_IMPORTED_MODULE_0__.useInsertionEffect ?? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
  effectToUse(() => {
    return () => {
      requestAnimationFrame(() => {
        cleanupOnMediaTagUnmount();
      });
    };
  }, [cleanupOnMediaTagUnmount]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, () => {
    return audioRef.current;
  }, [audioRef]);
  const currentOnDurationCallback = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onDuration);
  currentOnDurationCallback.current = onDuration;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const { current } = audioRef;
    if (!current) {
      return;
    }
    if (current.duration) {
      currentOnDurationCallback.current?.(current.src, current.duration);
      return;
    }
    const onLoadedMetadata = () => {
      currentOnDurationCallback.current?.(current.src, current.duration);
    };
    current.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      current.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audioRef, src]);
  if (initialShouldPreMountAudioElements) {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("audio", {
    ref: audioRef,
    preload: "metadata",
    crossOrigin: crossOriginValue,
    ...propsToPass
  });
};
var AudioForPreview = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(AudioForDevelopmentForwardRefFunction);

// src/audio/AudioForRendering.tsx


var AudioForRenderingRefForwardingFunction = (props, ref) => {
  const audioRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    volume: volumeProp,
    playbackRate,
    allowAmplificationDuringRender,
    onDuration,
    toneFrequency,
    _remotionInternalNeedsDurationCalculation,
    _remotionInternalNativeLoopPassed,
    acceptableTimeShiftInSeconds,
    name,
    onNativeError,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    loopVolumeCurveBehavior,
    pauseWhenBuffering,
    audioStreamIndex,
    ...nativeProps
  } = props;
  const absoluteFrame = useTimelinePosition();
  const volumePropFrame = useFrameForVolumeProp(loopVolumeCurveBehavior ?? "repeat");
  const frame = useCurrentFrame();
  const sequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const { registerRenderAsset, unregisterRenderAsset } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(RenderAssetManager);
  const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
  const id = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => `audio-${random(props.src ?? "")}-${sequenceContext?.relativeFrom}-${sequenceContext?.cumulatedFrom}-${sequenceContext?.durationInFrames}`, [
    props.src,
    sequenceContext?.relativeFrom,
    sequenceContext?.cumulatedFrom,
    sequenceContext?.durationInFrames
  ]);
  const volume = evaluateVolume({
    volume: volumeProp,
    frame: volumePropFrame,
    mediaVolume: 1
  });
  warnAboutTooHighVolume(volume);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, () => {
    return audioRef.current;
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!props.src) {
      throw new Error("No src passed");
    }
    if (!window.remotion_audioEnabled) {
      return;
    }
    if (props.muted) {
      return;
    }
    if (volume <= 0) {
      return;
    }
    registerRenderAsset({
      type: "audio",
      src: getAbsoluteSrc(props.src),
      id,
      frame: absoluteFrame,
      volume,
      mediaFrame: frame,
      playbackRate: props.playbackRate ?? 1,
      toneFrequency: toneFrequency ?? 1,
      audioStartFrame: Math.max(0, -(sequenceContext?.relativeFrom ?? 0)),
      audioStreamIndex: audioStreamIndex ?? 0
    });
    return () => unregisterRenderAsset(id);
  }, [
    props.muted,
    props.src,
    registerRenderAsset,
    absoluteFrame,
    id,
    unregisterRenderAsset,
    volume,
    volumePropFrame,
    frame,
    playbackRate,
    props.playbackRate,
    toneFrequency,
    sequenceContext?.relativeFrom,
    audioStreamIndex
  ]);
  const { src } = props;
  const needsToRenderAudioTag = ref || _remotionInternalNeedsDurationCalculation;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    if (window.process?.env?.NODE_ENV === "test") {
      return;
    }
    if (!needsToRenderAudioTag) {
      return;
    }
    const newHandle = delayRender2("Loading <Html5Audio> duration with src=" + src, {
      retries: delayRenderRetries ?? undefined,
      timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? undefined
    });
    const { current } = audioRef;
    const didLoad = () => {
      if (current?.duration) {
        onDuration(current.src, current.duration);
      }
      continueRender2(newHandle);
    };
    if (current?.duration) {
      onDuration(current.src, current.duration);
      continueRender2(newHandle);
    } else {
      current?.addEventListener("loadedmetadata", didLoad, { once: true });
    }
    return () => {
      current?.removeEventListener("loadedmetadata", didLoad);
      continueRender2(newHandle);
    };
  }, [
    src,
    onDuration,
    needsToRenderAudioTag,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    continueRender2,
    delayRender2
  ]);
  if (!needsToRenderAudioTag) {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("audio", {
    ref: audioRef,
    ...nativeProps,
    onError: onNativeError
  });
};
var AudioForRendering = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(AudioForRenderingRefForwardingFunction);

// src/audio/Audio.tsx

var AudioRefForwardingFunction = (props, ref) => {
  const audioContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SharedAudioContext);
  const {
    startFrom,
    endAt,
    trimBefore,
    trimAfter,
    name,
    stack,
    pauseWhenBuffering,
    showInTimeline,
    onError: onRemotionError,
    ...otherProps
  } = props;
  const { loop, ...propsOtherThanLoop } = props;
  const { fps } = useVideoConfig();
  const environment = useRemotionEnvironment();
  if (environment.isClientSideRendering) {
    throw new Error("<Html5Audio> is not supported in @remotion/web-renderer. Use <Audio> from @remotion/media instead. See https://remotion.dev/docs/client-side-rendering/limitations");
  }
  const { durations, setDurations } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DurationsContext);
  if (typeof props.src !== "string") {
    throw new TypeError(`The \`<Html5Audio>\` tag requires a string for \`src\`, but got ${JSON.stringify(props.src)} instead.`);
  }
  const preloadedSrc = usePreload(props.src);
  const onError = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e) => {
    console.log(e.currentTarget.error);
    const errMessage = `Could not play audio with src ${preloadedSrc}: ${e.currentTarget.error}. See https://remotion.dev/docs/media-playback-error for help.`;
    if (loop) {
      if (onRemotionError) {
        onRemotionError(new Error(errMessage));
        return;
      }
      cancelRender(new Error(errMessage));
    } else {
      onRemotionError?.(new Error(errMessage));
      console.warn(errMessage);
    }
  }, [loop, onRemotionError, preloadedSrc]);
  const onDuration = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((src, durationInSeconds) => {
    setDurations({ type: "got-duration", durationInSeconds, src });
  }, [setDurations]);
  const durationFetched = durations[getAbsoluteSrc(preloadedSrc)] ?? durations[getAbsoluteSrc(props.src)];
  validateMediaTrimProps({ startFrom, endAt, trimBefore, trimAfter });
  const { trimBeforeValue, trimAfterValue } = resolveTrimProps({
    startFrom,
    endAt,
    trimBefore,
    trimAfter
  });
  if (loop && durationFetched !== undefined) {
    if (!Number.isFinite(durationFetched)) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Html5Audio, {
        ...propsOtherThanLoop,
        ref,
        _remotionInternalNativeLoopPassed: true
      });
    }
    const duration = durationFetched * fps;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Loop, {
      layout: "none",
      durationInFrames: calculateMediaDuration({
        trimAfter: trimAfterValue,
        mediaDurationInFrames: duration,
        playbackRate: props.playbackRate ?? 1,
        trimBefore: trimBeforeValue
      }),
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Html5Audio, {
        ...propsOtherThanLoop,
        ref,
        _remotionInternalNativeLoopPassed: true
      })
    });
  }
  if (typeof trimBeforeValue !== "undefined" || typeof trimAfterValue !== "undefined") {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Sequence, {
      layout: "none",
      from: 0 - (trimBeforeValue ?? 0),
      showInTimeline: false,
      durationInFrames: trimAfterValue,
      name,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Html5Audio, {
        _remotionInternalNeedsDurationCalculation: Boolean(loop),
        pauseWhenBuffering: pauseWhenBuffering ?? false,
        ...otherProps,
        ref
      })
    });
  }
  validateMediaProps({ playbackRate: props.playbackRate, volume: props.volume }, "Html5Audio");
  if (environment.isRendering) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(AudioForRendering, {
      onDuration,
      ...props,
      ref,
      onNativeError: onError,
      _remotionInternalNeedsDurationCalculation: Boolean(loop)
    });
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(AudioForPreview, {
    _remotionInternalNativeLoopPassed: props._remotionInternalNativeLoopPassed ?? false,
    _remotionInternalStack: stack ?? null,
    shouldPreMountAudioTags: audioContext !== null && audioContext.numberOfAudioTags > 0,
    ...props,
    ref,
    onNativeError: onError,
    onDuration,
    pauseWhenBuffering: pauseWhenBuffering ?? false,
    _remotionInternalNeedsDurationCalculation: Boolean(loop),
    showInTimeline: showInTimeline ?? true
  });
};
var Html5Audio = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(AudioRefForwardingFunction);
addSequenceStackTraces(Html5Audio);
var Audio = Html5Audio;
// src/Composition.tsx



// src/Folder.tsx


// src/validation/validate-folder-name.ts
var getRegex = () => /^([a-zA-Z0-9-\u4E00-\u9FFF])+$/g;
var isFolderNameValid = (name) => name.match(getRegex());
var validateFolderName = (name) => {
  if (name === undefined || name === null) {
    throw new TypeError("You must pass a name to a <Folder />.");
  }
  if (typeof name !== "string") {
    throw new TypeError(`The "name" you pass into <Folder /> must be a string. Got: ${typeof name}`);
  }
  if (!isFolderNameValid(name)) {
    throw new Error(`Folder name can only contain a-z, A-Z, 0-9 and -. You passed ${name}`);
  }
};
var invalidFolderNameErrorMessage = (/* unused pure expression or super */ null && (`Folder name must match ${String(getRegex())}`));

// src/Folder.tsx

var FolderContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  folderName: null,
  parentName: null
});
var Folder = ({ name, children }) => {
  const parent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(FolderContext);
  const { registerFolder, unregisterFolder } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(CompositionSetters);
  validateFolderName(name);
  const parentNameArr = [parent.parentName, parent.folderName].filter(truthy);
  const parentName = parentNameArr.length === 0 ? null : parentNameArr.join("/");
  const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      folderName: name,
      parentName
    };
  }, [name, parentName]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    registerFolder(name, parentName);
    return () => {
      unregisterFolder(name, parentName);
    };
  }, [name, parent.folderName, parentName, registerFolder, unregisterFolder]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FolderContext.Provider, {
    value,
    children
  });
};

// src/loading-indicator.tsx

var rotate = {
  transform: `rotate(90deg)`
};
var ICON_SIZE = 40;
var label = {
  color: "white",
  fontSize: 14,
  fontFamily: "sans-serif"
};
var container = {
  justifyContent: "center",
  alignItems: "center"
};
var Loading = () => {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(AbsoluteFill, {
    style: container,
    id: "remotion-comp-loading",
    children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("style", {
        type: "text/css",
        children: `
				@keyframes anim {
					from {
						opacity: 0
					}
					to {
						opacity: 1
					}
				}
				#remotion-comp-loading {
					animation: anim 2s;
					animation-fill-mode: forwards;
				}
			`
      }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
        width: ICON_SIZE,
        height: ICON_SIZE,
        viewBox: "-100 -100 400 400",
        style: rotate,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
          fill: "#555",
          stroke: "#555",
          strokeWidth: "100",
          strokeLinejoin: "round",
          d: "M 2 172 a 196 100 0 0 0 195 5 A 196 240 0 0 0 100 2.259 A 196 240 0 0 0 2 172 z"
        })
      }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p", {
        style: label,
        children: [
          "Resolving ",
          "<Suspense>",
          "..."
        ]
      })
    ]
  });
};

// src/portal-node.ts
var _portalNode = null;
var portalNode = () => {
  if (!_portalNode) {
    if (typeof document === "undefined") {
      throw new Error("Tried to call an API that only works in the browser from outside the browser");
    }
    _portalNode = document.createElement("div");
    _portalNode.style.position = "absolute";
    _portalNode.style.top = "0px";
    _portalNode.style.left = "0px";
    _portalNode.style.right = "0px";
    _portalNode.style.bottom = "0px";
    _portalNode.style.width = "100%";
    _portalNode.style.height = "100%";
    _portalNode.style.display = "flex";
    _portalNode.style.flexDirection = "column";
    const containerNode = document.createElement("div");
    containerNode.style.position = "fixed";
    containerNode.style.top = -999999 + "px";
    containerNode.appendChild(_portalNode);
    document.body.appendChild(containerNode);
  }
  return _portalNode;
};

// src/use-lazy-component.ts

var useLazyComponent = ({
  compProps,
  componentName,
  noSuspense
}) => {
  const lazy = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if ("component" in compProps) {
      if (typeof document === "undefined" || noSuspense) {
        return compProps.component;
      }
      if (typeof compProps.component === "undefined") {
        throw new Error(`A value of \`undefined\` was passed to the \`component\` prop. Check the value you are passing to the <${componentName}/> component.`);
      }
      return compProps.component;
    }
    if ("lazyComponent" in compProps && typeof compProps.lazyComponent !== "undefined") {
      if (typeof compProps.lazyComponent === "undefined") {
        throw new Error(`A value of \`undefined\` was passed to the \`lazyComponent\` prop. Check the value you are passing to the <${componentName}/> component.`);
      }
      return react__WEBPACK_IMPORTED_MODULE_0__.lazy(compProps.lazyComponent);
    }
    throw new Error("You must pass either 'component' or 'lazyComponent'");
  }, [compProps.component, compProps.lazyComponent]);
  return lazy;
};

// src/validation/validate-composition-id.ts
var getRegex2 = () => /^([a-zA-Z0-9-\u4E00-\u9FFF])+$/g;
var isCompositionIdValid = (id) => id.match(getRegex2());
var validateCompositionId = (id) => {
  if (!isCompositionIdValid(id)) {
    throw new Error(`Composition id can only contain a-z, A-Z, 0-9, CJK characters and -. You passed ${id}`);
  }
};
var invalidCompositionErrorMessage = `Composition ID must match ${String(getRegex2())}`;

// src/validation/validate-default-props.ts
var validateDefaultAndInputProps = (defaultProps, name, compositionId) => {
  if (!defaultProps) {
    return;
  }
  if (typeof defaultProps !== "object") {
    throw new Error(`"${name}" must be an object, but you passed a value of type ${typeof defaultProps}`);
  }
  if (Array.isArray(defaultProps)) {
    throw new Error(`"${name}" must be an object, an array was passed ${compositionId ? `for composition "${compositionId}"` : ""}`);
  }
};

// src/Composition.tsx

var Fallback = () => {
  const { continueRender: continueRender2, delayRender: delayRender2 } = useDelayRender();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fallback = delayRender2("Waiting for Root component to unsuspend");
    return () => continueRender2(fallback);
  }, [continueRender2, delayRender2]);
  return null;
};
var InnerComposition = ({
  width,
  height,
  fps,
  durationInFrames,
  id,
  defaultProps,
  schema,
  ...compProps
}) => {
  const compManager = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(CompositionSetters);
  const { registerComposition, unregisterComposition } = compManager;
  const video = useVideo();
  const lazy = useLazyComponent({
    compProps,
    componentName: "Composition",
    noSuspense: false
  });
  const nonce = useNonce();
  const isPlayer = useIsPlayer();
  const environment = useRemotionEnvironment();
  const canUseComposition = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(CanUseRemotionHooks);
  if (typeof window !== "undefined") {
    window.remotion_seenCompositionIds = Array.from(new Set([...window.remotion_seenCompositionIds ?? [], id]));
  }
  if (canUseComposition) {
    if (isPlayer) {
      throw new Error("<Composition> was mounted inside the `component` that was passed to the <Player>. See https://remotion.dev/docs/wrong-composition-mount for help.");
    }
    throw new Error("<Composition> mounted inside another composition. See https://remotion.dev/docs/wrong-composition-mount for help.");
  }
  const { folderName, parentName } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(FolderContext);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!id) {
      throw new Error("No id for composition passed.");
    }
    validateCompositionId(id);
    validateDefaultAndInputProps(defaultProps, "defaultProps", id);
    registerComposition({
      durationInFrames: durationInFrames ?? undefined,
      fps: fps ?? undefined,
      height: height ?? undefined,
      width: width ?? undefined,
      id,
      folderName,
      component: lazy,
      defaultProps: serializeThenDeserializeInStudio(defaultProps ?? {}),
      nonce,
      parentFolderName: parentName,
      schema: schema ?? null,
      calculateMetadata: compProps.calculateMetadata ?? null
    });
    return () => {
      unregisterComposition(id);
    };
  }, [
    durationInFrames,
    fps,
    height,
    lazy,
    id,
    folderName,
    defaultProps,
    width,
    nonce,
    parentName,
    schema,
    compProps.calculateMetadata,
    registerComposition,
    unregisterComposition
  ]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    window.dispatchEvent(new CustomEvent(PROPS_UPDATED_EXTERNALLY, {
      detail: {
        resetUnsaved: id
      }
    }));
  }, [defaultProps, id]);
  const resolved = useResolvedVideoConfig(id);
  if (environment.isStudio && video && video.component === lazy && video.id === id) {
    const Comp = lazy;
    if (resolved === null || resolved.type !== "success" && resolved.type !== "success-and-refreshing") {
      return null;
    }
    return (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CanUseRemotionHooksProvider, {
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
        fallback: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Loading, {}),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Comp, {
          ...resolved.result.props ?? {}
        })
      })
    }), portalNode());
  }
  if (environment.isRendering && video && video.component === lazy && video.id === id) {
    const Comp = lazy;
    if (resolved === null || resolved.type !== "success" && resolved.type !== "success-and-refreshing") {
      return null;
    }
    return (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CanUseRemotionHooksProvider, {
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
        fallback: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Fallback, {}),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Comp, {
          ...resolved.result.props ?? {}
        })
      })
    }), portalNode());
  }
  return null;
};
var Composition = (props2) => {
  const { onlyRenderComposition } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(CompositionSetters);
  if (onlyRenderComposition && onlyRenderComposition !== props2.id) {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(InnerComposition, {
    ...props2
  });
};
// src/bezier.ts
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
var float32ArraySupported = typeof Float32Array === "function";
function a(aA1, aA2) {
  return 1 - 3 * aA2 + 3 * aA1;
}
function b(aA1, aA2) {
  return 3 * aA2 - 6 * aA1;
}
function c(aA1) {
  return 3 * aA1;
}
function calcBezier(aT, aA1, aA2) {
  return ((a(aA1, aA2) * aT + b(aA1, aA2)) * aT + c(aA1)) * aT;
}
function getSlope(aT, aA1, aA2) {
  return 3 * a(aA1, aA2) * aT * aT + 2 * b(aA1, aA2) * aT + c(aA1);
}
function binarySubdivide({
  aX,
  _aA,
  _aB,
  mX1,
  mX2
}) {
  let currentX;
  let currentT;
  let i = 0;
  let aA = _aA;
  let aB = _aB;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}
function newtonRaphsonIterate(aX, _aGuessT, mX1, mX2) {
  let aGuessT = _aGuessT;
  for (let i = 0;i < NEWTON_ITERATIONS; ++i) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
function bezier(mX1, mY1, mX2, mY2) {
  if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
    throw new Error("bezier x values must be in [0, 1] range");
  }
  const sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  if (mX1 !== mY1 || mX2 !== mY2) {
    for (let i = 0;i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (;currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    }
    if (initialSlope === 0) {
      return guessForT;
    }
    return binarySubdivide({
      aX,
      _aA: intervalStart,
      _aB: intervalStart + kSampleStepSize,
      mX1,
      mX2
    });
  }
  return function(x) {
    if (mX1 === mY1 && mX2 === mY2) {
      return x;
    }
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
}

// src/easing.ts
class Easing {
  static step0(n) {
    return n > 0 ? 1 : 0;
  }
  static step1(n) {
    return n >= 1 ? 1 : 0;
  }
  static linear(t) {
    return t;
  }
  static ease(t) {
    return Easing.bezier(0.42, 0, 1, 1)(t);
  }
  static quad(t) {
    return t * t;
  }
  static cubic(t) {
    return t * t * t;
  }
  static poly(n) {
    return (t) => t ** n;
  }
  static sin(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  }
  static circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  static exp(t) {
    return 2 ** (10 * (t - 1));
  }
  static elastic(bounciness = 1) {
    const p = bounciness * Math.PI;
    return (t) => 1 - Math.cos(t * Math.PI / 2) ** 3 * Math.cos(t * p);
  }
  static back(s = 1.70158) {
    return (t) => t * t * ((s + 1) * t - s);
  }
  static bounce(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    }
    if (t < 2 / 2.75) {
      const t2_ = t - 1.5 / 2.75;
      return 7.5625 * t2_ * t2_ + 0.75;
    }
    if (t < 2.5 / 2.75) {
      const t2_ = t - 2.25 / 2.75;
      return 7.5625 * t2_ * t2_ + 0.9375;
    }
    const t2 = t - 2.625 / 2.75;
    return 7.5625 * t2 * t2 + 0.984375;
  }
  static bezier(x1, y1, x2, y2) {
    return bezier(x1, y1, x2, y2);
  }
  static in(easing) {
    return easing;
  }
  static out(easing) {
    return (t) => 1 - easing(1 - t);
  }
  static inOut(easing) {
    return (t) => {
      if (t < 0.5) {
        return easing(t * 2) / 2;
      }
      return 1 - easing((1 - t) * 2) / 2;
    };
  }
}
// src/v5-flag.ts
var ENABLE_V5_BREAKING_CHANGES = false;

// src/get-static-files.ts
var warnedServer = false;
var warnedPlayer = false;
var warnServerOnce = () => {
  if (warnedServer) {
    return;
  }
  warnedServer = true;
  console.warn("Called getStaticFiles() on the server. The API is only available in the browser. An empty array was returned.");
};
var warnPlayerOnce = () => {
  if (warnedPlayer) {
    return;
  }
  warnedPlayer = true;
  console.warn("Called getStaticFiles() while using the Remotion Player. The API is only available while using the Remotion Studio. An empty array was returned.");
};
var getStaticFiles = () => {
  if (ENABLE_V5_BREAKING_CHANGES) {
    throw new Error("getStaticFiles() has moved into the `@remotion/studio` package. Update your imports.");
  }
  if (typeof document === "undefined") {
    warnServerOnce();
    return [];
  }
  if (window.remotion_isPlayer) {
    warnPlayerOnce();
    return [];
  }
  return window.remotion_staticFiles;
};
// src/IFrame.tsx


var IFrameRefForwarding = ({
  onLoad,
  onError,
  delayRenderRetries,
  delayRenderTimeoutInMilliseconds,
  ...props2
}, ref) => {
  const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
  const [handle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => delayRender2(`Loading <IFrame> with source ${props2.src}`, {
    retries: delayRenderRetries ?? undefined,
    timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? undefined
  }));
  const didLoad = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e) => {
    continueRender2(handle);
    onLoad?.(e);
  }, [handle, onLoad, continueRender2]);
  const didGetError = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e) => {
    continueRender2(handle);
    if (onError) {
      onError(e);
    } else {
      console.error("Error loading iframe:", e, "Handle the event using the onError() prop to make this message disappear.");
    }
  }, [handle, onError, continueRender2]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("iframe", {
    referrerPolicy: "strict-origin-when-cross-origin",
    ...props2,
    ref,
    onError: didGetError,
    onLoad: didLoad
  });
};
var IFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(IFrameRefForwarding);
// src/Img.tsx


function exponentialBackoff(errorCount) {
  return 1000 * 2 ** (errorCount - 1);
}
var ImgRefForwarding = ({
  onError,
  maxRetries = 2,
  src,
  pauseWhenLoading,
  delayRenderRetries,
  delayRenderTimeoutInMilliseconds,
  onImageFrame,
  crossOrigin,
  ...props2
}, ref) => {
  const imageRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const errors = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
  const { delayPlayback } = useBufferState();
  const sequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  if (!src) {
    throw new Error('No "src" prop was passed to <Img>.');
  }
  const _propsValid = true;
  if (!_propsValid) {
    throw new Error("typecheck error");
  }
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, () => {
    return imageRef.current;
  }, []);
  const actualSrc = usePreload(src);
  const retryIn = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((timeout) => {
    if (!imageRef.current) {
      return;
    }
    const currentSrc = imageRef.current.src;
    setTimeout(() => {
      if (!imageRef.current) {
        return;
      }
      const newSrc = imageRef.current?.src;
      if (newSrc !== currentSrc) {
        return;
      }
      imageRef.current.removeAttribute("src");
      imageRef.current.setAttribute("src", newSrc);
    }, timeout);
  }, []);
  const didGetError = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e) => {
    if (!errors.current) {
      return;
    }
    errors.current[imageRef.current?.src] = (errors.current[imageRef.current?.src] ?? 0) + 1;
    if (onError && (errors.current[imageRef.current?.src] ?? 0) > maxRetries) {
      onError(e);
      return;
    }
    if ((errors.current[imageRef.current?.src] ?? 0) <= maxRetries) {
      const backoff = exponentialBackoff(errors.current[imageRef.current?.src] ?? 0);
      console.warn(`Could not load image with source ${imageRef.current?.src}, retrying again in ${backoff}ms`);
      retryIn(backoff);
      return;
    }
    cancelRender("Error loading image with src: " + imageRef.current?.src);
  }, [maxRetries, onError, retryIn]);
  const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
  if (typeof window !== "undefined") {
    const isPremounting = Boolean(sequenceContext?.premounting);
    const isPostmounting = Boolean(sequenceContext?.postmounting);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
      if (window.process?.env?.NODE_ENV === "test") {
        if (imageRef.current) {
          imageRef.current.src = actualSrc;
        }
        return;
      }
      const { current } = imageRef;
      if (!current) {
        return;
      }
      const newHandle = delayRender2("Loading <Img> with src=" + actualSrc, {
        retries: delayRenderRetries ?? undefined,
        timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? undefined
      });
      const unblock = pauseWhenLoading && !isPremounting && !isPostmounting ? delayPlayback().unblock : () => {
        return;
      };
      let unmounted = false;
      const onComplete = () => {
        if (unmounted) {
          continueRender2(newHandle);
          return;
        }
        if ((errors.current[imageRef.current?.src] ?? 0) > 0) {
          delete errors.current[imageRef.current?.src];
          console.info(`Retry successful - ${imageRef.current?.src} is now loaded`);
        }
        if (current) {
          onImageFrame?.(current);
        }
        unblock();
        continueRender2(newHandle);
      };
      if (!imageRef.current) {
        onComplete();
        return;
      }
      current.src = actualSrc;
      current.decode().then(onComplete).catch((err) => {
        console.warn(err);
        if (current.complete) {
          onComplete();
        } else {
          current.addEventListener("load", onComplete);
        }
      });
      return () => {
        unmounted = true;
        current.removeEventListener("load", onComplete);
        unblock();
        continueRender2(newHandle);
      };
    }, [
      actualSrc,
      delayPlayback,
      delayRenderRetries,
      delayRenderTimeoutInMilliseconds,
      pauseWhenLoading,
      isPremounting,
      isPostmounting,
      onImageFrame,
      continueRender2,
      delayRender2
    ]);
  }
  const { isClientSideRendering } = useRemotionEnvironment();
  const crossOriginValue = getCrossOriginValue({
    crossOrigin,
    requestsVideoFrame: false,
    isClientSideRendering
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
    ...props2,
    ref: imageRef,
    crossOrigin: crossOriginValue,
    onError: didGetError,
    decoding: "sync"
  });
};
var Img = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(ImgRefForwarding);
// src/internals.ts


// src/CompositionManager.tsx

var compositionsRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();

// src/CompositionManagerProvider.tsx


var CompositionManagerProvider = ({
  children,
  onlyRenderComposition,
  currentCompositionMetadata,
  initialCompositions,
  initialCanvasContent
}) => {
  const [folders, setFolders] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [canvasContent, setCanvasContent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialCanvasContent);
  const [compositions, setCompositions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialCompositions);
  const currentcompositionsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(compositions);
  const updateCompositions = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((updateComps) => {
    setCompositions((comps) => {
      const updated = updateComps(comps);
      currentcompositionsRef.current = updated;
      return updated;
    });
  }, []);
  const registerComposition = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((comp) => {
    updateCompositions((comps) => {
      if (comps.find((c2) => c2.id === comp.id)) {
        throw new Error(`Multiple composition with id ${comp.id} are registered.`);
      }
      const value = [...comps, comp].slice().sort((a2, b2) => a2.nonce - b2.nonce);
      return value;
    });
  }, [updateCompositions]);
  const unregisterComposition = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id) => {
    setCompositions((comps) => {
      return comps.filter((c2) => c2.id !== id);
    });
  }, []);
  const registerFolder = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((name, parent) => {
    setFolders((prevFolders) => {
      return [
        ...prevFolders,
        {
          name,
          parent
        }
      ];
    });
  }, []);
  const unregisterFolder = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((name, parent) => {
    setFolders((prevFolders) => {
      return prevFolders.filter((p) => !(p.name === name && p.parent === parent));
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(compositionsRef, () => {
    return {
      getCompositions: () => currentcompositionsRef.current
    };
  }, []);
  const updateCompositionDefaultProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id, newDefaultProps) => {
    setCompositions((comps) => {
      const updated = comps.map((c2) => {
        if (c2.id === id) {
          return {
            ...c2,
            defaultProps: newDefaultProps
          };
        }
        return c2;
      });
      return updated;
    });
  }, []);
  const compositionManagerSetters = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      registerComposition,
      unregisterComposition,
      registerFolder,
      unregisterFolder,
      setCanvasContent,
      updateCompositionDefaultProps,
      onlyRenderComposition
    };
  }, [
    registerComposition,
    registerFolder,
    unregisterComposition,
    unregisterFolder,
    updateCompositionDefaultProps,
    onlyRenderComposition
  ]);
  const compositionManagerContextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      compositions,
      folders,
      currentCompositionMetadata,
      canvasContent
    };
  }, [compositions, folders, currentCompositionMetadata, canvasContent]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CompositionManager.Provider, {
    value: compositionManagerContextValue,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CompositionSetters.Provider, {
      value: compositionManagerSetters,
      children
    })
  });
};

// src/default-css.ts
var exports_default_css = {};
__export(exports_default_css, {
  makeDefaultPreviewCSS: () => makeDefaultPreviewCSS,
  injectCSS: () => injectCSS,
  OBJECTFIT_CONTAIN_CLASS_NAME: () => OBJECTFIT_CONTAIN_CLASS_NAME
});
var injected = {};
var injectCSS = (css) => {
  if (typeof document === "undefined") {
    return () => {};
  }
  if (injected[css]) {
    return () => {};
  }
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  head.prepend(style);
  injected[css] = style;
  return () => {
    const styleElement = injected[css];
    if (styleElement) {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
      delete injected[css];
    }
  };
};
var OBJECTFIT_CONTAIN_CLASS_NAME = "__remotion_objectfitcontain";
var makeDefaultPreviewCSS = (scope, backgroundColor) => {
  if (!scope) {
    return `
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
	    background-color: ${backgroundColor};
    }
    .${OBJECTFIT_CONTAIN_CLASS_NAME} {
      object-fit: contain;
    }
    `;
  }
  return `
    ${scope} * {
      box-sizing: border-box;
    }
    ${scope} *:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }
    ${scope} .${OBJECTFIT_CONTAIN_CLASS_NAME} {
      object-fit: contain;
    }
  `;
};

// src/get-preview-dom-element.ts
var REMOTION_STUDIO_CONTAINER_ELEMENT = "__remotion-studio-container";
var getPreviewDomElement = () => {
  return document.getElementById(REMOTION_STUDIO_CONTAINER_ELEMENT);
};

// src/max-video-cache-size.ts

var MaxMediaCacheSizeContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

// src/register-root.ts
var Root = null;
var listeners = [];
var registerRoot = (comp) => {
  if (!comp) {
    throw new Error(`You must pass a React component to registerRoot(), but ${JSON.stringify(comp)} was passed.`);
  }
  if (Root) {
    throw new Error("registerRoot() was called more than once.");
  }
  Root = comp;
  listeners.forEach((l) => {
    l(comp);
  });
};
var getRoot = () => {
  return Root;
};
var waitForRoot = (fn) => {
  if (Root) {
    fn(Root);
    return () => {
      return;
    };
  }
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
};

// src/RemotionRoot.tsx


// src/use-media-enabled.tsx


var MediaEnabledContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
var useVideoEnabled = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MediaEnabledContext);
  if (!context) {
    return window.remotion_videoEnabled;
  }
  if (context.videoEnabled === null) {
    return window.remotion_videoEnabled;
  }
  return context.videoEnabled;
};
var useAudioEnabled = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MediaEnabledContext);
  if (!context) {
    return window.remotion_audioEnabled;
  }
  if (context.audioEnabled === null) {
    return window.remotion_audioEnabled;
  }
  return context.audioEnabled;
};
var MediaEnabledProvider = ({
  children,
  videoEnabled,
  audioEnabled
}) => {
  const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({ videoEnabled, audioEnabled }), [videoEnabled, audioEnabled]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MediaEnabledContext.Provider, {
    value,
    children
  });
};

// src/RemotionRoot.tsx

var RemotionRootContexts = ({
  children,
  numberOfAudioTags,
  logLevel,
  audioLatencyHint,
  videoEnabled,
  audioEnabled,
  frameState,
  nonceContextSeed
}) => {
  const nonceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    let counter = 0;
    return {
      getNonce: () => counter++
    };
  }, [nonceContextSeed]);
  const logging = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return { logLevel, mountTime: Date.now() };
  }, [logLevel]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(LogLevelContext.Provider, {
    value: logging,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(NonceContext.Provider, {
      value: nonceContext,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TimelineContextProvider, {
        frameState,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MediaEnabledProvider, {
          videoEnabled,
          audioEnabled,
          children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(EditorPropsProvider, {
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PrefetchProvider, {
              children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SequenceManagerProvider, {
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SharedAudioContextProvider, {
                  numberOfAudioTags,
                  audioLatencyHint,
                  audioEnabled,
                  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DurationsContextProvider, {
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(BufferingProvider, {
                      children
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  });
};

// src/codec.ts
var validCodecs = [
  "h264",
  "h265",
  "vp8",
  "vp9",
  "mp3",
  "aac",
  "wav",
  "prores",
  "h264-mkv",
  "h264-ts",
  "gif"
];

// src/validation/validate-default-codec.ts
function validateCodec(defaultCodec, location, name) {
  if (typeof defaultCodec === "undefined") {
    return;
  }
  if (typeof defaultCodec !== "string") {
    throw new TypeError(`The "${name}" prop ${location} must be a string, but you passed a value of type ${typeof defaultCodec}.`);
  }
  if (!validCodecs.includes(defaultCodec)) {
    throw new Error(`The "${name}" prop ${location} must be one of ${validCodecs.join(", ")}, but you passed ${defaultCodec}.`);
  }
}

// src/resolve-video-config.ts
var validateCalculated = ({
  calculated,
  compositionId,
  compositionFps,
  compositionHeight,
  compositionWidth,
  compositionDurationInFrames
}) => {
  const calculateMetadataErrorLocation = `calculated by calculateMetadata() for the composition "${compositionId}"`;
  const defaultErrorLocation = `of the "<Composition />" component with the id "${compositionId}"`;
  const width = calculated?.width ?? compositionWidth ?? undefined;
  validateDimension(width, "width", calculated?.width ? calculateMetadataErrorLocation : defaultErrorLocation);
  const height = calculated?.height ?? compositionHeight ?? undefined;
  validateDimension(height, "height", calculated?.height ? calculateMetadataErrorLocation : defaultErrorLocation);
  const fps = calculated?.fps ?? compositionFps ?? null;
  validateFps(fps, calculated?.fps ? calculateMetadataErrorLocation : defaultErrorLocation, false);
  const durationInFrames = calculated?.durationInFrames ?? compositionDurationInFrames ?? null;
  validateDurationInFrames(durationInFrames, {
    allowFloats: false,
    component: `of the "<Composition />" component with the id "${compositionId}"`
  });
  const defaultCodec = calculated?.defaultCodec;
  validateCodec(defaultCodec, calculateMetadataErrorLocation, "defaultCodec");
  const defaultOutName = calculated?.defaultOutName;
  const defaultVideoImageFormat = calculated?.defaultVideoImageFormat;
  const defaultPixelFormat = calculated?.defaultPixelFormat;
  const defaultProResProfile = calculated?.defaultProResProfile;
  return {
    width,
    height,
    fps,
    durationInFrames,
    defaultCodec,
    defaultOutName,
    defaultVideoImageFormat,
    defaultPixelFormat,
    defaultProResProfile
  };
};
var resolveVideoConfig = ({
  calculateMetadata,
  signal,
  defaultProps,
  inputProps: originalProps,
  compositionId,
  compositionDurationInFrames,
  compositionFps,
  compositionHeight,
  compositionWidth
}) => {
  const calculatedProm = calculateMetadata ? calculateMetadata({
    defaultProps,
    props: originalProps,
    abortSignal: signal,
    compositionId,
    isRendering: getRemotionEnvironment().isRendering
  }) : null;
  if (calculatedProm !== null && typeof calculatedProm === "object" && "then" in calculatedProm) {
    return calculatedProm.then((c2) => {
      const {
        height,
        width,
        durationInFrames,
        fps,
        defaultCodec,
        defaultOutName,
        defaultVideoImageFormat,
        defaultPixelFormat,
        defaultProResProfile
      } = validateCalculated({
        calculated: c2,
        compositionDurationInFrames,
        compositionFps,
        compositionHeight,
        compositionWidth,
        compositionId
      });
      return {
        width,
        height,
        fps,
        durationInFrames,
        id: compositionId,
        defaultProps: serializeThenDeserializeInStudio(defaultProps),
        props: serializeThenDeserializeInStudio(c2.props ?? originalProps),
        defaultCodec: defaultCodec ?? null,
        defaultOutName: defaultOutName ?? null,
        defaultVideoImageFormat: defaultVideoImageFormat ?? null,
        defaultPixelFormat: defaultPixelFormat ?? null,
        defaultProResProfile: defaultProResProfile ?? null
      };
    });
  }
  const data = validateCalculated({
    calculated: calculatedProm,
    compositionDurationInFrames,
    compositionFps,
    compositionHeight,
    compositionWidth,
    compositionId
  });
  if (calculatedProm === null) {
    return {
      ...data,
      id: compositionId,
      defaultProps: serializeThenDeserializeInStudio(defaultProps ?? {}),
      props: serializeThenDeserializeInStudio(originalProps),
      defaultCodec: null,
      defaultOutName: null,
      defaultVideoImageFormat: null,
      defaultPixelFormat: null,
      defaultProResProfile: null
    };
  }
  return {
    ...data,
    id: compositionId,
    defaultProps: serializeThenDeserializeInStudio(defaultProps ?? {}),
    props: serializeThenDeserializeInStudio(calculatedProm.props ?? originalProps),
    defaultCodec: calculatedProm.defaultCodec ?? null,
    defaultOutName: calculatedProm.defaultOutName ?? null,
    defaultVideoImageFormat: calculatedProm.defaultVideoImageFormat ?? null,
    defaultPixelFormat: calculatedProm.defaultPixelFormat ?? null,
    defaultProResProfile: calculatedProm.defaultProResProfile ?? null
  };
};
var resolveVideoConfigOrCatch = (params) => {
  try {
    const promiseOrReturnValue = resolveVideoConfig(params);
    return {
      type: "success",
      result: promiseOrReturnValue
    };
  } catch (err) {
    return {
      type: "error",
      error: err
    };
  }
};

// src/setup-env-variables.ts
var getEnvVariables = () => {
  if (getRemotionEnvironment().isRendering) {
    const param = window.remotion_envVariables;
    if (!param) {
      return {};
    }
    return { ...JSON.parse(param), NODE_ENV: "production" };
  }
  if (false) // removed by dead control flow
{}
  return {
    NODE_ENV: "production"
  };
};
var setupEnvVariables = () => {
  const env = getEnvVariables();
  if (!window.process) {
    window.process = {};
  }
  if (!window.process.env) {
    window.process.env = {};
  }
  Object.keys(env).forEach((key) => {
    window.process.env[key] = env[key];
  });
};

// src/use-current-scale.ts

var CurrentScaleContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
var PreviewSizeContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  setSize: () => {
    return;
  },
  size: { size: "auto", translation: { x: 0, y: 0 } }
});
var calculateScale = ({
  canvasSize,
  compositionHeight,
  compositionWidth,
  previewSize
}) => {
  const heightRatio = canvasSize.height / compositionHeight;
  const widthRatio = canvasSize.width / compositionWidth;
  const ratio = Math.min(heightRatio, widthRatio);
  if (previewSize === "auto") {
    if (ratio === 0) {
      return 1;
    }
    return ratio;
  }
  return Number(previewSize);
};
var useCurrentScale = (options) => {
  const hasContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(CurrentScaleContext);
  const zoomContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(PreviewSizeContext);
  const config = useUnsafeVideoConfig();
  const env = useRemotionEnvironment();
  if (hasContext === null || config === null || zoomContext === null) {
    if (options?.dontThrowIfOutsideOfRemotion) {
      return 1;
    }
    if (env.isRendering) {
      return 1;
    }
    throw new Error([
      "useCurrentScale() was called outside of a Remotion context.",
      "This hook can only be called in a component that is being rendered by Remotion.",
      "If you want to this hook to return 1 outside of Remotion, pass {dontThrowIfOutsideOfRemotion: true} as an option.",
      "If you think you called this hook in a Remotion component, make sure all versions of Remotion are aligned."
    ].join(`
`));
  }
  if (hasContext.type === "scale") {
    return hasContext.scale;
  }
  return calculateScale({
    canvasSize: hasContext.canvasSize,
    compositionHeight: config.height,
    compositionWidth: config.width,
    previewSize: zoomContext.size.size
  });
};

// src/video/OffthreadVideo.tsx


// src/video/OffthreadVideoForRendering.tsx


// src/video/offthread-video-source.ts
var getOffthreadVideoSource = ({
  src,
  transparent,
  currentTime,
  toneMapped
}) => {
  return `http://localhost:${window.remotion_proxyPort}/proxy?src=${encodeURIComponent(getAbsoluteSrc(src))}&time=${encodeURIComponent(Math.max(0, currentTime))}&transparent=${String(transparent)}&toneMapped=${String(toneMapped)}`;
};

// src/video/OffthreadVideoForRendering.tsx

var OffthreadVideoForRendering = ({
  onError,
  volume: volumeProp,
  playbackRate,
  src,
  muted,
  allowAmplificationDuringRender,
  transparent,
  toneMapped,
  toneFrequency,
  name,
  loopVolumeCurveBehavior,
  delayRenderRetries,
  delayRenderTimeoutInMilliseconds,
  onVideoFrame,
  crossOrigin,
  audioStreamIndex,
  ...props2
}) => {
  const absoluteFrame = useTimelinePosition();
  const frame = useCurrentFrame();
  const volumePropsFrame = useFrameForVolumeProp(loopVolumeCurveBehavior);
  const videoConfig = useUnsafeVideoConfig();
  const sequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const mediaStartsAt = useMediaStartsAt();
  const { registerRenderAsset, unregisterRenderAsset } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(RenderAssetManager);
  if (!src) {
    throw new TypeError("No `src` was passed to <OffthreadVideo>.");
  }
  const id = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => `offthreadvideo-${random(src)}-${sequenceContext?.cumulatedFrom}-${sequenceContext?.relativeFrom}-${sequenceContext?.durationInFrames}`, [
    src,
    sequenceContext?.cumulatedFrom,
    sequenceContext?.relativeFrom,
    sequenceContext?.durationInFrames
  ]);
  if (!videoConfig) {
    throw new Error("No video config found");
  }
  const volume = evaluateVolume({
    volume: volumeProp,
    frame: volumePropsFrame,
    mediaVolume: 1
  });
  warnAboutTooHighVolume(volume);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!src) {
      throw new Error("No src passed");
    }
    if (!window.remotion_audioEnabled) {
      return;
    }
    if (muted) {
      return;
    }
    if (volume <= 0) {
      return;
    }
    registerRenderAsset({
      type: "video",
      src: getAbsoluteSrc(src),
      id,
      frame: absoluteFrame,
      volume,
      mediaFrame: frame,
      playbackRate,
      toneFrequency,
      audioStartFrame: Math.max(0, -(sequenceContext?.relativeFrom ?? 0)),
      audioStreamIndex
    });
    return () => unregisterRenderAsset(id);
  }, [
    muted,
    src,
    registerRenderAsset,
    id,
    unregisterRenderAsset,
    volume,
    frame,
    absoluteFrame,
    playbackRate,
    toneFrequency,
    sequenceContext?.relativeFrom,
    audioStreamIndex
  ]);
  const currentTime = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return getExpectedMediaFrameUncorrected({
      frame,
      playbackRate: playbackRate || 1,
      startFrom: -mediaStartsAt
    }) / videoConfig.fps;
  }, [frame, mediaStartsAt, playbackRate, videoConfig.fps]);
  const actualSrc = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return getOffthreadVideoSource({
      src,
      currentTime,
      transparent,
      toneMapped
    });
  }, [toneMapped, currentTime, src, transparent]);
  const [imageSrc, setImageSrc] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    if (!window.remotion_videoEnabled) {
      return;
    }
    const cleanup = [];
    setImageSrc(null);
    const controller = new AbortController;
    const newHandle = delayRender2(`Fetching ${actualSrc} from server`, {
      retries: delayRenderRetries ?? undefined,
      timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? undefined
    });
    const execute = async () => {
      try {
        const res = await fetch(actualSrc, {
          signal: controller.signal,
          cache: "no-store"
        });
        if (res.status !== 200) {
          if (res.status === 500) {
            const json = await res.json();
            if (json.error) {
              const cleanedUpErrorMessage = json.error.replace(/^Error: /, "");
              throw new Error(cleanedUpErrorMessage);
            }
          }
          throw new Error(`Server returned status ${res.status} while fetching ${actualSrc}`);
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        cleanup.push(() => URL.revokeObjectURL(url));
        setImageSrc({
          src: url,
          handle: newHandle
        });
      } catch (err) {
        if (err.message.includes("aborted")) {
          continueRender2(newHandle);
          return;
        }
        if (controller.signal.aborted) {
          continueRender2(newHandle);
          return;
        }
        if (err.message.includes("Failed to fetch")) {
          err = new Error(`Failed to fetch ${actualSrc}. This could be caused by Chrome rejecting the request because the disk space is low. Consider increasing the disk size of your environment.`, { cause: err });
        }
        if (onError) {
          onError(err);
        } else {
          cancelRender(err);
        }
      }
    };
    execute();
    cleanup.push(() => {
      if (controller.signal.aborted) {
        return;
      }
      controller.abort();
    });
    return () => {
      cleanup.forEach((c2) => c2());
    };
  }, [
    actualSrc,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    onError,
    continueRender2,
    delayRender2
  ]);
  const onErr = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (onError) {
      onError?.(new Error("Failed to load image with src " + imageSrc));
    } else {
      cancelRender("Failed to load image with src " + imageSrc);
    }
  }, [imageSrc, onError]);
  const className = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return [OBJECTFIT_CONTAIN_CLASS_NAME, props2.className].filter(truthy).join(" ");
  }, [props2.className]);
  const onImageFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((img) => {
    if (onVideoFrame) {
      onVideoFrame(img);
    }
  }, [onVideoFrame]);
  if (!imageSrc || !window.remotion_videoEnabled) {
    return null;
  }
  continueRender2(imageSrc.handle);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Img, {
    src: imageSrc.src,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    onImageFrame,
    ...props2,
    onError: onErr,
    className
  });
};

// src/video/VideoForPreview.tsx


// src/video/emit-video-frame.ts

var useEmitVideoFrame = ({
  ref,
  onVideoFrame
}) => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const { current } = ref;
    if (!current) {
      return;
    }
    if (!onVideoFrame) {
      return;
    }
    let handle = 0;
    const callback = () => {
      if (!ref.current) {
        return;
      }
      onVideoFrame(ref.current);
      handle = ref.current.requestVideoFrameCallback(callback);
    };
    callback();
    return () => {
      current.cancelVideoFrameCallback(handle);
    };
  }, [onVideoFrame, ref]);
};

// src/video/VideoForPreview.tsx

var VideoForDevelopmentRefForwardingFunction = (props2, ref) => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SharedAudioContext);
  if (!context) {
    throw new Error("SharedAudioContext not found");
  }
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const sharedSource = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!context.audioContext) {
      return null;
    }
    return makeSharedElementSourceNode({
      audioContext: context.audioContext,
      ref: videoRef
    });
  }, [context.audioContext]);
  const effectToUse = react__WEBPACK_IMPORTED_MODULE_0__.useInsertionEffect ?? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
  effectToUse(() => {
    return () => {
      requestAnimationFrame(() => {
        sharedSource?.cleanup();
      });
    };
  }, [sharedSource]);
  const {
    volume,
    muted,
    playbackRate,
    onlyWarnForMediaSeekingError,
    src,
    onDuration,
    acceptableTimeShift,
    acceptableTimeShiftInSeconds,
    toneFrequency,
    name,
    _remotionInternalNativeLoopPassed,
    _remotionInternalStack,
    style,
    pauseWhenBuffering,
    showInTimeline,
    loopVolumeCurveBehavior,
    onError,
    onAutoPlayError,
    onVideoFrame,
    crossOrigin,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    allowAmplificationDuringRender,
    useWebAudioApi,
    audioStreamIndex,
    ...nativeProps
  } = props2;
  const _propsValid = true;
  if (!_propsValid) {
    throw new Error("typecheck error");
  }
  const volumePropFrame = useFrameForVolumeProp(loopVolumeCurveBehavior ?? "repeat");
  const { fps, durationInFrames } = useVideoConfig();
  const parentSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const { hidden } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceVisibilityToggleContext);
  const logLevel = useLogLevel();
  const mountTime = useMountTime();
  const [timelineId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => String(Math.random()));
  const isSequenceHidden = hidden[timelineId] ?? false;
  if (typeof acceptableTimeShift !== "undefined") {
    throw new Error("acceptableTimeShift has been removed. Use acceptableTimeShiftInSeconds instead.");
  }
  const [mediaVolume] = useMediaVolumeState();
  const [mediaMuted] = useMediaMutedState();
  const userPreferredVolume = evaluateVolume({
    frame: volumePropFrame,
    volume,
    mediaVolume
  });
  warnAboutTooHighVolume(userPreferredVolume);
  useMediaInTimeline({
    volume,
    mediaVolume,
    mediaType: "video",
    src,
    playbackRate: props2.playbackRate ?? 1,
    displayName: name ?? null,
    id: timelineId,
    stack: _remotionInternalStack,
    showInTimeline,
    premountDisplay: parentSequence?.premountDisplay ?? null,
    postmountDisplay: parentSequence?.postmountDisplay ?? null,
    loopDisplay: undefined
  });
  useMediaPlayback({
    mediaRef: videoRef,
    src,
    mediaType: "video",
    playbackRate: props2.playbackRate ?? 1,
    onlyWarnForMediaSeekingError,
    acceptableTimeshift: acceptableTimeShiftInSeconds ?? null,
    isPremounting: Boolean(parentSequence?.premounting),
    isPostmounting: Boolean(parentSequence?.postmounting),
    pauseWhenBuffering,
    onAutoPlayError: onAutoPlayError ?? null
  });
  useMediaTag({
    id: timelineId,
    isPostmounting: Boolean(parentSequence?.postmounting),
    isPremounting: Boolean(parentSequence?.premounting),
    mediaRef: videoRef,
    mediaType: "video",
    onAutoPlayError: onAutoPlayError ?? null
  });
  useVolume({
    logLevel,
    mediaRef: videoRef,
    volume: userPreferredVolume,
    source: sharedSource,
    shouldUseWebAudioApi: useWebAudioApi ?? false
  });
  const actualFrom = parentSequence ? parentSequence.relativeFrom : 0;
  const duration = parentSequence ? Math.min(parentSequence.durationInFrames, durationInFrames) : durationInFrames;
  const preloadedSrc = usePreload(src);
  const actualSrc = useAppendVideoFragment({
    actualSrc: preloadedSrc,
    actualFrom,
    duration,
    fps
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, () => {
    return videoRef.current;
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => playbackLogging({
    logLevel,
    message: `Mounting video with source = ${actualSrc}, v=${VERSION}, user agent=${typeof navigator === "undefined" ? "server" : navigator.userAgent}`,
    tag: "video",
    mountTime
  }));
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const { current } = videoRef;
    if (!current) {
      return;
    }
    const errorHandler = () => {
      if (current.error) {
        console.error("Error occurred in video", current?.error);
        if (onError) {
          const err = new Error(`Code ${current.error.code}: ${current.error.message}`);
          onError(err);
          return;
        }
        throw new Error(`The browser threw an error while playing the video ${src}: Code ${current.error.code} - ${current?.error?.message}. See https://remotion.dev/docs/media-playback-error for help. Pass an onError() prop to handle the error.`);
      } else {
        if (onError) {
          const err = new Error(`The browser threw an error while playing the video ${src}`);
          onError(err);
          return;
        }
        throw new Error("The browser threw an error while playing the video");
      }
    };
    current.addEventListener("error", errorHandler, { once: true });
    return () => {
      current.removeEventListener("error", errorHandler);
    };
  }, [onError, src]);
  const currentOnDurationCallback = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onDuration);
  currentOnDurationCallback.current = onDuration;
  useEmitVideoFrame({ ref: videoRef, onVideoFrame });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const { current } = videoRef;
    if (!current) {
      return;
    }
    if (current.duration) {
      currentOnDurationCallback.current?.(src, current.duration);
      return;
    }
    const onLoadedMetadata = () => {
      currentOnDurationCallback.current?.(src, current.duration);
    };
    current.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      current.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [src]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const { current } = videoRef;
    if (!current) {
      return;
    }
    if (isIosSafari()) {
      current.preload = "metadata";
    } else {
      current.preload = "auto";
    }
  }, []);
  const actualStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      ...style,
      opacity: isSequenceHidden ? 0 : style?.opacity ?? 1
    };
  }, [isSequenceHidden, style]);
  const crossOriginValue = getCrossOriginValue({
    crossOrigin,
    requestsVideoFrame: Boolean(onVideoFrame),
    isClientSideRendering: false
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("video", {
    ref: videoRef,
    muted: muted || mediaMuted || isSequenceHidden || userPreferredVolume <= 0,
    playsInline: true,
    src: actualSrc,
    loop: _remotionInternalNativeLoopPassed,
    style: actualStyle,
    disableRemotePlayback: true,
    crossOrigin: crossOriginValue,
    ...nativeProps
  });
};
var VideoForPreview = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(VideoForDevelopmentRefForwardingFunction);

// src/video/OffthreadVideo.tsx

var InnerOffthreadVideo = (props2) => {
  const {
    startFrom,
    endAt,
    trimBefore,
    trimAfter,
    name,
    pauseWhenBuffering,
    stack,
    showInTimeline,
    ...otherProps
  } = props2;
  const environment = useRemotionEnvironment();
  if (environment.isClientSideRendering) {
    throw new Error("<OffthreadVideo> is not supported in @remotion/web-renderer. Use <Video> from @remotion/media instead. See https://remotion.dev/docs/client-side-rendering/limitations");
  }
  const onDuration = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    return;
  }, []);
  if (typeof props2.src !== "string") {
    throw new TypeError(`The \`<OffthreadVideo>\` tag requires a string for \`src\`, but got ${JSON.stringify(props2.src)} instead.`);
  }
  validateMediaTrimProps({ startFrom, endAt, trimBefore, trimAfter });
  const { trimBeforeValue, trimAfterValue } = resolveTrimProps({
    startFrom,
    endAt,
    trimBefore,
    trimAfter
  });
  if (typeof trimBeforeValue !== "undefined" || typeof trimAfterValue !== "undefined") {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Sequence, {
      layout: "none",
      from: 0 - (trimBeforeValue ?? 0),
      showInTimeline: false,
      durationInFrames: trimAfterValue,
      name,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(InnerOffthreadVideo, {
        pauseWhenBuffering: pauseWhenBuffering ?? false,
        ...otherProps,
        trimAfter: undefined,
        name: undefined,
        showInTimeline,
        trimBefore: undefined,
        stack: undefined,
        startFrom: undefined,
        endAt: undefined
      })
    });
  }
  validateMediaProps(props2, "Video");
  if (environment.isRendering) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(OffthreadVideoForRendering, {
      pauseWhenBuffering: pauseWhenBuffering ?? false,
      ...otherProps,
      trimAfter: undefined,
      name: undefined,
      showInTimeline,
      trimBefore: undefined,
      stack: undefined,
      startFrom: undefined,
      endAt: undefined
    });
  }
  const {
    transparent,
    toneMapped,
    onAutoPlayError,
    onVideoFrame,
    crossOrigin,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    ...propsForPreview
  } = otherProps;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(VideoForPreview, {
    _remotionInternalStack: stack ?? null,
    onDuration,
    onlyWarnForMediaSeekingError: true,
    pauseWhenBuffering: pauseWhenBuffering ?? false,
    showInTimeline: showInTimeline ?? true,
    onAutoPlayError: onAutoPlayError ?? undefined,
    onVideoFrame: onVideoFrame ?? null,
    crossOrigin,
    ...propsForPreview,
    _remotionInternalNativeLoopPassed: false
  });
};
var OffthreadVideo = ({
  src,
  acceptableTimeShiftInSeconds,
  allowAmplificationDuringRender,
  audioStreamIndex,
  className,
  crossOrigin,
  delayRenderRetries,
  delayRenderTimeoutInMilliseconds,
  id,
  loopVolumeCurveBehavior,
  muted,
  name,
  onAutoPlayError,
  onError,
  onVideoFrame,
  pauseWhenBuffering,
  playbackRate,
  showInTimeline,
  style,
  toneFrequency,
  toneMapped,
  transparent,
  trimAfter,
  trimBefore,
  useWebAudioApi,
  volume,
  _remotionInternalNativeLoopPassed,
  endAt,
  stack,
  startFrom,
  imageFormat
}) => {
  if (imageFormat) {
    throw new TypeError(`The \`<OffthreadVideo>\` tag does no longer accept \`imageFormat\`. Use the \`transparent\` prop if you want to render a transparent video.`);
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(InnerOffthreadVideo, {
    acceptableTimeShiftInSeconds,
    allowAmplificationDuringRender: allowAmplificationDuringRender ?? true,
    audioStreamIndex: audioStreamIndex ?? 0,
    className,
    crossOrigin,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    id,
    loopVolumeCurveBehavior: loopVolumeCurveBehavior ?? "repeat",
    muted: muted ?? false,
    name,
    onAutoPlayError: onAutoPlayError ?? null,
    onError,
    onVideoFrame,
    pauseWhenBuffering: pauseWhenBuffering ?? true,
    playbackRate: playbackRate ?? 1,
    toneFrequency: toneFrequency ?? 1,
    showInTimeline: showInTimeline ?? true,
    src,
    stack,
    startFrom,
    _remotionInternalNativeLoopPassed: _remotionInternalNativeLoopPassed ?? false,
    endAt,
    style,
    toneMapped: toneMapped ?? true,
    transparent: transparent ?? false,
    trimAfter,
    trimBefore,
    useWebAudioApi: useWebAudioApi ?? false,
    volume
  });
};
addSequenceStackTraces(OffthreadVideo);

// src/watch-static-file.ts
var WATCH_REMOTION_STATIC_FILES = "remotion_staticFilesChanged";
var watchStaticFile = (fileName, callback) => {
  if (ENABLE_V5_BREAKING_CHANGES) {
    throw new Error("watchStaticFile() has moved into the `@remotion/studio` package. Update your imports.");
  }
  if (!getRemotionEnvironment().isStudio) {
    console.warn("The watchStaticFile() API is only available while using the Remotion Studio.");
    return { cancel: () => {
      return;
    } };
  }
  const withoutStaticBase = fileName.startsWith(window.remotion_staticBase) ? fileName.replace(window.remotion_staticBase, "") : fileName;
  const withoutLeadingSlash = withoutStaticBase.startsWith("/") ? withoutStaticBase.slice(1) : withoutStaticBase;
  let prevFileData = window.remotion_staticFiles.find((file) => file.name === withoutLeadingSlash);
  const checkFile = (event) => {
    const staticFiles = event.detail.files;
    const newFileData = staticFiles.find((file) => file.name === withoutLeadingSlash);
    if (!newFileData) {
      if (prevFileData !== undefined) {
        callback(null);
      }
      prevFileData = undefined;
      return;
    }
    if (prevFileData === undefined || prevFileData.lastModified !== newFileData.lastModified) {
      callback(newFileData);
      prevFileData = newFileData;
    }
  };
  window.addEventListener(WATCH_REMOTION_STATIC_FILES, checkFile);
  const cancel = () => {
    return window.removeEventListener(WATCH_REMOTION_STATIC_FILES, checkFile);
  };
  return { cancel };
};

// src/wrap-remotion-context.tsx


function useRemotionContexts() {
  const compositionManagerCtx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(CompositionManager);
  const timelineContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(TimelineContext);
  const setTimelineContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SetTimelineContext);
  const sequenceContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SequenceContext);
  const nonceContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NonceContext);
  const canUseRemotionHooksContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(CanUseRemotionHooks);
  const preloadContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(PreloadContext);
  const resolveCompositionContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ResolveCompositionContext);
  const renderAssetManagerContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RenderAssetManager);
  const sequenceManagerContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SequenceManager);
  const bufferManagerContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(BufferingContextReact);
  const logLevelContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(LogLevelContext);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    compositionManagerCtx,
    timelineContext,
    setTimelineContext,
    sequenceContext,
    nonceContext,
    canUseRemotionHooksContext,
    preloadContext,
    resolveCompositionContext,
    renderAssetManagerContext,
    sequenceManagerContext,
    bufferManagerContext,
    logLevelContext
  }), [
    compositionManagerCtx,
    nonceContext,
    sequenceContext,
    setTimelineContext,
    timelineContext,
    canUseRemotionHooksContext,
    preloadContext,
    resolveCompositionContext,
    renderAssetManagerContext,
    sequenceManagerContext,
    bufferManagerContext,
    logLevelContext
  ]);
}
var RemotionContextProvider = (props2) => {
  const { children, contexts } = props2;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(LogLevelContext.Provider, {
    value: contexts.logLevelContext,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CanUseRemotionHooks.Provider, {
      value: contexts.canUseRemotionHooksContext,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(NonceContext.Provider, {
        value: contexts.nonceContext,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PreloadContext.Provider, {
          value: contexts.preloadContext,
          children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CompositionManager.Provider, {
            value: contexts.compositionManagerCtx,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SequenceManager.Provider, {
              value: contexts.sequenceManagerContext,
              children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RenderAssetManager.Provider, {
                value: contexts.renderAssetManagerContext,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ResolveCompositionContext.Provider, {
                  value: contexts.resolveCompositionContext,
                  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TimelineContext.Provider, {
                    value: contexts.timelineContext,
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SetTimelineContext.Provider, {
                      value: contexts.setTimelineContext,
                      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SequenceContext.Provider, {
                        value: contexts.sequenceContext,
                        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(BufferingContextReact.Provider, {
                          value: contexts.bufferManagerContext,
                          children
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  });
};

// src/internals.ts
var compositionSelectorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
var Internals = {
  MaxMediaCacheSizeContext,
  useUnsafeVideoConfig,
  useFrameForVolumeProp,
  useTimelinePosition,
  evaluateVolume,
  getAbsoluteSrc,
  Timeline: exports_timeline_position_state,
  validateMediaTrimProps,
  validateMediaProps,
  resolveTrimProps,
  VideoForPreview,
  CompositionManager,
  CompositionSetters,
  SequenceManager,
  SequenceVisibilityToggleContext,
  RemotionRootContexts,
  CompositionManagerProvider,
  useVideo,
  getRoot,
  useMediaVolumeState,
  useMediaMutedState,
  useMediaInTimeline,
  useLazyComponent,
  truthy,
  SequenceContext,
  useRemotionContexts,
  RemotionContextProvider,
  CSSUtils: exports_default_css,
  setupEnvVariables,
  MediaVolumeContext,
  SetMediaVolumeContext,
  getRemotionEnvironment,
  SharedAudioContext,
  SharedAudioContextProvider,
  invalidCompositionErrorMessage,
  calculateMediaDuration,
  isCompositionIdValid,
  getPreviewDomElement,
  compositionsRef,
  portalNode,
  waitForRoot,
  SetTimelineContext,
  CanUseRemotionHooksProvider,
  CanUseRemotionHooks,
  PrefetchProvider,
  DurationsContextProvider,
  IsPlayerContextProvider,
  useIsPlayer,
  EditorPropsProvider,
  EditorPropsContext,
  usePreload,
  NonceContext,
  resolveVideoConfig,
  resolveVideoConfigOrCatch,
  ResolveCompositionContext,
  useResolvedVideoConfig,
  resolveCompositionsRef,
  REMOTION_STUDIO_CONTAINER_ELEMENT,
  RenderAssetManager,
  persistCurrentFrame,
  useTimelineSetFrame,
  isIosSafari,
  WATCH_REMOTION_STATIC_FILES,
  addSequenceStackTraces,
  useMediaStartsAt,
  BufferingProvider,
  BufferingContextReact,
  enableSequenceStackTraces,
  CurrentScaleContext,
  PreviewSizeContext,
  calculateScale,
  editorPropsProviderRef,
  PROPS_UPDATED_EXTERNALLY,
  validateRenderAsset,
  Log,
  LogLevelContext,
  useLogLevel,
  playbackLogging,
  timeValueRef,
  compositionSelectorRef,
  RemotionEnvironmentContext,
  warnAboutTooHighVolume,
  AudioForPreview,
  OBJECTFIT_CONTAIN_CLASS_NAME,
  InnerOffthreadVideo,
  useBasicMediaInTimeline,
  getInputPropsOverride,
  setInputPropsOverride,
  useVideoEnabled,
  useAudioEnabled,
  useIsPlayerBuffering,
  TimelinePosition: exports_timeline_position_state,
  DelayRenderContextType,
  TimelineContext,
  RenderAssetManagerProvider
};
// src/interpolate-colors.ts
var NUMBER = "[-+]?\\d*\\.?\\d+";
var PERCENTAGE = NUMBER + "%";
function call(...args) {
  return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
}
function getMatchers() {
  const cachedMatchers = {
    rgb: undefined,
    rgba: undefined,
    hsl: undefined,
    hsla: undefined,
    hex3: undefined,
    hex4: undefined,
    hex5: undefined,
    hex6: undefined,
    hex8: undefined
  };
  if (cachedMatchers.rgb === undefined) {
    cachedMatchers.rgb = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
    cachedMatchers.rgba = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
    cachedMatchers.hsl = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
    cachedMatchers.hsla = new RegExp("hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
    cachedMatchers.hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
    cachedMatchers.hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
    cachedMatchers.hex6 = /^#([0-9a-fA-F]{6})$/;
    cachedMatchers.hex8 = /^#([0-9a-fA-F]{8})$/;
  }
  return cachedMatchers;
}
function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}
function hslToRgb(h, s, l) {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b2 = hue2rgb(p, q, h - 1 / 3);
  return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b2 * 255) << 8;
}
function parse255(str) {
  const int = Number.parseInt(str, 10);
  if (int < 0) {
    return 0;
  }
  if (int > 255) {
    return 255;
  }
  return int;
}
function parse360(str) {
  const int = Number.parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}
function parse1(str) {
  const num = Number.parseFloat(str);
  if (num < 0) {
    return 0;
  }
  if (num > 1) {
    return 255;
  }
  return Math.round(num * 255);
}
function parsePercentage(str) {
  const int = Number.parseFloat(str);
  if (int < 0) {
    return 0;
  }
  if (int > 100) {
    return 1;
  }
  return int / 100;
}
var colorNames = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199
};
function normalizeColor(color) {
  const matchers = getMatchers();
  let match;
  if (matchers.hex6) {
    if (match = matchers.hex6.exec(color)) {
      return Number.parseInt(match[1] + "ff", 16) >>> 0;
    }
  }
  if (colorNames[color] !== undefined) {
    return colorNames[color];
  }
  if (matchers.rgb) {
    if (match = matchers.rgb.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 255) >>> 0;
    }
  }
  if (matchers.rgba) {
    if (match = matchers.rgba.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
    }
  }
  if (matchers.hex3) {
    if (match = matchers.hex3.exec(color)) {
      return Number.parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
    }
  }
  if (matchers.hex8) {
    if (match = matchers.hex8.exec(color)) {
      return Number.parseInt(match[1], 16) >>> 0;
    }
  }
  if (matchers.hex4) {
    if (match = matchers.hex4.exec(color)) {
      return Number.parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
    }
  }
  if (matchers.hsl) {
    if (match = matchers.hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
    }
  }
  if (matchers.hsla) {
    if (match = matchers.hsla.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
    }
  }
  throw new Error(`invalid color string ${color} provided`);
}
var opacity = (c2) => {
  return (c2 >> 24 & 255) / 255;
};
var red = (c2) => {
  return c2 >> 16 & 255;
};
var green = (c2) => {
  return c2 >> 8 & 255;
};
var blue = (c2) => {
  return c2 & 255;
};
var rgbaColor = (r, g, b2, alpha) => {
  return `rgba(${r}, ${g}, ${b2}, ${alpha})`;
};
function processColor(color) {
  const normalizedColor = normalizeColor(color);
  return (normalizedColor << 24 | normalizedColor >>> 8) >>> 0;
}
var interpolateColorsRGB = (value, inputRange, colors) => {
  const [r, g, b2, a2] = [red, green, blue, opacity].map((f) => {
    const unrounded = interpolate(value, inputRange, colors.map((c2) => f(c2)), {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    if (f === opacity) {
      return Number(unrounded.toFixed(3));
    }
    return Math.round(unrounded);
  });
  return rgbaColor(r, g, b2, a2);
};
var interpolateColors = (input, inputRange, outputRange) => {
  if (typeof input === "undefined") {
    throw new TypeError("input can not be undefined");
  }
  if (typeof inputRange === "undefined") {
    throw new TypeError("inputRange can not be undefined");
  }
  if (typeof outputRange === "undefined") {
    throw new TypeError("outputRange can not be undefined");
  }
  if (inputRange.length !== outputRange.length) {
    throw new TypeError("inputRange (" + inputRange.length + " values provided) and outputRange (" + outputRange.length + " values provided) must have the same length");
  }
  const processedOutputRange = outputRange.map((c2) => processColor(c2));
  return interpolateColorsRGB(input, inputRange, processedOutputRange);
};
// src/validate-frame.ts
var validateFrame = ({
  allowFloats,
  durationInFrames,
  frame
}) => {
  if (typeof frame === "undefined") {
    throw new TypeError(`Argument missing for parameter "frame"`);
  }
  if (typeof frame !== "number") {
    throw new TypeError(`Argument passed for "frame" is not a number: ${frame}`);
  }
  if (!Number.isFinite(frame)) {
    throw new RangeError(`Frame ${frame} is not finite`);
  }
  if (frame % 1 !== 0 && !allowFloats) {
    throw new RangeError(`Argument for frame must be an integer, but got ${frame}`);
  }
  if (frame < 0 && frame < -durationInFrames) {
    throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the lowest frame that can be rendered is ${-durationInFrames}`);
  }
  if (frame > durationInFrames - 1) {
    throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the highest frame that can be rendered is ${durationInFrames - 1}`);
  }
};
// src/series/index.tsx


// src/series/flatten-children.tsx

var flattenChildren = (children) => {
  const childrenArray = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children);
  return childrenArray.reduce((flatChildren, child) => {
    if (child.type === react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      return flatChildren.concat(flattenChildren(child.props.children));
    }
    flatChildren.push(child);
    return flatChildren;
  }, []);
};

// src/series/is-inside-series.tsx


var IsInsideSeriesContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);
var IsInsideSeriesContainer = ({ children }) => {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(IsInsideSeriesContext.Provider, {
    value: true,
    children
  });
};
var IsNotInsideSeriesProvider = ({ children }) => {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(IsInsideSeriesContext.Provider, {
    value: false,
    children
  });
};
var useRequireToBeInsideSeries = () => {
  const isInsideSeries = react__WEBPACK_IMPORTED_MODULE_0__.useContext(IsInsideSeriesContext);
  if (!isInsideSeries) {
    throw new Error("This component must be inside a <Series /> component.");
  }
};

// src/series/index.tsx

var SeriesSequenceRefForwardingFunction = ({ children }, _ref) => {
  useRequireToBeInsideSeries();
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(IsNotInsideSeriesProvider, {
    children
  });
};
var SeriesSequence = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(SeriesSequenceRefForwardingFunction);
var Series = (props2) => {
  const childrenValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    let startFrame = 0;
    const flattenedChildren = flattenChildren(props2.children);
    return react__WEBPACK_IMPORTED_MODULE_0__.Children.map(flattenedChildren, (child, i) => {
      const castedChild = child;
      if (typeof castedChild === "string") {
        if (castedChild.trim() === "") {
          return null;
        }
        throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as its children, but you passed a string "${castedChild}"`);
      }
      if (castedChild.type !== SeriesSequence) {
        throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as its children, but got ${castedChild} instead`);
      }
      const debugInfo = `index = ${i}, duration = ${castedChild.props.durationInFrames}`;
      if (!castedChild?.props.children) {
        throw new TypeError(`A <Series.Sequence /> component (${debugInfo}) was detected to not have any children. Delete it to fix this error.`);
      }
      const durationInFramesProp = castedChild.props.durationInFrames;
      const {
        durationInFrames,
        children: _children,
        from,
        name,
        ...passedProps
      } = castedChild.props;
      if (i !== flattenedChildren.length - 1 || durationInFramesProp !== Infinity) {
        validateDurationInFrames(durationInFramesProp, {
          component: `of a <Series.Sequence /> component`,
          allowFloats: true
        });
      }
      const offset = castedChild.props.offset ?? 0;
      if (Number.isNaN(offset)) {
        throw new TypeError(`The "offset" property of a <Series.Sequence /> must not be NaN, but got NaN (${debugInfo}).`);
      }
      if (!Number.isFinite(offset)) {
        throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
      }
      if (offset % 1 !== 0) {
        throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
      }
      const currentStartFrame = startFrame + offset;
      startFrame += durationInFramesProp + offset;
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Sequence, {
        name: name || "<Series.Sequence>",
        from: currentStartFrame,
        durationInFrames: durationInFramesProp,
        ...passedProps,
        ref: castedChild.ref,
        children: child
      });
    });
  }, [props2.children]);
  if (ENABLE_V5_BREAKING_CHANGES) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(IsInsideSeriesContainer, {
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Sequence, {
        ...props2,
        children: childrenValue
      })
    });
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(IsInsideSeriesContainer, {
    children: childrenValue
  });
};
Series.Sequence = SeriesSequence;
addSequenceStackTraces(SeriesSequence);
// src/validation/validation-spring-duration.ts
var validateSpringDuration = (dur) => {
  if (typeof dur === "undefined") {
    return;
  }
  if (typeof dur !== "number") {
    throw new TypeError(`A "duration" of a spring must be a "number" but is "${typeof dur}"`);
  }
  if (Number.isNaN(dur)) {
    throw new TypeError('A "duration" of a spring is NaN, which it must not be');
  }
  if (!Number.isFinite(dur)) {
    throw new TypeError('A "duration" of a spring must be finite, but is ' + dur);
  }
  if (dur <= 0) {
    throw new TypeError('A "duration" of a spring must be positive, but is ' + dur);
  }
};

// src/spring/spring-utils.ts
var defaultSpringConfig = {
  damping: 10,
  mass: 1,
  stiffness: 100,
  overshootClamping: false
};
var advanceCache = {};
function advance({
  animation,
  now,
  config
}) {
  const { toValue, lastTimestamp, current, velocity } = animation;
  const deltaTime = Math.min(now - lastTimestamp, 64);
  if (config.damping <= 0) {
    throw new Error("Spring damping must be greater than 0, otherwise the spring() animation will never end, causing an infinite loop.");
  }
  const c2 = config.damping;
  const m = config.mass;
  const k = config.stiffness;
  const cacheKey = [
    toValue,
    lastTimestamp,
    current,
    velocity,
    c2,
    m,
    k,
    now
  ].join("-");
  if (advanceCache[cacheKey]) {
    return advanceCache[cacheKey];
  }
  const v0 = -velocity;
  const x0 = toValue - current;
  const zeta = c2 / (2 * Math.sqrt(k * m));
  const omega0 = Math.sqrt(k / m);
  const omega1 = omega0 * Math.sqrt(1 - zeta ** 2);
  const t = deltaTime / 1000;
  const sin1 = Math.sin(omega1 * t);
  const cos1 = Math.cos(omega1 * t);
  const underDampedEnvelope = Math.exp(-zeta * omega0 * t);
  const underDampedFrag1 = underDampedEnvelope * (sin1 * ((v0 + zeta * omega0 * x0) / omega1) + x0 * cos1);
  const underDampedPosition = toValue - underDampedFrag1;
  const underDampedVelocity = zeta * omega0 * underDampedFrag1 - underDampedEnvelope * (cos1 * (v0 + zeta * omega0 * x0) - omega1 * x0 * sin1);
  const criticallyDampedEnvelope = Math.exp(-omega0 * t);
  const criticallyDampedPosition = toValue - criticallyDampedEnvelope * (x0 + (v0 + omega0 * x0) * t);
  const criticallyDampedVelocity = criticallyDampedEnvelope * (v0 * (t * omega0 - 1) + t * x0 * omega0 * omega0);
  const animationNode = {
    toValue,
    prevPosition: current,
    lastTimestamp: now,
    current: zeta < 1 ? underDampedPosition : criticallyDampedPosition,
    velocity: zeta < 1 ? underDampedVelocity : criticallyDampedVelocity
  };
  advanceCache[cacheKey] = animationNode;
  return animationNode;
}
var calculationCache = {};
function springCalculation({
  frame,
  fps,
  config = {}
}) {
  const from = 0;
  const to = 1;
  const cacheKey = [
    frame,
    fps,
    config.damping,
    config.mass,
    config.overshootClamping,
    config.stiffness
  ].join("-");
  if (calculationCache[cacheKey]) {
    return calculationCache[cacheKey];
  }
  let animation = {
    lastTimestamp: 0,
    current: from,
    toValue: to,
    velocity: 0,
    prevPosition: 0
  };
  const frameClamped = Math.max(0, frame);
  const unevenRest = frameClamped % 1;
  for (let f = 0;f <= Math.floor(frameClamped); f++) {
    if (f === Math.floor(frameClamped)) {
      f += unevenRest;
    }
    const time = f / fps * 1000;
    animation = advance({
      animation,
      now: time,
      config: {
        ...defaultSpringConfig,
        ...config
      }
    });
  }
  calculationCache[cacheKey] = animation;
  return animation;
}

// src/spring/measure-spring.ts
var cache = new Map;
function measureSpring({
  fps,
  config = {},
  threshold = 0.005
}) {
  if (typeof threshold !== "number") {
    throw new TypeError(`threshold must be a number, got ${threshold} of type ${typeof threshold}`);
  }
  if (threshold === 0) {
    return Infinity;
  }
  if (threshold === 1) {
    return 0;
  }
  if (isNaN(threshold)) {
    throw new TypeError("Threshold is NaN");
  }
  if (!Number.isFinite(threshold)) {
    throw new TypeError("Threshold is not finite");
  }
  if (threshold < 0) {
    throw new TypeError("Threshold is below 0");
  }
  const cacheKey = [
    fps,
    config.damping,
    config.mass,
    config.overshootClamping,
    config.stiffness,
    threshold
  ].join("-");
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  validateFps(fps, "to the measureSpring() function", false);
  let frame = 0;
  let finishedFrame = 0;
  const calc = () => {
    return springCalculation({
      fps,
      frame,
      config
    });
  };
  let animation = calc();
  const calcDifference = () => {
    return Math.abs(animation.current - animation.toValue);
  };
  let difference = calcDifference();
  while (difference >= threshold) {
    frame++;
    animation = calc();
    difference = calcDifference();
  }
  finishedFrame = frame;
  for (let i = 0;i < 20; i++) {
    frame++;
    animation = calc();
    difference = calcDifference();
    if (difference >= threshold) {
      i = 0;
      finishedFrame = frame + 1;
    }
  }
  cache.set(cacheKey, finishedFrame);
  return finishedFrame;
}

// src/spring/index.ts
function spring({
  frame: passedFrame,
  fps,
  config = {},
  from = 0,
  to = 1,
  durationInFrames: passedDurationInFrames,
  durationRestThreshold,
  delay = 0,
  reverse = false
}) {
  validateSpringDuration(passedDurationInFrames);
  validateFrame({
    frame: passedFrame,
    durationInFrames: Infinity,
    allowFloats: true
  });
  validateFps(fps, "to spring()", false);
  const needsToCalculateNaturalDuration = reverse || typeof passedDurationInFrames !== "undefined";
  const naturalDuration = needsToCalculateNaturalDuration ? measureSpring({
    fps,
    config,
    threshold: durationRestThreshold
  }) : undefined;
  const naturalDurationGetter = needsToCalculateNaturalDuration ? {
    get: () => naturalDuration
  } : {
    get: () => {
      throw new Error("did not calculate natural duration, this is an error with Remotion. Please report");
    }
  };
  const reverseProcessed = reverse ? (passedDurationInFrames ?? naturalDurationGetter.get()) - passedFrame : passedFrame;
  const delayProcessed = reverseProcessed + (reverse ? delay : -delay);
  const durationProcessed = passedDurationInFrames === undefined ? delayProcessed : delayProcessed / (passedDurationInFrames / naturalDurationGetter.get());
  if (passedDurationInFrames && delayProcessed > passedDurationInFrames) {
    return to;
  }
  const spr = springCalculation({
    fps,
    frame: durationProcessed,
    config
  });
  const inner = config.overshootClamping ? to >= from ? Math.min(spr.current, to) : Math.max(spr.current, to) : spr.current;
  const interpolated = from === 0 && to === 1 ? inner : interpolate(inner, [0, 1], [from, to]);
  return interpolated;
}
// src/static-file.ts
var problematicCharacters = {
  "%3A": ":",
  "%2F": "/",
  "%3F": "?",
  "%23": "#",
  "%5B": "[",
  "%5D": "]",
  "%40": "@",
  "%21": "!",
  "%24": "$",
  "%26": "&",
  "%27": "'",
  "%28": "(",
  "%29": ")",
  "%2A": "*",
  "%2B": "+",
  "%2C": ",",
  "%3B": ";"
};
var didWarn2 = {};
var warnOnce3 = (message) => {
  if (didWarn2[message]) {
    return;
  }
  console.warn(message);
  didWarn2[message] = true;
};
var includesHexOfUnsafeChar = (path) => {
  for (const key of Object.keys(problematicCharacters)) {
    if (path.includes(key)) {
      return { containsHex: true, hexCode: key };
    }
  }
  return { containsHex: false };
};
var trimLeadingSlash = (path) => {
  if (path.startsWith("/")) {
    return trimLeadingSlash(path.substring(1));
  }
  return path;
};
var inner = (path) => {
  if (typeof window !== "undefined" && window.remotion_staticBase) {
    if (path.startsWith(window.remotion_staticBase)) {
      throw new Error(`The value "${path}" is already prefixed with the static base ${window.remotion_staticBase}. You don't need to call staticFile() on it.`);
    }
    return `${window.remotion_staticBase}/${trimLeadingSlash(path)}`;
  }
  return `/${trimLeadingSlash(path)}`;
};
var encodeBySplitting = (path) => {
  const splitBySlash = path.split("/");
  const encodedArray = splitBySlash.map((element) => {
    return encodeURIComponent(element);
  });
  const merged = encodedArray.join("/");
  return merged;
};
var staticFile = (path) => {
  if (path === null) {
    throw new TypeError("null was passed to staticFile()");
  }
  if (typeof path === "undefined") {
    throw new TypeError("undefined was passed to staticFile()");
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    throw new TypeError(`staticFile() does not support remote URLs - got "${path}". Instead, pass the URL without wrapping it in staticFile(). See: https://remotion.dev/docs/staticfile-remote-urls`);
  }
  if (path.startsWith("..") || path.startsWith("./")) {
    throw new TypeError(`staticFile() does not support relative paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
  }
  if (path.startsWith("/Users") || path.startsWith("/home") || path.startsWith("/tmp") || path.startsWith("/etc") || path.startsWith("/opt") || path.startsWith("/var") || path.startsWith("C:") || path.startsWith("D:") || path.startsWith("E:")) {
    throw new TypeError(`staticFile() does not support absolute paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
  }
  if (path.startsWith("public/")) {
    throw new TypeError(`Do not include the public/ prefix when using staticFile() - got "${path}". See: https://remotion.dev/docs/staticfile-relative-paths`);
  }
  const includesHex = includesHexOfUnsafeChar(path);
  if (includesHex.containsHex) {
    warnOnce3(`WARNING: You seem to pass an already encoded path (path contains ${includesHex.hexCode}). Since Remotion 4.0, the encoding is done by staticFile() itself. You may want to remove a encodeURIComponent() wrapping.`);
  }
  const preprocessed = encodeBySplitting(path);
  const preparsed = inner(preprocessed);
  if (!preparsed.startsWith("/")) {
    return `/${preparsed}`;
  }
  return preparsed;
};
// src/Still.tsx

var Still = (props2) => {
  const newProps = {
    ...props2,
    durationInFrames: 1,
    fps: 1
  };
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Composition, newProps);
};
// src/video/Video.tsx


// src/video/VideoForRendering.tsx


// src/video/seek-until-right.ts
var roundTo6Commas = (num) => {
  return Math.round(num * 1e5) / 1e5;
};
var seekToTime = ({
  element,
  desiredTime,
  logLevel,
  mountTime
}) => {
  if (isApproximatelyTheSame(element.currentTime, desiredTime)) {
    return {
      wait: Promise.resolve(desiredTime),
      cancel: () => {}
    };
  }
  seek({
    logLevel,
    mediaRef: element,
    time: desiredTime,
    why: "Seeking during rendering",
    mountTime
  });
  let cancel;
  let cancelSeeked = null;
  const prom = new Promise((resolve) => {
    cancel = element.requestVideoFrameCallback((now, metadata) => {
      const displayIn = metadata.expectedDisplayTime - now;
      if (displayIn <= 0) {
        resolve(metadata.mediaTime);
        return;
      }
      setTimeout(() => {
        resolve(metadata.mediaTime);
      }, displayIn + 150);
    });
  });
  const waitForSeekedEvent = new Promise((resolve) => {
    const onDone = () => {
      resolve();
    };
    element.addEventListener("seeked", onDone, {
      once: true
    });
    cancelSeeked = () => {
      element.removeEventListener("seeked", onDone);
    };
  });
  return {
    wait: Promise.all([prom, waitForSeekedEvent]).then(([time]) => time),
    cancel: () => {
      cancelSeeked?.();
      element.cancelVideoFrameCallback(cancel);
    }
  };
};
var seekToTimeMultipleUntilRight = ({
  element,
  desiredTime,
  fps,
  logLevel,
  mountTime
}) => {
  const threshold = 1 / fps / 2;
  let currentCancel = () => {
    return;
  };
  if (Number.isFinite(element.duration) && element.currentTime >= element.duration && desiredTime >= element.duration) {
    return {
      prom: Promise.resolve(),
      cancel: () => {}
    };
  }
  const prom = new Promise((resolve, reject) => {
    const firstSeek = seekToTime({
      element,
      desiredTime: desiredTime + threshold,
      logLevel,
      mountTime
    });
    firstSeek.wait.then((seekedTo) => {
      const difference = Math.abs(desiredTime - seekedTo);
      if (difference <= threshold) {
        return resolve();
      }
      const sign = desiredTime > seekedTo ? 1 : -1;
      const newSeek = seekToTime({
        element,
        desiredTime: seekedTo + threshold * sign,
        logLevel,
        mountTime
      });
      currentCancel = newSeek.cancel;
      newSeek.wait.then((newTime) => {
        const newDifference = Math.abs(desiredTime - newTime);
        if (roundTo6Commas(newDifference) <= roundTo6Commas(threshold)) {
          return resolve();
        }
        const thirdSeek = seekToTime({
          element,
          desiredTime: desiredTime + threshold,
          logLevel,
          mountTime
        });
        currentCancel = thirdSeek.cancel;
        return thirdSeek.wait.then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });
    currentCancel = firstSeek.cancel;
  });
  return {
    prom,
    cancel: () => {
      currentCancel();
    }
  };
};

// src/video/VideoForRendering.tsx

var VideoForRenderingForwardFunction = ({
  onError,
  volume: volumeProp,
  allowAmplificationDuringRender,
  playbackRate,
  onDuration,
  toneFrequency,
  name,
  acceptableTimeShiftInSeconds,
  delayRenderRetries,
  delayRenderTimeoutInMilliseconds,
  loopVolumeCurveBehavior,
  audioStreamIndex,
  onVideoFrame,
  ...props2
}, ref) => {
  const absoluteFrame = useTimelinePosition();
  const frame = useCurrentFrame();
  const volumePropsFrame = useFrameForVolumeProp(loopVolumeCurveBehavior ?? "repeat");
  const videoConfig = useUnsafeVideoConfig();
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const sequenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SequenceContext);
  const mediaStartsAt = useMediaStartsAt();
  const environment = useRemotionEnvironment();
  const logLevel = useLogLevel();
  const mountTime = useMountTime();
  const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
  const { registerRenderAsset, unregisterRenderAsset } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(RenderAssetManager);
  const id = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => `video-${random(props2.src ?? "")}-${sequenceContext?.cumulatedFrom}-${sequenceContext?.relativeFrom}-${sequenceContext?.durationInFrames}`, [
    props2.src,
    sequenceContext?.cumulatedFrom,
    sequenceContext?.relativeFrom,
    sequenceContext?.durationInFrames
  ]);
  if (!videoConfig) {
    throw new Error("No video config found");
  }
  const volume = evaluateVolume({
    volume: volumeProp,
    frame: volumePropsFrame,
    mediaVolume: 1
  });
  warnAboutTooHighVolume(volume);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!props2.src) {
      throw new Error("No src passed");
    }
    if (props2.muted) {
      return;
    }
    if (volume <= 0) {
      return;
    }
    if (!window.remotion_audioEnabled) {
      return;
    }
    registerRenderAsset({
      type: "video",
      src: getAbsoluteSrc(props2.src),
      id,
      frame: absoluteFrame,
      volume,
      mediaFrame: frame,
      playbackRate: playbackRate ?? 1,
      toneFrequency: toneFrequency ?? 1,
      audioStartFrame: Math.max(0, -(sequenceContext?.relativeFrom ?? 0)),
      audioStreamIndex: audioStreamIndex ?? 0
    });
    return () => unregisterRenderAsset(id);
  }, [
    props2.muted,
    props2.src,
    registerRenderAsset,
    id,
    unregisterRenderAsset,
    volume,
    frame,
    absoluteFrame,
    playbackRate,
    toneFrequency,
    sequenceContext?.relativeFrom,
    audioStreamIndex
  ]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, () => {
    return videoRef.current;
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!window.remotion_videoEnabled) {
      return;
    }
    const { current } = videoRef;
    if (!current) {
      return;
    }
    const currentTime = getMediaTime({
      frame,
      playbackRate: playbackRate || 1,
      startFrom: -mediaStartsAt,
      fps: videoConfig.fps
    });
    const handle = delayRender2(`Rendering <Html5Video /> with src="${props2.src}" at time ${currentTime}`, {
      retries: delayRenderRetries ?? undefined,
      timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? undefined
    });
    if (window.process?.env?.NODE_ENV === "test") {
      continueRender2(handle);
      return;
    }
    if (isApproximatelyTheSame(current.currentTime, currentTime)) {
      if (current.readyState >= 2) {
        continueRender2(handle);
        return;
      }
      const loadedDataHandler = () => {
        continueRender2(handle);
      };
      current.addEventListener("loadeddata", loadedDataHandler, { once: true });
      return () => {
        current.removeEventListener("loadeddata", loadedDataHandler);
      };
    }
    const endedHandler = () => {
      continueRender2(handle);
    };
    const seek2 = seekToTimeMultipleUntilRight({
      element: current,
      desiredTime: currentTime,
      fps: videoConfig.fps,
      logLevel,
      mountTime
    });
    seek2.prom.then(() => {
      continueRender2(handle);
    });
    current.addEventListener("ended", endedHandler, { once: true });
    const errorHandler = () => {
      if (current?.error) {
        console.error("Error occurred in video", current?.error);
        if (onError) {
          return;
        }
        throw new Error(`The browser threw an error while playing the video ${props2.src}: Code ${current.error.code} - ${current?.error?.message}. See https://remotion.dev/docs/media-playback-error for help. Pass an onError() prop to handle the error.`);
      } else {
        throw new Error("The browser threw an error");
      }
    };
    current.addEventListener("error", errorHandler, { once: true });
    return () => {
      seek2.cancel();
      current.removeEventListener("ended", endedHandler);
      current.removeEventListener("error", errorHandler);
      continueRender2(handle);
    };
  }, [
    volumePropsFrame,
    props2.src,
    playbackRate,
    videoConfig.fps,
    frame,
    mediaStartsAt,
    onError,
    delayRenderRetries,
    delayRenderTimeoutInMilliseconds,
    logLevel,
    mountTime,
    continueRender2,
    delayRender2
  ]);
  const { src } = props2;
  if (environment.isRendering) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
      if (window.process?.env?.NODE_ENV === "test") {
        return;
      }
      const newHandle = delayRender2("Loading <Html5Video> duration with src=" + src, {
        retries: delayRenderRetries ?? undefined,
        timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? undefined
      });
      const { current } = videoRef;
      const didLoad = () => {
        if (current?.duration) {
          onDuration(src, current.duration);
        }
        continueRender2(newHandle);
      };
      if (current?.duration) {
        onDuration(src, current.duration);
        continueRender2(newHandle);
      } else {
        current?.addEventListener("loadedmetadata", didLoad, { once: true });
      }
      return () => {
        current?.removeEventListener("loadedmetadata", didLoad);
        continueRender2(newHandle);
      };
    }, [
      src,
      onDuration,
      delayRenderRetries,
      delayRenderTimeoutInMilliseconds,
      continueRender2,
      delayRender2
    ]);
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("video", {
    ref: videoRef,
    disableRemotePlayback: true,
    ...props2
  });
};
var VideoForRendering = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(VideoForRenderingForwardFunction);

// src/video/Video.tsx

var VideoForwardingFunction = (props2, ref) => {
  const {
    startFrom,
    endAt,
    trimBefore,
    trimAfter,
    name,
    pauseWhenBuffering,
    stack,
    _remotionInternalNativeLoopPassed,
    showInTimeline,
    onAutoPlayError,
    ...otherProps
  } = props2;
  const { loop, ...propsOtherThanLoop } = props2;
  const { fps } = useVideoConfig();
  const environment = useRemotionEnvironment();
  if (environment.isClientSideRendering) {
    throw new Error("<Html5Video> is not supported in @remotion/web-renderer. Use <Video> from @remotion/media instead. See https://remotion.dev/docs/client-side-rendering/limitations");
  }
  const { durations, setDurations } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DurationsContext);
  if (typeof ref === "string") {
    throw new Error("string refs are not supported");
  }
  if (typeof props2.src !== "string") {
    throw new TypeError(`The \`<Html5Video>\` tag requires a string for \`src\`, but got ${JSON.stringify(props2.src)} instead.`);
  }
  const preloadedSrc = usePreload(props2.src);
  const onDuration = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((src, durationInSeconds) => {
    setDurations({ type: "got-duration", durationInSeconds, src });
  }, [setDurations]);
  const onVideoFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {}, []);
  const durationFetched = durations[getAbsoluteSrc(preloadedSrc)] ?? durations[getAbsoluteSrc(props2.src)];
  validateMediaTrimProps({ startFrom, endAt, trimBefore, trimAfter });
  const { trimBeforeValue, trimAfterValue } = resolveTrimProps({
    startFrom,
    endAt,
    trimBefore,
    trimAfter
  });
  if (loop && durationFetched !== undefined) {
    if (!Number.isFinite(durationFetched)) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Html5Video, {
        ...propsOtherThanLoop,
        ref,
        stack,
        _remotionInternalNativeLoopPassed: true
      });
    }
    const mediaDuration = durationFetched * fps;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Loop, {
      durationInFrames: calculateMediaDuration({
        trimAfter: trimAfterValue,
        mediaDurationInFrames: mediaDuration,
        playbackRate: props2.playbackRate ?? 1,
        trimBefore: trimBeforeValue
      }),
      layout: "none",
      name,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Html5Video, {
        ...propsOtherThanLoop,
        ref,
        stack,
        _remotionInternalNativeLoopPassed: true
      })
    });
  }
  if (typeof trimBeforeValue !== "undefined" || typeof trimAfterValue !== "undefined") {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Sequence, {
      layout: "none",
      from: 0 - (trimBeforeValue ?? 0),
      showInTimeline: false,
      durationInFrames: trimAfterValue === undefined ? undefined : trimAfterValue / (props2.playbackRate ?? 1),
      name,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Html5Video, {
        pauseWhenBuffering: pauseWhenBuffering ?? false,
        ...otherProps,
        ref,
        stack
      })
    });
  }
  validateMediaProps({ playbackRate: props2.playbackRate, volume: props2.volume }, "Html5Video");
  if (environment.isRendering) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(VideoForRendering, {
      onDuration,
      onVideoFrame: onVideoFrame ?? null,
      ...otherProps,
      ref
    });
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(VideoForPreview, {
    onlyWarnForMediaSeekingError: false,
    ...otherProps,
    ref,
    onVideoFrame: null,
    pauseWhenBuffering: pauseWhenBuffering ?? false,
    onDuration,
    _remotionInternalStack: stack ?? null,
    _remotionInternalNativeLoopPassed: _remotionInternalNativeLoopPassed ?? false,
    showInTimeline: showInTimeline ?? true,
    onAutoPlayError: onAutoPlayError ?? undefined
  });
};
var Html5Video = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(VideoForwardingFunction);
addSequenceStackTraces(Html5Video);
var Video = Html5Video;
// src/index.ts
checkMultipleRemotionVersions();
var Experimental = {
  Clipper,
  Null,
  useIsPlayer
};
var proxyObj = {};
var Config = new Proxy(proxyObj, {
  get(_, prop) {
    if (prop === "Bundling" || prop === "Rendering" || prop === "Log" || prop === "Puppeteer" || prop === "Output") {
      return Config;
    }
    return () => {
      console.warn("⚠️  The CLI configuration has been extracted from Remotion Core.");
      console.warn("Update the import from the config file:");
      console.warn();
      console.warn("- Delete:");
      console.warn('import {Config} from "remotion";');
      console.warn("+ Replace:");
      console.warn('import {Config} from "@remotion/cli/config";');
      console.warn();
      console.warn("For more information, see https://www.remotion.dev/docs/4-0-migration.");
      process.exit(1);
    };
  }
});
addSequenceStackTraces(Sequence);



/***/ },

/***/ 3016
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoReactInternals: () => (/* binding */ NoReactInternals),
/* harmony export */   interpolate: () => (/* binding */ interpolate),
/* harmony export */   random: () => (/* binding */ random)
/* harmony export */ });
// src/interpolate.ts
function interpolateFunction(input, inputRange, outputRange, options) {
  const { extrapolateLeft, extrapolateRight, easing } = options;
  let result = input;
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  if (result < inputMin) {
    if (extrapolateLeft === "identity") {
      return result;
    }
    if (extrapolateLeft === "clamp") {
      result = inputMin;
    } else if (extrapolateLeft === "wrap") {
      const range = inputMax - inputMin;
      result = ((result - inputMin) % range + range) % range + inputMin;
    } else if (extrapolateLeft === "extend") {}
  }
  if (result > inputMax) {
    if (extrapolateRight === "identity") {
      return result;
    }
    if (extrapolateRight === "clamp") {
      result = inputMax;
    } else if (extrapolateRight === "wrap") {
      const range = inputMax - inputMin;
      result = ((result - inputMin) % range + range) % range + inputMin;
    } else if (extrapolateRight === "extend") {}
  }
  if (outputMin === outputMax) {
    return outputMin;
  }
  result = (result - inputMin) / (inputMax - inputMin);
  result = easing(result);
  result = result * (outputMax - outputMin) + outputMin;
  return result;
}
function findRange(input, inputRange) {
  let i;
  for (i = 1;i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) {
      break;
    }
  }
  return i - 1;
}
function checkValidInputRange(arr) {
  for (let i = 1;i < arr.length; ++i) {
    if (!(arr[i] > arr[i - 1])) {
      throw new Error(`inputRange must be strictly monotonically increasing but got [${arr.join(",")}]`);
    }
  }
}
function checkInfiniteRange(name, arr) {
  if (arr.length < 2) {
    throw new Error(name + " must have at least 2 elements");
  }
  for (const element of arr) {
    if (typeof element !== "number") {
      throw new Error(`${name} must contain only numbers`);
    }
    if (!Number.isFinite(element)) {
      throw new Error(`${name} must contain only finite numbers, but got [${arr.join(",")}]`);
    }
  }
}
function interpolate(input, inputRange, outputRange, options) {
  if (typeof input === "undefined") {
    throw new Error("input can not be undefined");
  }
  if (typeof inputRange === "undefined") {
    throw new Error("inputRange can not be undefined");
  }
  if (typeof outputRange === "undefined") {
    throw new Error("outputRange can not be undefined");
  }
  if (inputRange.length !== outputRange.length) {
    throw new Error("inputRange (" + inputRange.length + ") and outputRange (" + outputRange.length + ") must have the same length");
  }
  checkInfiniteRange("inputRange", inputRange);
  checkInfiniteRange("outputRange", outputRange);
  checkValidInputRange(inputRange);
  const easing = options?.easing ?? ((num) => num);
  let extrapolateLeft = "extend";
  if (options?.extrapolateLeft !== undefined) {
    extrapolateLeft = options.extrapolateLeft;
  }
  let extrapolateRight = "extend";
  if (options?.extrapolateRight !== undefined) {
    extrapolateRight = options.extrapolateRight;
  }
  if (typeof input !== "number") {
    throw new TypeError("Cannot interpolate an input which is not a number");
  }
  const range = findRange(input, inputRange);
  return interpolateFunction(input, [inputRange[range], inputRange[range + 1]], [outputRange[range], outputRange[range + 1]], {
    easing,
    extrapolateLeft,
    extrapolateRight
  });
}
// src/random.ts
function mulberry32(a) {
  let t = a + 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function hashCode(str) {
  let i = 0;
  let chr = 0;
  let hash = 0;
  for (i = 0;i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}
var random = (seed, dummy) => {
  if (dummy !== undefined) {
    throw new TypeError("random() takes only one argument");
  }
  if (seed === null) {
    return Math.random();
  }
  if (typeof seed === "string") {
    return mulberry32(hashCode(seed));
  }
  if (typeof seed === "number") {
    return mulberry32(seed * 10000000000);
  }
  throw new Error("random() argument must be a number or a string");
};
// src/truthy.ts
function truthy(value) {
  return Boolean(value);
}

// src/delay-render.ts
if (typeof window !== "undefined") {
  window.remotion_renderReady = false;
  if (!window.remotion_delayRenderTimeouts) {
    window.remotion_delayRenderTimeouts = {};
  }
  window.remotion_delayRenderHandles = [];
}
var DELAY_RENDER_CALLSTACK_TOKEN = "The delayRender was called:";
var DELAY_RENDER_RETRIES_LEFT = "Retries left: ";
var DELAY_RENDER_RETRY_TOKEN = "- Rendering the frame will be retried.";
var DELAY_RENDER_CLEAR_TOKEN = "handle was cleared after";

// src/input-props-serialization.ts
var DATE_TOKEN = "remotion-date:";
var FILE_TOKEN = "remotion-file:";
var serializeJSONWithSpecialTypes = ({
  data,
  indent,
  staticBase
}) => {
  let customDateUsed = false;
  let customFileUsed = false;
  let mapUsed = false;
  let setUsed = false;
  try {
    const serializedString = JSON.stringify(data, function(key, value) {
      const item = this[key];
      if (item instanceof Date) {
        customDateUsed = true;
        return `${DATE_TOKEN}${item.toISOString()}`;
      }
      if (item instanceof Map) {
        mapUsed = true;
        return value;
      }
      if (item instanceof Set) {
        setUsed = true;
        return value;
      }
      if (typeof item === "string" && staticBase !== null && item.startsWith(staticBase)) {
        customFileUsed = true;
        return `${FILE_TOKEN}${item.replace(staticBase + "/", "")}`;
      }
      return value;
    }, indent);
    return { serializedString, customDateUsed, customFileUsed, mapUsed, setUsed };
  } catch (err) {
    throw new Error("Could not serialize the passed input props to JSON: " + err.message);
  }
};
var deserializeJSONWithSpecialTypes = (data) => {
  return JSON.parse(data, (_, value) => {
    if (typeof value === "string" && value.startsWith(DATE_TOKEN)) {
      return new Date(value.replace(DATE_TOKEN, ""));
    }
    if (typeof value === "string" && value.startsWith(FILE_TOKEN)) {
      return `${window.remotion_staticBase}/${value.replace(FILE_TOKEN, "")}`;
    }
    return value;
  });
};

// src/interpolate-colors.ts
var NUMBER = "[-+]?\\d*\\.?\\d+";
var PERCENTAGE = NUMBER + "%";
function call(...args) {
  return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
}
function getMatchers() {
  const cachedMatchers = {
    rgb: undefined,
    rgba: undefined,
    hsl: undefined,
    hsla: undefined,
    hex3: undefined,
    hex4: undefined,
    hex5: undefined,
    hex6: undefined,
    hex8: undefined
  };
  if (cachedMatchers.rgb === undefined) {
    cachedMatchers.rgb = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
    cachedMatchers.rgba = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
    cachedMatchers.hsl = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
    cachedMatchers.hsla = new RegExp("hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
    cachedMatchers.hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
    cachedMatchers.hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
    cachedMatchers.hex6 = /^#([0-9a-fA-F]{6})$/;
    cachedMatchers.hex8 = /^#([0-9a-fA-F]{8})$/;
  }
  return cachedMatchers;
}
function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}
function hslToRgb(h, s, l) {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
}
function parse255(str) {
  const int = Number.parseInt(str, 10);
  if (int < 0) {
    return 0;
  }
  if (int > 255) {
    return 255;
  }
  return int;
}
function parse360(str) {
  const int = Number.parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}
function parse1(str) {
  const num = Number.parseFloat(str);
  if (num < 0) {
    return 0;
  }
  if (num > 1) {
    return 255;
  }
  return Math.round(num * 255);
}
function parsePercentage(str) {
  const int = Number.parseFloat(str);
  if (int < 0) {
    return 0;
  }
  if (int > 100) {
    return 1;
  }
  return int / 100;
}
var colorNames = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199
};
function normalizeColor(color) {
  const matchers = getMatchers();
  let match;
  if (matchers.hex6) {
    if (match = matchers.hex6.exec(color)) {
      return Number.parseInt(match[1] + "ff", 16) >>> 0;
    }
  }
  if (colorNames[color] !== undefined) {
    return colorNames[color];
  }
  if (matchers.rgb) {
    if (match = matchers.rgb.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 255) >>> 0;
    }
  }
  if (matchers.rgba) {
    if (match = matchers.rgba.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
    }
  }
  if (matchers.hex3) {
    if (match = matchers.hex3.exec(color)) {
      return Number.parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
    }
  }
  if (matchers.hex8) {
    if (match = matchers.hex8.exec(color)) {
      return Number.parseInt(match[1], 16) >>> 0;
    }
  }
  if (matchers.hex4) {
    if (match = matchers.hex4.exec(color)) {
      return Number.parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
    }
  }
  if (matchers.hsl) {
    if (match = matchers.hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
    }
  }
  if (matchers.hsla) {
    if (match = matchers.hsla.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
    }
  }
  throw new Error(`invalid color string ${color} provided`);
}
function processColor(color) {
  const normalizedColor = normalizeColor(color);
  return (normalizedColor << 24 | normalizedColor >>> 8) >>> 0;
}

// src/prores-profile.ts
var proResProfileOptions = [
  "4444-xq",
  "4444",
  "hq",
  "standard",
  "light",
  "proxy"
];

// src/v5-flag.ts
var ENABLE_V5_BREAKING_CHANGES = false;

// src/validate-frame.ts
var validateFrame = ({
  allowFloats,
  durationInFrames,
  frame
}) => {
  if (typeof frame === "undefined") {
    throw new TypeError(`Argument missing for parameter "frame"`);
  }
  if (typeof frame !== "number") {
    throw new TypeError(`Argument passed for "frame" is not a number: ${frame}`);
  }
  if (!Number.isFinite(frame)) {
    throw new RangeError(`Frame ${frame} is not finite`);
  }
  if (frame % 1 !== 0 && !allowFloats) {
    throw new RangeError(`Argument for frame must be an integer, but got ${frame}`);
  }
  if (frame < 0 && frame < -durationInFrames) {
    throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the lowest frame that can be rendered is ${-durationInFrames}`);
  }
  if (frame > durationInFrames - 1) {
    throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the highest frame that can be rendered is ${durationInFrames - 1}`);
  }
};

// src/codec.ts
var validCodecs = [
  "h264",
  "h265",
  "vp8",
  "vp9",
  "mp3",
  "aac",
  "wav",
  "prores",
  "h264-mkv",
  "h264-ts",
  "gif"
];

// src/validation/validate-default-codec.ts
function validateCodec(defaultCodec, location, name) {
  if (typeof defaultCodec === "undefined") {
    return;
  }
  if (typeof defaultCodec !== "string") {
    throw new TypeError(`The "${name}" prop ${location} must be a string, but you passed a value of type ${typeof defaultCodec}.`);
  }
  if (!validCodecs.includes(defaultCodec)) {
    throw new Error(`The "${name}" prop ${location} must be one of ${validCodecs.join(", ")}, but you passed ${defaultCodec}.`);
  }
}

// src/validation/validate-default-props.ts
var validateDefaultAndInputProps = (defaultProps, name, compositionId) => {
  if (!defaultProps) {
    return;
  }
  if (typeof defaultProps !== "object") {
    throw new Error(`"${name}" must be an object, but you passed a value of type ${typeof defaultProps}`);
  }
  if (Array.isArray(defaultProps)) {
    throw new Error(`"${name}" must be an object, an array was passed ${compositionId ? `for composition "${compositionId}"` : ""}`);
  }
};

// src/validation/validate-dimensions.ts
function validateDimension(amount, nameOfProp, location) {
  if (typeof amount !== "number") {
    throw new Error(`The "${nameOfProp}" prop ${location} must be a number, but you passed a value of type ${typeof amount}`);
  }
  if (isNaN(amount)) {
    throw new TypeError(`The "${nameOfProp}" prop ${location} must not be NaN, but is NaN.`);
  }
  if (!Number.isFinite(amount)) {
    throw new TypeError(`The "${nameOfProp}" prop ${location} must be finite, but is ${amount}.`);
  }
  if (amount % 1 !== 0) {
    throw new TypeError(`The "${nameOfProp}" prop ${location} must be an integer, but is ${amount}.`);
  }
  if (amount <= 0) {
    throw new TypeError(`The "${nameOfProp}" prop ${location} must be positive, but got ${amount}.`);
  }
}

// src/validation/validate-duration-in-frames.ts
function validateDurationInFrames(durationInFrames, options) {
  const { allowFloats, component } = options;
  if (typeof durationInFrames === "undefined") {
    throw new Error(`The "durationInFrames" prop ${component} is missing.`);
  }
  if (typeof durationInFrames !== "number") {
    throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
  }
  if (durationInFrames <= 0) {
    throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
  }
  if (!allowFloats && durationInFrames % 1 !== 0) {
    throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
  }
  if (!Number.isFinite(durationInFrames)) {
    throw new TypeError(`The "durationInFrames" prop ${component} must be finite, but got ${durationInFrames}.`);
  }
}

// src/validation/validate-fps.ts
function validateFps(fps, location, isGif) {
  if (typeof fps !== "number") {
    throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
  }
  if (!Number.isFinite(fps)) {
    throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
  }
  if (isNaN(fps)) {
    throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
  }
  if (fps <= 0) {
    throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
  }
  if (isGif && fps > 50) {
    throw new TypeError(`The FPS for a GIF cannot be higher than 50. Use the --every-nth-frame option to lower the FPS: https://remotion.dev/docs/render-as-gif`);
  }
}

// src/video/get-current-time.ts
var getExpectedMediaFrameUncorrected = ({
  frame,
  playbackRate,
  startFrom
}) => {
  return interpolate(frame, [-1, startFrom, startFrom + 1], [-1, startFrom, startFrom + playbackRate]);
};

// src/absolute-src.ts
var getAbsoluteSrc = (relativeSrc) => {
  if (typeof window === "undefined") {
    return relativeSrc;
  }
  if (relativeSrc.startsWith("http://") || relativeSrc.startsWith("https://") || relativeSrc.startsWith("file://") || relativeSrc.startsWith("blob:") || relativeSrc.startsWith("data:")) {
    return relativeSrc;
  }
  return new URL(relativeSrc, window.origin).href;
};

// src/video/offthread-video-source.ts
var getOffthreadVideoSource = ({
  src,
  transparent,
  currentTime,
  toneMapped
}) => {
  return `http://localhost:${window.remotion_proxyPort}/proxy?src=${encodeURIComponent(getAbsoluteSrc(src))}&time=${encodeURIComponent(Math.max(0, currentTime))}&transparent=${String(transparent)}&toneMapped=${String(toneMapped)}`;
};

// src/no-react.ts
var NoReactInternals = {
  processColor,
  truthy,
  validateFps,
  validateDimension,
  validateDurationInFrames,
  validateDefaultAndInputProps,
  validateFrame,
  serializeJSONWithSpecialTypes,
  bundleName: "bundle.js",
  bundleMapName: "bundle.js.map",
  deserializeJSONWithSpecialTypes,
  DELAY_RENDER_CALLSTACK_TOKEN,
  DELAY_RENDER_RETRY_TOKEN,
  DELAY_RENDER_CLEAR_TOKEN,
  DELAY_RENDER_ATTEMPT_TOKEN: DELAY_RENDER_RETRIES_LEFT,
  getOffthreadVideoSource,
  getExpectedMediaFrameUncorrected,
  ENABLE_V5_BREAKING_CHANGES,
  MIN_NODE_VERSION: ENABLE_V5_BREAKING_CHANGES ? 18 : 16,
  MIN_BUN_VERSION: ENABLE_V5_BREAKING_CHANGES ? "1.1.3" : "1.0.3",
  colorNames,
  DATE_TOKEN,
  FILE_TOKEN,
  validateCodec,
  proResProfileOptions
};



/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "finance-video-ai:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfinance_video_ai"] = self["webpackChunkfinance_video_ai"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(5565);
/******/ 	__webpack_require__(3517);
/******/ 	__webpack_require__(3540);
/******/ 	var __webpack_exports__ = __webpack_require__(9512);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map