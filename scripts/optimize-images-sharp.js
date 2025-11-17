const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const publicDir = path.join(__dirname, '../public');
  const outputDir = path.join(publicDir, 'optimized');

  // Create optimized directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const imageFiles = fs.readdirSync(publicDir).filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`🔄 Found ${imageFiles.length} images to optimize...`);

  for (const file of imageFiles) {
    try {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(outputDir, file);

      await sharp(inputPath)
        .jpeg({ quality: 75, progressive: true })
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(outputPath);

      console.log(`✅ Optimized: ${file}`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error.message);
    }
  }

  console.log('🎉 Image optimization complete!');
  console.log('📁 Check /public/optimized/ folder');
}

optimizeImages();
