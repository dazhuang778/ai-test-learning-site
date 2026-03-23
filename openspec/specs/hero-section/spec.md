## ADDED Requirements

### Requirement: Hero 区域渐变背景
主页 Hero 区域 SHALL 展示渐变背景，为访客提供视觉冲击力强的第一印象。

#### Scenario: Hero 渐变背景渲染
- **WHEN** 用户访问网站根路径 `/`
- **THEN** Hero 区域展示从深蓝到紫色的渐变背景（如 `from-blue-900 via-purple-900 to-slate-900`），覆盖屏幕顶部全宽区域

#### Scenario: Hero 区域在移动端正常显示
- **WHEN** 用户在宽度小于 768px 的设备上访问主页
- **THEN** Hero 渐变背景自适应屏幕宽度，内容垂直居中，无溢出或裁切

### Requirement: Hero 探索按钮
Hero 区域 SHALL 提供「开始探索」按钮，引导访客进入知识图谱。

#### Scenario: 探索按钮可见且可点击
- **WHEN** 用户访问主页，Hero 区域渲染完成
- **THEN** 页面中可见一个标记为「开始探索」（或等效文案）的主要行动按钮，按钮样式突出（如高对比度背景色）

#### Scenario: 点击探索按钮滚动至图谱
- **WHEN** 用户点击 Hero 区域的「开始探索」按钮
- **THEN** 页面平滑滚动至知识图谱区域，或跳转至图谱视图
