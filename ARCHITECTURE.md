# Architecture
Single full-stack Next.js modular monolith using App Router.
Data: node:sqlite local persistent database under data/, seeded from code. GitHub is not a database and GitHub Pages cannot run the server.
Presentation imports domain-facing query/services; checkout uses atomic SQL transactions. Cart persists in browser localStorage only in demo mode.
Future integration: replace database adapter with PostgreSQL after migrating schema and testing concurrency; replace local admin sessions with managed auth following identity migration; replace dev payment with verified signed webhooks. No external systems are currently connected.
