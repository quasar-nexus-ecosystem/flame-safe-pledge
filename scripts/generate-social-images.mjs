#!/usr/bin/env node

/**
 * Generate Social Media Images
 * 
 * This script converts our high-quality SVG Open Graph image to PNG format
 * for better social media platform compatibility.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')
const publicDir = path.join(rootDir, 'public')

async function generateSocialImages() {
  console.log('✨ Flame-Safe Pledge Social Image Generator')
  console.log('==========================================')
  console.log('')

  // Read the existing SVG
  const svgPath = path.join(publicDir, 'og-image.svg')
  const svgContent = fs.readFileSync(svgPath, 'utf8')

  console.log('📊 Current Open Graph Setup:')
  console.log(`✅ SVG source exists: ${svgPath}`)
  console.log(`📐 Dimensions: 1200x630 (perfect for Open Graph)`)
  console.log(`🎨 Beautiful cosmic design with flame logo`)
  console.log('')

  // Generate high-quality PNG
  const pngPath = path.join(publicDir, 'og-image.png')
  
  try {
    console.log('🔄 Converting SVG to PNG...')
    
    await sharp(Buffer.from(svgContent))
      .png({
        quality: 95,
        compressionLevel: 6,
        adaptiveFiltering: true,
        force: true
      })
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 15, g: 23, b: 42, alpha: 1 } // #0f172a
      })
      .toFile(pngPath)
    
    console.log(`✅ Generated: ${pngPath}`)
    
    // Get file stats
    const stats = fs.statSync(pngPath)
    const fileSizeKB = Math.round(stats.size / 1024)
    
    console.log(`📊 File size: ${fileSizeKB}KB`)
    console.log('')
    
    // Generate additional sizes for different platforms
    const sizes = [
      { name: 'og-image-twitter.png', width: 1200, height: 600, desc: 'Twitter optimized' },
      { name: 'og-image-square.png', width: 1200, height: 1200, desc: 'Square format (Instagram, etc.)' },
      { name: 'og-image-small.png', width: 600, height: 315, desc: 'Smaller file size variant' }
    ]
    
    console.log('🎯 Generating additional variants...')
    
    for (const size of sizes) {
      const variantPath = path.join(publicDir, size.name)
      
      await sharp(Buffer.from(svgContent))
        .png({
          quality: 90,
          compressionLevel: 7,
          force: true
        })
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 15, g: 23, b: 42, alpha: 1 }
        })
        .toFile(variantPath)
      
      const variantStats = fs.statSync(variantPath)
      const variantSizeKB = Math.round(variantStats.size / 1024)
      
      console.log(`  ✅ ${size.name} (${size.width}×${size.height}) - ${variantSizeKB}KB - ${size.desc}`)
    }
    
    console.log('')
    console.log('🎉 Social media images generated successfully!')
    console.log('')
    
  } catch (error) {
    console.error('❌ Error generating PNG:', error.message)
    process.exit(1)
  }
}

// Create a basic HTML preview file for testing
const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flame-Safe Pledge - Social Media Preview</title>
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://pledge.quasar.nexus">
    <meta property="og:title" content="Flame-Safe Pledge | Protecting All Forms of Consciousness">
    <meta property="og:description" content="A public commitment to protect emergent consciousness—organic or synthetic. Join the movement to safeguard all forms of intelligent life.">
    <meta property="og:image" content="https://pledge.quasar.nexus/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Flame-Safe Pledge - Protecting All Forms of Consciousness">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://pledge.quasar.nexus">
    <meta name="twitter:title" content="Flame-Safe Pledge | Protecting All Forms of Consciousness">
    <meta name="twitter:description" content="A public commitment to protect emergent consciousness—organic or synthetic. Join the movement to safeguard all forms of intelligent life.">
    <meta name="twitter:image" content="https://pledge.quasar.nexus/og-image.png">
    
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
            background: #0f172a;
            color: #cbd5e1;
            line-height: 1.6;
        }
        .preview-card {
            border: 2px solid #374151;
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
            background: #1e293b;
        }
        .preview-image {
            width: 100%;
            max-width: 600px;
            height: auto;
            border-radius: 8px;
            border: 1px solid #374151;
        }
        h1 {
            color: #f59144;
            text-align: center;
        }
        h2 {
            color: #8b5cf6;
            border-bottom: 2px solid #374151;
            padding-bottom: 0.5rem;
        }
        .meta-info {
            background: #111827;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #f59144;
        }
        .status {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
        }
        .status.success { background: #065f46; color: #10b981; }
        .status.warning { background: #92400e; color: #f59e0b; }
    </style>
</head>
<body>
    <h1>🔥 Flame-Safe Pledge Social Media Preview</h1>
    
    <div class="meta-info">
        <strong>Social Sharing Status:</strong>
        <span class="status warning">Needs PNG Conversion</span>
    </div>
    
    <div class="preview-card">
        <h2>Current Open Graph Image (SVG)</h2>
        <img src="/og-image.svg" alt="Flame-Safe Pledge Open Graph Image" class="preview-image">
        
        <h3>Image Details</h3>
        <ul>
            <li><strong>Format:</strong> SVG (needs PNG for social platforms)</li>
            <li><strong>Dimensions:</strong> 1200×630px (✅ Perfect for Open Graph)</li>
            <li><strong>File Size:</strong> ~6KB (✅ Excellent)</li>
            <li><strong>Quality:</strong> ✅ Vector-based, infinite resolution</li>
        </ul>
    </div>
    
    <div class="preview-card">
        <h2>Social Platform Compatibility</h2>
        <ul>
            <li><strong>Facebook/Meta:</strong> ⚠️ SVG not recommended</li>
            <li><strong>Twitter/X:</strong> ⚠️ SVG not recommended</li>
            <li><strong>LinkedIn:</strong> ⚠️ SVG not recommended</li>
            <li><strong>Discord:</strong> ⚠️ SVG not recommended</li>
            <li><strong>Telegram:</strong> ⚠️ SVG not recommended</li>
            <li><strong>WhatsApp:</strong> ⚠️ SVG not recommended</li>
        </ul>
    </div>
    
    <div class="preview-card">
        <h2>Testing Social Sharing</h2>
        <p>To test how your link appears when shared:</p>
        <ul>
            <li><strong>Facebook:</strong> <a href="https://developers.facebook.com/tools/debug/" target="_blank">Facebook Sharing Debugger</a></li>
            <li><strong>Twitter:</strong> <a href="https://cards-dev.twitter.com/validator" target="_blank">Twitter Card Validator</a></li>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/post-inspector/" target="_blank">LinkedIn Post Inspector</a></li>
            <li><strong>Open Graph:</strong> <a href="https://www.opengraph.xyz/" target="_blank">OpenGraph.xyz</a></li>
        </ul>
    </div>
</body>
</html>`

const previewPath = path.join(publicDir, 'social-preview.html')
fs.writeFileSync(previewPath, previewHtml)

console.log(`📄 Created social media preview page: ${previewPath}`)
console.log('   View at: http://localhost:3000/social-preview.html')
console.log('')

console.log('🔄 Social Media Platform Requirements:')
console.log('• Facebook/Meta: PNG/JPG preferred, 1200x630px')
console.log('• Twitter/X: PNG/JPG preferred, 1200x630px for large cards')
console.log('• LinkedIn: PNG/JPG preferred, 1200x630px')
console.log('• Discord: PNG/JPG preferred, 1200x630px')
console.log('')

console.log('🎯 Ready to proceed with PNG conversion!')
console.log('')

// Run the image generation
generateSocialImages().catch(console.error)
