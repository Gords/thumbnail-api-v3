const express = require('express');
const router = express.Router();
const multer = require('multer');
const ThumbnailJob = require('../models/thumbnail');
const path = require('path');
const fs = require('fs');
const createThumbnail = require('../middleware/createThumbnail');
const axios = require('axios');

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

//Post an image to the server
router.post('/images', upload.single('image'), async (req, res, next) => {
    const { file } = req;
    if (!file) {
        return res.status(400).send({ error: 'No image file provided' });
    }

    // Create the directory if it does not exist
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
        res.status(201).send(job); // Respond immediately that the job is started
    } catch (err) {
        console.error(err);
        return next(err);
    }
    // Create the thumbnail directory if it does not exist
    const thumbnailDirectory = path.join(__dirname, '.././thumbnails');
    fs.mkdirSync(thumbnailDirectory, { recursive: true });
    // Create the thumbnail and save it to the file system
    const thumbnailPath = path.join(thumbnailDirectory, `thumbnail-${file.originalname}`);
    // Process the job in the background
    createThumbnail(imagePath, thumbnailPath, job).then(() => {
        // Once complete, send a POST request to a webhook URL
        const webhookUrl = process.env.WEBHOOK_URL;
        const data = {
            jobId: job._id,
            status: job.status,
            thumbnailPath: job.thumbnailUrl,
        };

        axios.post(webhookUrl, data)
            .then(response => {
                console.log('Webhook notified successfully:', response.data);
            })
            .catch(error => {
                console.error('Error notifying webhook:', error);
            });
    }).catch(error => {
        console.error('Error processing thumbnail:', error);
        // Optionally send an error notification to your webhook
    });
});

//Get a thumbnail by id
router.get('/thumbnails/:id', async (req, res, next) => {
    const job = await ThumbnailJob.findById(req.params.id);
    if (!job) {
        return res.status(404).send({ error: 'thumbnail not found' });
    }
    return res.status(200).sendFile(job.thumbnailUrl);
});

//Get a list of all thumbnails
router.get('/jobs', async (req, res, next) => {
    const job = await ThumbnailJob.find({});
    if (!job) {
        return res.status(404).send({ error: 'jobs not found' });
    }
    return res.status(200).send(job);
});

//Get a job status by id
router.get('/jobs/:id', async (req, res, next) => {
    const job = await ThumbnailJob.findById(req.params.id);
    if (!job) {
        return res.status(404).send({ error: 'job not found' });
    }
    return res.status(200).send(job.status);
});

module.exports = router;

