# 重庆情侣慢游攻略

一个手机端优先的 React + TypeScript + Vite 响应式旅游攻略网页，主题为《重庆情侣慢游攻略》。

## 安装依赖

```bash
npm install
```

如果默认 npm registry 较慢，可使用：

```bash
npm install --registry=https://registry.npmmirror.com
```

## 启动本地开发环境

```bash
npm run dev
```

默认本地地址通常是 `http://localhost:5173/`。

## 打包

```bash
npm run build
```

构建产物输出在 `dist/`。

## 配置高德地图 Key

1. 前往高德开放平台申请 Web 端 JS API Key。
2. 在高德控制台为该 Key 配置安全密钥。
3. 复制 `.env.example` 为 `.env`。
4. 填写：

```env
VITE_AMAP_JS_KEY=你的高德JSAPIKey
VITE_AMAP_SECURITY_CODE=你的安全密钥
```

不要把真实 Key 提交到公开仓库。Key 或安全密钥未配置时，页面会显示文字路线和高德外部导航按钮，不会崩溃。

## 修改酒店信息

酒店配置在 `src/data/tripConfig.ts`：

```ts
hotel: {
  name: "汉庭酒店（重庆观音桥地铁站店）",
  address: "重庆市江北区观音桥步行街附近（请按酒店订单补充精确门牌）",
  lng: null,
  lat: null
}
```

只需修改酒店名称、地址和坐标，即可让所有涉及酒店的路线使用新位置。坐标为空时，页面暂用观音桥步行街坐标作为降级起终点。

## 修改行程

行程集中在 `src/data/itinerary.ts`。每天包含日期、主题、时间轴、景点顺序、路线分段、预算、步数、怕热提醒和下雨备用建议。

景点基础信息在 `src/data/attractions.ts`。路线段通过景点 `id` 关联，不建议在组件里写死大段行程文字。

## 替换景点图片

图片路径在 `src/data/attractions.ts` 的 `image` 字段中。建议把图片放到：

```text
public/images/attractions
```

推荐使用 WebP 或压缩 JPG，单张尽量控制在 500KB 以内。所有图片都必须能确认是对应地点，不能用通用重庆城市图冒充。

如果图片暂未确认，页面会自动回退到 `public/images/attractions/placeholder.svg`，避免空白或破图。

## 图片版权来源

图片来源记录在：

```text
src/data/imageCredits.ts
```

替换真实图片后，请同步填写来源名称、原始详情页、作者、许可证和检查日期。

本次自动下载 Wikimedia Commons 图片时，当前网络返回 429 限流，真实景点图片尚未成功落到本地，因此当前版本使用占位图降级。

## 外部购票和查询链接

外部链接集中在：

```text
src/data/externalLinks.ts
```

链接记录包含名称、类型、来源、检查日期和是否官方。免费景点不会显示购票按钮；长江索道页面提示“微信搜索‘长江索道’官方服务号进行购票和排号”，并提供官方查询入口。

## 地图无法加载时如何排查

1. 确认 `.env` 中 `VITE_AMAP_JS_KEY` 和 `VITE_AMAP_SECURITY_CODE` 已填写。
2. 确认高德控制台已开启 JS API 2.0，并配置正确域名。
3. 查看浏览器控制台是否有 Key、安全密钥、Referer 或网络错误。
4. 单段路线失败时，页面会保留文字路线和外部高德导航按钮。
5. 长江索道段使用虚线标注，明确为体验段，不代表普通步行或驾车路线。

## 部署到静态网站托管平台

执行：

```bash
npm run build
```

然后把 `dist/` 目录上传到 Netlify、Vercel、Cloudflare Pages、GitHub Pages 或任意静态网站托管平台。部署时需要在平台环境变量中配置同名高德 Key：

```env
VITE_AMAP_JS_KEY=
VITE_AMAP_SECURITY_CODE=
```

## 维护检查

```bash
npm run build
npm run check:images
```

`check:images` 会检查必需景点图片文件是否存在。当前版本会报告缺失，因为合法真实图片尚未下载成功。
