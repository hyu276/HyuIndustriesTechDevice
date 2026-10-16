# Hyu Industries Tech Device

Next.js + TypeScript + Tailwind + local SQLite. **Development-only demo**, no real payments, shipping or cloud services.

## Run locally

Requires Node.js >= 22.13.

1. `npm install`
2. `cp .env.example .env.local`
3. `npm run dev`
4. Visit http://localhost:3000.

Database at `data/store.sqlite` is created and seeded automatically on first access. It is gitignored.

Admin: run `npm run admin:hash`, copy `ADMIN_PASSWORD_HASH` and `SESSION_SECRET` values into `.env.local`, restart dev server, then visit `/admin/login`.

Check via `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

**Only GitHub + local SQLite are currently authorized.** No Supabase, Vercel, payment gateway or real email integration. See AGENTS.md, PRODUCT.md, DESIGN.md, ARCHITECTURE.md, PLAN.md.
