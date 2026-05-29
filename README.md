# CookShare

Application Web de partage de recettes avec enrichissement automatique
des informations nutritionnelles

---

## Fonctionnalités

- ✅ **Authentification** : login / logout, gestion de sessions, mots de passe hachés.
- ✅ **Gestion des rôles** : Visiteur, Contributeur, Administrateur (permissions distinctes).
- ✅ **CRUD des recettes** : titre, description, durée, difficulté, ingrédients (structure
  relationnelle), étapes et image(s).
- ⚠️ **Enrichissement nutritionnel** : récupération automatique des calories et macronutriments
  (glucides, protéines, lipides) via OpenFoodFacts, puis stockage local.
- ❌ **Recherche et filtres** : par ingrédient, durée, difficulté ; tri par date ou popularité.
- ✅ **Interface dynamique** : ajout/suppression d'ingrédients et d'étapes à la volée.

---

## Stack technique

### Core

| Couche          | Technologie               |
| --------------- | ------------------------- |
| Langage         | JavaScript (ES6+)         |
| Back-end        | Express.js                |
| Front-end       | Svelte.js                 |
| Base de données | MySQL                     |
| ORM             | Prisma                    |
| API externe     | OpenFoodFacts             |
| CI / CD         | Docker & Github workflows |

### Dépendances

#### Back-end — production

| Nom                     | Rôle                                            |
| ----------------------- | ----------------------------------------------- |
| express                 | Serveur HTTP et routage                         |
| @prisma/client          | Client ORM (accès à la base au runtime)         |
| @prisma/adapter-mariadb | Adaptateur Prisma pour MariaDB / MySQL          |
| jsonwebtoken            | Authentification par jetons JWT                 |
| cookie-parser           | Lecture des cookies (jetons d'authentification) |
| cors                    | Gestion des requêtes cross-origin               |
| zod                     | Validation et typage des données                |
| multer                  | Upload de fichiers                              |
| nanoid                  | Génération d'identifiants uniques               |
| slugify                 | Génération de slugs                             |
| dotenv                  | Chargement des variables d'environnement        |

#### Back-end — développement

| Nom                    | Rôle                                        |
| ---------------------- | ------------------------------------------- |
| prisma                 | CLI ORM (migrations, génération du client)  |
| typescript             | Langage / compilateur                       |
| tsx                    | Exécution directe du TypeScript             |
| tsc-alias              | Résolution des alias de chemins après build |
| vitest                 | Framework de tests                          |
| supertest              | Tests d'intégration HTTP                    |
| eslint / prettier      | Qualité et formatage du code                |
| prettier-plugin-prisma | Formatage du schéma Prisma                  |

#### Front-end — production

| Nom                    | Rôle                                         |
| ---------------------- | -------------------------------------------- |
| @sveltejs/adapter-node | Build pour exécution sous Node.js            |
| sveltekit-superforms   | Gestion des formulaires côté SvelteKit       |
| zod                    | Validation (schéma partagé avec le back-end) |
| mime-types             | Gestion des types MIME                       |

#### Front-end — développement

| Nom                                     | Rôle                              |
| --------------------------------------- | --------------------------------- |
| @sveltejs/kit / svelte / vite           | Framework, compilateur et bundler |
| @sveltejs/vite-plugin-svelte            | Intégration Svelte ↔ Vite         |
| tailwindcss + @tailwindcss/vite         | Mise en forme de l'interface      |
| @tailwindcss/forms / typography         | Styles de formulaires et de texte |
| typescript / svelte-check               | Typage et vérification statique   |
| vitest / vitest-browser-svelte          | Tests unitaires et de composants  |
| playwright / @vitest/browser-playwright | Tests en navigateur réel          |
| eslint / prettier (+ plugins)           | Qualité et formatage du code      |

---

## Outils de développement

- VScode IDE
- DBeaver gestion de DB
- Container MySQL DB

## Guide d'installation

La procédure complète (déploiement et développement) est décrite dans le
[guide d'installation](./INSTALL-GUIDE.md).
