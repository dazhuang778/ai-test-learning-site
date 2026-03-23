## Why

当前节点 Markdown 文件的 frontmatter 规范未明确说明正文内容（frontmatter 之后的 Markdown 正文）是否支持，且节点详情页也没有渲染正文内容。这导致维护者无法在节点详情页中提供更丰富的说明文字，仅靠 `description` 字段（≤100字）无法承载深度内容。

## What Changes

- 在 frontmatter 规范中明确正文内容为**可选**字段，并说明其语义（节点的详细说明/引言）
- 节点详情页在 `description` 之后、资源列表之前，渲染正文 Markdown 内容（若存在）
- 为现有节点文件（如 `ai-basics.md`）保留已有的正文内容，不做删除

## Capabilities

### New Capabilities

- `node-body-display`: 节点详情页渲染可选的 Markdown 正文内容

### Modified Capabilities

- `content-management`: frontmatter 规范新增对可选正文内容的说明和校验规则

## Impact

- `content/nodes/*.md`：现有文件正文内容将在详情页显示（目前已有 `ai-basics.md` 包含正文）
- `src/app/nodes/[slug]/page.tsx`（或等效组件）：需要解析并渲染正文 Markdown
- `content-management` spec：新增正文字段相关场景
