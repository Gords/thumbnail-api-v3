const sharp = require('sharp')
const path = require('path')

const supportedFormats = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.tiff'])

const createThumbnail = async (originalImagePath, thumbnailImagePath, job) => {
    const extension = path.extname(originalImagePath).toLowerCase()
    if (!supportedFormats.has(extension)) {
        throw new Error('Unsupported file format for thumbnail creation')
    }

    try {
        await sharp(originalImagePath)
            .resize(100, 100)
            .toFile(thumbnailImagePath)
        job.status = 'complete'
        job.thumbnailPath = thumbnailImagePath
        await job.save()

        return thumbnailImagePath
        
    } catch (error) {
        console.error(error)
        throw new Error('Error creating thumbnail')
    }
}

module.exports = createThumbnail
