# Database

MongoDB persistence for **MarkGauge** — connection helper, Mongoose models, local seeding, and health checks.

---

## Connection

`mongoose.ts` exports `connectToDatabase()`, a serverless-safe singleton that caches the Mongoose connection across hot reloads and serverless invocations.

**Required env:** `MONGODB_URI` (see root `.env.example`).

```typescript
import { connectToDatabase } from '@/database/mongoose';

const mongoose = await connectToDatabase();
```

---

## Models

| Model | File | Collection | Purpose |
|-------|------|------------|---------|
| Watchlist | `models/watchlist.model.ts` | `watchlists` | User-scoped saved symbols |
| Alert | `models/alert.model.ts` | `alerts` | Price rules (upper / lower thresholds) |

### Watchlist fields

| Field | Type | Notes |
|-------|------|-------|
| `userId` | string | Owner (Better Auth user id) |
| `symbol` | string | Ticker, stored uppercase |
| `company` | string | Display name |
| `addedAt` | Date | Default `Date.now` |

**Index:** unique `{ userId: 1, symbol: 1 }`

### Alert fields

| Field | Type | Notes |
|-------|------|-------|
| `userId` | string | Owner |
| `userEmail` | string | Notification target |
| `symbol` | string | Ticker, stored uppercase |
| `company` | string | Display name |
| `alertName` | string | User label |
| `alertType` | `'upper' \| 'lower'` | Trigger direction |
| `threshold` | number | Price boundary |
| `isActive` | boolean | Default `true` |
| `createdAt` | Date | Default `Date.now` |
| `lastSent` | Date \| null | Last notification time |

**Indexes:**

- `{ userId: 1, symbol: 1, alertType: 1 }`
- `{ userId: 1, isActive: 1 }`
- `{ symbol: 1, alertType: 1, isActive: 1 }`

Better Auth may create its own collections via the MongoDB adapter — no duplicate user model is defined here.

---

## Local seed

Sample documents for manual testing without a signed-in account.

1. Set `MONGODB_URI` in `.env`
2. Run:

```bash
npm run db:seed
```

The script uses demo user `local-demo-user` and inserts:

- 4 watchlist rows (AAPL, MSFT, GOOGL, NVDA)
- 3 price alerts

Re-running is safe: existing demo rows for that user are removed first.

Data definitions live in `seed-data.ts`; the runner is `seed.ts`.

---

## Health check

`health.ts` exports `checkDatabaseHealth()` — connects (or reuses cache), runs `ping`, and lists collection names.

**HTTP endpoint:** `GET /api/health/db`

| Status | Meaning |
|--------|---------|
| `200` | MongoDB reachable |
| `503` | Connection or ping failed |

Example response (healthy):

```json
{
  "ok": true,
  "readyState": 1,
  "status": "connected",
  "database": "markgauge",
  "collections": ["alerts", "watchlists"]
}
```

With the dev server running:

```bash
curl http://localhost:3000/api/health/db
```

---

## Local workflow

```bash
# 1. Configure connection string
cp .env.example .env
# edit MONGODB_URI

# 2. Start app
npm run dev

# 3. Verify database (separate terminal)
curl http://localhost:3000/api/health/db

# 4. Load sample data
npm run db:seed
```

---

## Related docs

- [Folder structure](../docs/architecture/folder-structure.md#database--persistence)
- [External services — MongoDB](../docs/requirements/external-services.md)
- [Data flows](../docs/architecture/data-flows.md)
