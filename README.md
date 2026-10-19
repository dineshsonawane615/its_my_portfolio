# Dinesh Sonawane | Portfolio

A GitHub-inspired, dark-first portfolio for a junior full-stack software engineer with an AI-workflow focus. Each section borrows from Git vocabulary (`README.md`, `git log`, `git tag`, `git branch`, "Open an issue") so the structure reads as engineering at a glance.

## Profile classification

- **Primary role:** Software Engineer (full-stack, AI-assisted workflows)
- **Seniority:** Junior (final-year student, two substantial projects)
- **Key strengths:** Spring Boot and FastAPI backends, React/TypeScript frontends, JWT/RBAC security, semantic matching with human-in-the-loop review
- **Reasoning:** Both projects are full-stack systems with architecture decisions (pipelines, auth, REST design). The AI work is a component inside a larger system rather than model research, so the portfolio emphasizes systems and architecture.

## Highlights

- Terminal hero with a typed intro (respects reduced motion)
- Interactive MATRA pipeline explorer
- Dark and light themes with no flash on load
- Responsive layout, keyboard focus states, no environment variables

## Tech stack

Next.js 14 (App Router), React 18, Tailwind CSS 3. No other runtime dependencies.

## Project structure

```
app/            Layout, global styles, page
components/     Hero, About, Projects, Experience, Skills, Contact, UI helpers
data/           portfolio.js, all site content in one file
```

## Local setup

```bash
npm install && npm run dev
```

Open http://localhost:3000. To edit any text, project or link, change `data/portfolio.js`.
