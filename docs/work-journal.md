# Work Journal — @ethanschafstall's CookShare project

*2 days*

---

# Work Log — 6 May 2026

**Sprint:** Sprint 1 (6 May 2026 → 12 May 2026)

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 15m | Getting prepared on what needs to be done today, and in what order. | ✅ Success | — | — |
| [#21](https://github.com/ethanschafstall/CookShare/issues/21) | Agile - Backlog Refinement | 1h 15m | Added acceptance criteria and tech analysis to: <br> [Auth - Login #1](https://github.com/ethanschafstall/CookShare/issues/1) <br> [Auth - Logout #2](https://github.com/ethanschafstall/CookShare/issues/2) <br> [Setup - Project #25](https://github.com/ethanschafstall/CookShare/issues/25) <br> [Setup - CI/CD #26](https://github.com/ethanschafstall/CookShare/issues/26) | ✅ Success | — | https://omacy.medium.com/implementing-the-repository-design-pattern-in-node-js-express-a-complete-guide-354cfadc22a0 |
| [#9](https://github.com/ethanschafstall/CookShare/issues/9) | Agile - Sprint Planning | 0h 30m | Set sprint 1 tasks to ready: <br> [Auth - Login #1](https://github.com/ethanschafstall/CookShare/issues/1) <br> [Auth - Logout #2](https://github.com/ethanschafstall/CookShare/issues/2) <br> [Setup - Project #25](https://github.com/ethanschafstall/CookShare/issues/25) <br> [Setup - CI/CD #26](https://github.com/ethanschafstall/CookShare/issues/26) <br> [Doc - Project Report #8](https://github.com/ethanschafstall/CookShare/issues/8) <br> [UI & UX - Mockups #14](https://github.com/ethanschafstall/CookShare/issues/14) <br> [Tests - Definition #15](https://github.com/ethanschafstall/CookShare/issues/15) <br> [Tests - Execution #16](https://github.com/ethanschafstall/CookShare/issues/16) <br> [DB - Modeling #19](https://github.com/ethanschafstall/CookShare/issues/19) | ✅ Success | — | — |
| [#25](https://github.com/ethanschafstall/CookShare/issues/25) | Setup - Project | 1h 15m | Set up the project structure, main & sub dependencies, and config files / other needed files (.env) for both the backend and frontend. | ✅ Success | — | backend: <br> https://www.typescriptlang.org/ <br> https://www.prisma.io/docs/prisma-orm/quickstart/mysql <br> https://zod.dev/ <br> https://vitest.dev/guide/ <br> https://www.npmjs.com/package/supertest <br><br> frontend: <br> https://superforms.rocks/get-started <br> https://svelte.dev/docs/cli/sv-create |
| [#26](https://github.com/ethanschafstall/CookShare/issues/26) | Setup - CI/CD | 1h | Set up the dockerfiles for both frontend and backend. | ⚠️ Partial | Ran into Prisma related errors when trying to run the docker image "Issue: error: Argument "url" is missing in data source block "db". error"  The errors were related to a mismatch between the prisma package and the prisma client. They both needed to be version >=7. | https://github.com/prisma/prisma/discussions/12170 https://www.prisma.io/docs/orm/reference/error-reference https://www.prisma.io/docs/orm/reference/connection-urls |
| [#25](https://github.com/ethanschafstall/CookShare/issues/25) | Setup - Project | 0h 10m | Installed eslint & prettier packages in backend; Created format & lint npm scripts for the workflows. | ✅ Success | — | https://prettier.io/docs/install https://eslint.org/docs/latest/use/getting-started |
| [#26](https://github.com/ethanschafstall/CookShare/issues/26) | Setup - CI/CD | 0h 50m | Created two workflows (backend & frontend) with 3 triggers: push feat & /backend; on pull request on dev branch; workflow dispatch (manual). | ✅ Success | — | Aids: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax |
| [#26](https://github.com/ethanschafstall/CookShare/issues/26) | Setup - CI/CD | 0h 20m | Created a docker compose file at project root with frontend, backend, db containers; added project root env and env example files | ✅ Success | — | — |

**Total time:** 5h 35m

---

---

# Work Log — 4 May 2026

**Sprint:** —

**Day summary**

> Mostly just planning today.

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#13](https://github.com/ethanschafstall/CookShare/issues/13) | Project - TPI Introduction | 1h | TPI intro, meeting first expert, reading & signing cdc | ✅ Success | — | — |
| [#20](https://github.com/ethanschafstall/CookShare/issues/20) | Project - Intial Planning | 4h 15m | Intial planning : Defining the 3 sprints, user stories, tech stories, other tasks. Attributing time estimates, priority, size, scope to tasks. | ✅ Success | — | — |

**Total time:** 5h 15m

---