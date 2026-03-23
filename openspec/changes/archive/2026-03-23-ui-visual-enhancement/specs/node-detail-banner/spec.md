## ADDED Requirements

### Requirement: 节点详情页渐变 Banner
节点详情页的头部区域 SHALL 使用与节点 level 对应的渐变色 Banner，将标签、难度星级、标题、简介统一展示在渐变背景区域内。

#### Scenario: Banner 颜色跟随节点 level
- **WHEN** 用户访问任意节点详情页
- **THEN** 头部 Banner 背景色与该节点 level 对应：Level 0 紫色渐变、Level 1 蓝色渐变、Level 2 绿色渐变、Level 3 橙色渐变

#### Scenario: Banner 内文字可读性
- **WHEN** 节点详情页 Banner 渲染完成
- **THEN** 标题、标签、简介文字均为白色或浅色，在渐变背景上清晰可读

#### Scenario: 面包屑导航位置
- **WHEN** 用户查看节点详情页
- **THEN** 面包屑导航位于 Banner 区域内顶部，文字为半透明白色
