## ADDED Requirements

### Requirement: 节点详情页渐变 Banner（按等级着色）
节点详情页顶部 SHALL 展示基于节点难度等级（Level）的渐变色 Banner，以色彩区分学习阶段。

#### Scenario: Level 0 节点展示对应渐变色
- **WHEN** 用户访问 Level 0 节点的详情页
- **THEN** 页面顶部 Banner 展示 Level 0 对应的渐变配色（如蓝绿色系，`from-teal-500 to-cyan-600`）

#### Scenario: Level 1 节点展示对应渐变色
- **WHEN** 用户访问 Level 1 节点的详情页
- **THEN** 页面顶部 Banner 展示 Level 1 对应的渐变配色（如蓝色系，`from-blue-500 to-indigo-600`）

#### Scenario: Level 2 / Level 3 节点展示对应渐变色
- **WHEN** 用户访问 Level 2 或 Level 3 节点的详情页
- **THEN** 页面顶部 Banner 分别展示各自等级对应的渐变配色（Level 2 如紫色系，Level 3 如玫红色系），不同等级之间色彩可明显区分
