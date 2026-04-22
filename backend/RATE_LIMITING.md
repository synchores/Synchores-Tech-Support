# Rate Limiting Implementation

This document describes the rate limiting setup for the Synchores backend using `@nestjs/throttler`.

## Overview

Rate limiting protects your API from abuse by restricting the number of requests a client can make within a specified time window. This implementation includes:

- **Global throttler** with default limits
- **GraphQL-specific guard** that extracts IP from GraphQL context
- **Custom exception filter** that returns proper GraphQL error codes (429)
- **Per-mutation throttling** for sensitive endpoints like contact forms

---

## Architecture

### 1. Global Module Setup

**File:** `src/app.module.ts`

The `ThrottlerModule` is initialized globally with default limits:

```typescript
import { ThrottlerModule, seconds } from '@nestjs/throttler';

ThrottlerModule.forRoot([
  {
    ttl: seconds(60),  // 60-second window
    limit: 5,          // 5 requests per IP
  },
])
```

**Key Points:**
- `ttl` is in **milliseconds**, use `seconds()` helper to convert: `seconds(60)` = 60,000ms
- `limit` is the max requests per time window
- All requests are throttled by default (global guard)

### 2. GraphQL Throttler Guard

**File:** `src/common/guards/gql-throttler.guard.ts`

Custom guard that properly extracts request context from GraphQL:

```typescript
@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  protected getRequestResponse(context: ExecutionContext) {
    // Handle HTTP routes
    if (context.getType() === 'http') {
      const http = context.switchToHttp();
      return { req: http.getRequest(), res: http.getResponse() };
    }

    // Handle GraphQL resolvers
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return { req: request, res: request.res };
  }
}
```

**Why needed:**
- Default `ThrottlerGuard` expects HTTP requests
- GraphQL queries don't have the same request structure
- This guard extracts `req` from GraphQL context for proper IP tracking

### 3. Exception Filter

**File:** `src/common/filters/gql-throttler-exception.filter.ts`

Maps throttler exceptions to proper GraphQL error codes:

```typescript
@Catch(ThrottlerException)
export class GqlThrottlerExceptionFilter implements GqlExceptionFilter {
  catch(): GraphQLError {
    return new GraphQLError('Too Many Requests', {
      extensions: {
        code: 'TOO_MANY_REQUESTS',      // Clean GraphQL code
        statusCode: 429,                // HTTP status
        retryAfter: 'Please wait before retrying',
      },
    });
  }
}
```

**Registered in:** `src/main.ts`

```typescript
app.useGlobalFilters(new GqlThrottlerExceptionFilter());
```

---

## Usage

### Global Throttling

By default, all routes/mutations are throttled at 5 requests per 60 seconds (configured in `AppModule`).

**Response on throttle hit:**
```json
{
  "errors": [
    {
      "message": "Too Many Requests",
      "extensions": {
        "code": "TOO_MANY_REQUESTS",
        "statusCode": 429,
        "retryAfter": "Please wait before retrying"
      }
    }
  ]
}
```

### Per-Endpoint Throttling

Use `@Throttle()` decorator to override global limits on specific mutations/routes:

```typescript
import { Throttle, seconds } from '@nestjs/throttler';

@Mutation(() => InquiryFormTbl)
@Throttle({
  default: {
    limit: 3,
    ttl: seconds(60),  // 3 requests per 60 seconds
  },
})
async createInquiryForm(@Args('input') input: CreateInquiryFormDto) {
  return await this.inquiryFormService.createInquiryForm(input);
}
```

**Example:** Contact form mutation is limited to 3 requests per minute.

### Skip Throttling

Use `@SkipThrottle()` to disable throttling for specific endpoints:

```typescript
@Mutation(() => Boolean)
@SkipThrottle()
async publicEndpoint() {
  // This endpoint is NOT throttled
}
```

---

## Configuration Details

### TTL (Time-To-Live)

Specifies how long the request counter resets:

- `seconds(1)` = 1 second window
- `seconds(60)` = 1 minute window
- `minutes(1)` = 1 minute window
- `hours(1)` = 1 hour window

Available helpers from `@nestjs/throttler`:
```typescript
import { seconds, minutes, hours, days, weeks } from '@nestjs/throttler';
```

### Limit

Maximum requests allowed within the TTL window:

```typescript
limit: 5        // 5 requests allowed
limit: 10       // 10 requests allowed
```

### Cloudflare / Proxy Environments

Since you're running behind Cloudflare, the guard needs to trust the proxy:

