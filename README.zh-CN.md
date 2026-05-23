# Base64Decode

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)

> 🌏 [English](README.en.md)

一个轻量级的 Chrome 扩展，用于直接在浏览器中解码 Base64 文本。选中任意 Base64 文本，右键点击即可立即解码，并通过精美的浮层显示结果。

## 语言支持

- 扩展 UI 使用 Chrome i18n 本地化。
- 当前支持语言：
  - 英文（`en`）
  - 简体中文（`zh_CN`）
- 会自动跟随浏览器语言。

## 功能介绍

- 通过右键菜单解码选中的 Base64 文本。
- 使用页面内浮层展示解码结果。
- 支持一键复制到剪贴板。
- 点击浮层外区域自动关闭。
- 解码前自动清理空格、换行、制表符。
- 支持标准 Base64（`+`、`/`、`=`），拒绝 URL-safe 变体（`-`、`_`）。
- 优先按 UTF-8 解码；UTF-8 失败后尝试 `gb18030`、`gbk`、`big5`。
- 无运行时依赖，无构建步骤。

## 安装

### 从 Chrome 应用商店安装（推荐）

> _即将上线 - 扩展正在等待 Chrome 应用商店审核_

### 从源码安装

1. 克隆本仓库：
   ```bash
   git clone https://github.com/CodeZeng1998/Base64Decode.git
   cd Base64Decode
   ```

2. 在 Chrome 中打开 `chrome://extensions/`。
3. 启用**开发者模式**（右上角开关）。
4. 点击**加载已解压的扩展程序**。
5. 选择项目根目录。

## 使用方式

1. 打开普通网页。
2. 选中一段合法 Base64 文本，例如：

```text
5L2g5aW977yM5LiW55WM77yBSGVsbG8gV29ybGQh
```

3. 右键点击选中文本。
4. 点击 **解码 Base64**。
5. 选区附近会显示解码结果。
6. 点击 **复制到剪贴板** 复制结果。
7. 点击浮层外部或 **关闭** 按钮关闭浮层。

## 开发

```bash
npm test
npm run check
```

## 贡献

欢迎贡献！请先阅读我们的[贡献指南](CONTRIBUTING.md)。

## 文档

- [架构说明](docs/ARCHITECTURE.md)
- [贡献指南](CONTRIBUTING.md)
- [安全策略](SECURITY.md)
- [行为准则](CODE_OF_CONDUCT.md)

## 支持

- 🐛 [报告 Bug](https://github.com/CodeZeng1998/Base64Decode/issues/new?template=bug_report.md)
- 💡 [功能建议](https://github.com/CodeZeng1998/Base64Decode/issues/new?template=feature_request.md)

## 许可证

[MIT](LICENSE)

---

由 Base64Decode 贡献者用 ❤️ 制作
