# Nouve Agent Rules

This file is the source of truth for all agents working on Nouve.

## Project

- Name: Nouve
- Repository: `JJonyeok2/nouve`
- Domain: premium unisex minimalwear commerce
- Scope: frontend-only portfolio app
- Backend: out of scope
- Primary spec: `docs/superpowers/specs/2026-06-06-nouve-commerce-design.md`
- Primary plan: `docs/superpowers/plans/2026-06-06-nouve-frontend-implementation.md`
- Primary color: `#064E52`

## Non-Negotiables

- Do not add a backend, database, real auth, real payment, or external admin API.
- Treat local mock data and service functions as the API boundary.
- Use React, TypeScript, Vite, React Router, TanStack Query, Zustand, React Hook Form, Zod, Tailwind CSS, Recharts, and lucide-react unless a later approved plan changes this.
- Customer UI must feel premium, minimal, image-led, and usable.
- Admin UI must feel efficient, table-first, and task-focused.
- Images must be downloaded or generated into the approved local asset folder. Do not hotlink production UI images from third-party sites.
- Agents must not revert changes made by the user or by other agents.
- Agents must keep write scopes bounded and report changed files.

## Approved Agent Roles

Role docs live in `docs/agents/roles/`.

- Spec Agent: refines product and UX requirements.
- Task Agent: breaks approved specs into implementation tasks.
- Image Asset Agent: sources, downloads, records, and organizes visual assets.
- Frontend Implementation Agent: implements bounded frontend slices only.
- Frontend QA Review Agent: reviews UI, UX, responsiveness, accessibility, and flow correctness.

## Required Agent Final Report

Every agent must finish with:

- Agent Name
- Task/Subtask
- Scope
- Changed Files
- Commands Run
- Verification Result
- Blockers
- Assumptions
- Next Recommended Action

## Source Loading Order

Agents should load only the context needed for their role:

1. `AGENTS.md`
2. `docs/agents/agent-creation-guidelines.md`
3. The role file under `docs/agents/roles/`
4. The design spec or implementation plan relevant to the task

## Asset Folder

Use `public/assets/nouve/` as the single local staging and serving folder for project imagery.

Record image source, license, filename, and usage in `docs/assets/image-sources.md`.

