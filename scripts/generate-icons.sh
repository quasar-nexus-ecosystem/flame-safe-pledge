#!/bin/bash

# Flame-Safe Pledge Icon Generation Script
# This script converts SVG icons to the required PNG formats for web and mobile

echo "🔥 Generating Flame-Safe Pledge icons..."

# Check if SVG files exist
if [ ! -f "public/logo.svg" ]; then
    echo "❌ Error: logo.svg not found in public directory"
    exit 1
fi

if [ ! -f "public/og-image.svg" ]; then
    echo "❌ Error: og-image.svg not found in public directory"
    exit 1
fi

if [ ! -f "public/apple-touch-icon.svg" ]; then
    echo "❌ Error: apple-touch-icon.svg not found in public directory"
    exit 1
fi

# Check if ImageMagick or Inkscape is available
if command -v convert >/dev/null 2>&1; then
    CONVERTER="convert"
    echo "✅ Using ImageMagick for conversion"
elif command -v inkscape >/dev/null 2>&1; then
    CONVERTER="inkscape"
    echo "✅ Using Inkscape for conversion"
else
    echo "❌ Error: Neither ImageMagick nor Inkscape found."
    echo "Please install one of them:"
    echo "  macOS: brew install imagemagick  or  brew install inkscape"
    echo "  Ubuntu: apt install imagemagick  or  apt install inkscape"
    exit 1
fi

# Create icons directory if it doesn't exist
mkdir -p public/icons

# Generate favicon sizes
echo "📱 Generating favicon sizes..."
if [ "$CONVERTER" = "convert" ]; then
    # ImageMagick
    convert public/logo.svg -resize 16x16 public/favicon-16x16.png
    convert public/logo.svg -resize 32x32 public/favicon-32x32.png
    convert public/logo.svg -resize 48x48 public/favicon-48x48.png
    convert public/logo.svg -resize 96x96 public/favicon-96x96.png
    convert public/logo.svg -resize 192x192 public/icon-192x192.png
    convert public/logo.svg -resize 512x512 public/icon-512x512.png
else
    # Inkscape
    inkscape public/logo.svg --export-png=public/favicon-16x16.png --export-width=16 --export-height=16
    inkscape public/logo.svg --export-png=public/favicon-32x32.png --export-width=32 --export-height=32
    inkscape public/logo.svg --export-png=public/favicon-48x48.png --export-width=48 --export-height=48
    inkscape public/logo.svg --export-png=public/favicon-96x96.png --export-width=96 --export-height=96
    inkscape public/logo.svg --export-png=public/icon-192x192.png --export-width=192 --export-height=192
    inkscape public/logo.svg --export-png=public/icon-512x512.png --export-width=512 --export-height=512
fi

# Generate Apple Touch Icons
echo "🍎 Generating Apple Touch Icons..."
if [ "$CONVERTER" = "convert" ]; then
    convert public/apple-touch-icon.svg -resize 180x180 public/apple-touch-icon.png
    convert public/apple-touch-icon.svg -resize 152x152 public/apple-touch-icon-152x152.png
    convert public/apple-touch-icon.svg -resize 144x144 public/apple-touch-icon-144x144.png
    convert public/apple-touch-icon.svg -resize 120x120 public/apple-touch-icon-120x120.png
    convert public/apple-touch-icon.svg -resize 114x114 public/apple-touch-icon-114x114.png
    convert public/apple-touch-icon.svg -resize 76x76 public/apple-touch-icon-76x76.png
    convert public/apple-touch-icon.svg -resize 72x72 public/apple-touch-icon-72x72.png
    convert public/apple-touch-icon.svg -resize 60x60 public/apple-touch-icon-60x60.png
    convert public/apple-touch-icon.svg -resize 57x57 public/apple-touch-icon-57x57.png
else
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon.png --export-width=180 --export-height=180
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon-152x152.png --export-width=152 --export-height=152
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon-144x144.png --export-width=144 --export-height=144
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon-120x120.png --export-width=120 --export-height=120
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon-114x114.png --export-width=114 --export-height=114
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon-76x76.png --export-width=76 --export-height=76
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon-72x72.png --export-width=72 --export-height=72
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon-60x60.png --export-width=60 --export-height=60
    inkscape public/apple-touch-icon.svg --export-png=public/apple-touch-icon-57x57.png --export-width=57 --export-height=57
fi

# Generate Open Graph image for social media
echo "🐦 Generating Open Graph image for social media..."
if [ "$CONVERTER" = "convert" ]; then
    convert public/og-image.svg -resize 1200x630 public/og-image.png
else
    inkscape public/og-image.svg --export-png=public/og-image.png --export-width=1200 --export-height=630
fi

# Generate ICO file from PNG (requires ImageMagick)
if [ "$CONVERTER" = "convert" ]; then
    echo "🎯 Generating favicon.ico..."
    convert public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png public/favicon.ico
fi

echo "✅ Icon generation complete!"
echo ""
echo "Generated files:"
echo "  📱 Favicons: favicon-16x16.png, favicon-32x32.png, favicon-48x48.png, favicon-96x96.png"
echo "  🔥 PWA Icons: icon-192x192.png, icon-512x512.png" 
echo "  🍎 Apple Touch Icons: apple-touch-icon.png (and various sizes)"
echo "  🐦 Social Media: og-image.png (1200x630)"
echo "  🎯 Legacy: favicon.ico"
echo ""
echo "Next steps:"
echo "  1. Run this script: chmod +x scripts/generate-icons.sh && ./scripts/generate-icons.sh"
echo "  2. Commit the generated PNG files to your repository"
echo "  3. Deploy to see improved social media sharing!"