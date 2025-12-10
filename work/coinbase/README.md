# Coinbase Clone

A simplified Coinbase clone built with Next.js and localStorage.

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Usage

Application runs at: http://localhost:3000

The database is automatically initialized with seed data on first load using localStorage.

## Test Login

**Email:** `test@coinbase.com`
**Password:** `password123`

## Routes

- `/` - Landing page
- `/signin` - Sign in page
- `/home` - Dashboard (after login)

## Storage

Data is stored in browser localStorage using a custom storage abstraction layer at `src/lib/storage.ts`.

To reset data, clear your browser's localStorage or use:
```javascript
// In browser console
localStorage.clear()
```
