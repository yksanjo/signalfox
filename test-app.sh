#!/bin/bash

echo "Testing DataFox Application..."

# Check if dependencies are installed
echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo "Please update .env with your API keys before running the app."
fi

# Start the development server in background
echo "Starting development server..."
npm run dev &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

# Check if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server is running at http://localhost:3000"
    echo ""
    echo "Available pages:"
    echo "  - Homepage: http://localhost:3000"
    echo "  - Dashboard: http://localhost:3000/dashboard"
    echo ""
    echo "Press Ctrl+C to stop the server"
    
    # Keep script running
    wait $SERVER_PID
else
    echo "❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi