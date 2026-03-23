## ADDED Requirements

### Requirement: 资源卡片左侧类型色条
ResourceCard SHALL 在卡片左侧显示与资源类型对应的彩色竖条，用于快速视觉区分资源类型。

#### Scenario: 不同类型显示对应色条
- **WHEN** 资源卡片渲染完成
- **THEN** 文章显示蓝色竖条、视频显示红色竖条、课程显示绿色竖条、工具显示靛蓝色竖条

### Requirement: 资源卡片类型图标
ResourceCard SHALL 在资源类型标签旁显示对应的 Emoji 图标，增强类型辨识度。

#### Scenario: 类型标签含图标
- **WHEN** 资源卡片渲染完成
- **THEN** 类型标签显示为「📄 文章」「🎬 视频」「🎓 课程」「🛠️ 工具」格式

### Requirement: 资源卡片 hover 动效
ResourceCard SHALL 在鼠标悬停时展示增强的视觉反馈，包括边框高亮和轻微阴影加深。

#### Scenario: hover 时视觉反馈
- **WHEN** 用户将鼠标悬停在资源卡片上
- **THEN** 卡片边框变为对应类型的主题色，阴影加深，过渡动画流畅（200ms）
