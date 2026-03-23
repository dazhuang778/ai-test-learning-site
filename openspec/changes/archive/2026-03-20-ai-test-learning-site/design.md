## Context

本项目从零构建一个静态知识图谱学习网站，无已有代码库。目标是面向软件测试工程师提供「AI辅助软件测试」的体系化学习导航，内容以外链策展为主，通过 Markdown 文件维护，部署至静态托管平台。

核心约束：
- 无服务器，纯静态部署
- 内容维护者通过编辑 Markdown 文件管理内容（无 CMS 界面）
- 知识图谱需要可视化节点连线展示

## Goals / Non-Goals

**Goals:**
- 构建可视化知识图谱主页，展示 4 层级 7 节点的学习体系
- 构建知识节点详情页，展示精选外链资源
- Markdown 驱动的内容层，支持低成本维护
- 静态站点可部署至 Vercel 或 GitHub Pages

**Non-Goals:**
- 用户注册/登录/个人中心
- 评论、收藏、社区功能
- 全文检索
- 后台管理界面
- 付费内容

## Decisions

### 技术栈：Next.js (Static Export) + TypeScript

**选择 Next.js** 而非 Astro / Vite + React / 纯 HTML：
- 成熟的文件系统路由 + 静态导出 (`next export`) 适合内容型网站
- `gray-matter` + `remark` 处理 Markdown 是业界标准方案
- 部署至 Vercel 零配置，GitHub Pages 只需加一个 `next.config.js`
- 替代方案 Astro：适合纯内容站，但知识图谱交互组件在 React 生态更成熟

### 知识图谱可视化：React Flow

**选择 React Flow** 而非 D3.js / Mermaid：
- React 组件化，节点样式可完全定制
- 内置缩放/平移/点击交互，无需自己处理 SVG 事件
- 替代方案 D3.js：功能强大但学习曲线陡，维护成本高
- 替代方案 Mermaid：适合文档嵌入，不适合交互式导航图

### 内容数据层：Markdown frontmatter + 构建时解析

每个知识节点对应一个 Markdown 文件，位于 `content/nodes/<slug>.md`。

frontmatter 字段：
```yaml
slug: ai-basics
title: AI基础认知
level: 0
stage: 入门        # 入门 / 进阶 / 高阶
difficulty: 1      # 1-3
parent: null
description: LLM原理简介与提示词工程基础
resources:
  - title: 文章标题
    url: https://...
    type: article  # article / video / course / tool
    description: 简短描述
```

构建时通过 `getStaticProps` / `generateStaticParams` 读取所有节点数据，生成图谱节点列表和详情页，无运行时数据库依赖。

### 样式方案：Tailwind CSS

- 与 Next.js 集成成熟
- 静态站点无运行时 CSS-in-JS 开销
- 参考 roadmap.sh 的简洁风格易于用 Tailwind 实现

## Risks / Trade-offs

- **外链失效风险** → 资源链接为外部 URL，可能随时失效。缓解：定期人工巡检，或后续引入链接健康检查脚本
- **React Flow 包体积** (~200KB gzip) → 对静态站点首屏有影响。缓解：动态导入 (`next/dynamic`)，图谱组件懒加载
- **Markdown 构建时全量解析** → 节点数量增多时构建时间增长。缓解：MVP 阶段节点数有限（<50），无需优化
- **移动端知识图谱体验** → 节点连线图在小屏幕上交互受限。缓解：移动端降级为列表视图

## Migration Plan

1. 初始化 Next.js 项目，配置静态导出
2. 搭建内容目录结构，写入示例 Markdown 节点数据
3. 构建知识图谱主页（React Flow 渲染）
4. 构建节点详情页（Markdown 解析 + 资源列表）
5. 配置 Vercel 部署

## Open Questions

- 知识图谱是否需要支持展开/折叠节点（影响 React Flow 布局复杂度）？
- 是否需要支持暗色模式（可后续迭代）？
