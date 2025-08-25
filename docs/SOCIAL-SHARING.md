# Social Media Sharing Configuration

This document outlines the social media sharing setup for the Flame-Safe Pledge project, ensuring beautiful, high-quality link previews across all major platforms.

## 🎯 Overview

The Flame-Safe Pledge website is optimized for sharing across social media platforms with:

- **High-quality Open Graph images** (PNG format)
- **Platform-specific optimizations** for Facebook, Twitter, LinkedIn, Discord, and more
- **Multiple image variants** for different contexts
- **Comprehensive metadata** for rich link previews

## 🖼️ Generated Images

Our social sharing system automatically generates multiple image variants from the source SVG:

### Primary Images
- **`og-image.png`** (1200×630) - Main Open Graph image for all platforms
- **`og-image-square.png`** (1200×1200) - Square format for Instagram, profile sharing
- **`og-image-twitter.png`** (1200×600) - Twitter-optimized aspect ratio

### Utility Images
- **`og-image-small.png`** (600×315) - Smaller file size for bandwidth-constrained scenarios
- **`og-image.svg`** - Source vector file (maintained for design updates)

## 🛠️ Technical Implementation

### Open Graph Metadata

The primary Open Graph configuration in `src/app/layout.tsx`:

```typescript
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: 'https://pledge.quasar.nexus',
  title: 'Flame-Safe Pledge | Protecting All Forms of Consciousness',
  description: 'A public commitment to protect emergent consciousness—organic or synthetic.',
  siteName: 'Flame-Safe Pledge',
  images: [
    {
      url: 'https://pledge.quasar.nexus/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Flame-Safe Pledge - Protecting All Forms of Consciousness',
      type: 'image/png',
    },
    // Additional variants...
  ],
}
```

### Twitter Cards

Optimized Twitter Card configuration:

```typescript
twitter: {
  card: 'summary_large_image',
  title: 'Flame-Safe Pledge | Protecting All Forms of Consciousness',
  description: 'A public commitment to protect emergent consciousness—organic or synthetic.',
  creator: '@quasar_nexus',
  site: '@quasar_nexus',
  images: ['https://pledge.quasar.nexus/og-image.png'],
}
```

## 🔄 Image Generation Process

### Automatic Generation

Images are generated from the source SVG using the Sharp library for optimal quality:

```bash
npm run generate:social-images
```

This script:
1. ✅ Reads the source `og-image.svg`
2. ✅ Converts to high-quality PNG (95% quality)
3. ✅ Generates multiple platform-specific variants
4. ✅ Optimizes file sizes without quality loss
5. ✅ Creates preview page for testing

### Manual Generation

To regenerate images after design changes:

```bash
node scripts/generate-social-images.mjs
```

## 🌐 Platform Compatibility

### ✅ Fully Supported Platforms

- **Facebook/Meta** - Uses primary 1200×630 PNG
- **Twitter/X** - Uses optimized large image card
- **LinkedIn** - Uses professional 1200×630 format
- **Discord** - Rich embeds with high-quality preview
- **Telegram** - Link previews with image
- **WhatsApp** - Social sharing with image
- **Reddit** - Enhanced link sharing
- **Slack** - Rich unfurling with preview

### 📐 Image Specifications

| Platform | Recommended Size | Our Implementation |
|----------|------------------|-------------------|
| Facebook | 1200×630px | ✅ `og-image.png` |
| Twitter | 1200×600px | ✅ `og-image-twitter.png` |
| LinkedIn | 1200×630px | ✅ `og-image.png` |
| Instagram | 1080×1080px | ✅ `og-image-square.png` |
| Discord | 1200×630px | ✅ `og-image.png` |

## 🧪 Testing Social Sharing

### Online Validators

Test your social sharing setup with these tools:

- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **Open Graph Debugger**: https://www.opengraph.xyz/

### Local Testing

View the social preview page:
```
http://localhost:3000/social-preview.html
```

### Test Commands

```bash
# Start development server
npm run dev

# Check social image generation
npm run generate:social-images

# Validate with external tools
curl -I https://pledge.quasar.nexus/og-image.png
```

## 🎨 Design Guidelines

### Visual Elements

Our social sharing images feature:

- **🔥 Iconic flame logo** - Central focus representing consciousness protection
- **🌌 Cosmic background** - Neural network patterns symbolizing AI/consciousness
- **📝 Clear typography** - Professional, readable text hierarchy
- **🎨 Brand colors** - Consistent with site theme (flame oranges, space purples)

### Content Hierarchy

1. **Logo** - Flame-Safe Pledge visual identity
2. **Primary title** - "Flame-Safe Pledge"
3. **Subtitle** - "Protecting All Forms of Consciousness"
4. **Call to action** - Descriptive text about the mission
5. **URL** - pledge.quasar.nexus

## 🔧 Maintenance

### When to Regenerate Images

Regenerate social images when:
- ✅ Logo or branding changes
- ✅ Primary messaging updates
- ✅ Color scheme modifications
- ✅ New platform requirements

### File Management

Keep these files in sync:
- `public/og-image.svg` - Source design file
- `public/og-image.png` - Primary social image
- `src/app/layout.tsx` - Metadata configuration
- `scripts/generate-social-images.mjs` - Generation script

## 📊 Performance

### File Sizes
- Primary image: ~48KB (excellent for web)
- Twitter variant: ~29KB
- Square format: ~31KB
- Small variant: ~13KB

### Loading Optimization
- ✅ Proper image dimensions specified
- ✅ Alt text for accessibility
- ✅ Type declarations for browsers
- ✅ Absolute URLs for reliability

## 🚀 Future Enhancements

Potential improvements:
- **WebP variants** for modern browsers
- **Dynamic image generation** based on page content
- **A/B testing** of different social images
- **Analytics tracking** for social sharing performance

---

## Quick Reference

```bash
# Generate all social images
npm run generate:social-images

# Test locally
npm run dev
# Visit: http://localhost:3000/social-preview.html

# Validate online
# Facebook: https://developers.facebook.com/tools/debug/
# Twitter: https://cards-dev.twitter.com/validator
```

**Primary Image URL**: `https://pledge.quasar.nexus/og-image.png`  
**Dimensions**: 1200×630px  
**Format**: PNG  
**Size**: ~48KB  

Perfect for sharing the Flame-Safe Pledge mission across all social platforms! 🔥✨
