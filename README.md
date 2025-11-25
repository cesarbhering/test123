# WebArena Environment Repository

Collaborative workspace for building WebArena environments for AI agent evaluation.

## Overview

This repository is a claimed task where contributors work together to build a WebArena environment. When merged to `main`, work is automatically submitted and evaluated.

## Quick Start

1. **Navigate to the working directory:**
   ```bash
   cd work/2025-11-25-newton-muon-c1c28595/problems/webarena/2025-11-25-newton-muon-c1c28595
   ```

2. **Build your WebArena environment:**
   - Modify `docker-compose.yaml` to define services
   - Update `metadata.json` with configuration
   - Add/edit tasks in `tasks/` directory
   - Build your application (static files in `html/`, custom app in `environment/`, or your own structure)

3. **Test locally:**
   ```bash
   docker compose up -d
   # Visit http://localhost:3001 (or your configured port)
   docker compose down
   ```

4. **Commit and push to `main`:**
   ```bash
   git add .
   git commit -m "Update WebArena environment"
   git push origin main
   ```
   - Automatic submission triggers via GitHub Actions
   - Evaluation results deployed to GitHub Pages
   - Artifacts available in Actions tab

## Working Directory Structure

**Your work directory:**
```
work/2025-11-25-newton-muon-c1c28595/problems/webarena/2025-11-25-newton-muon-c1c28595/
├── metadata.json              # Required: Problem configuration
├── docker-compose.yaml        # Required: Services definition  
├── README.md                  # Required: Problem description
├── html/                      # Example: Static website files
│   ├── index.html             #   (or use environment/ for custom apps)
│   ├── style.css
│   └── *.js
└── tasks/                     # Required: Task definitions by difficulty
    ├── easy/
    │   ├── task_001.json
    │   └── task_002.json
    ├── medium/
    └── hard/
```

**Required files:** `metadata.json`, `docker-compose.yaml`, `tasks/`
**Your application:** Use `html/` for static files OR `environment/` for custom applications
**Do not create new problem directories** - work within the structure above.

## Automatic Workflow

When you push to `main`:

1. **GitHub Actions triggers** and installs dependencies
2. **Submits work** via `alignerr submit-work --wait`
3. **Downloads evaluation results** (validation, model testing, reports)
4. **Deploys to GitHub Pages** with aggregated reports
5. **Uploads artifacts** (videos, screenshots, HTML reports)

View results at: `https://<username>.github.io/<repo-name>/`


## Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development workflow and best practices
- **[docs/webarena.md](docs/webarena.md)** - WebArena environment specification and guidelines

## Resources

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Detailed workflow and best practices
- **[docs/webarena.md](docs/webarena.md)** - WebArena specification and guidelines
- **GitHub Pages** - View evaluation results after submission
- **Actions tab** - Download artifacts (videos, reports, screenshots)
