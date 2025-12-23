# Error Handling Guide

This document describes how to handle errors from the API according to the contract from https://github.com/r4ppz/research-repo-docs/blob/main/docs/api_contract.md

## Error Utilities

All error handling utilities are located in `src/util/getError.ts`.

### Available Functions

- `parseApiError(err: unknown): ApiError | null` - Extracts structured API error from axios error
- `getErrorMessage(err: unknown): string` - Gets user-friendly error message
- `getErrorCode(err: unknown): string | null` - Gets error code from API error
- `isErrorCode(err: unknown, code: ErrorCode): boolean` - Checks if error matches a specific code
- `isAuthError(err: unknown): boolean` - Checks if error is authentication-related
- `normalizeError(err: unknown): Error` - Converts any error to Error object

### Error Codes

All error codes are defined in `ERROR_CODES` constant:

```typescript
import { ERROR_CODES, getErrorCode, getErrorMessage } from "@/util/getError";
```

#### Authentication Errors
- `INVALID_TOKEN` - Invalid Google token during login
- `DOMAIN_NOT_ALLOWED` - Email domain not allowed
- `UNAUTHENTICATED` - User not authenticated (401)
- `REFRESH_TOKEN_REVOKED` - Refresh token expired or revoked

#### Authorization Errors
- `ACCESS_DENIED` - User doesn't have permission (403)

#### Resource Errors
- `RESOURCE_NOT_FOUND` - Resource doesn't exist (404)
- `RESOURCE_NOT_AVAILABLE` - Resource exists but is archived (404)

#### Validation Errors
- `VALIDATION_ERROR` - Request validation failed (400)
- `INVALID_REQUEST` - Malformed request (400)

#### Business Rule Violations
- `DUPLICATE_REQUEST` - Duplicate active request exists (409)
- `REQUEST_ALREADY_FINAL` - Request already processed (409)

#### File Errors
- `FILE_TOO_LARGE` - File exceeds 20MB limit (413)
- `UNSUPPORTED_MEDIA_TYPE` - File is not PDF/DOCX (415)
- `FILE_STORAGE_ERROR` - Server file storage error (500)

#### System Errors
- `INTERNAL_ERROR` - Internal server error (500)
- `SERVICE_UNAVAILABLE` - Service temporarily unavailable (503)
- `RATE_LIMIT_EXCEEDED` - Too many requests (429)

## Usage Examples

### Basic Error Handling

```typescript
import { getErrorMessage, getErrorCode, ERROR_CODES } from "@/util/getError";

try {
  await someApiCall();
} catch (err: unknown) {
  const code = getErrorCode(err);
  const message = getErrorMessage(err);
  
  if (code === ERROR_CODES.DOMAIN_NOT_ALLOWED) {
    // Show specific message for domain not allowed
    showError("Please use your official college email address");
  } else {
    // Show generic error message from API
    showError(message);
  }
}
```

### Authentication Error Handling

The axios interceptor in `src/api/axiosClient.ts` automatically handles:
- Token refresh on 401 errors
- Automatic redirect to login on `UNAUTHENTICATED` or `REFRESH_TOKEN_REVOKED`
- Prevents refresh attempts when `REFRESH_TOKEN_REVOKED` is returned

### Login Error Handling

In `LoginPage.tsx`, specific auth errors are handled:

```typescript
try {
  await login(authCode);
} catch (err: unknown) {
  const errorCode = getErrorCode(err);
  
  if (errorCode === ERROR_CODES.INVALID_TOKEN) {
    setError("Authentication failed. Please try again.");
  } else if (errorCode === ERROR_CODES.DOMAIN_NOT_ALLOWED) {
    setError("Email domain not allowed. Please use your official college email.");
  } else {
    setError(getErrorMessage(err));
  }
}
```

### Frontend Rendering Rules (from API Contract)

1. **Validation Errors** - Show inline next to form fields, no toast
2. **Authentication Errors** - Clear tokens and redirect to login, no message
3. **Authorization Errors** - Show dedicated 403 page
4. **Resource Not Found** - Show standard 404 page
5. **Resource Not Available** - Show "archived" badge, not treated as error
6. **Business Rule Violations** - Show toast warning
7. **System Errors** - Show global error with trace ID for support
8. **Rate Limiting** - Show toast with retry countdown

## Implementation Checklist

- [x] Error types defined in `src/types/api.ts`
- [x] Error utilities in `src/util/getError.ts`
- [x] Axios interceptor handles auth errors automatically
- [x] Login page handles INVALID_TOKEN and DOMAIN_NOT_ALLOWED
- [x] Refresh token revoked handling
- [ ] Validation error field-level display
- [ ] 403 Access Denied page
- [ ] 404 Not Found page
- [ ] Archived badge UI
- [ ] Toast notifications for business rules
- [ ] Global error display with trace ID
- [ ] Rate limit countdown UI

## Testing

To test error handling:

1. **INVALID_TOKEN**: Use invalid Google OAuth code
2. **DOMAIN_NOT_ALLOWED**: Login with non-college email
3. **REFRESH_TOKEN_REVOKED**: Backend expires refresh token
4. **UNAUTHENTICATED**: Make API call with expired access token

The axios interceptor will automatically handle token refresh and redirect to login when needed.
