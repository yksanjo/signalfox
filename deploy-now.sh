#!/bin/bash

echo "🚀 Deploying SignalFox to Vercel..."
echo "===================================="

# Clean up any previous builds
echo "Cleaning up..."
rm -rf .next node_modules 2>/dev/null

# Install dependencies
echo "Installing dependencies..."
npm install --silent

# Build the project
echo "Building project..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
echo ""
echo "📋 Manual Deployment Steps:"
echo "=========================="
echo "1. Go to: https://vercel.com/new"
echo "2. Click 'Import Git Repository'"
echo "3. Enter: https://github.com/yksanjo/signalfox"
echo "4. Click 'Import'"
echo "5. Configure:"
echo "   - Project Name: signalfox"
echo "   - Framework: Next.js"
echo "   - Build Command: npm run build"
echo "   - Output Directory: .next"
echo "6. Click 'Deploy'"
echo ""
echo "🌐 Your deployment will be available at:"
echo "   https://signalfox.vercel.app"
echo ""
echo "🎯 Quick Launch Checklist:"
echo "1. Deploy to Vercel (above)"
echo "2. Add environment variables:"
echo "   - NEXT_PUBLIC_APP_URL=https://signalfox.vercel.app"
echo "3. Test the deployment"
echo "4. Post on r/sales"
echo "5. Get first 10 customers!"
echo ""
echo "💰 Revenue Ready:"
echo "- Price: $99/month vs ZoomInfo's $1,250+/month"
echo "- Target: 100 customers @ $299/year = $29,900"
echo "- Costs: ~$120/month (95%+ profit margin)"
echo ""
echo "🎉 SignalFox is ready to launch!"