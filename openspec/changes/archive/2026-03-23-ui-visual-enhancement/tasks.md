## 1. Hero 区渐变背景与引导按钮

- [x] 1.1 在 `pages/index.tsx` 的 Hero `<div>` 添加蓝紫渐变背景（`from-blue-600 via-violet-600 to-purple-700`），文字改为白色
- [x] 1.2 在 Hero 区新增「开始探索 ↓」按钮，点击后平滑滚动至图谱区域（添加 `id="graph"` 锚点）
- [x] 1.3 调整 Hero 区内边距和高度，确保渐变区域视觉饱满

## 2. 节点详情页渐变 Banner

- [x] 2.1 在 `pages/nodes/[slug].tsx` 中定义 level 对应的渐变色映射（Level 0 紫、1 蓝、2 绿、3 橙）
- [x] 2.2 将面包屑、标签、难度、标题、简介移入渐变 Banner 区域，文字改为白色
- [x] 2.3 Banner 下方正文和资源区域保持白底，页面整体布局调整为 Banner + 内容区两段式

## 3. ResourceCard 图标与色条

- [x] 3.1 在 `components/ResourceCard.tsx` 中为每种类型定义 Emoji 图标映射（📄/🎬/🎓/🛠️）
- [x] 3.2 类型标签显示改为「图标 + 文字」格式
- [x] 3.3 卡片左侧添加 4px 彩色竖条（使用 `border-l-4` 配合类型对应颜色）
- [x] 3.4 hover 时边框颜色改为类型主题色，阴影加深

## 4. 图谱节点卡片动效

- [x] 4.1 在 `components/KnowledgeNodeCard.tsx` 中将纯色背景替换为 Tailwind 渐变（`bg-gradient-to-br`）
- [x] 4.2 卡片容器添加 `transition-all duration-200 hover:-translate-y-1 hover:shadow-md`

## 5. 验证

- [x] 5.1 运行 `npm run dev`，逐一检查首页 Hero、节点详情页、资源卡片、图谱节点视觉效果
- [x] 5.2 检查移动端布局（列表视图）在 Hero 渐变下的显示是否正常
- [x] 5.3 运行 `npm run build`，确认构建无报错
