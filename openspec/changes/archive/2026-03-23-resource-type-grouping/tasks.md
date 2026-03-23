## 1. 准备：分析现有代码结构

- [x] 1.1 确认 `pages/nodes/[slug].tsx` 中资源区块的渲染位置（第 84-97 行）
- [x] 1.2 确认 `ResourceCard` 的 `Resource` 类型定义（`lib/types.ts`）中 `type` 字段的枚举值

## 2. 实现 `[slug].tsx`：类型分组 + 过滤逻辑

- [x] 2.1 在文件顶部引入 `useState`（`import { useState } from 'react'`）
- [x] 2.2 声明分组顺序常量 `TYPE_ORDER: string[]`，值为 `['course', 'tool', 'article', 'video']`
- [x] 2.3 声明 `TYPE_LABELS` 和 `TYPE_ICONS` 常量（与 ResourceCard 中一致，供 chip 和 section header 复用）
- [x] 2.4 在 `NodePage` 组件内添加 `activeType` state，初始值为 `'all'`
- [x] 2.5 计算 `presentTypes`：从 `node.resources` 中提取实际存在的类型集合，按 `TYPE_ORDER` 排序
- [x] 2.6 渲染 chips 行：「全部」chip + `presentTypes` 中每个类型的 chip，激活样式与非激活样式区分
- [x] 2.7 chips 容器加 `overflow-x-auto whitespace-nowrap` 实现移动端横向滚动

## 3. 实现资源分组渲染

- [x] 3.1 实现「全部」视图：按 `TYPE_ORDER` 遍历 `presentTypes`，每个类型渲染 section header + 该类型的 ResourceCard 列表
- [x] 3.2 实现「单类型」视图：`activeType !== 'all'` 时只渲染对应类型的 ResourceCard，不渲染 section header
- [x] 3.3 实现空状态：若过滤后无资源，显示「该分类暂无资源」提示文字
- [x] 3.4 确认标题旁数量 badge 始终使用 `node.resources.length`（不随过滤变化）

## 4. 样式打磨

- [x] 4.1 section header 样式：左侧图标 + 类型名 + 数量 badge，与页面整体视觉风格一致
- [x] 4.2 激活 chip 样式：深色背景 + 白色文字；非激活 chip：浅灰背景 + 深灰文字
- [x] 4.3 各分组之间增加适当间距（如 `mt-8`），与组内卡片间距（`space-y-3`）拉开层次
- [x] 4.4 移动端验证：chips 行在 375px 宽度下可横向滚动，资源分组正常展示

## 5. 验证

- [x] 5.1 本地运行 `npm run dev`，打开至少两个资源类型不同的节点（如 `ai-basics` 和 `tool-chain`）验证分组显示正确
- [x] 5.2 点击各 chip，确认过滤逻辑符合 spec：单类型视图无 header、全部视图有 header
- [x] 5.3 验证没有 video 类型的节点不显示「视频」chip
- [x] 5.4 执行 `npm run build`，确认静态构建无报错
