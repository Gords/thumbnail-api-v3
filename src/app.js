require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const port = process.env.PORT || 3000 ;
const thumbnailRouter = require('./routers/thumbnail');

const app = express();

app.use(express.json());
app.use(thumbnailRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
