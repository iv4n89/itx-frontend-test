.PHONY: help run test stop clean

# Variables
DOCKER_IMAGE = itx-frontend-test
DOCKER_CONTAINER = itx-frontend-test-app
PORT = 3000

# Default target
help:
	@echo "ITX Frontend Test - Commands"
	@echo ""
	@echo "  make run    - Build and run application (http://localhost:3000)"
	@echo "  make test   - Run tests in Docker"
	@echo "  make stop   - Stop and remove container"
	@echo "  make clean  - Remove container and image"

# Build and run application
start:
	@echo "🐳 Building and running application..."
	@docker build -t $(DOCKER_IMAGE) .
	@docker stop $(DOCKER_CONTAINER) 2>/dev/null || true
	@docker rm $(DOCKER_CONTAINER) 2>/dev/null || true
	@docker run -d -p $(PORT):80 --name $(DOCKER_CONTAINER) $(DOCKER_IMAGE)
	@echo "✅ Application running at http://localhost:$(PORT)"

# Run tests
test:
	@echo "🧪 Running tests in Docker..."
	@docker build --target builder -t $(DOCKER_IMAGE)-test .
	@docker run --rm $(DOCKER_IMAGE)-test pnpm test
	@echo "✅ Tests completed"
	@echo "Remove test image..."
	@docker rmi $(DOCKER_IMAGE)-test 2>/dev/null || true

# Stop container
stop:
	@echo "🛑 Stopping container..."
	@docker stop $(DOCKER_CONTAINER) 2>/dev/null || true
	@docker rm $(DOCKER_CONTAINER) 2>/dev/null || true

# Clean everything
clean: stop
	@echo "🗑️  Removing images..."
	@docker rmi $(DOCKER_IMAGE) 2>/dev/null || true
	@docker rmi $(DOCKER_IMAGE)-test 2>/dev/null || true
