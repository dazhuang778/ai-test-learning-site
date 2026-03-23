# AI测试学习 · 知识图谱

> AI辅助软件测试学习体系，帮助测试工程师快速找到适合自己阶段的高质量资源。

## 功能特性

- **可视化知识图谱** — 4层级8节点，点击节点进入详情页
- **渐变视觉设计** — Hero 区蓝紫渐变、详情页 level 配色 Banner、节点卡片渐变动效
- **节点正文展示** — 详情页在简介后渲染 Markdown 正文内容（可选）
- **精选外链资源** — 每个知识节点含3-4条精选文章/课程/工具链接，图标+色条快速辨识
- **移动端适配** — 手机端自动切换为列表视图
- **纯静态部署** — 无服务器，支持 Vercel / GitHub Pages

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
    ├── ai-basics.md          # Level 0 · AI基础认知
    ├── requirements-analysis.md  # Level 1 · 需求分析
    ├── test-case-design.md   # Level 1 · 用例设计
    ├── defect-management.md  # Level 1 · 缺陷管理
    ├── automation-testing.md # Level 2 · 自动化测试
    ├── special-testing.md    # Level 2 · 专项测试
    ├── tool-chain.md         # Level 3 · 工具链
    └── efficiency.md         # Level 3 · 效能提升
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
