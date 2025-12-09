# Database Schema for Coinbase Clone

## ✅ Implementation Status: COMPLETE

**Implementation:** Prisma 5 + SQLite (Local Development)
**Database File:** `prisma/dev.db`
**Schema File:** `prisma/schema.prisma`

## Overview
Simple schema for user authentication, USD/BTC/ETH balances, and coin price tracking.

## Schema Design

### Tables

#### 1. users
Stores user authentication information.

| Column | Type | Constraints |
|--------|------|-------------|
| id | String (cuid) | PRIMARY KEY |
| email | String | UNIQUE, NOT NULL |
| password | String | NOT NULL (plain text) |
| created_at | DateTime | DEFAULT NOW() |
| updated_at | DateTime | AUTO UPDATE |

#### 2. balances
Stores user balances for different coins.

| Column | Type | Constraints |
|--------|------|-------------|
| id | String (cuid) | PRIMARY KEY |
| user_id | String | FOREIGN KEY → users(id) |
| coin_symbol | String | NOT NULL (e.g., "USD", "BTC", "ETH") |
| amount | Float | DEFAULT 0, NOT NULL |
| created_at | DateTime | DEFAULT NOW() |
| updated_at | DateTime | AUTO UPDATE |

**Indexes:**
- UNIQUE(user_id, coin_symbol) - One balance per coin per user
- INDEX(user_id)

#### 3. coins
Stores available coins and their current prices.

| Column | Type | Constraints |
|--------|------|-------------|
| id | String (cuid) | PRIMARY KEY |
| symbol | String | UNIQUE, NOT NULL (e.g., "USD", "BTC", "ETH") |
| name | String | NOT NULL (e.g., "US Dollar", "Bitcoin", "Ethereum") |
| current_price_usd | Float | NOT NULL |
| updated_at | DateTime | AUTO UPDATE |

---

## ✅ Chosen Implementation: Prisma 5 + SQLite

**Selected:** Option 2 - Prisma + SQLite (Local Development)

**Why:**
- Zero configuration - database is just a file
- Perfect for single-repo setup
- No external services needed
- Can upgrade to PostgreSQL later without code changes

**Installed:**
```bash
✓ prisma@5.22.0
✓ @prisma/client@5.22.0
✓ dotenv@17.2.3
```

**Files created:**
- `prisma/schema.prisma` - Database schema
- `prisma/dev.db` - SQLite database file
- `prisma/seed.js` - Seed data script
- `prisma/migrations/` - Migration history
- `.env` - Environment variables

---

## ✅ Seeded Data

**Coins (3 total):**
| Symbol | Name | Price (USD) |
|--------|------|-------------|
| USD | US Dollar | $1.00 |
| BTC | Bitcoin | $45,000.00 |
| ETH | Ethereum | $2,500.00 |

**Test User:**
- Email: `test@coinbase.com`
- Password: `password123` (plain text, no encryption)

**Test User Balances:**
- USD: $10,000.00 (starting demo money)
- BTC: 0.00
- ETH: 0.00

---

## Available Commands

**Database Management:**
```bash
# Run seed data (populate database with initial data)
npm run db:seed

# Open Prisma Studio (database GUI)
npx prisma studio

# Generate Prisma Client (after schema changes)
npx prisma generate

# Create new migration
npx prisma migrate dev --name <migration_name>

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

---

## Test Credentials

**Login to test the application:**
```
Email: test@coinbase.com
Password: password123
```

**Expected balances after login:**
- USD: $10,000.00
- BTC: 0.00 BTC
- ETH: 0.00 ETH

---

## Next Steps

✅ ~~1. Database setup~~ **COMPLETE**
✅ ~~2. Schema creation~~ **COMPLETE**
✅ ~~3. Migrations~~ **COMPLETE**
✅ ~~4. Seed data~~ **COMPLETE**

**TODO:**
5. Create API routes for authentication
6. Create API routes for balance retrieval
7. Connect frontend to backend APIs
