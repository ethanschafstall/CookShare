# Work Journal — @ethanschafstall's CookShare project

*7 days*

---

## 18 May 2026

**Sprint:** Sprint 2 (13 May 2026 → 22 May 2026)

**Day summary**

> Finished the mockups for sprint 2 and worked on the project report. Meet with expert 2 and project manager.

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 15m | Read the sprint planning and preparing for today's work | ✅ Success | — | — |
| [#14](https://github.com/ethanschafstall/CookShare/issues/14) | UI & UX - Mockups | 2h 40m | Created the mockups for the main CRUD functionality. My recipes page where user can see and manage (edit, delete, view) their recipes and create new ones; The create recipe page + form which is the same form the edit functionality uses; View recipe page. | ✅ Success | — | https://claude.ai/share/a38d52fc-9000-401c-a0af-c1a430fe17ed |
| [#24](https://github.com/ethanschafstall/CookShare/issues/24) | Project - Meeting with Expert 2 | 0h 30m | Meet the 2nd expert we talked about the project & how it's going; Showed them the mockups and github projects with the project tasks/issues; talked about general organization and asked some questions. | ✅ Success | — | — |
| — | Git and task updating | 0h 15m | Updated [ · UI & UX - Mockups · #14](https://github.com/ethanschafstall/CookShare/issues/14) with the new mockups; commited mockups to the repo | ✅ Success | — | — |
| [#8](https://github.com/ethanschafstall/CookShare/issues/8) | Doc - Project Report | 1h 20m | Worked on the project report, added the mockups for sprint 2; added the intial planning; added the CDC | ✅ Success | — | — |
| — | Meeting with project manager (Sahli. B) | 0h 35m | Meet up with Sahli showed him the mockups got some ui feedback; showed the db schemas, talked about the problems with modeling the db and choices made; Talked about the external api and the upcoming days. | ✅ Success | — | — |

**Total time:** 5h 35m

---

## 13 May 2026

**Sprint:** Sprint 2 (13 May 2026 → 22 May 2026)

**Day summary**

> Did the backlog refinement, was able to model the recipe tables, and most importantly was able to write a bit in the project report.

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 15m | Preparing for the day: Looking at the tasks I preped for sprint 2, rereading the CDC. | ✅ Success | — | — |
| [#21](https://github.com/ethanschafstall/CookShare/issues/21) | Agile - Backlog Refinement | 2h 20m | Added acceptance criteria and tech analysis to: · <br> [Recipes - View Recipe #4](https://github.com/ethanschafstall/CookShare/issues/4) <br> [Recipes - Create Recipe #5](https://github.com/ethanschafstall/CookShare/issues/5) <br> [Recipes - Delete Recipe #6](https://github.com/ethanschafstall/CookShare/issues/6) <br> [Recipes - Edit Recipe #7](https://github.com/ethanschafstall/CookShare/issues/7) | ✅ Success | — | — |
| [#9](https://github.com/ethanschafstall/CookShare/issues/9) | Agile - Sprint Planning | 0h 20m | Planned the 2nd Sprint, assigning which tasks are to be done on which 4 days. · [Agile - Sprint Planning #9](https://github.com/ethanschafstall/CookShare/issues/9) | ✅ Success | — | — |
| [#19](https://github.com/ethanschafstall/CookShare/issues/19) | DB - Modeling | 1h 25m | Modeled the recipe related tables : recipe_steps, recipes, recipe_ingredients, recipe_nutrition_facts, ingredients, recipe_images | ✅ Success | — | — |
| [#8](https://github.com/ethanschafstall/CookShare/issues/8) | Doc - Project Report | 3h 20m | Worked on the project report | ✅ Success | — | — |

**Total time:** 7h 40m

---

## 11 May 2026

**Sprint:** Sprint 2 (13 May 2026 → 22 May 2026)

**Day summary**

> Wrote the tests for the login feat and was able to add the logout to reach my sprint goal of a functional ui with user sessions working.

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 15m | Daily to prepare/refresh after the weekend on the daily tasks before the end of sprint one | ✅ Success | — | — |
| [#15](https://github.com/ethanschafstall/CookShare/issues/15) | Tests - Definition | 2h 10m | Defined and implemented auth-related unit and API tests (login, register, getMe, middleware). Set up the test infrastructure including repository and service mocks, and a reusable test app factory; fixed some issues with the npm commands, and lintage/prettier formating. | ✅ Success | — | — |
| — | Pull Request | 0h 15m | Created a pr containing the details of the new feat; fixed issues with code format causing the github workflows to fail. | ⚠️ Partial | The issue was related related to eslint and typescript not liking that the my unused next param in the errorHandler middleware | https://github.com/vercel/next.js/discussions/52871 |
| [#2](https://github.com/ethanschafstall/CookShare/issues/2) | Auth - Logout | 1h 20m | Creating the user drop downmenu interface, added the the login button & svelte +page.server for cookie deletion; Updated the "remember me" field on the login page to actually affect cookie session expire time (checked = 30 days, unchecked = current session) | ⚠️ Partial | I wasted a bit of time on the backend for a logout route/controller function to delete the cookie. I was unable to delete the cookie via backend because svelte "owns" the frontend cookie because of how I set it in the +page.server.ts, so backend isn't is only used for creating the token, not for removing it. | https://www.loopwerk.io/articles/2021/sveltekit-cookies-tokens/ · https://dev.to/theether0/sveltekit-changes-session-and-cookies-enb |
| — | Work Logs | 0h 15m | Logging work for the day without issues I had and aids used | ✅ Success | — | — |
| [#10](https://github.com/ethanschafstall/CookShare/issues/10) | Agile - Sprint Review | 0h 40m | Sprint review with M. Sahli, showing the demo + going through and validating each task completed during the sprint. | ✅ Success | — | — |
| [#11](https://github.com/ethanschafstall/CookShare/issues/11) | Agile - Sprint Retro | 0h 30m | Reflection on the past sprint: What worked and why didn't, and what to change next time | ⚠️ Partial | Mostly how the login task took double the amount of time todo because I was implementing middleware which will be used by other features; and how repo / service / controller design pattern takes longer to implement than normal mvc. | — |
| — | Orginising Paper Notes | 0h 25m | Reading the paper notes and preparing for the work report doc writing session during next sprint. | ✅ Success | — | — |

**Total time:** 5h 50m

---

## 8 May 2026

**Sprint:** Sprint 1 (6 May 2026 → 12 May 2026)

**Day summary**

> First day of dev. It went well however I spent more time than planned on just the login system, had alot of things to setup, which took time. Wasn't able to work on the report or write any tests.

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 10m | Preping for today's task and the order | ✅ Success | — | — |
| [#1](https://github.com/ethanschafstall/CookShare/issues/1) | Auth - Login | 0h 40m | Created the User and Role models; Added a seed file for inserting roles + an admin user; generated a new prisma client using updated models; Created init migration. | ✅ Success | — | https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/ |
| [#1](https://github.com/ethanschafstall/CookShare/issues/1) | Auth - Login | 0h 55m | Added the middleware and helpers: · Validate middleware for checking request bodies; Authenticate middleware checking for if the jwt validity; jwt helper for generation tokens; password helper for password salt gen, and hashing/hash compare. | ✅ Success | — | https://zod.dev/api |
| [#1](https://github.com/ethanschafstall/CookShare/issues/1) | Auth - Login | 0h 25m | Added validation schemas and types for login and register bodies, the schemas will get used by the validate middleware. | ✅ Success | — | https://zod.dev/api |
| [#1](https://github.com/ethanschafstall/CookShare/issues/1) | Auth - Login | 2h 15m | Create the user repo for direct db querying; auth service for business logic; auth controller for http handling; auth routes; Custom Errors + Error handler | ⚠️ Partial | Error handling took longer than expected, and I had to create custom errors and an error handler in order to return correct errors from service to controller. | https://www.geeksforgeeks.org/node-js/explain-error-handling-in-express-js-using-an-example/ · https://www.w3tutorials.net/blog/controller-service-repository-pattern-nodejs/ · https://medium.com/@mohammedbasit362/breaking-free-from-mvc-hell-why-your-node-js-code-needs-the-service-repository-controller-pattern-c080725ab910 |
| [#1](https://github.com/ethanschafstall/CookShare/issues/1) | Auth - Login | 0h 40m | Adds the svelte ui components (header, sidebar, user menu, login button, body) | ✅ Success | — | — |
| [#1](https://github.com/ethanschafstall/CookShare/issues/1) | Auth - Login | 0h 50m | Adds login page with frontend validation schema using superforms and zod | ✅ Success | — | https://superforms.rocks/get-started/zod |
| [#1](https://github.com/ethanschafstall/CookShare/issues/1) | Auth - Login | 0h 40m | Added condtional homepage based on if user is logged in, · Had claude generate the placeholder recipe data for the "logged in" homepage to reflect the figma mockup | ✅ Success | — | https://claude.ai/ |
| — | Filling up work logs | 0h 15m | Filling up the worklogs for the day. | ✅ Success | — | — |
| [#15](https://github.com/ethanschafstall/CookShare/issues/15) | Tests - Definition | 0h 20m | Reflection on the test cases for the backend. | ✅ Success | — | — |

**Total time:** 7h 10m

---

## 7 May 2026

**Sprint:** Sprint 2 (13 May 2026 → 22 May 2026)

**Day summary**

> Functional and non-functional analyzing and creating today. Made the mockups and db models, and worked on the report.

| # | Task | Time spent | Description | Outcome | Reflection | Aids used |
|---|------|------------|-------------|---------|------------|-----------|
| [#18](https://github.com/ethanschafstall/CookShare/issues/18) | Agile - Daily | 0h 15m | Daily to determine/prep for today's tasks | ✅ Success | — | — |
| [#8](https://github.com/ethanschafstall/CookShare/issues/8) | Doc - Project Report | 1h 55m | Continuing project report from 06.05.2026. Finished the whole 1.2 section (méthode et organisation), started the 1.3 (analyse des exigences). | ✅ Success | — | — |
| [#14](https://github.com/ethanschafstall/CookShare/issues/14) | UI & UX - Mockups | 1h 50m | Created the mockups for: User not logged in; User logged in; User drop down menu with log out button; Login page. | ✅ Success | — | https://www.iconpacks.net/ , https://claude.ai/share/a327d48e-b216-4bca-9afd-e10006412ffb , https://www.seedprod.com/login-page-examples/ |
| [#19](https://github.com/ethanschafstall/CookShare/issues/19) | DB - Modeling | 1h 20m | Modeling the db with user and role tables; researching the differences between and use cases for stateful vs statless sessions to determine if db needs a sessions table. | ✅ Success | — | https://auth0.com/blog/stateless-auth-for-stateful-minds/ · Discussion avec Mathieu Meylan (prof) |
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
