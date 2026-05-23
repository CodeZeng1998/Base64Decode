# Base64Decode

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)

[English](README.en.md) | [简体中文](README.zh-CN.md)

A lightweight Chrome extension for decoding Base64 text directly from your browser. Select any Base64 text, right-click, and decode it instantly with a beautiful overlay.

## ✨ Features

- 🚀 **One-Click Decode** - Right-click selected Base64 text to decode instantly
- 📋 **Quick Copy** - Copy decoded text to clipboard with one click
- 🌍 **Multi-Language** - Supports English and Simplified Chinese (auto-detected)
- 🔤 **Smart Encoding** - UTF-8 with automatic fallback to GB18030, GBK, and Big5
- 🎨 **Clean UI** - Minimal, non-intrusive overlay near your selection
- ⚡ **Zero Dependencies** - No build step, no external libraries
- 🔒 **Privacy First** - No data collection, no network requests

## 📸 Screenshots

> _Screenshots coming soon_

## 🚀 Installation

### From Chrome Web Store (Recommended)

> _Coming soon - Extension is pending Chrome Web Store review_

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/CodeZeng1998/Base64Decode.git
   cd Base64Decode
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked** and select the project directory

5. The extension is now installed! Look for the Base64Decode icon in your toolbar.

## 📖 Usage

1. Navigate to any webpage
2. Select Base64 encoded text (e.g., `SGVsbG8gV29ybGQh`)
3. Right-click the selection
4. Click **Decode Base64** from the context menu
5. View the decoded result in the overlay
6. Click **Copy** to copy the decoded text
7. Click outside or press **Close** to dismiss the overlay

### Example

Try selecting and decoding this text:
```
5L2g5aW977yM5LiW55WM77yBSGVsbG8gV29ybGQh
```

Result: `你好，世界！Hello World!`

## 🛠️ Development

### Prerequisites

- Node.js 18 or higher
- Google Chrome or Chromium-based browser

### Setup

```bash
# Install dependencies (for testing only)
npm install

# Run tests
npm test

# Check syntax and manifest
npm run check
```

### Project Structure

```
Base64Decode/
├── manifest.json          # Extension manifest
├── background.js          # Service worker (context menu, decode logic)
├── base64.js             # Content script (overlay UI)
├── _locales/             # Internationalization
│   ├── en/
│   └── zh_CN/
├── tests/                # Unit tests
├── docs/                 # Documentation
└── .github/              # GitHub templates
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Chrome Extension Manifest V3
- Inspired by the need for quick Base64 decoding while browsing

## 📮 Support

- 🐛 [Report a bug](https://github.com/CodeZeng1998/Base64Decode/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/CodeZeng1998/Base64Decode/issues/new?template=feature_request.md)
- 📖 [Read the docs](docs/ARCHITECTURE.md)

---

Made with ❤️ by the Base64Decode contributors
