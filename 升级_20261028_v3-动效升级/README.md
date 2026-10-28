# v3 动效升级（Remotion）

素材复用 `../修订_20261028_v2-新素材与清晰动效/stock_public`（Git LFS，需先 `git lfs pull`）。

```sh
cd remotion && npm install
npm run studio                      # 预览
npx remotion still src/Episode5.tsx StockVideo out/f.png --frame=560 --props=stock_props.json
npm run render -- out/video.mp4
```
- `src/design.ts` 设计令牌；`src/StockVideo.tsx` 镜头/转场/标题/字幕/质感；`src/Episode5.tsx` 23 个图形单元；`src/fx.tsx` 颗粒/暗角/漏光。
- 原共享渲染器路径 `/Users/henry/.../StockVideo` 已由本地 `StockVideo.tsx` 取代，项目可独立运行。
