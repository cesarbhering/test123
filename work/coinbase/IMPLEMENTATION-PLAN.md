# Coinbase Clone - Implementation Plan

## Architecture Overview

```
┌───────────────────────────────────────────────────────────┐
│              Next.js App (Single Repo)                    │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │          Frontend (React Components)            │   │
│  │  - Sign in page                                  │   │
│  │  - Dashboard (balances, coin prices)            │   │
│  │  - User interface                                │   │
│  └─────────────────────────────────────────────────┘   │
│                         ↕                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │          Backend (Next.js API Routes)           │   │
│  │  - /api/login                                    │   │
│  │  - /api/register                                 │   │
│  │  - /api/balance                                  │   │
│  │  - /api/coins                                    │   │
│  └─────────────────────────────────────────────────┘   │
│                         ↕                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Prisma ORM (Database Layer)          │   │
│  │  - Type-safe queries                             │   │
│  │  - Schema management                             │   │
│  └─────────────────────────────────────────────────┘   │
│                         ↕                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │         SQLite Database (data.db file)          │   │
│  │  - users table                                   │   │
│  │  - balances table                                │   │
│  │  - coins table                                   │   │
│  └─────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Table: users
| Column | Type | Constraints |
|--------|------|-------------|
| id | String (cuid) | PRIMARY KEY |
| email | String | UNIQUE, NOT NULL |
| password_hash | String | NOT NULL |
| created_at | DateTime | DEFAULT NOW() |
| updated_at | DateTime | AUTO UPDATE |

### Table: balances
| Column | Type | Constraints |
|--------|------|-------------|
| id | String (cuid) | PRIMARY KEY |
| user_id | String | FOREIGN KEY → users(id) |
| coin_symbol | String | NOT NULL ("USD", "BTC") |
| amount | Decimal(20,8) | DEFAULT 0 |
| created_at | DateTime | DEFAULT NOW() |
| updated_at | DateTime | AUTO UPDATE |

**Unique Constraint:** (user_id, coin_symbol) - one balance per coin per user

### Table: coins
| Column | Type | Constraints |
|--------|------|-------------|
| id | String (cuid) | PRIMARY KEY |
| symbol | String | UNIQUE, NOT NULL ("USD", "BTC") |
| name | String | NOT NULL ("US Dollar", "Bitcoin") |
| current_price_usd | Decimal(20,8) | NOT NULL |
| updated_at | DateTime | AUTO UPDATE |

---

## Technology Stack

| Component | Technology | Why |
|-----------|------------|-----|
| **Frontend** | Next.js 15 + React 18 | Already in use |
| **UI Components** | Coinbase Design System | Already in use |
| **Backend** | Next.js API Routes | Built-in, no extra setup |
| **Database** | SQLite | File-based, no external service |
| **ORM** | Prisma | Type-safe, easy migrations |
| **Authentication** | bcryptjs + JWT | Simple, standard |
| **Session Management** | next-auth or simple JWT | TBD |

---

## Implementation Steps

### Phase 1: Database Setup
1. Install Prisma and dependencies
   ```bash
   npm install prisma @prisma/client bcryptjs
   npm install -D @types/bcryptjs
   ```

2. Initialize Prisma with SQLite
   ```bash
   npx prisma init --datasource-provider sqlite
   ```

3. Create schema in `prisma/schema.prisma`
4. Run migration
   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed database with initial coins (USD, BTC)

### Phase 2: API Routes
Create backend endpoints:

- **POST /api/auth/register**
  - Create new user
  - Hash password
  - Create initial balances (USD: $10,000, BTC: 0)
  - Return JWT token

- **POST /api/auth/login**
  - Validate email/password
  - Return JWT token

- **GET /api/balance**
  - Require authentication
  - Return user's USD and BTC balances

- **GET /api/coins**
  - Return all available coins with current prices

### Phase 3: Frontend Integration
1. Update sign-in page to call `/api/auth/login`
2. Create dashboard page showing:
   - USD balance
   - BTC balance
   - Current BTC price
3. Store JWT token in cookies/localStorage
4. Add authentication middleware

### Phase 4: Features
- Buy/Sell functionality
- Transaction history
- Price updates (manual or API integration)

---

## File Structure

```
coinbase/
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Initial data (coins)
│   └── migrations/             # Migration files
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── balance/route.ts
│   │   │   └── coins/route.ts
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard with balances
│   │   └── page.tsx            # Sign-in page (exists)
│   └── lib/
│       ├── prisma.ts           # Prisma client instance
│       ├── auth.ts             # Auth helpers (JWT, bcrypt)
│       └── middleware.ts       # Auth middleware
├── .env                        # DATABASE_URL and secrets
└── package.json
```

---

## Initial Seed Data

When database is created, seed with:

```typescript
// Default coins
{ symbol: "USD", name: "US Dollar", current_price_usd: 1.00 }
{ symbol: "BTC", name: "Bitcoin", current_price_usd: 45000.00 }

// New users automatically get:
USD balance: 10000.00 (demo money)
BTC balance: 0.00
```

---

## Environment Variables

Create `.env` file:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
```

---

## Migration Path (Future)

To upgrade to PostgreSQL for production:
1. Change `datasource` in schema.prisma to `postgresql`
2. Update DATABASE_URL to PostgreSQL connection string
3. Run `npx prisma migrate dev`
4. No code changes needed!

Recommended free PostgreSQL hosting:
- Neon (serverless, free tier)
- Supabase (includes auth, free tier)
- Railway (free tier)

---

## Security Considerations

- Passwords hashed with bcryptjs (bcrypt rounds: 10)
- JWT tokens for session management
- API routes protected with middleware
- SQL injection prevented by Prisma
- Input validation on all endpoints
- HTTPS only in production

---

## Next Steps

**Ready to implement?** Start with:
1. Database setup (Phase 1)
2. Create one API route to test (login)
3. Connect frontend to backend
4. Iterate from there

**Estimated time:** 2-3 hours for basic working version
