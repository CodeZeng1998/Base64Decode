# Contributing to Base64Decode

[English](#english) | [简体中文](#简体中文)

---

## English

Thank you for your interest in contributing to Base64Decode! This is a no-build Chrome Manifest V3 extension, so contributions should prioritize simplicity, readability, and direct loading.

### Development Environment

- Node.js 18 or higher
- Google Chrome or Chromium-based browser

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/CodeZeng1998/Base64Decode.git
   cd Base64Decode
   ```
3. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the project directory

### Running Tests

```bash
# Run unit tests
npm test

# Check manifest and syntax
npm run check
```

`npm test` runs core decode logic and overlay injection tests. `npm run check` validates `manifest.json` and JavaScript syntax.

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes:
   - Run `npm test` and `npm run check`
   - Manually test in Chrome with real webpages
   - Test with different Base64 inputs (UTF-8, GB18030, etc.)

4. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request

### Pull Request Guidelines

- One PR should solve one problem
- Include tests for bug fixes
- Update documentation if needed
- Follow existing code style
- Keep commits atomic and well-described

### Code Style

- Use modern JavaScript (ES6+)
- No external dependencies unless absolutely necessary
- No build tools or bundlers
- Prefer readability over cleverness
- Add comments only for non-obvious logic

### Testing Guidelines

- Add tests for new features
- Add regression tests for bug fixes
- Ensure all tests pass before submitting PR
- Test manually in Chrome with various scenarios

### Known Limitations

Chrome restricted pages (e.g., `chrome://`, Chrome Web Store) cannot run content scripts. This is a browser limitation, not an extension bug.

### Reporting Issues

When reporting issues, please include:

- Chrome version
- Operating system
- Steps to reproduce
- Selected Base64 text (if not sensitive)
- Expected vs actual behavior
- Screenshots (if applicable)

### Questions?

Feel free to open an issue for questions or discussions.

---

## 简体中文

感谢你愿意参与 Base64Decode！这个项目是一个无构建步骤的 Chrome Manifest V3 扩展，所以贡献时优先保持实现简单、可读、可直接加载。

### 开发环境

- Node.js 18 或更高版本
- Google Chrome 或 Chromium 系浏览器

### 开始开发

1. Fork 本仓库
2. 克隆你的 fork：
   ```bash
   git clone https://github.com/CodeZeng1998/Base64Decode.git
   cd Base64Decode
   ```
3. 在 Chrome 中加载扩展：
   - 打开 `chrome://extensions/`
   - 启用开发者模式
   - 点击"加载已解压的扩展程序"
   - 选择项目目录

### 运行测试

```bash
# 运行单元测试
npm test

# 检查 manifest 和语法
npm run check
```

`npm test` 会运行核心解码逻辑和浮层注入回归测试。`npm run check` 会检查 `manifest.json` 和 JavaScript 语法。

### 提交更改

1. 创建新分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 进行修改

3. 测试你的更改：
   - 运行 `npm test` 和 `npm run check`
   - 在 Chrome 中手动测试真实网页
   - 测试不同的 Base64 输入（UTF-8、GB18030 等）

4. 提交更改：
   ```bash
   git commit -m "feat: 添加你的功能描述"
   ```

5. 推送到你的 fork：
   ```bash
   git push origin feature/your-feature-name
   ```

6. 创建 Pull Request

### Pull Request 建议

- 一个 PR 尽量只解决一个问题
- 修复 bug 时请补充对应测试
- 如需要请更新文档
- 遵循现有代码风格
- 保持提交原子化且描述清晰

### 代码风格

- 使用现代 JavaScript（ES6+）
- 除非绝对必要，否则不引入外部依赖
- 不使用构建工具或打包器
- 优先考虑可读性而非技巧性
- 仅为非显而易见的逻辑添加注释

### 测试指南

- 为新功能添加测试
- 为 bug 修复添加回归测试
- 提交 PR 前确保所有测试通过
- 在 Chrome 中手动测试各种场景

### 已知限制

Chrome 受限页面（例如 `chrome://` 和 Chrome Web Store 页面）无法注入脚本，这是浏览器限制，不是扩展 bug。

### 提交问题

提交问题时请尽量包含：

- Chrome 版本
- 操作系统
- 复现步骤
- 选中的 Base64 文本（如果不敏感）
- 期望结果和实际结果
- 截图（如适用）

### 有疑问？

欢迎开 issue 提问或讨论。
