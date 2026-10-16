# Hyu Industries Tech Device
Full-stack technology e-commerce development demo. GitHub-first; local SQLite only, no deployment and no real payments.
Requires Node 22.13+.
- npm install
- cp .env.example .env.local
- npm run dev
Open http://localhost:3000. SQLite database auto-initializes under data/.
For optional local inventory admin, run npm run admin:hash and place the resulting ADMIN_PASSWORD_HASH and SESSION_SECRET in .env.local; restart and go to /admin/login.
Checks: npm run lint, npm run typecheck, npm test, npm run build.
Do not deploy to Vercel or enable Supabase/payments without explicit permission. See AGENTS.md, PLAN.md, PRODUCT.md, DESIGN.md and ARCHITECTURE.md.
