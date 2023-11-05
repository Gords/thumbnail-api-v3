
const sharp = require('sharp');
const path = require('path');

const createThumbnail = async (originalImagePath, thumbnailImagePath) =>{
    await sharp(originalImagePath)
        .resize(100, 100)
        .toFile(thumbnailImagePath);
    return thumbnailImagePath;
}

module.exports = createThumbnail;
