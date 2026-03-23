## Why

当前网站视觉设计功能完整但整体偏朴素：首页 Hero 区背景平淡、节点详情页头部缺乏层次感、资源卡片信息密度高但视觉辨识度低、图谱节点卡片交互反馈单一。全面的视觉优化可以显著提升用户的第一印象和浏览体验。

## What Changes

- **首页 Hero 区**：添加蓝紫渐变背景，增加视觉层次和「开始探索」引导按钮
- **节点详情页头部**：用彩色渐变 Banner 替代平铺布局，将标签、标题、难度、简介整合进更丰富的头部区域
- **ResourceCard**：为不同资源类型（文章/视频/课程/工具）添加对应图标，左侧加彩色竖条区分类型，强化 hover 动画
- **图谱节点卡片**：渐变背景替代纯色、更细腻的阴影层次、hover 时轻微上浮动画

## Capabilities

### New Capabilities

- `hero-section`: 首页 Hero 区渐变背景与引导按钮的视觉规范
- `node-detail-banner`: 节点详情页渐变 Banner 头部的视觉规范
- `resource-card-visual`: ResourceCard 图标、边条、动效的视觉规范
- `graph-node-visual`: 知识图谱节点卡片渐变、阴影、动效的视觉规范

### Modified Capabilities

（无需求层面变更，仅视觉实现调整）

## Impact

- `pages/index.tsx`：Hero 区结构调整
- `pages/nodes/[slug].tsx`：详情页头部区域重构
- `components/ResourceCard.tsx`：图标、边条、动效
- `components/KnowledgeNodeCard.tsx`：渐变背景、阴影、动效
- `styles/globals.css`：可能补充全局动效/渐变工具类
- 无新增外部依赖（使用 Tailwind 内置能力）
