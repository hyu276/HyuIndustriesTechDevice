# Future integrations - NOT ACTIVE
Supabase: plan SQLite to PostgreSQL conversion (integer VND amounts, constraints, transactional stock), RLS for user-owned data, service credentials only server-side, auth account recovery and storage migration.
Vercel: local SQLite does NOT survive as a durable writable database in stateless cloud functions; move to managed Postgres/storage/auth before deploy, then plan webhook signature checks, staging, rollback, observability.
No cloud projects, credentials or deployment authorized.
