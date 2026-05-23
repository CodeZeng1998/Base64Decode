# Release Guide

This guide explains how to create and publish a new release of Base64Decode.

## Prerequisites

- Node.js 18 or higher
- Git
- Chrome Web Store developer account (for publishing)

## Release Process

### 1. Update Version

Update the version number in `manifest.json` and `package.json`:

```json
// manifest.json
{
  "version": "1.1.0"
}

// package.json
{
  "version": "1.1.0"
}
```

### 2. Update CHANGELOG

Add release notes to `CHANGELOG.md`:

```markdown
## [1.1.0] - 2026-05-23

### Added
- New feature description

### Fixed
- Bug fix description

### Changed
- Change description
```

### 3. Run Tests

Ensure all tests pass:

```bash
npm test
npm run check
```

### 4. Build Distribution Package

**On Linux/macOS:**
```bash
npm run build
```

**On Windows:**
```bash
npm run build:win
```

This creates a zip file in the `dist/` directory: `base64decode-v{version}.zip`

### 5. Test the Build

1. Open `chrome://extensions/`
2. Remove the development version
3. Drag and drop the zip file to install
4. Test all features thoroughly

### 6. Create Git Tag

```bash
git add .
git commit -m "chore: release v1.1.0"
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin main
git push origin v1.1.0
```

### 7. Create GitHub Release

1. Go to https://github.com/CodeZeng1998/Base64Decode/releases/new
2. Select the tag you just created
3. Set release title: `v1.1.0`
4. Copy release notes from CHANGELOG.md
5. Attach the zip file from `dist/`
6. Click "Publish release"

### 8. Publish to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Select Base64Decode
3. Click "Package" → "Upload new package"
4. Upload the zip file from `dist/`
5. Update store listing if needed
6. Submit for review

### 9. Announce Release

- Update README.md with new version badge
- Announce in discussions or social media if applicable

## Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

## Hotfix Process

For urgent bug fixes:

1. Create a hotfix branch from the latest release tag
2. Fix the bug
3. Update version (patch increment)
4. Follow steps 2-8 above
5. Merge back to main

## Rollback

If a release has critical issues:

1. Unpublish from Chrome Web Store (if possible)
2. Create a new release with the fix
3. Document the issue in CHANGELOG.md
