## ADDED Requirements

### Requirement: 图谱节点卡片渐变背景
知识图谱节点卡片 SHALL 使用渐变背景替代纯色背景，渐变方向为从左上到右下，色调与 level 保持一致。

#### Scenario: 节点卡片渐变背景展示
- **WHEN** 知识图谱加载完成
- **THEN** 每个节点卡片显示对应 level 的渐变背景，视觉层次比纯色更丰富

### Requirement: 图谱节点卡片 hover 上浮动效
知识图谱节点卡片 SHALL 在鼠标悬停时产生轻微上浮效果，配合阴影加深，增强交互反馈。

#### Scenario: hover 时上浮动效
- **WHEN** 用户将鼠标悬停在节点卡片上
- **THEN** 卡片向上位移 2-4px，阴影加深，过渡动画流畅（200ms），不影响拖拽操作

#### Scenario: hover 后恢复原位
- **WHEN** 用户将鼠标移出节点卡片
- **THEN** 卡片平滑回到原始位置，阴影恢复默认状态
