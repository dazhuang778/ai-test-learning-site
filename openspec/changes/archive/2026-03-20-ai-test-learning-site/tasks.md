## 1. 项目初始化

- [x] 1.1 使用 `create-next-app` 初始化 Next.js + TypeScript 项目，配置静态导出 (`output: 'export'`)
- [x] 1.2 安装依赖：`tailwindcss`、`react-flow-renderer`（或 `@xyflow/react`）、`gray-matter`、`remark`、`remark-html`
- [x] 1.3 配置 Tailwind CSS，设置基础样式和颜色主题
- [x] 1.4 创建 `content/nodes/` 目录结构，确认 frontmatter 规范

## 2. 内容数据层

- [x] 2.1 编写 Markdown 内容解析工具函数 (`lib/nodes.ts`)：读取所有节点文件、解析 frontmatter、构建节点树
- [x] 2.2 定义 TypeScript 类型：`KnowledgeNode`、`Resource`、节点层级枚举
- [x] 2.3 创建 7 个初始知识节点 Markdown 文件（Level 0~3 全部节点），每个节点含至少 3 条示例资源
- [x] 2.4 构建时 frontmatter 校验：缺少必填字段时输出警告日志

## 3. 知识图谱主页

- [x] 3.1 创建 `pages/index.tsx`，使用 `getStaticProps` 读取所有节点数据
- [x] 3.2 实现 `KnowledgeGraph` 组件：用 React Flow 渲染节点和连线，布局按层级分层排列
- [x] 3.3 实现节点卡片样式：显示标题、层级标签、难度星级
- [x] 3.4 为每个节点添加点击事件，跳转至 `/nodes/<slug>`
- [x] 3.5 实现节点悬停 tooltip，显示节点标题和简介
- [x] 3.6 使用 `next/dynamic` 懒加载图谱组件（避免 SSR 问题）

## 4. 移动端列表视图

- [x] 4.1 检测视口宽度，在 < 768px 时切换为列表视图
- [x] 4.2 实现 `NodeListView` 组件：按层级分组展示所有节点，支持点击跳转

## 5. 节点详情页

- [x] 5.1 创建 `pages/nodes/[slug].tsx`，使用 `getStaticPaths` + `getStaticProps` 生成所有节点的静态页面
- [x] 5.2 实现详情页布局：标题、简介、阶段标签（入门/进阶/高阶）、难度星级
- [x] 5.3 实现资源列表组件 `ResourceCard`：显示标题、类型标签、描述、外链按钮（`target="_blank"`）
- [x] 5.4 实现「返回图谱」面包屑导航

## 6. 全局组件与样式

- [x] 6.1 实现 `Layout` 组件：网站标题、导航栏、页脚
- [x] 6.2 完善响应式样式，确保详情页在移动端正常展示
- [x] 6.3 添加页面 `<title>` 和基础 SEO meta 标签

## 7. 部署配置

- [x] 7.1 配置 `next.config.js`：静态导出、basePath（如需 GitHub Pages 子路径）
- [x] 7.2 创建 `vercel.json` 或 GitHub Actions workflow，支持一键部署
- [x] 7.3 在 README 中记录本地开发、内容维护、部署步骤
