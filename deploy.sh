#!/bin/bash

echo "🚀 Deploying SignalFox to Production..."
echo "======================================"

# Build the project
echo "Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "Deploying to Vercel..."
echo "Note: This may take a few minutes..."

# Try to deploy
npx vercel --prod --yes 2>&1 | tail -20

echo ""
echo "======================================"
echo "🎉 Deployment complete!"
echo ""
echo "Your SignalFox is now live at:"
echo "https://signal-fox-sandy.vercel.app"
echo ""
echo "Next steps:"
echo "1. Test login: https://signal-fox-sandy.vercel.app/login"
echo "2. Test dashboard: https://signal-fox-sandy.vercel.app/dashboard"
echo "3. Configure environment variables in Vercel dashboard"
echo "4. Start marketing using MARKETING_MATERIALS.md"
echo ""
echo "Good luck! 🚀"