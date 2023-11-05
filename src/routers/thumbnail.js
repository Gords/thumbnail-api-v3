const express = require('express');
const router = express.Router();
const multer = require('multer');
const ThumbnailJob = require('../models/thumbnail');
const path = require('path');
const fs = require('fs');
const createThumbnail = require('../middleware/createThumbnail');

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post('/image', upload.single('image'), async (req, res, next) => {
    const { file } = req;
    if (!file) {
        return res.status(400).send({ error: 'No image file provided' });
    }
    // Create the image directory if it does not exist
    const imageDirectory = path.join(__dirname, '../images');
    fs.mkdirSync(imageDirectory, { recursive: true });
    // Save the image file to the file system
    const imagePath = path.join(imageDirectory, file.originalname);
    fs.writeFileSync(imagePath, file.buffer);
    const job = new ThumbnailJob({
        imagePath,
        thumbnailUrl: null,
        status: 'pending',
    });
    try {
        await job.save();
        res.status(201).send(job);
    } catch (err) {
        console.error(err);
        next(err);
    }

    // Create the thumbnail directory if it does not exist
    const thumbnailDirectory = path.join(__dirname, '.././thumbnails');
    fs.mkdirSync(thumbnailDirectory, { recursive: true });
    // Create the thumbnail and save it to the file system
    const thumbnailPath = path.join(thumbnailDirectory, `thumbnail-${file.originalname}`);
    await createThumbnail(imagePath, thumbnailPath);
    // Create the thumbnail and save it to the file system
    job.thumbnailUrl = thumbnailPath;
    job.status = 'completed';
});

module.exports = router;

