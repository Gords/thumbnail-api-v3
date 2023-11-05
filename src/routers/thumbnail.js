const express = require('express');
const router = express.Router();
const multer = require('multer');
const ThumbnailJob = require('../models/thumbnail');
const path = require('path');
const fs = require('fs');

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post('/image', upload.single('image'), async (req, res, next) => {
    const { file } = req;
    if (!file) {
        return res.status(400).send({ error: 'No image file provided' });
    }
    // Create the directory if it does not exist
    const directoryPath = path.join(__dirname, '../images');
    fs.mkdirSync(directoryPath, { recursive: true });
    // Save the image file to the file system
    const imagePath = path.join(directoryPath, file.originalname);
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
});


module.exports = router;

