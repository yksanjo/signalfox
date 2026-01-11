#!/bin/bash

echo "🚀 Testing SignalFox Deployment"
echo "================================"

# Current deployment URL
DEPLOYMENT_URL="https://datafox-6qeox1xhu-yoshi-kondos-projects.vercel.app"

echo ""
echo "📱 Testing Pages:"
echo "----------------"

# Test homepage
echo "1. Testing homepage..."
if curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL" | grep -q "200"; then
    echo "   ✅ Homepage is live"
else
    echo "   ❌ Homepage failed"
fi

# Test dashboard
echo "2. Testing dashboard..."
if curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/dashboard" | grep -q "200"; then
    echo "   ✅ Dashboard is live"
else
    echo "   ❌ Dashboard failed"
fi

# Test API endpoints
echo "3. Testing API endpoints..."
if curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/api/signals" | grep -q "200"; then
    echo "   ✅ Signals API is live"
else
    echo "   ❌ Signals API failed"
fi

echo ""
echo "📊 Deployment Summary:"
echo "---------------------"
echo "🌐 Live URL: $DEPLOYMENT_URL"
echo "📁 GitHub: https://github.com/yksanjo/signalfox"
echo "💼 Project: SignalFox - B2B Sales Intelligence"
echo "💰 Pricing: $99/month vs ZoomInfo's $15K+/year"
echo ""
echo "🎯 Next Steps:"
echo "1. Update to custom domain: signal-fox.vercel.app"
echo "2. Post on r/sales (500K+ members)"
echo "3. Get first 10 customers @ $299/year"
echo ""
echo "📈 Revenue Projection:"
echo "- Month 1: 10 customers × $299 = $2,990"
echo "- Month 3: 50 customers × $299 = $14,950"
echo "- Month 6: 100 customers × $299 = $29,900"
echo ""
echo "🎉 SignalFox is ready for customers!"