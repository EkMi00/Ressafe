#!/bin/bash

# Start ngrok in the background and redirect its output to a log file
# ngrok start --all > ngrok.log 2>&1 &

# # Wait for ngrok to initialize by checking the API availability
# echo "Waiting for ngrok to start..."
# while ! curl -s http://127.0.0.1:4040/api/tunnels > /dev/null; do
#   sleep 1
# done

# Fetch the JSON data from ngrok's API
json_data=$(curl -s http://127.0.0.1:4040/api/tunnels)

# Write the extracted name and public_url as key-value pairs into the .env file with VITE_ prefix
echo "$json_data" | jq -r '.tunnels[] | "VITE_\(.name | ascii_upcase)_URL=\(.public_url)"' > client/.env

echo "Environment variables written to .env file:"
cat client/.env

# Continue with the rest of the script
echo "Running the rest of the script..."
# Add your additional commands here