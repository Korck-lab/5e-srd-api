#!/bin/bash
set -e

echo "Starting 5e-srd-api initialization..."

# Check if we need to populate the database
if [ -n "$MONGODB_URI" ]; then
    echo "Checking if database needs initialization..."
    
    # Start the API server
    echo "Starting API server..."
    npm start
else
    echo "Error: MONGODB_URI not set"
    exit 1
fi