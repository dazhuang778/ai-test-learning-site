## MODIFIED Requirements

### Requirement: frontmatter 结构规范
每个节点 Markdown 文件 SHALL 包含以下 frontmatter 字段：`slug`、`title`、`level`（0-3）、`stage`（入门/进阶/高阶）、`difficulty`（1-3）、`parent`（父节点 slug 或 null）、`description`、`resources`（数组，每项含 title/url/type/description）。frontmatter 之后的正文内容为**可选**，用于提供节点的详细说明，将在节点详情页中展示。

#### Scenario: 构建时校验 frontmatter
- **WHEN** 构建脚本解析 `content/nodes/` 下的 Markdown 文件
- **THEN** 缺少必填字段的文件 SHALL 输出警告日志，该节点在图谱中以「内容缺失」状态标注

#### Scenario: 资源类型枚举校验
- **WHEN** 构建脚本读取节点资源列表
- **THEN** 每条资源的 `type` 字段 SHALL 为 `article`、`video`、`course`、`tool` 之一，否则输出警告

#### Scenario: 正文内容为可选
- **WHEN** 维护者创建或编辑节点 Markdown 文件时，不在 frontmatter 之后填写任何正文
- **THEN** 构建脚本 SHALL 正常解析该节点，不输出警告，正文字段值为空
