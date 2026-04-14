

## Plan: Add Preview Routes for Error & 404 Pages

Add temporary routes to `src/App.tsx` so you can visit and preview the error boundary pages in your browser.

### Routes to Add

| Path | Component |
|------|-----------|
| `/preview/not-found` | `src/app/not-found.tsx` |
| `/preview/error` | `src/app/error.tsx` |
| `/preview/global-error` | `src/app/global-error.tsx` |
| `/preview/app-error` | `src/app/(app)/error.tsx` |
| `/preview/public-error` | `src/app/(public)/error.tsx` |

### Changes

**File: `src/App.tsx`**
- Import all 5 components from `src/app/`
- Add 5 `<Route>` entries under `/preview/*` above the catch-all
- Pass mock `error` and `reset` props so they render without a real crash

