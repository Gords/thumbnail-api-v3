# Thumbnail Generation API

## Overview
This API allows users to upload images, automatically generate thumbnails, and monitor the processing jobs.

## How It Works
1. **Upload an Image**: Post an image to the API to start a thumbnail generation job.
2. **Job Status**: Check the status of the image processing job.
3. **Retrieve Thumbnail**: Once the job is completed, download the generated thumbnail.
4. **Job List**: View a list of all the processing jobs.

## Installation

Ensure that Docker and Docker Compose are installed on your system. Then, follow these steps to run the API:

1. Clone the repository:
   ```
   git clone [your-repository-url]
   cd [repository-name]
   ```

2. Start the application:
   ```
   docker-compose up
   ```

The API should now be running and accessible at `http://localhost:3000`.

## API Endpoints

### POST `/images`
Upload an image file to start a thumbnail generation job.

#### Request
`POST /images`
- Form data key: `image`
- Expected file type: `image/*`

#### Response
- `201 Created`: Job initiated with job details.
- `400 Bad Request`: No image file provided.

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

## License

MIT License

Copyright (c) 2023 Fernando Ramirez.