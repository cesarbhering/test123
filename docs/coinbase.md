# Coinbase Clone

A simplified Coinbase clone built with Next.js, Prisma, and SQLite.

## Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database with test data
npm run db:seed

# Run
npm run dev
```
### Usage
Application runs at: http://localhost:3000

## Test Login

**Email:** `test@coinbase.com`
**Password:** `password123`

## Routes

- `/` - Landing page
- `/signin` - Sign in page
- `/home` - Dashboard (after login)

## Database Commands

```bash
# View database in GUI
npx prisma studio

# Reset database (deletes all data)
npx prisma migrate reset

# Re-seed database
npm run db:seed
```
