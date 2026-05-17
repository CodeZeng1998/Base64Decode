# Base64Decode

Base64Decode is a lightweight Chrome extension. Select Base64 text on any webpage, right-click, and choose **Decode Base64** to see decoded content near the selection and copy it with one click.

## Language Support

- Extension UI localization via Chrome i18n.
- Supported locales:
  - English (`en`)
  - Simplified Chinese (`zh_CN`)
- Automatically follows the browser language.

## Features

- Decode selected Base64 text from the context menu.
- In-page overlay to show decode results.
- One-click copy to clipboard.
- Click outside the overlay to close.
- Removes spaces, line breaks, and tabs before validation.
- Supports standard Base64 (`+`, `/`, `=`) and rejects URL-safe variants (`-`, `_`).
- UTF-8 first; fallback decode attempts `gb18030`, `gbk`, `big5` when UTF-8 fails.
- No runtime dependencies, no build step.

## Installation (Source)

1. Clone this repository.
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the project root directory.

Required files in root:

```text
manifest.json
background.js
base64.js
```

## Usage

1. Open a normal webpage.
2. Select valid Base64 text, for example:

```text
5L2g5aW977yM5LiW55WM77yBSGVsbG8gV29ybGQh
```

3. Right-click the selected text.
4. Click **Decode Base64**.
5. The decoded text appears near the selection.
6. Click **Copy** to copy decoded text.
7. Click outside overlay or **Close** to dismiss.

## Development

```bash
npm test
npm run check
```

## Related Docs

- Chinese documentation: [README.zh-CN.md](README.zh-CN.md)

## License

[MIT](LICENSE)
