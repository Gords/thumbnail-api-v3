const sharp = require('sharp');

const createThumbnail = async (originalImagePath, thumbnailImagePath, job) =>{
    try {
        await sharp(originalImagePath)
            .resize(100, 100)
            .toFile(thumbnailImagePath);
        job.status = 'complete';
        job.thumbnailPath = thumbnailImagePath;
        await job.save();

        return thumbnailImagePath;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating thumbnail');
    }
}

module.exports = createThumbnail;
