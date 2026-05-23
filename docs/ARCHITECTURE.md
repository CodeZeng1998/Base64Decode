# Architecture

## Overview

Base64Decode is a Chrome Manifest V3 extension with a minimal architecture. It has no build step, no bundler, and no external runtime dependencies.

## Components

### 1. Background Service Worker (`background.js`)

- Registers the context menu item on installation
- Listens for context menu clicks
- Validates selected text as Base64
- Injects content script (`base64.js`) into the active tab
- Sends decoded result to the content script

### 2. Content Script (`base64.js`)

- Receives decoded text from the background worker
- Creates an overlay near the text selection
- Handles copy-to-clipboard functionality
- Manages overlay lifecycle (show/hide/close)

### 3. Manifest (`manifest.json`)

- Declares extension metadata and permissions
- Uses Chrome i18n for localized strings
- Requires: `activeTab`, `clipboardWrite`, `contextMenus`, `scripting`

### 4. Localization (`_locales/`)

- `en/messages.json` - English strings
- `zh_CN/messages.json` - Simplified Chinese strings
- Automatically selected based on browser language

## Data Flow

```
User selects text → Right-click → Context menu
                                      ↓
                            background.js validates Base64
                                      ↓
                            Decodes with UTF-8 / fallback encodings
                                      ↓
                            Injects base64.js into active tab
                                      ↓
                            Sends decoded result via chrome.runtime.sendMessage
                                      ↓
                            base64.js shows overlay near selection
                                      ↓
                            User clicks Copy → clipboard
```

## Design Decisions

### No Build Step

- All code runs directly in the browser
- Easier for contributors to understand and modify
- Faster development iteration
- Simpler deployment

### Encoding Fallback Strategy

1. Try UTF-8 decode first (most common)
2. If UTF-8 fails, try `gb18030` (superset of GBK)
3. If still fails, try `gbk`
4. Finally try `big5`

This handles most Chinese legacy encodings without requiring user input.

### Overlay Positioning

The overlay is positioned near the text selection using `window.getSelection().getRangeAt(0).getBoundingClientRect()`. It automatically adjusts if too close to viewport edges.

### Security

- No `eval()` or `innerHTML` with untrusted content
- Uses `textContent` for all user-provided strings
- No external network requests
- Minimal permissions (only what's needed)

## Testing

- Unit tests for core decode logic (`tests/base64.test.js`)
- Integration tests for overlay injection (`tests/overlay-injection.test.js`)
- Manual testing in Chrome with real webpages

## Browser Compatibility

- Chrome 88+ (Manifest V3 requirement)
- Edge 88+ (Chromium-based)
- Other Chromium browsers with Manifest V3 support
