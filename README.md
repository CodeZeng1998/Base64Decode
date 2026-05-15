# Base64Decode

Base64Decode 是一个轻量级 Chrome 扩展。选中网页中的 Base64 文本后，右键点击“解码 Base64”，即可在选区附近查看解码结果，并一键复制到剪贴板。

项目使用 Chrome Manifest V3，不依赖外部库，也没有打包步骤。说白了，就是能直接加载、直接跑，不整那些没必要的花活。

## Features

- 选中文本右键解码 Base64。
- 使用 `chrome.contextMenus` 创建浏览器右键菜单。
- 使用页面内轻量浮层展示解码结果。
- 支持“复制到剪贴板”。
- 点击页面空白处自动关闭浮层。
- 自动清理选中文本里的空格、换行和制表符。
- 支持标准 Base64。
- 优先按 UTF-8 解码；UTF-8 失败后尝试 `gb18030`、`gbk` 和 `big5`，兼容常见中文老编码。
- 无外部依赖，无构建步骤。

## Screenshots

当前仓库没有内置截图。发布到 GitHub 后，建议在 `docs/images/` 中补一张右键菜单截图和一张解码浮层截图，然后在这里引用。

## Installation

### 从源码安装

1. 克隆仓库或下载源码。
2. 打开 Chrome，进入 `chrome://extensions/`。
3. 打开右上角“开发者模式”。
4. 点击“加载已解压的扩展程序”。
5. 选择项目根目录。

项目根目录中必须包含：

```text
manifest.json
background.js
base64.js
```

## Usage

1. 打开任意普通网页。
2. 选中一段标准 Base64 文本，例如：

   ```text
   5L2g5aW977yM5LiW55WM77yBSGVsbG8gV29ybGQh
   ```

3. 右键点击选中文本。
4. 点击“解码 Base64”。
5. 页面选区附近会显示：

   ```text
   你好，世界！Hello World!
   ```

6. 点击“复制到剪贴板”可复制结果。
7. 点击页面空白处或浮层里的“关闭”按钮可关闭浮层。

## Supported Input

支持：

- 标准 Base64 字符集：`A-Z`、`a-z`、`0-9`、`+`、`/`、`=`
- 内置空格、换行、制表符
- UTF-8 文本
- UTF-8 解码失败时的 `gb18030`、`gbk`、`big5` 兜底解码

不支持：

- URL-safe Base64，也就是包含 `-` 或 `_` 的变体
- 自动修正内容错误的 Base64 字节
- 在 `chrome://`、Chrome Web Store 等浏览器限制页面注入浮层

## Project Structure

```text
.
├── background.js
├── base64.js
├── manifest.json
├── package.json
├── tests
│   ├── base64.test.js
│   └── overlay-injection.test.js
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Development

项目没有运行时依赖。安装 Node.js 后即可运行测试。

```bash
npm test
```

语法和配置检查：

```bash
npm run check
```

检查内容包括：

- `manifest.json` 是否为合法 JSON
- `base64.js` 语法检查
- `background.js` 语法检查

## Testing Cases

当前测试覆盖：

- 标准 Base64 解码
- 带空白字符的 Base64 解码
- UTF-8 中文与标点
- GBK/GB18030 中文兜底
- Big5 中文兜底
- URL-safe Base64 拒绝
- 非法 padding 拒绝
- MV3 注入函数作用域隔离回归
- 点击浮层外部关闭

## Known Limitations

- 浏览器限制页面无法注入脚本，例如 `chrome://extensions/`、`chrome://settings/`、Chrome Web Store。
- 编码兜底只能在 UTF-8 解码失败后触发。如果输入本身是合法 UTF-8，但原始内容就是错字节，扩展不会擅自“猜测修正”。
- 复制能力依赖当前页面和浏览器对 `navigator.clipboard.writeText` 的支持。

## Contributing

欢迎提交 Issue 和 Pull Request。提交前请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

提交 PR 前请至少运行：

```bash
npm test
npm run check
```

## License

[MIT](LICENSE)
