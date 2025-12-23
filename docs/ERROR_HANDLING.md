# Error Handling System

This document describes the error handling implementation based on the API contract specification.

## Overview

The error handling system provides a modular, maintainable way to handle errors from the backend API according to the API contract at https://github.com/r4ppz/research-repo-docs/blob/main/docs/api_contract.md

## Architecture

### Core Modules

1. **`src/types/api.ts`** - API error type definitions
2. **`src/util/getError.ts`** - Error extraction and normalization utilities
3. **`src/util/errorHandler.ts`** - Error handling logic based on error codes
4. **`src/hooks/useErrorHandler.ts`** - React hooks for component-level error handling

## Error Types

All API errors conform to this structure:

```typescript
interface ApiError {
  code: ErrorCode;
  message: string;
  details?: ApiErrorDetail[] | Record<string, unknown>;
  traceId?: string;
}
```

### Error Codes

| Code | HTTP | Category | Meaning |
|------|------|----------|---------|
| `VALIDATION_ERROR` | 400 | Input | Field-level validation failed |
| `INVALID_REQUEST` | 400 | Input | Malformed request |
| `UNAUTHENTICATED` | 401 | Auth | Missing/invalid JWT |
| `REFRESH_TOKEN_REVOKED` | 401 | Auth | Refresh token invalid |
| `ACCESS_DENIED` | 403 | AuthZ | Insufficient permissions |
| `DOMAIN_NOT_ALLOWED` | 403 | Auth | Email domain not whitelisted |
| `RESOURCE_NOT_FOUND` | 404 | Data | Resource doesn't exist |
| `RESOURCE_NOT_AVAILABLE` | 404 | Data | Resource archived/inaccessible |
| `DUPLICATE_REQUEST` | 409 | Business | Duplicate active request |
| `REQUEST_ALREADY_FINAL` | 409 | Business | Cannot modify final request |
| `FILE_TOO_LARGE` | 413 | Upload | File exceeds size limit |
| `UNSUPPORTED_MEDIA_TYPE` | 415 | Upload | Invalid file type |
| `RATE_LIMIT_EXCEEDED` | 429 | System | Too many requests |
| `INTERNAL_ERROR` | 500 | System | Server error |
| `FILE_STORAGE_ERROR` | 500 | System | File I/O error |
| `SERVICE_UNAVAILABLE` | 503 | System | Service down |

## Usage

### Basic Error Extraction

```typescript
import { extractApiError, getErrorMessage } from "@/util/getError";

try {
  await someApiCall();
} catch (err) {
  const apiError = extractApiError(err);
  if (apiError) {
    console.log(`Error code: ${apiError.code}`);
    console.log(`Message: ${apiError.message}`);
  } else {
    console.log(`Generic error: ${getErrorMessage(err)}`);
  }
}
```

### Error Handling with Actions

```typescript
import { handleError } from "@/util/errorHandler";

try {
  await someApiCall();
} catch (err) {
  const result = handleError(err);
  
  // The result tells you what action to take
  switch (result.action) {
    case "redirect_to_login":
      // Clear tokens and redirect
      clearTokens();
      navigate("/login");
      break;
      
    case "show_validation_errors":
      // Show inline field errors
      result.validationErrors?.forEach(({ field, message }) => {
        setFieldError(field, message);
      });
      break;
      
    case "show_toast_error":
      // Show error toast
      toast.error(result.message);
      break;
      
    // ... handle other actions
  }
}
```

### Using Error Handler Hook

```typescript
import { useErrorHandler } from "@/hooks/useErrorHandler";

function MyComponent() {
  const { error, handleApiError, clearError } = useErrorHandler();
  
  const handleSubmit = async () => {
    try {
      await submitData();
    } catch (err) {
      const result = handleApiError(err);
      
      // Handle based on action
      if (result.action === "show_toast_error") {
        toast.error(result.message);
      }
    }
  };
  
  return (
    <div>
      {error && <ErrorDisplay error={error} onClose={clearError} />}
      {/* ... */}
    </div>
  );
}
```

### Using Async Error Hook

```typescript
import { useAsyncError } from "@/hooks/useErrorHandler";

function MyComponent() {
  const { execute, loading, error } = useAsyncError(async () => {
    return await fetchData();
  });
  
  useEffect(() => {
    void execute();
  }, [execute]);
  
  if (loading) return <Loading />;
  if (error) return <ErrorDisplay error={error} />;
  
  return <div>{/* ... */}</div>;
}
```

