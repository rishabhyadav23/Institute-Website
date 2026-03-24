---
name: Project Architecture Overview
description: Tech stack, structure, and key architectural decisions for the coaching institute website
type: project
---

React 19 + Vite + Tailwind CSS frontend in `/src/`. Spring Boot + PostgreSQL backend in `/backend/`.

Feature-sliced structure: `src/features/{auth,courses,notes,tests,live}/` with `api/`, `components/`, `hooks/` subdirectories.

Pages in `src/pages/`. Shared UI in `src/components/`. Global context in `src/context/AuthContext.jsx`.

API layer in `src/api/` uses axios with JWT interceptors (`axiosConfig.js`).

**Why:** Feature-sliced design keeps domain logic co-located; important to respect these boundaries when adding new features.

**How to apply:** When adding new features follow the same pattern: data/constants in `api/`, logic in `hooks/`, presentational in `components/`, assembled in `pages/`.
