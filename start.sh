#!/bin/sh
# Run tests
npm test

# Check if the tests were successful
if [ $? -eq 0 ]; then
  echo "Tests passed, starting the app."
  node src/index.js
else
  echo "Tests failed, stopping container."
  exit 1
fi
