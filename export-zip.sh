#!/bin/bash
# NutriScan AI - Project Zip Exporter
# Generates a clean ZIP package ready for VS Code and web downloads

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

ZIP_NAME="NutriScan-AI.zip"

echo "📦 Bundling NutriScan AI workspace into $ZIP_NAME..."

# Remove previous zip archives
rm -f "$ZIP_NAME" "public/$ZIP_NAME" "standalone/$ZIP_NAME"

# Create clean ZIP excluding git internal, node_modules, and cache
zip -q -r "$ZIP_NAME" . \
  -x "*.git*" \
  -x "node_modules/*" \
  -x "*.DS_Store" \
  -x "dist/*" \
  -x ".system_generated/*" \
  -x "$ZIP_NAME"

# Copy to public and standalone directories for instant browser download links
mkdir -p public standalone
cp "$ZIP_NAME" "public/$ZIP_NAME"
cp "$ZIP_NAME" "standalone/$ZIP_NAME"

ZIP_SIZE=$(du -h "$ZIP_NAME" | cut -f1)
echo "✅ Export complete! Created $ZIP_NAME ($ZIP_SIZE)"
echo "📍 Location: $PROJECT_DIR/$ZIP_NAME"
echo "📍 Web public: $PROJECT_DIR/public/$ZIP_NAME"
echo "📍 Standalone: $PROJECT_DIR/standalone/$ZIP_NAME"