**In `src/main.ts`:**
```typescript
app.set('trust proxy', 1);
```

This ensures `req.ip` correctly extracts the **client IP** instead of the proxy IP.

---

## Examples

### Example 1: Strict Contact Form

Limit contact form to 1 request per 5 minutes:

```typescript
@Mutation(() => InquiryFormTbl)
@Throttle({
  default: {
    limit: 1,
    ttl: seconds(300),  // 5 minutes
  },
})
async createInquiryForm(@Args('input') input: CreateInquiryFormDto) {
  return await this.inquiryFormService.createInquiryForm(input);
}
```

### Example 2: Loose Login Endpoint

Allow more attempts for login (override global limit):

```typescript
@Mutation(() => LoginResponse)
@Throttle({
  default: {
    limit: 10,
    ttl: seconds(300),  // 10 attempts per 5 minutes
  },
})
async login(@Args('input') input: LoginDto) {
  return await this.authService.login(input);
}
```

### Example 3: Public Query (No Throttle)

Public endpoints don't need throttling:

```typescript
@Query(() => [ServicesTbl])
@SkipThrottle()
async getAllServices() {
  return await this.servicesService.findAll();
}
```

---

## Testing Rate Limits

### In GraphQL Playground

1. Open `http://localhost:3000/graphql` (ensure `PLAYGROUND=true` in `.env`)
2. Run this mutation repeatedly:

```graphql
mutation {
  createInquiryForm(input: {
    fullName: "Test User"
    email: "test@example.com"
    contactNumber: "+1234567890"
    message: "Testing rate limits"
    serviceType: "Support"
  }) {
    inquiryId
    fullName
    email
  }
}
```

3. **Expected behavior:**
   - Requests 1–3: Success (limit is 3 per 60s)
   - Request 4: Error with `TOO_MANY_REQUESTS` code
   - After 60 seconds: Counter resets, request succeeds

### Response When Throttled

```json
{
  "errors": [
    {
      "message": "Too Many Requests",
      "extensions": {
        "code": "TOO_MANY_REQUESTS",
        "statusCode": 429,
        "retryAfter": "Please wait before retrying"
      }
    }
  ]
}
```

---

## Response Headers

When `setHeaders` is enabled (default), throttled responses include:

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1650000000
Retry-After: 30000
```

These headers help clients implement smart retry logic.

---

## Files Involved

| File | Purpose |
|------|---------|
| `src/app.module.ts` | Global throttler config |
| `src/common/guards/gql-throttler.guard.ts` | GraphQL context extraction |
| `src/common/filters/gql-throttler-exception.filter.ts` | Error code mapping |
| `src/main.ts` | Filter registration + proxy trust |
| `src/modules/general/inquiry-form/inquiry-form.resolver.ts` | Per-mutation throttle example |

---

## Best Practices

1. **Use meaningful time windows:**
   - Contact forms: 3–5 requests per minute
   - Login: 10–20 attempts per 5 minutes
   - Public queries: No throttle or loose limits

2. **Always set headers:**
   - Helps clients implement retry logic
   - Reduces support overhead

3. **Test in development:**
   - Use GraphQL Playground to verify limits
   - Check response codes and headers

4. **Monitor in production:**
   - Log throttle hits for abuse patterns
   - Adjust limits based on real usage

5. **Never throttle:**
   - Public read-only queries
   - Critical system endpoints
   - Health check endpoints

---

## Troubleshooting

### Issue: Throttling not working

**Solution:**
- Ensure `seconds()` helper is used, not raw milliseconds: `ttl: seconds(60)` ✓ not `ttl: 60` ✗
- Restart backend after config changes
- Check that `GqlThrottlerGuard` is registered as `APP_GUARD`

### Issue: Wrong IP detected

**Solution:**
- Ensure `app.set('trust proxy', 1)` is set in `main.ts`
- Verify Cloudflare is set to "Full (strict)" SSL mode
- Check request headers for `X-Forwarded-For`

### Issue: Generic 500 error instead of 429

**Solution:**
- Verify `GqlThrottlerExceptionFilter` is registered in `main.ts`
- Ensure filter is registered before other global filters
- Check filter is catching `ThrottlerException`

---

## Resources

- [NestJS Throttler Docs](https://docs.nestjs.com/security/rate-limiting)
- [GraphQL Error Handling](https://docs.nestjs.com/graphql/quick-start)
- [HTTP Status Codes - 429](https://httpwg.org/specs/rfc6585.html#status.429)
