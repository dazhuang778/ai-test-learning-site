## Context

当前详情页 `pages/nodes/[slug].tsx` 中资源区块使用 `space-y-3` 将所有 `ResourceCard` 平铺。`ResourceCard.tsx` 已具备按 type 区分的配色（色条+badge），但排列上无分组结构。

随着资源数量增至 8-12 条，用户体验问题明显：视觉扫描成本高、无法快速定位特定类型的资源。

技术约束：Next.js 14 Pages Router 静态站，不引入新依赖，ResourceCard 接口保持不变。

## Goals / Non-Goals

**Goals:**
- 资源列表按 type 分组渲染，每组有 section header
- 顶部 chips 提供类型过滤，默认「全部」展示所有分组
- 无资源的类型对应 chip 自动不渲染
- 移动端 chips 横向可滚动
- ResourceCard 组件接口和样式零修改

**Non-Goals:**
- 不修改 Markdown frontmatter 数据结构
- 不做服务端过滤（纯客户端 useState）
- 不支持多选类型过滤（单选即可）
- 不新增第三方依赖

## Decisions

**决策 1：过滤状态放在页面组件（`[slug].tsx`）而非抽取新组件**

理由：过滤逻辑只影响此页面，单个 `useState` 足够，抽组件反而增加复杂度。后续若多处复用再提取。

备选：新建 `ResourceSection.tsx` 组件 → 过度设计，当前不必要。

---

**决策 2：分组顺序硬编码为 `course → tool → article → video`**

理由：「先学再用」的学习路径逻辑比按数量或字母序更符合用户心智。

备选：按各 type 资源数量降序 → 顺序不稳定，用户每次打开顺序可能不同，认知成本反而高。

---

**决策 3：选中单一 type 时，section header 隐藏**

理由：chip 本身已标明当前类型，header 重复信息冗余。隐藏后版面更整洁。

备选：始终显示 header → 单分组时 header 价值低，且与 chip 信息重复。

---

**决策 4：chips 使用 `overflow-x-auto` 横向滚动，不换行**

理由：最多 5 个 chip（全部+4类型），桌面端一行放得下；移动端宽度不足时横滑优于换行（换行会把资源列表顶下去）。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| 某节点所有资源同类型，分组无意义 | chips 只显示实际存在的类型，单类型时 chips 只有「全部」+该类型，用户无感知 |
| `useState` 导致 SSG hydration 不一致 | 初始值为 `'all'`，与服务端渲染结果完全一致，无 hydration mismatch |
| 未来新增 type 需同步维护分组顺序 | 分组顺序数组 `TYPE_ORDER` 单独声明，新增 type 只需在数组末尾追加 |
