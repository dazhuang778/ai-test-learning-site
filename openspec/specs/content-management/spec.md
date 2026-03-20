## ADDED Requirements

### Requirement: Markdown 文件驱动内容
所有知识节点内容 SHALL 以 Markdown 文件形式存储于 `content/nodes/` 目录，每个节点对应一个文件，文件名即节点 slug。

#### Scenario: 新增知识节点
- **WHEN** 维护者在 `content/nodes/` 目录下创建新的 `.md` 文件并推送至 Git
- **THEN** 下次构建后，网站自动包含该节点并在图谱中展示

#### Scenario: 修改资源链接
- **WHEN** 维护者编辑某节点 Markdown 文件中的 `resources` 列表并推送
- **THEN** 下次构建后，对应节点详情页的资源列表更新为新内容

### Requirement: frontmatter 结构规范
每个节点 Markdown 文件 SHALL 包含以下 frontmatter 字段：`slug`、`title`、`level`（0-3）、`stage`（入门/进阶/高阶）、`difficulty`（1-3）、`parent`（父节点 slug 或 null）、`description`、`resources`（数组，每项含 title/url/type/description）。

#### Scenario: 构建时校验 frontmatter
- **WHEN** 构建脚本解析 `content/nodes/` 下的 Markdown 文件
- **THEN** 缺少必填字段的文件 SHALL 输出警告日志，该节点在图谱中以「内容缺失」状态标注

#### Scenario: 资源类型枚举校验
- **WHEN** 构建脚本读取节点资源列表
- **THEN** 每条资源的 `type` 字段 SHALL 为 `article`、`video`、`course`、`tool` 之一，否则输出警告

### Requirement: 内容目录初始数据
仓库 SHALL 内置所有 7 个一级知识节点的 Markdown 文件作为初始内容，每个节点至少包含 3 条示例资源。

#### Scenario: 初始化仓库后可直接预览
- **WHEN** 新开发者克隆仓库并运行 `npm run dev`
- **THEN** 网站可正常展示完整图谱和所有节点详情，无需额外配置内容
