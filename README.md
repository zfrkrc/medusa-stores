# Medusa Multi-Storefront Docker Boilerplate

This project provides a Dockerized setup for running multiple Medusa storefronts (Next.js) simultaneously, all connecting to a single Medusa backend.

## 🏗 Project Structure

- `hobby-store/`: Storefront for Hobby shop.
- `clay-store/`: Storefront for Clay shop.
- `sedefli-store/`: Storefront for Sedefli shop.
- `template-store/`: A template for creating new storefronts.
- `docker-compose.yml`: Orchestrates the storefront containers.

## 🚀 Quick Start

### 1. Prerequisites
- Docker & Docker Compose
- Medusa Backend running on `hobby-network`

### 2. Configuration
Copy the environment template and fill in your secrets:
```bash
cp .env.example .env
```
Edit `.env` and set:
- `MEDUSA_BACKEND_URL`: Internal URL for Docker communication.
- `HOBBY_PUBLISHABLE_KEY`: Publishable key from Medusa Admin for the Hobby store.
- (And keys for Clay/Sedefli stores).

### 3. Run the Stores
Start all storefronts:
```bash
docker compose up -d --build
```

Access your stores at:
- **Hobby:** http://localhost:8001
- **Clay:** http://localhost:8002
- **Sedefli:** http://localhost:8003

## 🛠 Features

- **Isolated Dockerfiles**: Each store has its own Dockerfile for better dependency management.
- **Auto-Maintenance**: The container checks for `node_modules` and `build` artifacts on startup and runs `yarn install` or `yarn build` automatically if missing.
- **Production Ready**: Configured to run in production mode with `yarn start`.
- **Named Volumes**: Optimized performance with Docker volumes for `node_modules` and `.next` build files.

## 🧹 Maintenance

To reset all packages and rebuild from scratch:
```bash
docker compose down -v
docker compose up -d --build
```

## 🔐 Privacy & Security

- All sensitive keys are stored in `.env` and are excluded from Git via `.gitignore`.
- Build artifacts and local dependencies are ignored to keep images lightweight.
- Use `.env.example` to share the required structure without compromising actual secrets.
