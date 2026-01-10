#!/bin/bash

echo "======================================"
echo "   CYBERED PLATFORM TEST SUITE"
echo "======================================"
echo ""

# Test 1: User Registration
echo "1. Testing User Registration..."
REGISTER_RESULT=$(curl -s -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"password123"}')
echo "✓ Registration: $(echo $REGISTER_RESULT | jq -r '.username // "FAILED"')"
echo ""

# Test 2: User Login
echo "2. Testing User Login..."
LOGIN_RESULT=$(curl -s -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}')
echo "✓ Login: $(echo $LOGIN_RESULT | jq -r '.username // "FAILED"')"
echo ""

# Test 3: Courses
echo "3. Testing Courses Endpoint..."
COURSES=$(curl -s http://localhost:8080/api/courses | jq -r 'length')
echo "✓ Courses available: $COURSES"
echo ""

# Test 4: Challenges
echo "4. Testing Challenges Endpoint..."
CHALLENGES=$(curl -s http://localhost:8080/api/challenges | jq -r 'length')
echo "✓ CTF Challenges available: $CHALLENGES"
echo ""

# Test 5: News
echo "5. Testing News Endpoint..."
NEWS=$(curl -s http://localhost:8080/api/news | jq -r 'length')
echo "✓ News articles available: $NEWS"
echo ""

# Test 6: Health Checks
echo "6. Testing Service Health..."
echo "  - User Service: $(curl -s http://localhost:8081/api/users/health || echo "DOWN")"
echo "  - Course Service: $(curl -s http://localhost:8082/api/courses/health || echo "DOWN")"
echo "  - Challenge Service: $(curl -s http://localhost:8085/challenges/health || echo "DOWN")"
echo "  - News Service: $(curl -s http://localhost:8086/news/health || echo "DOWN")"
echo ""

# Test 7: Frontend
echo "7. Testing Frontend..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
echo "✓ Frontend HTTP Status: $FRONTEND_STATUS"
echo ""

echo "======================================"
echo "        ALL TESTS COMPLETED"
echo "======================================"
echo ""
echo "Platform is ready at: http://localhost:3000"
echo "API Gateway at: http://localhost:8080"
echo "RabbitMQ Management: http://localhost:15672 (guest/guest)"
