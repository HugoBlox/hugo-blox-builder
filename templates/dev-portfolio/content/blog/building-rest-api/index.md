---
title: "Building a Production-Ready REST API with Node.js and Express"
date: 2024-12-10
summary: "A comprehensive guide to building scalable, secure REST APIs with proper error handling, validation, and documentation"
tags:
  - Node.js
  - Express
  - REST API
  - Backend
  - Tutorial
authors:
  - me
featured: true
---

Building a REST API seems straightforward until you need to handle authentication, validation, error handling, and documentation. This guide covers best practices for production-ready APIs.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Folder Structure](#folder-structure)
3. [Database Integration](#database)
4. [Authentication & Authorization](#auth)
5. [Error Handling](#errors)
6. [Validation](#validation)
7. [API Documentation](#docs)
8. [Testing](#testing)

## Project Setup {#project-setup}

Start with a solid foundation:

```bash
mkdir my-api && cd my-api
npm init -y
npm install express dotenv cors helmet compression
npm install -D typescript @types/node @types/express ts-node-dev
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## Folder Structure {#folder-structure}

Organize your code for maintainability:

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Helper functions
├── validators/     # Input validation
└── app.ts          # App setup
```

## Database Integration {#database}

Using Prisma for type-safe database access:

```typescript
// prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```typescript
// src/config/database.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : []
})

export default prisma
```

## Authentication & Authorization {#auth}

Implement JWT-based authentication:

```typescript
// src/middleware/auth.ts
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface JWTPayload {
  userId: string
  email: string
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JWTPayload

    req.user = payload
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
```

## Error Handling {#errors}

Centralized error handling:

```typescript
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express'

class AppError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  // Log unexpected errors
  console.error('Unexpected error:', err)

  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}

export { AppError }
```

## Validation {#validation}

Use Zod for runtime validation:

```typescript
// src/validators/userValidator.ts
import { z } from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters')
  })
})

export const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 'error',
          errors: error.errors
        })
      }
      next(error)
    }
  }
}
```

## API Documentation {#docs}

Auto-generate docs with Swagger:

```typescript
// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
}

export const swaggerSpec = swaggerJsdoc(options)
```

Document endpoints in route files:

```typescript
/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/users', validate(createUserSchema), createUser)
```

## Testing {#testing}

Write tests with Jest and Supertest:

```typescript
// tests/users.test.ts
import request from 'supertest'
import app from '../src/app'
import prisma from '../src/config/database'

describe('User API', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          email: 'test@example.com',
          name: 'Test User',
          password: 'password123'
        })
        .expect(201)

      expect(res.body).toHaveProperty('id')
      expect(res.body.email).toBe('test@example.com')
    })

    it('should return 400 for invalid email', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          email: 'invalid-email',
          name: 'Test User',
          password: 'password123'
        })
        .expect(400)

      expect(res.body).toHaveProperty('errors')
    })
  })
})
```

## Security Best Practices

1. **Rate Limiting**
   ```typescript
   import rateLimit from 'express-rate-limit'
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   })
   
   app.use('/api/', limiter)
   ```

2. **Helmet** for security headers
   ```typescript
   import helmet from 'helmet'
   app.use(helmet())
   ```

3. **CORS** configuration
   ```typescript
   import cors from 'cors'
   app.use(cors({
     origin: process.env.ALLOWED_ORIGINS?.split(','),
     credentials: true
   }))
   ```

4. **Input Sanitization**
   ```typescript
   import mongoSanitize from 'express-mongo-sanitize'
   app.use(mongoSanitize())
   ```

## Performance Optimization

### 1. Response Compression
```typescript
import compression from 'compression'
app.use(compression())
```

### 2. Caching
```typescript
import Redis from 'ioredis'
const redis = new Redis(process.env.REDIS_URL)

async function getCachedData(key: string) {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)
  
  const data = await fetchFromDatabase()
  await redis.setex(key, 3600, JSON.stringify(data))
  return data
}
```

### 3. Database Query Optimization
```typescript
// Use pagination
const users = await prisma.user.findMany({
  skip: (page - 1) * limit,
  take: limit,
  select: {
    id: true,
    email: true,
    name: true
    // Don't select sensitive fields like password
  }
})

// Use indexes
@@index([email])
@@index([createdAt])
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL/TLS certificates installed
- [ ] Rate limiting enabled
- [ ] Logging configured (Winston, Morgan)
- [ ] Error tracking (Sentry)
- [ ] Health check endpoint
- [ ] API documentation deployed
- [ ] Load testing completed
- [ ] Backup strategy implemented

## Monitoring

```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.status(200).json({ status: 'healthy', timestamp: new Date() })
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message })
  }
})
```

## Conclusion

Building production-ready APIs requires attention to:
- **Structure**: Organized code is maintainable code
- **Security**: Authentication, validation, and rate limiting
- **Errors**: Proper error handling and logging
- **Testing**: Comprehensive test coverage
- **Documentation**: Clear API docs for consumers
- **Performance**: Caching and optimization

The complete example code is available on [GitHub](https://github.com/alexjohnson/rest-api-guide).

## Resources

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Security Checklist](https://github.com/goldbergyoni/nodebestpractices#6-security-best-practices)
- [Prisma Documentation](https://www.prisma.io/docs)

---

Questions? Leave a comment below or reach out on [Twitter](https://twitter.com/alexjohnson)!
