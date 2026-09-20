# Wangbao AI

Wangbao AI 产品落地页（Landing Page）：中文静态营销页，介绍产品定位、核心功能与价值主张，并提供文档与联系入口。

## 技术形态

- 纯静态 `HTML + CSS + JS`，**零依赖、零构建步骤**。
- 可直接用浏览器打开 `index.html`，或部署到 GitHub Pages / Vercel / Netlify 等静态托管。
- 视觉风格：简约商务深蓝（主色 `#1a365d` 系列）。
- 响应式三档断点：桌面 `>=1024px`、平板 `768–1023px`、移动 `<768px`。

## 目录结构

```
index.html              页面结构（导航 / Hero / 核心功能 / 价值主张 / CTA / Footer）
assets/css/styles.css   样式与响应式布局
assets/js/main.js       渐进增强脚本（滚动动画、图片降级）
assets/img/favicon.svg  站点图标（内联 SVG，无位图依赖）
```

## 页面区块

| 区块 | 说明 |
| --- | --- |
| 导航栏 | 文字 Logo「Wangbao AI」+「文档」「联系我们」入口 |
| Hero 区 | 产品名、一句话定位、主 CTA 与装饰性对话卡片 |
| 核心功能区 | 4 张功能卡片（智能对话 / 知识问答 / 多场景支持 / 高效协作） |
| 价值主张区 | 4 条差异化卖点 |
| CTA 区 | 次级转化入口（查看文档 / 联系我们） |
| Footer | 版权信息、联系方式与次要链接 |

所有对外入口（文档、联系我们）统一在新标签页打开 `https://www.wangbaoai.com`。

## 本地预览

方式一：直接双击打开 `index.html`（无需任何服务）。

方式二：启动本地静态服务：

```bash
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 部署

将仓库根目录作为静态站点根目录发布即可（入口文件为 `index.html`），无需构建命令。

- GitHub Pages：仓库 Settings → Pages → 选择分支与根目录。
- Vercel / Netlify：导入仓库，构建命令留空，发布目录设为仓库根目录。

## 无障碍与降级

- 所有入口链接均为新标签页打开并带 `rel="noopener noreferrer"`。
- 图标使用内联 SVG，不依赖外部图片资源；图片加载失败时脚本会隐藏破图并保留文字内容。
- 脚本为渐进增强：禁用 JavaScript 时页面内容与入口链接仍完整可用。
- 支持 `prefers-reduced-motion`，尊重用户的减少动效偏好。
