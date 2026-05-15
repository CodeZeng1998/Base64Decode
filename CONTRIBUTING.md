# Contributing

感谢你愿意参与 Base64Decode。这个项目是一个无构建步骤的 Chrome Manifest V3 扩展，所以贡献时优先保持实现简单、可读、可直接加载。

## 开发环境

- Node.js 18 或更高版本
- Google Chrome 或 Chromium 系浏览器

## 本地检查

```bash
npm test
npm run check
```

`npm test` 会运行核心解码逻辑和浮层注入回归测试。`npm run check` 会检查 `manifest.json` 和 JavaScript 语法。

## 提交建议

- 一个 PR 尽量只解决一个问题。
- 修复 bug 时请补充对应测试。
- 不要引入打包器或外部依赖，除非有明确收益。
- Chrome 受限页面，例如 `chrome://` 和 Chrome Web Store 页面无法注入脚本，这是浏览器限制，不是扩展 bug。

## Issue 建议

提交问题时请尽量包含：

- Chrome 版本
- 操作系统
- 复现步骤
- 选中的 Base64 文本
- 期望结果和实际结果
