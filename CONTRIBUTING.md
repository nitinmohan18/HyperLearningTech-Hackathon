# Contributing

## Setup

1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Start development with `npm run dev`.

## Before submitting changes

Run the following checks:

```bash
npm run typecheck
npm run build
```

## Guidelines

- Keep event details in `src/data/`.
- Keep reusable UI in `src/components/`.
- Keep demo records in `src/data/mock-data.ts`.
- Label mock data clearly.
- Do not add real authentication, payments, databases or GitHub integrations unless they are explicitly approved.
- Preserve responsive layouts and keyboard accessibility.
- Do not commit secrets or environment-specific `.env` files.
