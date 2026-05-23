# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Base64Decode, please report it by creating a private security advisory on GitHub:

1. Go to the [Security tab](../../security/advisories)
2. Click "Report a vulnerability"
3. Provide detailed information about the vulnerability

Alternatively, you can open a regular issue if the vulnerability is not critical.

### What to include in your report

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

### What to expect

- We will acknowledge your report within 48 hours
- We will investigate and provide updates on the fix timeline
- Once fixed, we will credit you in the release notes (unless you prefer to remain anonymous)

## Security Considerations

This extension:

- Does not collect or transmit any user data
- Does not make external network requests
- Runs only when explicitly invoked via context menu
- Uses minimal permissions (`activeTab`, `clipboardWrite`, `contextMenus`, `scripting`)
- Does not use `eval()` or execute dynamic code
- Sanitizes all user input before display

## Known Limitations

- Cannot run on Chrome restricted pages (`chrome://`, Chrome Web Store)
- Requires user action (right-click) to activate
- Clipboard access requires user interaction (click Copy button)
