# Thumbnail Generation API

## Overview
This API allows users to upload images, automatically generate thumbnails, retrieve them and monitor the processing of them.

## How It Works
1. **Upload an Image**: Post an image to the API to start a thumbnail generation job.
2. **Job Status**: Check the status of the image processing job.
3. **Webhook Notification**: Receive a webhook notification when the thumbnail generation is complete.
3. **Retrieve Thumbnail**: Download the generated thumbnail once the job is completed.
4. **Job List**: View a list of all the jobs.

## Installation

Ensure that Docker and Docker Compose are installed on your system. Then, follow these steps to run the API:

1. Clone the repository:
   ```
   git clone https://github.com/Gords/thumbnail-api-v3.git
   cd thumbnail-api-v3
   ```

2. Start the application:
   ```
   docker compose up
   ```

The API should now be running and accessible at `http://localhost:3000`.

## API Endpoints

### POST `/images`
Upload an image file to start a thumbnail generation job.

#### Request
`POST /images`
- Form data key: `image`
- Expected file type: 
   - `image/jpeg`
   - `image/png`
   - `image/webp`
   - `image/gif`
   - `image/tiff`


#### Response
- `201 Created`: Job initiated with job details.
- `400 Bad Request`: No image file provided.
- `415 unsupported media type`: Uploaded file format is not supported.

### GET `/thumbnails/:id`
Retrieve a generated thumbnail by job ID.

#### Request
`GET /thumbnails/:id`
- URL Param: `id` (The job ID)

#### Response
- `200 OK`: Thumbnail file stream.
- `404 Not Found`: Invalid ID or thumbnail not found.

### GET `/jobs`
Get a list of all thumbnail jobs.

#### Request
`GET /jobs`

#### Response
- `200 OK`: Array of job details.
- `404 Not Found`: No jobs found.

### GET `/jobs/:id`
Get the status of a specific thumbnail job by ID.

#### Request
`GET /jobs/:id`
- URL Param: `id` (The job ID)

#### Response
- `200 OK`: Job status.
- `404 Not Found`: Invalid ID or job not found.


## Modules and Middleware:
- **Express**: A web application framework for Node.js designed for building web applications and APIs.
- **Multer**: A middleware for handling multipart/form-data, primarily used for uploading files.
- **Path**: A Node.js core module for working with file and directory paths.
- **File System (fs)**: A Node.js core module to interact with the file system.
- **Axios**: A promise-based HTTP client for making HTTP requests from Node.js.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Sharp**: A high-performance Node.js library for image processing. 
- **Jest**: JavaScript testing framework. It's used for unit and integration testing.
- **Dotenv**: A zero-dependency module that loads environment variables from a .env file into process.env .


## License

MIT License

Copyright (c) 2023 Fernando Ramirez.