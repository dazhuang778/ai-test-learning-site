---
slug: special-testing
title: 专项测试
level: 2
stage: 高阶
difficulty: 3
parent: test-case-design
description: AI辅助性能测试脚本生成、安全漏洞扫描辅助分析，拓展测试工程师的专项测试能力边界。
resources:
  - title: OWASP AI Security and Privacy Guide
    url: https://owasp.org/www-project-ai-security-and-privacy-guide/
    type: article
    description: OWASP 官方 AI 安全指南，了解 AI 系统的安全测试方法论和常见漏洞类型。
  - title: k6 - Modern Load Testing（Grafana）
    url: https://grafana.com/docs/k6/latest/
    type: tool
    description: 现代化性能测试工具（已并入 Grafana 生态），结合 AI 代码生成可快速编写复杂的负载测试场景脚本。
  - title: ZAP - OWASP Security Testing
    url: https://www.zaproxy.org/getting-started/
    type: tool
    description: OWASP ZAP 是免费开源的 Web 安全测试工具，AI 可辅助分析扫描结果和制定修复方案。
  - title: AI in Performance Testing - BlazeMeter
    url: https://www.blazemeter.com/blog/ai-performance-testing
    type: article
    description: 介绍 AI 如何辅助性能测试脚本生成、结果分析和瓶颈定位的实践案例。
  - title: Burp Suite Community Edition
    url: https://portswigger.net/burp/communitydownload
    type: tool
    description: PortSwigger 出品的免费版 Web 安全测试工具，行业标准的渗透测试平台，结合 AI 可高效分析漏洞报告。
  - title: Locust - 开源性能测试框架
    url: https://locust.io/
    type: tool
    description: Python 编写的开源分布式性能测试框架，脚本简单直观，结合 AI 可快速生成复杂负载场景。
  - title: SonarQube - 代码安全扫描
    url: https://www.sonarsource.com/products/sonarqube/
    type: tool
    description: 业界主流的代码质量与安全扫描平台，AI 辅助解读扫描结果并提供修复优先级建议。
  - title: OWASP Top 10 安全测试指南
    url: https://owasp.org/www-project-top-ten/
    type: article
    description: OWASP 每年更新的十大 Web 安全风险清单，是制定安全测试策略的权威参考，结合 AI 可快速生成测试用例。
  - title: Artillery - 现代化负载测试
    url: https://www.artillery.io/docs
    type: tool
    description: 支持 HTTP/WebSocket/Socket.io 等多协议的性能测试工具，YAML 配置简洁，结合 AI 生成场景脚本效率极高。
  - title: Trivy - 容器与代码安全扫描
    url: https://trivy.dev/
    type: tool
    description: 开源的全面安全扫描工具，支持容器镜像、代码仓库和 IaC 配置扫描，AI 可辅助解读漏洞报告并排序修复。
  - title: 无障碍测试（Accessibility）指南 - axe
    url: https://www.deque.com/axe/
    type: tool
    description: Deque 出品的无障碍测试工具，AI 辅助识别 WCAG 合规问题，支持浏览器插件和自动化测试集成。
  - title: Chaos Engineering - Netflix Chaos Monkey
    url: https://netflix.github.io/chaosmonkey/
    type: tool
    description: Netflix 开源的混沌工程工具，随机终止生产环境实例以验证系统韧性，结合 AI 可辅助故障分析与复盘。
  - title: Web 安全核心概念速览 — Fireship
    url: https://fireship.io/lessons/7-security-concepts-hacks-web-developers/
    type: video
    description: Fireship 快速讲解 XSS、CSRF、SQL注入等7大 Web 安全漏洞原理与防御方法，适合测试工程师建立安全测试基础认知。
  - title: k6 性能测试入门 — 官方文档视频教程
    url: https://grafana.com/docs/k6/latest/get-started/running-k6/
    type: video
    description: Grafana k6 官方入门指南，含嵌入式视频演示，从安装到运行第一个负载测试脚本全程图文+视频讲解。

---

专项测试对专业知识要求高，AI 可作为「知识扩充器」：安全测试时提供攻击面分析思路，性能测试时辅助脚本生成和结果解读，降低专项测试的入门门槛。
