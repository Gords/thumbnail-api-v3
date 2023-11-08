const request = require('supertest');
const app = require('../src/app');
const ThumbnailJob = require('../src/models/thumbnail');
const mongoose = require('mongoose');

let server;

beforeAll(done => {
  server = app.listen(process.env.PORT, done);
});


describe('Thumbnail Router', () => {
  describe('POST /images', () => {
    it('should return 400 if no image is provided', async () => {
      const res = await request(app).post('/images');
      expect(res.statusCode).toEqual(400);
    });

    it('should return 201 if image is provided', async () => {
      const res = await request(app)
        .post('/images')
        .attach('image', '__tests__/fixtures/image.jpg');
      expect(res.statusCode).toEqual(201);
    });
    it('should return 415 if unsupported file format is provided', async () => {
      const res = await request(app)
        .post('/images')
        .attach('image', '__tests__/fixtures/unsupported-file.txt'); // Path to a text file or any unsupported format
      expect(res.statusCode).toEqual(415); // 415 is the status code for unsupported media type
    });
  });

  describe('GET /jobs', () => {
    it('should return a list of all jobs', async () => {
      const res = await request(app).get('/jobs');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /jobs/:id', () => {
    it('should return 404 if job is not found', async () => {
      const res = await request(app).get('/jobs/123');
      expect(res.statusCode).toEqual(404);
    });

    it('should return 200 if job is found', async () => {
      const ImageTest = await new ThumbnailJob({
        imagePath: 'tests/fixtures/image.jpg',
        thumbnailPath: null,
        status: 'pending',
      }).save();
      const res = await request(app).get(`/jobs/${ImageTest._id}`);
      expect(res.statusCode).toEqual(200);
    });
  });
});

afterAll(async () => {
  await new Promise(resolve => server.close(resolve)); // Close the server
  await mongoose.disconnect(); // Disconnect from the database
});


module.exports = server;