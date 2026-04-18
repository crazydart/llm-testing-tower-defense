#!/bin/bash
# Start the Tower Defense Game

echo "Starting Tower Defense Game..."
echo "Opening browser to http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python is available
if command -v python3 &>/dev/null; then
    python3 -m http.server 8000
elif command -v python &>/dev/null; then
    python -m http.server 8000
else
    echo "Error: Python is not installed or not in PATH"
    echo "Please install Python or open index.html directly in your browser"
    exit 1
fi
