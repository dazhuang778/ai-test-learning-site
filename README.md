# AI测试学习 · 知识图谱

> AI辅助软件测试学习体系，帮助测试工程师快速找到适合自己阶段的高质量资源。

## 功能特性

- **可视化知识图谱** — 4层级8节点，点击节点进入详情页
- **渐变视觉设计** — Hero 区蓝紫渐变、详情页 level 配色 Banner、节点卡片渐变动效
- **节点正文展示** — 详情页在简介后渲染 Markdown 正文内容（可选）
- **资源分类展示** — 精选资源按类型（课程/工具/文章/视频）分组，支持 Tab 过滤快速定位
- **海量精选资源** — 8个知识节点共收录 102 条高质量资源，涵盖文章、课程、工具、视频四类
- **链接全量验证** — 所有资源链接经过有效性核验，失效链接已替换为最新地址
- **移动端适配** — 手机端自动切换列表视图，资源过滤 chips 支持横向滚动
- **纯静态部署** — 无服务器，支持 Vercel / GitHub Pages
- **暗色模式** — 支持手动切换主题，自动跟随系统偏好
- **全局搜索** — 支持模糊搜索知识节点和资源标题
- **代码质量** — 集成 ESLint + Prettier 规范

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

### 代码检查

```bash
npm run lint          # ESLint 检查
npm run format        # 自动格式化
npm run format:check  # 检查格式
```

### 构建静态文件

```bash
npm run build
```

静态文件输出至 `./out` 目录。

## 内容维护

### 知识节点文件位置

```
content/
└── nodes/
    ├── ai-basics.md              # Level 0 · AI基础认知      (15条资源)
    ├── requirements-analysis.md  # Level 1 · 需求分析        (11条资源)
    ├── test-case-design.md       # Level 1 · 用例设计        (12条资源)
    ├── defect-management.md      # Level 1 · 缺陷管理        ( 9条资源)
    ├── automation-testing.md     # Level 2 · 自动化测试      (13条资源)
    ├── special-testing.md        # Level 2 · 专项测试        (14条资源)
    ├── tool-chain.md             # Level 3 · 工具链          (15条资源)
    └── efficiency.md             # Level 3 · 效能提升        (13条资源)
```

### 添加新知识节点

1. 在 `content/nodes/` 新建 `<slug>.md` 文件
2. 填写 frontmatter（见下方规范）
3. 推送到 Git，自动触发构建

### frontmatter 规范

```yaml
---
slug: my-node            # 唯一标识，用于 URL
title: 节点标题
level: 1                 # 0-3（前置/核心/进阶/实践）
stage: 进阶              # 入门 / 进阶 / 高阶
difficulty: 2            # 1-3
parent: ai-basics        # 父节点 slug，顶层节点填 null
description: 节点简介，100字以内
resources:
  - title: 资源标题
    url: https://example.com
    type: article        # article / video / course / tool
    description: 资源简短描述
---

（可选）在此编写节点的详细说明，支持标准 Markdown 格式。
内容将展示在详情页的简介与精选资源列表之间。
```

### 修改已有资源

直接编辑对应节点的 `.md` 文件，修改 `resources` 列表，推送后自动生效。

资源 `type` 共四种，对应详情页的分组展示顺序：

| type | 含义 | 图标 | 展示顺序 |
|------|------|------|---------|
| `course` | 课程 | 🎓 | 第1组 |
| `tool` | 工具 | 🛠️ | 第2组 |
| `article` | 文章 | 📄 | 第3组 |
| `video` | 视频 | 🎬 | 第4组 |

> 同一 type 内，资源按 frontmatter 中的书写顺序展示，写在前面的资源优先显示。

## 部署

### Vercel（推荐）

1. 将项目推送至 GitHub
2. 在 [vercel.com](https://vercel.com) 导入仓库
3. 点击 Deploy，零配置自动部署

### GitHub Pages

项目已配置 GitHub Actions（`.github/workflows/deploy.yml`）。
将代码推送至 `main` 分支，自动构建并部署至 GitHub Pages。

如使用 GitHub Pages 子路径部署（如 `username.github.io/repo-name/`），在 `next.config.js` 中添加：

```js
basePath: '/repo-name',
assetPrefix: '/repo-name/',
```

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 14 | 静态站点框架（Pages Router） |
| TypeScript | 类型安全 |
| Tailwind CSS + Typography | 样式与正文排版 |
| @xyflow/react | 知识图谱可视化 |
| gray-matter | Markdown frontmatter 解析 |
| remark + remark-html | Markdown 正文转 HTML |
| Fuse.js | 客户端模糊搜索 |
| ESLint + Prettier | 代码规范 |

## SEO 优化

项目已内置以下 SEO 特性：

- Open Graph / Twitter Card meta 标签
- sitemap.xml 站点地图（自动包含所有页面）
- robots.txt 配置
- RSS 订阅支持

## 项目结构

```
ai-test-study/
├── components/          # React 组件
│   ├── Layout.tsx      # 布局组件（含头部/底部）
│   ├── SearchBox.tsx   # 搜索框组件
│   ├── KnowledgeGraph.tsx   # 知识图谱
│   ├── KnowledgeNodeCard.tsx # 图谱节点卡片
│   ├── NodeListView.tsx     # 移动端列表视图
│   └── ResourceCard.tsx     # 资源卡片
├── content/
│   └── nodes/          # 知识节点 Markdown 文件
├── lib/
│   ├── nodes.ts        # 节点数据读取
│   ├── graph.ts        # 图谱数据构建
│   ├── types.ts        # TypeScript 类型定义
│   ├── use-search.ts   # 搜索 Hook
│   └── theme-context.tsx # 主题 Context
├── pages/              # Next.js 页面
├── public/             # 静态资源
│   ├── sitemap.xml     # 站点地图
│   └── robots.txt      # 搜索引擎配置
└── styles/             # 全局样式
```