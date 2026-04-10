# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要规则

**每次代码更新后，必须执行以下操作**：
1. 运行 `npm run build` 验证构建成功
2. 检查端口 3000 是否被占用，如有占用用 `npx kill-port 3000` 释放
3. 启动开发服务器 `npm run dev`
4. 告知用户本地访问地址（通常是 http://localhost:3000）

## 常用命令

```bash
npm run dev          # 本地开发服务器（http://localhost:3000）
npm run build        # 构建静态文件（输出至 ./out）
npm run lint         # ESLint 检查
npm run format       # Prettier 自动格式化
npm run format:check # 检查格式是否符合规范
```

本项目无测试框架，无需运行测试命令。

## 架构概览

这是一个 **Next.js 14 静态站点**（Pages Router），部署到 Vercel 或 GitHub Pages。无服务端逻辑，所有数据在构建时读取。

### 数据流

```
content/nodes/*.md
    ↓ gray-matter 解析 frontmatter
lib/nodes.ts (getAllNodes / getNodeBySlug)
    ↓ getStaticProps（构建时）
pages/index.tsx        → 首页（知识图谱 + 列表）
pages/nodes/[slug].tsx → 节点详情页（资源列表）
```

`lib/nodes.ts` 是唯一的数据入口，包含字段校验逻辑。非法节点会被静默过滤并打印 `[content]` 警告。

### 内容数据结构

`content/nodes/*.md` 文件使用 YAML frontmatter 定义节点，Markdown body 为可选正文。

关键字段约束（违反会导致节点被过滤）：
- `level`: `0 | 1 | 2 | 3`（决定图谱层级和配色）
- `stage`: `入门 | 进阶 | 高阶`
- `difficulty`: `1 | 2 | 3`
- `parent`: 父节点的 `slug`，根节点为 `null`
- `resources[].type`: `article | video | course | tool`

### 知识图谱渲染

`components/KnowledgeGraph.tsx` 使用纯 HTML/CSS 渲染水平树形结构，按 level 从左到右排列：Level 0 → Level 1 → Level 2 → Level 3。父子节点通过颜色区分，无连接线。

### 主题系统

项目固定使用**赛博朋克主题**（深色）。所有组件直接使用深色样式类，无需主题切换。

### 搜索功能

`components/SearchBox.tsx` 通过 `nodes` prop 接收数据（由 `getStaticProps` 经 `Layout` 透传），客户端使用 Fuse.js 进行模糊搜索。搜索配置：`threshold: 0.4`、`minMatchCharLength: 1`、`ignoreLocation: true`，搜索 key 包括 `title`、`description`、`resources.title`、`resources.description`。

### 详情页资源展示

资源按类型分组展示，顺序固定为：课程 → 工具 → 文章 → 视频。支持 Tab chip 单类型过滤。Markdown body 通过 `remark` + `remark-html` 转换后以 `dangerouslySetInnerHTML` 渲染，使用 `@tailwindcss/typography` 的 `prose` 类排版。

## 添加新知识节点

在 `content/nodes/` 新建 `<slug>.md`，填写 frontmatter（参考已有文件），推送后自动构建部署。`slug` 同时作为 URL path 和图谱节点 ID，需全局唯一。

## 部署

- **Vercel**：连接 GitHub 仓库后，推送 `main` 分支自动部署
- **GitHub Pages**：`.github/workflows/deploy.yml` 监听 `main` 分支，`npm run build` 后将 `./out` 部署至 GitHub Pages
