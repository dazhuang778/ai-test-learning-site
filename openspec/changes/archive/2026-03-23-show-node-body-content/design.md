## Context

项目使用 Next.js Pages Router + TypeScript，内容以 Markdown 文件存储于 `content/nodes/`。当前解析流程：`gray-matter` 解析文件后，`lib/nodes.ts` 只取 `data`（frontmatter），丢弃了 `content`（正文）。`KnowledgeNode` 类型不含 `body` 字段，详情页也没有渲染正文的逻辑。

## Goals / Non-Goals

**Goals:**
- 在 `KnowledgeNode` 类型中新增可选字段 `body?: string`，存储原始 Markdown 正文
- `getNodeBySlug` 返回含 `body` 的节点数据（正文为空时 `body` 为 `undefined`）
- 节点详情页在 `description` 与精选资源之间渲染 `body` Markdown 内容（若有）
- 渲染方式：将 Markdown 转换为 HTML 后以 `dangerouslySetInnerHTML` 或安全的 Markdown 组件输出，样式使用 Tailwind Typography（`prose`）

**Non-Goals:**
- 不修改 `getAllNodes()`（图谱视图不需要正文）
- 不引入新的 CMS 或构建流程
- 不对正文内容做字数/格式强制校验

## Decisions

**决策 1：渲染库选择 `remark` + `remark-html`**

项目已安装 `gray-matter`（基于 remark 生态），追加 `remark` + `remark-html` 是最小化依赖增量。替代方案 `react-markdown` 更重，且当前场景只需静态 HTML。选择在 `getStaticProps` 中完成 Markdown → HTML 转换，页面组件直接接收 `bodyHtml: string | null`。

**决策 2：类型字段使用 `body`（原始 Markdown），页面 props 传 `bodyHtml`**

`KnowledgeNode.body` 存储原始文本，转换在 `getStaticProps` 层完成，保持类型层的干净（类型层不感知渲染细节）。`NodePage` props 扩展为 `{ node, bodyHtml }`。

**决策 3：Tailwind Typography 已安装，直接使用 `prose` class**

`tailwind.config.ts` 中确认安装了 `@tailwindcss/typography`，渲染容器加 `prose prose-gray` 即可获得合适的正文排版。

## Risks / Trade-offs

- **[XSS 风险] remark-html 默认允许 HTML** → 使用 `{ sanitize: true }` 选项，或使用 `rehype-sanitize` 过滤；由于内容由维护者控制，风险极低，但仍建议启用 sanitize。
- **[依赖增量] 引入 remark/remark-html** → 若后续需要更多 Markdown 功能（代码高亮、链接），可迁移至 `next-mdx-remote`，当前规模无此必要。
