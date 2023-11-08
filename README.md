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

## Technical Choices
- **Node.js & Express**: For their efficiency in handling I/O operations, which is crucial for an image processing service.
- **Sharp:** For high-performance image transformations.
- **Mongoose**: To provide a schema-based solution to model the application data.
- **Docker**: For easy deployment and environment consistency.
- **Jest**: For its comprehensive testing capabilities.
- **Multer**: For its robust handling of multipart/form-data, which is crucial for accepting image uploads via the API.
- **Axios**: For its promise-based structure, allowing for easy-to-manage asynchronous HTTP requests within the Node.js environment.
- **Dotenv**: To loads environment variables from a .env file into process.

## Architecture
The API accepts image upload requests and starts a thumbnail generation process. It doesn't queue the jobs within the service itself but processes them asynchronously. Once a job is finished, it uses webhooks to notify the client of completion.

## Trade-offs and Future Improvements
- **Image Size Validation**: No current check for the size of uploaded images; necessary to prevent server overload.
- **Image Storage with GridFS**: Images are not stored in the database. Using GridFS would facilitate better handling of large files.
- **Batch Uploads**: The system doesn't handle multiple file uploads together, which could be a useful feature for users.
- **User Account Association**: Thumbnails are not currently linked to user accounts, which would enable better content management.
- **Production Server Optimization**: Remove development-only modules for a lighter, production-focused deployment.
- **Secure Configuration Management**: Shift from local .env file storage to a managed service like AWS Parameter Store for enhanced security.
- **Authentication and Access Controls**: Implementing these would secure endpoints and ensure that users can only access their resources.
- **Caching**: When thumbnails are generated, they can be stored in a cache. Subsequent requests for the same image can be served directly from the cache, which is much faster than regenerating the thumbnail.
- **Rate Limiting**: Essential for preventing abuse of the service by limiting the number of requests a user can make within a certain timeframe.
- **Monitoring and Logging**: Implementing comprehensive monitoring and logging to detect and alert on issues in real time, ensuring production readiness, using a service like AWS Cloudwatch.
- **Implement a Load Balancer**: using a service like AWS Elastic Load Balancing to distribute incoming API requests for scalability and fault tolerance.
- **Use Serverless Architecture**: Utilizing AWS Lambda, which scales automatically, both up and down, to match demand, ensuring cost-efficiency during periods of low or no traffic.

### To scale up:
- Add API server instances behind load balancer.
- Implement caching (Redis, Memcached).
- Use object storage (S3) for thumbnails.
- Implement Microservices architecture.

### To scale down:
- Reduce server instances.
- Serverless functions (AWS Lambda).
- Scale down datastore.
- Aggressive caching.
- Request rate limiting.



## License

MIT License

Copyright (c) 2023 Fernando Ramirez.