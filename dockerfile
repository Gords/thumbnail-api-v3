# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16-alpine

# Install Python and other build dependencies for sharp
RUN apk add --no-cache python3 make g++

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application files to the container image.
COPY . .

# Install production dependencies.
RUN npm install


# Give execute permissions to the start script
RUN chmod +x ./start.sh

# Expose the port the app runs on.
EXPOSE 3000

# Run the web service on container startup.
CMD ["./start.sh"]
