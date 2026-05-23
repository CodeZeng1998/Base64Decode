#!/bin/bash

# Build script for Base64Decode Chrome Extension
# Creates a distributable zip file for Chrome Web Store

set -e

VERSION=$(node -p "require('./package.json').version")
BUILD_DIR="build"
DIST_DIR="dist"
ZIP_NAME="base64decode-v${VERSION}.zip"

echo "Building Base64Decode v${VERSION}..."

# Clean previous builds
rm -rf "$BUILD_DIR" "$DIST_DIR"
mkdir -p "$BUILD_DIR" "$DIST_DIR"

# Copy extension files
echo "Copying extension files..."
cp manifest.json "$BUILD_DIR/"
cp background.js "$BUILD_DIR/"
cp base64.js "$BUILD_DIR/"
cp -r _locales "$BUILD_DIR/"

# Copy documentation
echo "Copying documentation..."
cp LICENSE "$BUILD_DIR/"
cp README.md "$BUILD_DIR/"

# Create zip file
echo "Creating zip archive..."
cd "$BUILD_DIR"
zip -r "../$DIST_DIR/$ZIP_NAME" ./*
cd ..

echo "✓ Build complete: $DIST_DIR/$ZIP_NAME"
echo "✓ Ready for Chrome Web Store upload"

# Show file size
SIZE=$(du -h "$DIST_DIR/$ZIP_NAME" | cut -f1)
echo "✓ Package size: $SIZE"
