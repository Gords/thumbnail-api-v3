require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const thumbnailRouter = require('./routers/thumbnail');

const app = express();

app.use(express.json());
app.use(thumbnailRouter);


// Webhook endpoint
app.post('/jobstatus', (req, res) => {
    console.log('Webhook received:', req.body);
    res.status(200).send({ message: 'Job Completed' });
});

module.exports = app;