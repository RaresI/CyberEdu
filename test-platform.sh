#!/bin/bash

echo "🧪 Testing CyberEdu Platform..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Test function
test_endpoint() {
    local name=$1
    local url=$2
    local expected_code=${3:-200}
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    
    if [ "$response" = "$expected_code" ]; then
        echo -e "${GREEN}✓${NC} $name - Passed (HTTP $response)"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $name - Failed (Expected $expected_code, got $response)"
        ((FAILED++))
        return 1
    fi
}

echo "1️⃣  Testing Service Health Endpoints..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_endpoint "User Service Health" "http://localhost:8081/api/users/health"
test_endpoint "Course Service Health" "http://localhost:8082/api/courses/health"
test_endpoint "Order Service Health" "http://localhost:8083/api/orders/health"
test_endpoint "Forum Service Health" "http://localhost:8084/api/forum/health"
test_endpoint "Challenge Service Health" "http://localhost:8085/challenges/health"
test_endpoint "News Service Health" "http://localhost:8086/news/health"
test_endpoint "API Gateway Health" "http://localhost:8080/actuator/health"

echo ""
echo "2️⃣  Testing API Gateway Routes..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_endpoint "Gateway → Courses" "http://localhost:8080/api/courses"
test_endpoint "Gateway → Forum" "http://localhost:8080/api/forum/posts"
test_endpoint "Gateway → Challenges" "http://localhost:8080/api/challenges"
test_endpoint "Gateway → News" "http://localhost:8080/api/news"

echo ""
echo "3️⃣  Testing User Registration & Login..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Register a test user
RANDOM_USER="testuser_$(date +%s)"
REGISTER_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"$RANDOM_USER\",\"email\":\"$RANDOM_USER@test.com\",\"password\":\"password123\"}")

REGISTER_CODE=$(echo "$REGISTER_RESPONSE" | tail -n1)
if [ "$REGISTER_CODE" = "200" ] || [ "$REGISTER_CODE" = "201" ]; then
    echo -e "${GREEN}✓${NC} User Registration - Passed"
    ((PASSED++))
    
    # Try to login
    LOGIN_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/users/login \
      -H "Content-Type: application/json" \
      -d "{\"username\":\"$RANDOM_USER\",\"password\":\"password123\"}")
    
    LOGIN_CODE=$(echo "$LOGIN_RESPONSE" | tail -n1)
    if [ "$LOGIN_CODE" = "200" ]; then
        echo -e "${GREEN}✓${NC} User Login - Passed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} User Login - Failed (HTTP $LOGIN_CODE)"
        ((FAILED++))
    fi
else
    echo -e "${RED}✗${NC} User Registration - Failed (HTTP $REGISTER_CODE)"
    ((FAILED++))
fi

echo ""
echo "4️⃣  Testing RabbitMQ..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

RABBITMQ_STATUS=$(curl -s -u guest:guest http://localhost:15672/api/healthchecks/node | grep -o '"status":"ok"')
if [ ! -z "$RABBITMQ_STATUS" ]; then
    echo -e "${GREEN}✓${NC} RabbitMQ - Running"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} RabbitMQ - Not responding"
    ((FAILED++))
fi

echo ""
echo "5️⃣  Testing Frontend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_endpoint "Frontend Home" "http://localhost:3000"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Test Results"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Check the logs with: docker-compose logs${NC}"
    exit 1
fi
