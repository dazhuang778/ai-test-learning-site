## ADDED Requirements

### Requirement: 节点详情页展示
每个知识节点 SHALL 有独立的详情页，路径为 `/nodes/<slug>`，展示节点的完整信息和精选资源列表。

#### Scenario: 访问节点详情页
- **WHEN** 用户导航至 `/nodes/<slug>`（如 `/nodes/ai-basics`）
- **THEN** 页面展示：节点标题、简介（≤100字）、学习阶段标签、难度等级（1-3星）、精选资源列表

#### Scenario: 资源列表展示
- **WHEN** 节点详情页加载完成
- **THEN** 精选资源以卡片形式列出，每张卡片显示：资源标题、类型标签（文章/视频/课程/工具）、简短描述、可点击的外链按钮

#### Scenario: 外链在新标签页打开
- **WHEN** 用户点击资源卡片上的链接
- **THEN** 在新标签页打开目标 URL，当前页面不跳转

### Requirement: 返回图谱导航
节点详情页 SHALL 提供返回知识图谱主页的导航入口。

#### Scenario: 返回主页
- **WHEN** 用户点击详情页的「返回图谱」按钮或面包屑
- **THEN** 页面导航回主页 `/`

### Requirement: 示例数据完整性
每个知识节点的 Markdown 文件 SHALL 至少包含 3 条精选资源，用于 MVP 展示。

#### Scenario: 详情页资源数量验证
- **WHEN** 网站构建时解析节点 Markdown 文件
- **THEN** 每个节点的 `resources` 字段包含至少 3 条资源条目