## Frontend Rendering Rules

According to the API contract, each error code should be handled as follows:

### Authentication Errors
- `UNAUTHENTICATED`, `REFRESH_TOKEN_REVOKED`: Clear tokens, redirect to login (no message)

### Authorization Errors
- `ACCESS_DENIED`: Show 403 access denied page
- `DOMAIN_NOT_ALLOWED`: Show blocking error during login

### Validation Errors
- `VALIDATION_ERROR`: Show inline field errors from `details` array
- `INVALID_REQUEST`: Show page-level alert

### Resource Errors
- `RESOURCE_NOT_FOUND`: Show 404 page (no toast)
- `RESOURCE_NOT_AVAILABLE`: Show "Archived" badge (not an error)

### Business Errors
- `DUPLICATE_REQUEST`: Show warning toast
- `REQUEST_ALREADY_FINAL`: Show info toast

### Upload Errors
- `FILE_TOO_LARGE`, `UNSUPPORTED_MEDIA_TYPE`: Show inline upload error

### System Errors
- `INTERNAL_ERROR`, `FILE_STORAGE_ERROR`: Show global error UI with trace ID
- `SERVICE_UNAVAILABLE`: Show retry UI with countdown
- `RATE_LIMIT_EXCEEDED`: Show alert with retry countdown, disable submission

## Auth Error Handling

The authentication flow has special error handling:

1. **Login Flow** (`useGoogleLogin`):
   - `DOMAIN_NOT_ALLOWED`: Shows detailed message about email domain
   - `INVALID_TOKEN`: Shows authentication failed message

2. **Auto-Login Flow** (`useAutoLogin`):
   - `REFRESH_TOKEN_REVOKED`, `UNAUTHENTICATED`: Silently clears tokens (expected behavior)
   - Other errors: Shows error modal

3. **Axios Interceptor**:
   - Automatically attempts token refresh on 401 errors
   - Redirects to login on refresh failure or `REFRESH_TOKEN_REVOKED`
   - Queues failed requests and retries after successful refresh

## Type Guards and Utilities

```typescript
// Check if error should redirect to login
shouldRedirectToLogin(err: unknown): boolean

// Check if error is auth-related
isAuthError(err: unknown): boolean

// Check if error is validation error
isValidationError(err: unknown): boolean

// Extract validation errors
getValidationErrors(err: unknown): Array<{field: string, message: string}> | null

// Check if Error has API error attached
hasApiError(error: Error): boolean
```

## Best Practices

1. **Always use the error utilities** - Don't parse axios errors manually
2. **Route on `code`, not `message`** - Error codes are stable, messages may change
3. **Handle all error actions** - Implement UI for all error action types
4. **Log trace IDs** - Include trace IDs in bug reports and support requests
5. **Don't show stack traces** - API errors never include internal details
6. **Respect security boundaries** - Some 404s hide unauthorized access
7. **Disable during rate limits** - Respect `retryAfter` values

## Security Considerations

1. **Information Leakage Prevention**:
   - `RESOURCE_NOT_AVAILABLE` returns 404 (not 403) to prevent enumeration
   - Students get identical 404 for non-existent and inaccessible papers
   - All refresh token failures return same generic message

2. **Defensive Handling**:
   - All unhandled exceptions map to `INTERNAL_ERROR`
   - Stack traces logged server-side only
   - File path traversal caught and returns `INVALID_REQUEST`

3. **Audit Requirements**:
   - Log all `FILE_STORAGE_ERROR` for monitoring
   - Log all `INTERNAL_ERROR` with full stack trace
   - Log all auth failures for security monitoring
   - Log rate limit violations for abuse detection

## Testing

When testing error handling:

1. Test each error code path
2. Verify correct action is returned
3. Test validation error field mapping
4. Test rate limiting countdown
5. Test trace ID logging for system errors
6. Test auth error redirect flows

## Migration Guide

If you have existing error handling code:

1. Replace direct axios error parsing with `extractApiError()`
2. Replace generic error messages with error code-based handling
3. Add proper error action handling for each error type
4. Update components to use `useErrorHandler` hook
5. Remove custom error normalization in favor of utilities
