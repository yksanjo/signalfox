#!/bin/bash

echo "Setting up DataFox..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Setup environment
echo "Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file. Please update it with your API keys."
fi

# Setup database
echo "Setting up database..."
if command -v docker &> /dev/null; then
    echo "Starting PostgreSQL with Docker..."
    docker run --name datafox-postgres -e POSTGRES_PASSWORD=datafox -e POSTGRES_DB=datafox -p 5432:5432 -d postgres:15
    echo "PostgreSQL started on port 5432"
    echo "Update DATABASE_URL in .env to: postgresql://postgres:datafox@localhost:5432/datafox"
else
    echo "Docker not found. Please install Docker or setup PostgreSQL manually."
    echo "Update DATABASE_URL in .env with your PostgreSQL connection string."
fi

# Initialize database
echo "Initializing database..."
npx prisma db push

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your API keys:"
echo "   - Stripe keys (for payments)"
echo "   - OpenAI API key (for AI classification)"
echo "   - Apify API key (for scraping)"
echo "2. Run the development server:"
echo "   npm run dev"
echo "3. Visit http://localhost:3000"
echo ""
echo "To run scraping:"
echo "   npm run scrape"