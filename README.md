# MYSTERY

MYSTERY is a conversation-first connection app built with Next.js 16, React 19, NextAuth, Prisma 7, SQLite/libSQL, Tailwind CSS, shadcn UI, and Framer Motion.

## Included

- Email/password sign-up and sign-in
- Guided profile onboarding
- Interests, personality prompts, relationship goals, and discovery preferences
- Seeded demo profiles so Discover is useful immediately
- Connection requests, accept/decline, disconnect
- Database-backed messaging with lightweight polling
- Mutual identity reveal requests
- Safety reporting
- Profile visibility/privacy controls
- Password change and account deletion
- Notifications derived from connections
- Database-backed Voice Date scheduling
- Privacy, Terms, Community Guidelines, and Safety pages
- A smooth cursor-tracking atmospheric background that works above opaque page sections
- Touch-device fallback and reduced-motion-safe cursor behavior

## Requirements

- Node.js 20 or newer
- npm

## First run

```bash
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Then open http://localhost:3000.

`npm run db:setup` generates Prisma Client, creates/updates the local SQLite schema with `prisma db push`, and seeds five discovery profiles. You do not need to name a migration for local development.

## Environment

`.env.example` contains the local development defaults:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
```

For anything beyond local development, replace `NEXTAUTH_SECRET` with a strong random secret and use production-grade hosting/database configuration.

## Useful commands

```bash
npm run dev        # development server
npm run db:setup   # generate, push schema, seed demo profiles
npm run db:seed    # re-seed demo profiles
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run build      # production build
npm run check      # typecheck + lint + build
```

## Cursor effect

The global cursor atmosphere is mounted in `src/app/layout.tsx` through `src/components/CursorTrackingBackground.tsx`. It listens to both Pointer Events and mouse movement (for Safari/macOS reliability), stays above opaque page backgrounds, and never intercepts clicks (`pointer-events: none`). Reduced Motion changes the easing behavior instead of disabling the effect.

## Database

The development database is SQLite at `dev.db` and is intentionally ignored by Git. Prisma schema changes live in `prisma/schema.prisma`. Run `npm run db:setup` after pulling schema changes.

## Password recovery

Authenticated users can change their password in Settings. Email-based forgot-password delivery is intentionally not configured because it requires an external email provider; the app does not fake or insecurely bypass that step.
