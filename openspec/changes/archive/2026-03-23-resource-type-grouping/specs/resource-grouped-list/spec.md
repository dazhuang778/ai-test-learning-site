## ADDED Requirements

### Requirement: 资源按类型分组渲染
「全部」视图下，资源列表 SHALL 按类型分组展示，每组包含 section header 和该组所有 ResourceCard。分组顺序 SHALL 固定为：课程 → 工具 → 文章 → 视频。无资源的类型 SHALL NOT 渲染分组。

#### Scenario: 全部视图下多类型分组展示
- **WHEN** 激活类型为「全部」且节点含课程和工具两种资源
- **THEN** 先渲染「🎓 课程（N）」分组，再渲染「🛠️ 工具（M）」分组，各组内资源顺序与 frontmatter 保持一致

#### Scenario: 固定分组顺序不受资源数量影响
- **WHEN** 工具类资源数量多于课程类资源
- **THEN** 课程分组仍在工具分组之前渲染

### Requirement: 单类型过滤时隐藏 section header
当用户通过 chip 选中特定类型时，资源列表 SHALL 只展示该类型的 ResourceCard，且 SHALL NOT 渲染 section header（类型信息已由激活 chip 呈现）。

#### Scenario: 选中单一类型后只显示对应资源
- **WHEN** 用户点击「📄 文章」chip
- **THEN** 只渲染文章类 ResourceCard，课程和工具分组不显示，section header 不显示

#### Scenario: 所选类型无资源时显示空状态
- **WHEN** 用户通过 URL 或边界情况导致激活类型在当前节点无资源
- **THEN** 显示友好的空状态提示（如「该分类暂无资源」），不渲染空列表

### Requirement: 资源总数统计保持准确
精选资源标题旁的数量 badge SHALL 始终显示节点全部资源条数，不随过滤状态变化。

#### Scenario: 过滤状态下总数不变
- **WHEN** 用户选中「🎓 课程」chip，当前节点共 10 条资源、3 条课程
- **THEN** 标题旁 badge 仍显示「10 条」
