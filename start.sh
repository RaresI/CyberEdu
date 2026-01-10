#!/bin/bash

echo "🚀 Starting CyberEdu Platform..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Stop any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose down

echo ""
echo "🏗️  Building and starting all services..."
echo "This will take 5-10 minutes on first run..."
echo ""

# Start all services
docker-compose up --build -d

echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 15

echo ""
echo "🔍 Checking service health..."
echo ""

# Function to check service health
check_health() {
    local service=$1
    local url=$2
    local name=$3
    
    if curl -s "$url" > /dev/null 2>&1; then
        echo "✅ $name is UP"
        return 0
    else
        echo "⚠️  $name is not ready yet"
        return 1
    fi
}

# Check all services
check_health "user-service" "http://localhost:8081/api/users/health" "User Service"
check_health "course-service" "http://localhost:8082/api/courses/health" "Course Service"
check_health "order-service" "http://localhost:8083/api/orders/health" "Order Service"
check_health "forum-service" "http://localhost:8084/api/forum/health" "Forum Service"
check_health "challenge-service" "http://localhost:8085/challenges/health" "Challenge Service"
check_health "news-service" "http://localhost:8086/news/health" "News Service"
check_health "api-gateway" "http://localhost:8080/actuator/health" "API Gateway"
check_health "frontend" "http://localhost:3000" "Frontend"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 CyberEdu Platform is running!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 Access Points:"
echo "   Frontend:        http://localhost:3000"
echo "   API Gateway:     http://localhost:8080"
echo "   RabbitMQ UI:     http://localhost:15672 (guest/guest)"
echo ""
echo "🔧 Management Commands:"
echo "   View logs:       docker-compose logs -f"
echo "   Stop all:        docker-compose down"
echo "   Restart:         docker-compose restart"
echo ""
echo "🧪 Run tests:       ./test-platform.sh"
echo ""
echo "Press Ctrl+C to view logs (services will keep running)"
echo ""

# Show logs
docker-compose logs -f
