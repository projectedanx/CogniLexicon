#!/bin/bash
set -e

echo "Bootstrapping environment..."
npm install

if [ ! -f .env.local ]; then
  echo "Creating .env.local template..."
  echo "GEMINI_API_KEY=your_api_key_here" > .env.local
fi

echo "Environment bootstrapped."
echo "To start the dev server, run: npm run dev"
