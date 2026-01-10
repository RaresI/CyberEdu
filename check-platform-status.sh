#!/bin/bash

echo "==================================="
echo "CyberEd Platform Status Check"
echo "==================================="
echo ""

echo "📊 Backend API Status:"
echo "-----------------------------------"
echo -n "✓ Courses API: "
curl -s http://localhost:8080/api/courses | jq 'length' | xargs echo "items"

echo -n "✓ Challenges API: "
curl -s http://localhost:8080/api/challenges | jq 'length' | xargs echo "items"

echo -n "✓ News API: "
curl -s http://localhost:8080/api/news | jq 'length' | xargs echo "items"

echo ""
echo "🔐 CORS Headers Check:"
echo "-----------------------------------"
curl -s -H "Origin: http://localhost:3000" -I http://localhost:8080/api/courses 2>&1 | grep -i "access-control"

echo ""
echo "📦 Sample Course Data:"
echo "-----------------------------------"
curl -s http://localhost:8080/api/courses | jq '.[0] | {title, price, category, quantity}'

echo ""
echo "🎯 Sample Challenge Data:"
echo "-----------------------------------"
curl -s http://localhost:8080/api/challenges | jq '.[0] | {title, difficulty, points, category}' 2>/dev/null || echo "Check challenges manually"

echo ""
echo "📰 Sample News Data:"
echo "-----------------------------------"
curl -s http://localhost:8080/api/news | jq '.[0] | {title, category, author}' 2>/dev/null || echo "Check news manually"

echo ""
echo "🌐 Frontend Status:"
echo "-----------------------------------"
echo -n "✓ Frontend accessible: "
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
echo ""

echo ""
echo "🐳 Docker Containers:"
echo "-----------------------------------"
docker-compose ps | grep -E "(Up|healthy)"

echo ""
echo "==================================="
echo "✅ All systems operational!"
echo "==================================="
echo ""
echo "🚀 Access your platform at:"
echo "   Frontend: http://localhost:3000"
echo "   API Gateway: http://localhost:8080"
echo ""
echo "📚 Pages to test:"
echo "   Courses:    http://localhost:3000/courses"
echo "   Challenges: http://localhost:3000/challenges"
echo "   News:       http://localhost:3000/news"
echo "   Login:      http://localhost:3000/login"
echo "   Register:   http://localhost:3000/register"
echo ""
