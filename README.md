# WebArena Environment Repository

Collaborative workspace for building WebArena environments for AI agent evaluation.

## Quick Start

This repository is a claimed task work directory where multiple contributors build WebArena environments together.

### For Contributors

**Getting Started:**
1. Install CLI: `uv tool install libs/alignerr-*.whl`
2. Create a branch and work in `work/` directory
3. Create PR when ready
4. Merge to `main` triggers automatic submission

**See full guide:** [CONTRIBUTING.md](CONTRIBUTING.md)

### For WebArena Problem Creators

**Creating WebArena environments:**
- Environment structure and metadata
- Docker Compose configuration
- Task definitions and validation
- Evaluation criteria

**See full documentation:** [docs/webarena.md](docs/webarena.md)

## Automatic Submission

When PRs are merged to `main`, GitHub Actions automatically:
- Installs alignerr CLI from `libs/`
- Runs `alignerr submit-work`
- Submits your work to the backend

Check results later with: `alignerr poll-results --wait`

## Structure

```
webarena-env-1/
├── libs/                      # alignerr CLI wheel
├── work/                      # WebArena environments
│   ├── test_simple/          # Minimal example
│   └── pet_store_demo/       # Complete e-commerce demo
├── .github/workflows/         # Auto-submission workflow
├── docs/                      # Documentation
│   └── webarena.md           # WebArena technical docs
└── CONTRIBUTING.md            # Contributor workflow guide
```

## Required Secrets

Repository administrators must configure:
- `ALIGNERR_BEARER_TOKEN` - Worker token for submission

## Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development workflow and best practices
- **[docs/webarena.md](docs/webarena.md)** - WebArena environment specification
## Example Environments

Two complete examples are included:

1. **`work/test_simple/`** - Minimal example
   - Single static HTML page
   - Basic task validation
   - Good starting point

2. **`work/pet_store_demo/`** - Complete e-commerce demo
   - Multi-page application with navigation
   - Shopping cart with localStorage
   - 4 tasks at different difficulty levels
   - Demonstrates evaluation types and Playwright actions

### Test the Pet Store Demo

```bash
cd work/pet_store_demo
docker compose up -d
```

Open http://localhost:3001 in your browser.

See `work/pet_store_demo/README.md` for full documentation.

## Resources

- CLI help: `alignerr --help`
- Check configuration: `alignerr config`
