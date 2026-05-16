const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const gifPath = '../Brain_orbital_reveal_202604100307-ezgif.com-video-to-gif-converter.gif';
const outputDir = './public/frames';

async function extract() {
    console.log('Starting FLASH frame extraction...');
    try {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const metadata = await sharp(gifPath).metadata();
        const pages = metadata.pages;
        console.log(`Original GIF has ${pages} frames.`);

        let frameCount = 0;
        for (let i = 0; i < pages; i += 2) {
            // Note: removed animated: true for individual page access, usually faster
            await sharp(gifPath, { page: i })
                .resize(800)
                .webp({ quality: 20 }) 
                .toFile(path.join(outputDir, `frame_${frameCount}.webp`));
            
            frameCount++;
            if (i % 20 === 0) console.log(`Processed ${i} original frames...`);
        }
        console.log(`Extraction complete! total frames: ${frameCount}`);
        process.exit(0);
    } catch (err) {
        console.error('Error during extraction:', err);
        process.exit(1);
    }
}

extract();
