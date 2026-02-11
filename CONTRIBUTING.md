# Instruction for dev/s

**PLAN**: This document will cover instructions on the codebase, everything that needs documenting—like project structure,
conventions, patterns, workflow, why things are done a certain way, building/pushing Docker images, and other details
I can't keep in my head. Also for other devs if they're interested.

> I'll write to this document from time to time. It is currently not complete.

---

# Local Development Setup

To run this project locally:

### Prerequisites

- Node.js
- Git

### Steps

```bash
# Clone the repository
git clone https://github.com/r4ppz/research-repository.git
cd research-repository

# Install dependencies
npm install

# Build the project (for production)
npm run build

# Run locally in development mode
npm run dev
npm run preview

```

---

# Collaboration Guide

To maintain code quality and avoid configuration conflicts, all developers must follow this workflow.

### Branch Strategy

We use a two-branch system. **Direct pushes to `main` are blocked.**

```text
  main (Production)  <-- [Owner Only Merge]
    ↑
   dev  (Development)  <-- [Shared Staging] (direct push is allowed for now)
    ↑
 [feature-branch]      <-- [Developer Work] (preferred)

```

- **`main`**: Only for stable, production-ready releases.
- **`dev`**: The primary integration branch. All work meets here first.

---

### Development Flow

1. **Issue First (if possible)**: Before starting any work, create/assign a **GitHub Issue**. This prevents us from working on the same feature or bug simultaneously.
2. **Branch Out**: Create a local branch from `dev`.

```bash
git checkout dev
git pull origin dev
git checkout -b feat/issue-number-description

```

3. **Implementation**: Follow the technical specifications documented in the [Docs/Specs Repository](https://github.com/r4ppz/research-repo-docs).
4. **Local Config**: Use the provided `.env-example` to create your local `.env`. Do **not** commit your `.env` file.
5. **Pull Request (PR)**:

- Push your branch to GitHub.
- Open a PR targeting the **`dev`** branch.
- CI must pass (tests and Docker build).
- Optional: **1 approval** from the other dev before merging.

6. **Release**: Once `dev` is stable and verified, the **Repo Owner** will merge `dev` into `main` for the final release.

---

# Manual way of building and updating the docker image

### Docker Hub

The var VITE_DOCKER_BUILD=true is needed to activate prod env and not mess up Vite way of doing things (idk).

```bash
docker build --build-arg VITE_DOCKER_BUILD=true -t r4ppzf/research-repo-frontend:latest .
docker push r4ppzf/research-repo-frontend:latest
```

---

### Github Registry

You cant really push without a PAT

```bash
docker build --build-arg VITE_DOCKER_BUILD=true -t research-repo-frontend:latest .
docker tag research-repo-frontend:latest ghcr.io/r4ppz/research-repository-frontend:latest
docker push r4ppzf/research-repo-frontend:latest
```
