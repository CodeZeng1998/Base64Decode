# Base64Decode

Base64Decode 是一个轻量级 Chrome 扩展。选中网页中的 Base64 文本后，右键点击 **解码 Base64**，即可在选区附近查看解码结果，并一键复制到剪贴板。

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

## 安装（源码）

1. 克隆仓库。
2. 打开 Chrome 的 `chrome://extensions/`。
3. 打开右上角 **开发者模式**。
4. 点击 **加载已解压的扩展程序**。
5. 选择项目根目录。

项目根目录必须包含：

```text
manifest.json
background.js
base64.js
```

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

## 相关文档

- English documentation: [README.en.md](README.en.md)

## License

[MIT](LICENSE)
