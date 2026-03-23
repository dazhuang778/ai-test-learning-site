## 1. 依赖安装

- [x] 1.1 安装 `remark` 和 `remark-html` 包

## 2. 类型与数据层

- [x] 2.1 在 `lib/types.ts` 的 `KnowledgeNode` 接口中新增可选字段 `body?: string`
- [x] 2.2 在 `lib/nodes.ts` 的 `getNodeBySlug` 中提取 `content`（gray-matter 正文），赋值给节点的 `body` 字段（空白内容设为 `undefined`）

## 3. 页面渲染

- [x] 3.1 在 `pages/nodes/[slug].tsx` 的 `getStaticProps` 中，使用 `remark` + `remark-html` 将 `node.body` 转换为 `bodyHtml: string | null`
- [x] 3.2 扩展 `NodePageProps` 类型，新增 `bodyHtml: string | null`
- [x] 3.3 在 `NodePage` 组件中，在 description 段落之后、精选资源 section 之前，条件渲染 `bodyHtml`（使用 `dangerouslySetInnerHTML`，容器加 `prose prose-gray` 样式）

## 4. 验证

- [x] 4.1 运行 `npm run dev`，访问 `/nodes/ai-basics`，确认正文内容正确显示在简介与资源列表之间
- [x] 4.2 访问一个无正文内容的节点详情页，确认不显示正文区块且布局正常
- [x] 4.3 运行 `npm run build`，确认构建无报错
