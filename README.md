# HyperLearningTech – Winter Hackathon '26

A responsive, frontend-only website for the **1st Edition of the HyperLearningTech Winter Hackathon**.

**Tagline:** BUILD. PROVE. EARN.  
**Event:** 26–27 December 2026  
**Duration:** 24 hours  
**Mode:** Online

## Technology

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React

## Local setup

Requirements:

- Node.js 18 or newer
- npm

Install and start the project:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available scripts

```bash
npm run dev        # Start the development server
npm run typecheck  # Check TypeScript types
npm run build      # Create a production build
npm run start      # Start the production server
```

## Main routes

### Public

- `/` — Home
- `/about` — About the event
- `/prizes` — Prize information
- `/rules` — Competition rules
- `/schedule` — Event timeline
- `/faq` — Frequently asked questions
- `/leaderboard` — Demo leaderboard
- `/projects` — Demo project showcase
- `/results` — Demo results
- `/certificates` — Demo certificate verification

### Participant

- `/login`
- `/register`
- `/dashboard`
- `/dashboard/team`
- `/dashboard/repository`
- `/dashboard/checkpoints`
- `/dashboard/submission`

### Admin demo

- `/admin`
- `/admin/registrations`
- `/admin/repositories`
- `/admin/checkpoints`
- `/admin/judging`
- `/admin/payments`

## Project structure

```text
src/
  app/          App Router pages and layouts
  components/   Reusable layout and home components
  data/         Event, prize, FAQ and mock data
  lib/          Shared utilities
  types/        Shared TypeScript types
public/         Static assets
```

## Demo boundaries

This project is a frontend-only implementation. The leaderboard, results, registrations, repository status, checkpoints, submissions and admin screens use clearly labelled mock data.

No real authentication, payment processing, database, GitHub integration or certificate verification is implemented.

## Event summary

- Solo registration: ₹99
- Squad registration: ₹200 flat for 2–4 members
- Total cash prize pool: ₹15,000
- Results: 27 December 2026, 11:00 PM IST
- Prize distribution target: By 11:05 PM IST

## Building for production

```bash
npm run typecheck
npm run build
npm run start
```
