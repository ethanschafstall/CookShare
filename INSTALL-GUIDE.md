# Guide de mise en service

Procédure pour mettre en service l'application, selon que tu veuilles la **déployer** ou la **développer**.

## Prérequis

| Outil          | Version recommandée |
| -------------- | ------------------- |
| Node.js        | 25 ou +             |
| npm            | 11 ou +             |
| Docker Desktop | récente             |
| Git            | récente             |

## Étape commune — Cloner le dépôt

```bash
git clone https://github.com/ethanschafstall/CookShare.git
cd cookshare
```

---

## A. Déploiement

### 1. Configurer l'environnement

```bash
cp .env.example .env
```

### 2. Démarrer (base de données + services)

```bash
docker compose up -d
```

---

## B. Développement

### 1. Configurer l'environnement (backend + frontend)

```bash
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env
cd ..
```

### 2. Démarrer la base de données

Lancer la command docker run avec variables défini dans le fichier .env

```bash
docker run --name cookshare-database -e MYSQL_ROOT_PASSWORD=<DATABASE_PASSWORD>
 -e MYSQL_DATABASE=<DATABASE_NAME> -e MYSQL_USER=<DATABASE_USER>
 -e MYSQL_PASSWORD=<DATABASE_PASSWORD> -p <DATABASE_PORT>:3306 -d mysql:8
```

### 3. Installer les dépendances

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 4. Préparer la base avec Prisma

```bash
cd backend
npm run db:generate   # génère le client Prisma
npm run db:migrate    # applique les migrations (migrate dev)
npm run db:seed       # crée le compte admin + données de roles
```

### 5. Lancer en mode développement

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

---

## Commandes utiles en développement

| Commande            | Effet                                       |
| ------------------- | ------------------------------------------- |
| `npm test`          | Lance tous les tests (Vitest)               |
| `npm run test:unit` | Tests unitaires (backend)                   |
| `npm run test:api`  | Tests d'intégration des endpoints (backend) |
| `npm run lint`      | Vérifie le style (ESLint + Prettier)        |
| `npm run format`    | Reformate le code                           |
