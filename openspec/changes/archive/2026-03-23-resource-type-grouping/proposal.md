## Why

知识节点详情页目前将所有资源（课程/工具/文章/视频）混排为一个线性列表，随着每节点资源数量增至 8-12 条，用户需要逐条扫描才能找到所需类型，视觉噪音大、查找效率低。通过按类型分区展示并提供 Tab 过滤，让用户能快速定位目标类型的资源。

## What Changes

- 在资源列表顶部新增「类型过滤 chips」，显示当前节点存在的资源类型（全部 / 🎓课程 / 🛠️工具 / 📄文章 / 🎬视频），无资源的类型不显示
- 资源列表由平铺改为**按类型分组展示**，每组前有 section header（图标 + 类型名称 + 数量）
- 点击 chip 时仅显示对应类型的分组，选中「全部」时展示所有分组
- 分组顺序固定为：课程 → 工具 → 文章 → 视频（学习路径优先）
- Chips 区域在移动端横向可滚动，保持移动端兼容

## Capabilities

### New Capabilities

- `resource-type-filter`: 资源类型过滤 chips 交互组件，基于 useState 控制当前激活类型，无资源的 type 自动隐藏
- `resource-grouped-list`: 按类型分组的资源列表渲染，包含 section header 和分组内的 ResourceCard 列表

### Modified Capabilities

（无已有 spec 需要修改）

## Impact

- **修改文件**：`pages/nodes/[slug].tsx`（资源区渲染逻辑重构）
- **不修改文件**：`components/ResourceCard.tsx`（保持现有样式完全兼容）
- **不引入新依赖**：仅使用 React `useState`，已在项目中可用
- **无破坏性变更**：Markdown frontmatter 的 `resources` 结构不变，数据层无影响
