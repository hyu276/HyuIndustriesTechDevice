# Engineering policy - Hyu Industries Tech Device
Mode: GITHUB_FIRST / LOCAL_RUNTIME / CLOUD_INTEGRATION_DISABLED.
- Only work in specified GitHub repository and local runtime. Never provision Vercel, Supabase, or live payment services.
- Next.js App Router + TypeScript + Tailwind + SQLite. Preserve modular domain boundaries; no cloud SDK needed.
- Treat product seed values and all checkout/payment states as DEMO; never show verified real prices or inventory.
- Enforce server-side validation and auth for privileged operations; never commit secrets or runtime DB files.
- Develop on feature branches and seek review before merging main; never force push.
- Use Impeccable and Anti UI Slop for design, mobile/accessibility inspection, unit and CI verification where possible.
- Do not activate external systems without new explicit owner approval.
