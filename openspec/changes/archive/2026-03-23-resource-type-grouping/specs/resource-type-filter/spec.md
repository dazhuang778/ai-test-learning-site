## ADDED Requirements

### Requirement: 显示类型过滤 chips
详情页资源区顶部 SHALL 渲染类型过滤 chips 行，包含「全部」chip 及当前节点实际存在的各资源类型 chip。当前节点无资源的类型 SHALL NOT 渲染对应 chip。

#### Scenario: 初始状态显示全部 chip 为激活
- **WHEN** 用户进入知识节点详情页
- **THEN** 「全部」chip 处于激活（高亮）状态，其余 chip 非激活

#### Scenario: 只渲染有资源的类型 chip
- **WHEN** 当前节点的 resources 中不含 video 类型
- **THEN** chips 行中不显示「视频」chip

#### Scenario: 点击类型 chip 切换激活状态
- **WHEN** 用户点击某类型 chip（如「🛠️ 工具」）
- **THEN** 该 chip 变为激活状态，「全部」chip 和其他 chip 变为非激活

#### Scenario: 点击「全部」chip 重置为全部显示
- **WHEN** 用户已选中某类型 chip，再点击「全部」chip
- **THEN** 「全部」chip 激活，所有分组重新展示

### Requirement: 移动端 chips 横向可滚动
chips 容器在移动端宽度不足时 SHALL 支持横向滚动，chips 不换行。

#### Scenario: 窄屏下 chips 横向滚动
- **WHEN** 视口宽度不足以完整显示所有 chips
- **THEN** chips 区域可横向滑动，不发生换行
