## ADDED Requirements

### Requirement: Hero 区渐变背景
首页 Hero 区域 SHALL 使用蓝紫渐变背景（从蓝色过渡到紫色），文字颜色为白色，与下方内容形成明显的视觉层次。

#### Scenario: Hero 区渐变背景展示
- **WHEN** 用户访问首页
- **THEN** Hero 区显示蓝紫渐变背景，标题和副标题文字为白色，可读性清晰

### Requirement: Hero 区引导按钮
首页 Hero 区域 SHALL 包含一个「开始探索 ↓」引导按钮，点击后平滑滚动至知识图谱区域。

#### Scenario: 点击引导按钮滚动
- **WHEN** 用户点击 Hero 区的「开始探索」按钮
- **THEN** 页面平滑滚动至知识图谱区域

#### Scenario: 按钮视觉样式
- **WHEN** 用户查看 Hero 区
- **THEN** 引导按钮显示为白色半透明样式，hover 时背景加深，具有明显的点击引导感
