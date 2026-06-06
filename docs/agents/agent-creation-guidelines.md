# Agent Creation Guidelines

Use these guidelines when creating or spawning Nouve role agents.

## Required Inputs

Each agent must receive:

- Display name
- Role doc path
- Source of truth
- Write scope
- Out-of-scope list
- Required context files
- Verification command or review checklist
- Stop condition
- Required final report format

## Modes

### Sequential Mode

Use for ambiguous, risky, or tightly coupled work. One agent works at a time.

### Parallel Mode

Use only when write scopes are clearly disjoint. Main Codex integrates and reviews after each agent returns.

### Hybrid Mode

Default for Nouve. Main Codex handles coordination, while role agents work on bounded slices.

## Role Permission Matrix

| Role | Can Edit | Must Not Edit |
| --- | --- | --- |
| Spec Agent | `docs/superpowers/specs/`, spec-related docs | App source unless explicitly approved |
| Task Agent | `docs/superpowers/plans/`, task docs | App source unless explicitly approved |
| Image Asset Agent | `public/assets/nouve/`, `docs/assets/image-sources.md` | App logic, package files |
| Frontend Implementation Agent | Assigned `src/` slice, related tests, related docs | Unassigned feature slices, backend code |
| Frontend QA Review Agent | Review docs only by default | Source files unless explicitly asked to fix |

## Frontend Implementation Agent Defaults

- Domain: frontend only
- Execution mode: Hybrid Mode unless the task is small and sequential
- Source of truth: approved spec and implementation plan
- Write scope: one feature slice at a time
- Verification: targeted tests, lint, typecheck, build, and visual smoke checks when available
- Stop condition: task complete, blocked by missing dependency, or scope conflict detected

## Parallel Safety

Parallel frontend implementation agents must not share write scopes. Good splits:

- `src/features/products/**`
- `src/features/cart/**` and `src/features/checkout/**`
- `src/features/admin/**`
- `src/components/ui/**`
- `public/assets/nouve/**`

Bad splits:

- Two agents editing `src/app/router/**`
- Two agents editing the same store file
- One agent refactoring shared UI while another depends on that unfinished refactor

## Image Asset Rules

- Prefer generated images or free-license image sources that permit portfolio usage.
- Store images locally under `public/assets/nouve/`.
- Keep a source log in `docs/assets/image-sources.md`.
- Use descriptive filenames such as `hero-seasonal-coat-01.jpg`.
- Optimize images before final delivery when possible.
- Do not add unlicensed brand, marketplace, or model images.

## Subagent Prompt Requirements

When spawning an agent, include:

```text
You are [Display Name].
Role doc: [path].
Source of truth: [path].
Write scope: [paths].
Do not edit: [paths].
Required verification: [commands/checklist].
Stop if: [conditions].
Final report must include Agent Name, Task/Subtask, Scope, Changed Files, Commands Run, Verification Result, Blockers, Assumptions, Next Recommended Action.
```

