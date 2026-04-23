# Migration Museum Website

The Migration Museum website is the museum's next digital home, designed to support storytelling, audience engagement, and movement-building ahead of the permanent museum opening in 2028.

## Project Brief Alignment

This project is based on the "Digital access project" brief and aims to:

- provide a compelling, story-led digital experience that reflects the museum's mission;
- support a wide range of audiences, from culturally engaged visitors to educators, community groups, funders, and artists;
- enable core value exchanges such as donations, newsletter sign-ups, and pathways to events and shop activity;
- create a flexible content platform that can evolve through future campaigns and product phases.

### Strategic Goals

- **Reveal, remix, and reframe migration stories:** present nuanced, participatory narratives from multiple voices.
- **Improve access and engagement:** serve audiences who may only ever interact with the museum online.
- **Support operations and growth:** connect digital journeys to museum priorities, communications strategy, and campaign outcomes.
- **Launch readiness:** target a robust launch window in 2026 with room for iterative optimisation.

## Technical Scope (from brief)

The broader digital programme anticipates integration and/or cross-promotion with:

- `Donorfy` (donations and supporter data);
- `Mailchimp` (newsletter and mass engagement);
- `Shopify` (commerce cross-promotion);
- `Eventbrite` or future ticketing/box office platform;
- social channels (`Instagram`, `LinkedIn`, `BlueSky`, `TikTok`, `YouTube`);
- `Google Analytics` and Tag Manager for measurement;
- `Cloudflare` for security and platform hardening (as required).

## Tech Stack

Current implementation stack in this repository:

- **Framework:** `Next.js` 16
- **UI library:** `React` 19
- **Language:** `TypeScript`
- **Runtime:** `Node.js` (LTS recommended)
- **Package manager:** `npm`

## Getting Started (Local Development)

### 1) Install dependencies

```bash
npm install
```

### 2) Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3) Production build and local production run

```bash
npm run build
npm run start
```

## Deploying to Vercel

This project is optimized for deployment on Vercel.

### Option A: Deploy via Vercel dashboard (recommended)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the repository.
3. Confirm framework detection as **Next.js**.
4. Configure environment variables in **Project Settings -> Environment Variables** (if needed).
5. Deploy.

Vercel will automatically:

- run `npm install`;
- run `npm run build`;
- serve the application with Next.js defaults.

### Option B: Deploy via Vercel CLI

Install and login:

```bash
npm i -g vercel
vercel login
```

Deploy preview:

```bash
vercel
```

Deploy to production:

```bash
vercel --prod
```

## Recommended Environment Setup

- Use a current LTS version of Node.js.
- Keep deployment secrets and API keys in Vercel environment variables, not in source control.
- Add project-specific integration keys (e.g. analytics, CRM tools) as requirements are implemented.

## Notes

- This README describes the project intent and delivery context from the digital access brief.
- As integrations (donations, signup, analytics, CMS workflows) are implemented, update this file with concrete environment variables and service setup instructions.
