---
title: "Docker Deployment Guide: From Development to Production"
date: 2024-10-15
summary: "Learn how to containerize your applications with Docker, optimize images, and deploy to production with best practices"
tags:
  - Docker
  - DevOps
  - Deployment
  - Tutorial
authors:
  - me
featured: false
---

Docker simplifies deployment by packaging your application with all dependencies. This guide covers containerizing apps, optimizing images, and production deployment.

## Why Docker?

**Problems Docker solves**:
- ❌ "Works on my machine" syndrome
- ❌ Complex dependency management
- ❌ Environment inconsistencies
- ❌ Difficult scaling

**Benefits**:
- ✅ Consistent environments (dev = prod)
- ✅ Easy scaling
- ✅ Simplified deployment
- ✅ Isolation and security

## Basic Dockerfile

For a Node.js application:

```dockerfile
# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

## Multi-Stage Builds (Optimization)

Reduce image size with multi-stage builds:

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

**Result**: Image size reduced from 800MB → 150MB!

## Docker Compose for Local Development

`docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

Start everything:

```bash
docker-compose up -d
```

## Environment Variables

Never hardcode secrets! Use `.env` file:

```env
# .env (add to .gitignore!)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=your-secret-key
API_KEY=your-api-key
```

Reference in docker-compose:

```yaml
services:
  app:
    env_file:
      - .env
```

## Production Dockerfile

Optimized for production:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy source
COPY . .

# Build application
RUN npm run build

# Remove devDependencies
RUN npm prune --production

# Production stage
FROM node:18-alpine

# Add non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy built app from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Use non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

## Image Optimization Tips

### 1. Use .dockerignore

```
node_modules
npm-debug.log
.git
.env
.DS_Store
*.md
.vscode
coverage
.github
```

### 2. Layer Caching

```dockerfile
# ❌ Bad: Changes to code invalidate ALL layers
COPY . .
RUN npm ci

# ✅ Good: Package changes don't rebuild code
COPY package*.json ./
RUN npm ci
COPY . .
```

### 3. Use Alpine Images

```dockerfile
# Large: node:18 (900MB)
FROM node:18

# Small: node:18-alpine (150MB)
FROM node:18-alpine
```

### 4. Combine RUN Commands

```dockerfile
# ❌ Bad: Multiple layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# ✅ Good: Single layer
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

## Deploying to AWS ECS

### 1. Build and Push to ECR

```bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t my-app .

# Tag image
docker tag my-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest

# Push to ECR
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
```

### 2. ECS Task Definition

```json
{
  "family": "my-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "my-app",
      "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:..."
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## Docker Security Best Practices

### 1. Use Non-Root User

```dockerfile
# Add user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Switch to user
USER nodejs
```

### 2. Scan for Vulnerabilities

```bash
# Using Trivy
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image my-app:latest
```

### 3. Keep Base Images Updated

```dockerfile
# ✅ Pin specific version, update regularly
FROM node:18.19.0-alpine

# ❌ Avoid 'latest' tag
FROM node:latest
```

### 4. Read-Only Filesystem

```yaml
services:
  app:
    read_only: true
    tmpfs:
      - /tmp
```

## Health Checks

Simple health check endpoint:

```javascript
// healthcheck.js
const http = require('http')

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
}

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})

request.on('error', () => {
  process.exit(1)
})

request.end()
```

## Monitoring & Logging

### Container Logs

```bash
# View logs
docker logs my-app

# Follow logs
docker logs -f my-app

# Last 100 lines
docker logs --tail 100 my-app
```

### Docker Stats

```bash
# View resource usage
docker stats

# Specific container
docker stats my-app
```

## Common Issues & Solutions

### Issue: Image Too Large

**Solution**: Multi-stage builds, Alpine images, .dockerignore

### Issue: Slow Builds

**Solution**: Optimize layer caching, use BuildKit

```bash
DOCKER_BUILDKIT=1 docker build -t my-app .
```

### Issue: Container Won't Start

**Solution**: Check logs, verify CMD/ENTRYPOINT

```bash
docker logs container-id
docker inspect container-id
```

## CI/CD Pipeline Example (GitHub Actions)

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and push image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: my-app
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

      - name: Update ECS service
        run: |
          aws ecs update-service --cluster my-cluster \
            --service my-app --force-new-deployment
```

## Best Practices Checklist

- [ ] Use multi-stage builds
- [ ] Use .dockerignore
- [ ] Run as non-root user
- [ ] Pin base image versions
- [ ] Scan for vulnerabilities
- [ ] Implement health checks
- [ ] Use environment variables for config
- [ ] Keep images small (<500MB)
- [ ] Tag images properly (not just 'latest')
- [ ] Set up logging and monitoring

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Docker Compose](https://docs.docker.com/compose/)

## Conclusion

Docker streamlines deployment by:
1. Creating consistent environments
2. Simplifying dependency management
3. Enabling easy scaling
4. Improving security through isolation

Start small, optimize incrementally, and always test in staging before production!

---

**Example repo**: [github.com/alexjohnson/docker-guide](https://github.com/alexjohnson/docker-guide)

Questions? Reach out on [Twitter](https://twitter.com/alexjohnson)!
