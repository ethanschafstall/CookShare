# Work Journal — @ethanschafstall's CookShare project

*3 days*

---

## 7 May 2026

**Sprint:** Sprint 1 (6 May 2026 → 12 May 2026)

**Day summary**

> Functional and non-functional analyzing and creating today. Made the mockups and db models, and worked on the report.

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 15m | Daily to determine/prep for today's tasks | ✅ Success | — | — |
| [#8](https://github.com/ethanschafstall/CookShare/issues/8) | Doc - Project Report | 1h 55m | Continuing project report from 06.05.2026. Finished the whole 1.2 section (méthode et organisation), started the 1.3 (analyse des exigences). | ✅ Success | — | — |
| [#14](https://github.com/ethanschafstall/CookShare/issues/14) | UI & UX - Mockups | 1h 50m | Created the mockups for: User not logged in; User logged in; User drop down menu with log out button; Login page. | ✅ Success | — | https://www.iconpacks.net/ , https://claude.ai/share/a327d48e-b216-4bca-9afd-e10006412ffb , https://www.seedprod.com/login-page-examples/ |
| [#19](https://github.com/ethanschafstall/CookShare/issues/19) | DB - Modeling | 1h 20m | Modeling the db with user and role tables; researching the differences between and use cases for stateful vs statless sessions to determine if db needs a sessions table. | ✅ Success | — | https://auth0.com/blog/stateless-auth-for-stateful-minds/ Discussion avec Mathieu Meylan (prof) |
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 30m | Discussion with M. Sahli about the state of the project, showing him the tasks, the db models, mockups. | ✅ Success | — | — |
| [#14](https://github.com/ethanschafstall/CookShare/issues/14) | UI & UX - Mockups | 0h 30m | Updating mockups after discussion with M. Sahli | ✅ Success | — | — |
| [#8](https://github.com/ethanschafstall/CookShare/issues/8) | Doc - Project Report | 0h 30m | Finished 1.3.1 of the report. | ✅ Success | — | — |

**Total time:** 6h 50m

---

## 6 May 2026

**Sprint:** Sprint 1 (6 May 2026 → 12 May 2026)

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 15m | Getting prepared on what needs to be done today, and in what order. | ✅ Success | — | — |
| [#21](https://github.com/ethanschafstall/CookShare/issues/21) | Agile - Backlog Refinement | 1h 15m | Added acceptance criteria and tech analysis to: <br> [Auth - Login #1](https://github.com/ethanschafstall/CookShare/issues/1) <br> [Auth - Logout #2](https://github.com/ethanschafstall/CookShare/issues/2) <br> [Setup - Project #25](https://github.com/ethanschafstall/CookShare/issues/25) <br> [Setup - CI/CD #26](https://github.com/ethanschafstall/CookShare/issues/26) | ✅ Success | — | https://omacy.medium.com/implementing-the-repository-design-pattern-in-node-js-express-a-complete-guide-354cfadc22a0 |
| [#9](https://github.com/ethanschafstall/CookShare/issues/9) | Agile - Sprint Planning | 0h 30m | Set sprint 1 tasks to ready: <br> [Auth - Login #1](https://github.com/ethanschafstall/CookShare/issues/1) <br> [Auth - Logout #2](https://github.com/ethanschafstall/CookShare/issues/2) <br> [Setup - Project #25](https://github.com/ethanschafstall/CookShare/issues/25) <br> [Setup - CI/CD #26](https://github.com/ethanschafstall/CookShare/issues/26) <br> [Doc - Project Report #8](https://github.com/ethanschafstall/CookShare/issues/8) <br> [UI & UX - Mockups #14](https://github.com/ethanschafstall/CookShare/issues/14) <br> [Tests - Definition #15](https://github.com/ethanschafstall/CookShare/issues/15) <br> [Tests - Execution #16](https://github.com/ethanschafstall/CookShare/issues/16) <br> [DB - Modeling #19](https://github.com/ethanschafstall/CookShare/issues/19) | ✅ Success | — | — |
| [#25](https://github.com/ethanschafstall/CookShare/issues/25) | Setup - Project | 1h 15m | Set up the project structure, main & sub dependencies, and config files / other needed files (.env) for both the backend and frontend. | ✅ Success | — | https://www.typescriptlang.org/, https://www.prisma.io/docs/prisma-orm/quickstart/mysql, https://zod.dev/, https://vitest.dev/guide/, https://www.npmjs.com/package/supertest, https://superforms.rocks/get-started, https://svelte.dev/docs/cli/sv-create |
| [#26](https://github.com/ethanschafstall/CookShare/issues/26) | Setup - CI/CD | 1h | Set up the dockerfiles for both frontend and backend. | ⚠️ Partial | Ran into Prisma errors: mismatch between prisma package and prisma client — both needed to be version >=7. | https://github.com/prisma/prisma/discussions/12170, https://www.prisma.io/docs/orm/reference/error-reference, https://www.prisma.io/docs/orm/reference/connection-urls |
| [#25](https://github.com/ethanschafstall/CookShare/issues/25) | Setup - Project | 0h 10m | Installed eslint & prettier packages in backend; Created format & lint npm scripts for the workflows. | ✅ Success | — | https://prettier.io/docs/install, https://eslint.org/docs/latest/use/getting-started |
| [#26](https://github.com/ethanschafstall/CookShare/issues/26) | Setup - CI/CD | 0h 50m | Created two workflows (backend & frontend) with 3 triggers: push feat & /backend; on pull request on dev branch; workflow dispatch (manual). | ✅ Success | — | https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax |
| [#26](https://github.com/ethanschafstall/CookShare/issues/26) | Setup - CI/CD | 0h 20m | Created a docker compose file at project root with frontend, backend, db containers; added project root env and env example files | ✅ Success | — | — |
| [#8](https://github.com/ethanschafstall/CookShare/issues/8) | Doc - Project Report | 1h 25m | Working on the docx project report, mostly doing the title page, formating (headers, footers), writing section 1.1 contexte & mandat and section 1.2 méthode et organisation. | ✅ Success | — | — |

**Total time:** 7h

---

## 4 May 2026

**Day summary**

> Mostly just planning today.

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#13](https://github.com/ethanschafstall/CookShare/issues/13) | Project - TPI Introduction | 1h | TPI intro, meeting first expert, reading & signing cdc | ✅ Success | — | — |
| [#20](https://github.com/ethanschafstall/CookShare/issues/20) | Project - Intial Planning | 4h 15m | Intial planning : Defining the 3 sprints, user stories, tech stories, other tasks. Attributing time estimates, priority, size, scope to tasks. | ✅ Success | — | — |

**Total time:** 5h 15m

---
