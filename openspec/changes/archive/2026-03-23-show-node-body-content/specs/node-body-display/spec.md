## ADDED Requirements

### Requirement: 节点正文内容渲染
节点详情页 SHALL 在节点简介（description）之后、精选资源列表之前，渲染节点 Markdown 文件的正文内容（frontmatter 之后的文本）。

#### Scenario: 有正文内容时展示正文区块
- **WHEN** 节点 Markdown 文件的 frontmatter 之后存在非空文本内容
- **THEN** 详情页在简介段落下方渲染该正文内容，格式为 HTML（由 Markdown 转换），应用 prose 排版样式

#### Scenario: 无正文内容时不展示正文区块
- **WHEN** 节点 Markdown 文件的 frontmatter 之后不存在任何内容，或内容为纯空白
- **THEN** 详情页不显示正文区块，布局与精选资源列表直接衔接，无空白占位

#### Scenario: 正文内容在简介与资源列表之间
- **WHEN** 节点详情页加载完成且该节点存在正文内容
- **THEN** 页面结构顺序为：标签/难度 → 节点标题 → 简介 → 正文内容区块 → 精选资源列表 → 返回按钮
