## Context

项目使用 Next.js 14 + Tailwind CSS，已安装 `@tailwindcss/typography`。视觉层当前完全依赖 Tailwind 工具类，无额外 CSS 动画库。本次变更涉及 4 个视觉区域的并行优化，均属纯样式/布局调整，不影响数据层和路由。

## Goals / Non-Goals

**Goals:**
- 首页 Hero 区添加渐变背景和引导按钮，提升首屏视觉冲击力
- 节点详情页用渐变 Banner 替代平铺头部，增强层次感
- ResourceCard 左侧彩色竖条 + 资源类型图标，提升辨识度
- 图谱节点卡片渐变背景 + hover 上浮动画，增强交互反馈

**Non-Goals:**
- 不引入新的动画库（Framer Motion 等）
- 不修改数据层、路由或 API
- 不改动知识图谱的布局算法和连线样式
- 不做深色模式（Dark Mode）

## Decisions

**决策 1：渐变全部用 Tailwind 内置 gradient 工具类**

`from-blue-600 via-violet-600 to-purple-700` 等 Tailwind 渐变类足以覆盖所有场景，无需自定义 CSS 变量。保持代码一致性。

**决策 2：节点详情页 Banner 颜色跟随节点 level**

Level 0 紫色、Level 1 蓝色、Level 2 绿色、Level 3 橙色，与现有 `LEVEL_STYLES` 体系一致，无需新增配色决策。Banner 背景色从节点 level 动态派生。

**决策 3：ResourceCard 图标使用 Unicode Emoji，不引入图标库**

📄 文章 / 🎬 视频 / 🎓 课程 / 🛠️ 工具 — 无依赖、无构建成本，视觉效果足够清晰。若后续需要更精细的 SVG 图标，可替换为 `heroicons`。

**决策 4：hover 动画使用 Tailwind `transition` + `hover:-translate-y-1`**

`transition-all duration-200 hover:-translate-y-1 hover:shadow-md` 即可实现轻微上浮，无需 JS 介入。

## Risks / Trade-offs

- **[渐变背景对比度]** 深色渐变上的白色文字需要确保可读性 → 使用 `text-white` 并在关键文字下加 `drop-shadow` 或半透明遮罩
- **[节点卡片上浮动画与 ReactFlow 拖拽冲突]** hover 位移可能影响图谱节点的拖拽精度 → 动画仅在 `hover` 时触发，且位移量控制在 2-4px，影响极小
