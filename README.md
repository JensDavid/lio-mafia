# Lio Mafia

A private founder ecosystem prototype for current Lio operators and alumni. It follows one journey — **Operator → Builder → Founder → Backer** — through the eyes of a demo member, Jens Fischer, who is validating his project _Matchmaker_.

## What's in the prototype

| Area                | What it does                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Home**            | Journey stage, current project, next moves, open loops (pending intros), requests you can help with, Mafia pulse, flywheel       |
| **Network**         | Overview, People (filterable, e.g. `/network/people?filter=Mentors`), Requests (post, reply), Events (attend)                    |
| **Build**           | Project (Matchmaker), Founder Track (stage checklist that drives project progress), Launchpad (stack, legal, customers, capital) |
| **Playbooks**       | Shared operator knowledge, each linked to members who can help                                                                   |
| **✦ Ask the Mafia** | `⌘K` search across people, requests, playbooks and partners that turns results into a concrete path — or a community request     |

All data is fictional demo data, centralized in `src/lib/data.ts` and `src/lib/community.ts`. Session state (requests, replies, attendance, tasks, intros, profile edits, saved playbooks) lives in one client-side `DemoProvider`; there is no backend, and a reload resets the demo.

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # production build
npm test         # vitest
npm run lint
```

Built with TanStack Start, React, TypeScript and Tailwind CSS.

## Deployment

The build targets Cloudflare by default. On Vercel, Nitro detects the platform and builds with the Vercel preset automatically (`VERCEL=1 npm run build` reproduces it locally into `.vercel/output`).

## Lovable

This repository is connected to [Lovable](https://lovable.dev). Commits pushed to the connected branch sync back into the Lovable editor — don't force-push or rewrite published history. Keep `@lovable.dev/vite-tanstack-config` in `vite.config.ts`.
