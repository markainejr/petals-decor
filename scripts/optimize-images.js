import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sizes = {
  thumb: 20,  // Tiny thumbnail for blur-up
  sm: 300,    // Small devices
  md: 768,    // Medium devices
  lg: 1280,   // Large devices
};

async function optimizeImages() {
  const sourceDir = 'public/images';
  const files = await fs.readdir(sourceDir);
  
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
    
    const sourcePath = path.join(sourceDir, file);
    const image = sharp(sourcePath);
    
    // Generate thumbnail for blur-up effect
    await image
      .resize(sizes.thumb)
      .jpeg({ quality: 30 })
      .toFile(path.join(sourceDir, 'thumbnails', file.replace(/\.(jpg|jpeg|png)$/i, '-thumb.jpg')));
    
    // Generate responsive sizes
    for (const [size, width] of Object.entries(sizes)) {
      if (size === 'thumb') continue;
      
      await image
        .resize(width)
        .jpeg({ quality: 80 })
        .toFile(path.join(sourceDir, 'responsive', file.replace(/\.(jpg|jpeg|png)$/i, `-${size}.jpg`)));
    }
    
    // Optimize original imagel
    await image
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(sourceDir, file.replace(/\.(jpg|jpeg|png)$/i, '-optimized.jpg')));
  }
}

optimizeImages().catch(console.error);