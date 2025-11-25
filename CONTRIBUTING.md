# WebArena Environment - Contributor Guide

This repository is a collaborative workspace for building WebArena environments. Multiple contributors work together to create web-based tasks for AI agent evaluation.

## Repository Structure

```
webarena-env-1/
├── libs/
│   └── alignerr-*.whl         # CLI tool for local development
├── work/
│   └── <environment_name>/    # Your WebArena environments
│       ├── metadata.json
│       ├── docker-compose.yaml
│       ├── tasks/
│       └── html/ or environment/
├── .alignerrignore            # Files to exclude from submission
└── .github/
    └── workflows/
        └── submit-on-merge.yml  # Auto-submission workflow
```

## Getting Started

### Prerequisites

Install the alignerr CLI from the bundled wheel:

```bash
uv tool install libs/alignerr-*.whl
```

Verify installation:

```bash
alignerr --help
```

### Development Workflow

1. **Create a branch for your work:**
   ```bash
   git checkout -b feature/my-environment
   ```

2. **Create or modify environments in `work/` directory:**
   ```bash
   cd work
   mkdir my_environment
   cd my_environment
   ```

3. **Build your WebArena environment:**
   - Create `metadata.json` with environment configuration
   - Define services in `docker-compose.yaml`
   - Add task definitions in `tasks/` directory
   - Add application code or static files as needed


4. **Test locally:**
   ```bash
   # Start your environment
   docker compose up -d
   
   # Verify services are healthy
   docker compose ps
   
   # Test tasks manually or with Playwright
   ```

5. **Create a Pull Request:**
   ```bash
   git add work/my_environment
   git commit -m "Add my_environment WebArena tasks"
   git push origin feature/my-environment
   ```

6. **Get your PR reviewed and merged:**
   Once approved, merge to `main` branch

### Automatic Submission

When your PR is merged to `main`:
- GitHub Actions automatically triggers
- Installs alignerr CLI
- Runs `alignerr submit-work` to submit your environment
- Submission is sent to the backend for evaluation

**No manual submission required!**

## Checking Results

After your work is submitted, check evaluation results:

```bash
# Poll for results (waits until ready)
alignerr poll-results --wait

# Or check manually
alignerr poll-results
```

Results include:
- Diversity analysis (problem uniqueness)
- Execution results (test validation)
- Model testing (LLM performance)
- Requirements verification (compliance checks)

Results are saved to `./results/<task-name>/` with HTML reports.

## Working with Multiple Environments

You can create multiple environments in the `work/` directory:

```
work/
├── banking_app/
├── ecommerce_site/
└── admin_dashboard/
```

Each environment is independent and can be developed in parallel.

## File Exclusions

The CLI automatically excludes common files when submitting:
- `__pycache__`, `*.pyc`, `node_modules`
- `.git`, `.venv`, `.env`
- `.vscode`, `.idea`, `.DS_Store`

### Custom Exclusions

Add a `.alignerrignore` file to exclude additional files:

```text
# Custom exclusions
*.tmp
debug/
local_config.yaml
```

## Repository Secrets

**Required GitHub secret:**
- `ALIGNERR_BEARER_TOKEN` - Worker authentication token for submission

This is configured by the repository administrator. Contact them if submission fails with authentication errors.

## Best Practices

1. **Test thoroughly before creating PR:**
   - Verify Docker services start correctly
   - Test all tasks manually
   - Check healthchecks pass

2. **Follow WebArena structure:**
   - Use `metadata.json` for configuration
   - Define clear task objectives
   - Include reference action sequences
   - Add proper evaluation criteria

3. **Document your work:**
   - Add README.md in your environment directory
   - Explain task objectives and difficulty levels
   - Document any special setup requirements

4. **Keep commits clean:**
   - Commit only necessary files
   - Don't commit build artifacts or logs
   - Use meaningful commit messages

5. **Collaborate effectively:**
   - Review others' PRs
   - Provide constructive feedback
   - Keep environments isolated (no shared state)

## Troubleshooting

### Submission Fails

Check GitHub Actions logs:
1. Go to Actions tab in GitHub
2. Find the latest "Submit Work on Merge to Main" workflow
3. Review logs for error messages

Common issues:
- Missing `ALIGNERR_BEARER_TOKEN` secret
- Invalid wheel file in `libs/`
- No active task claimed in alignerr system

### Local Testing Issues

If Docker services won't start:
```bash
# Check logs
docker compose logs

# Restart services
docker compose down
docker compose up -d

# Verify healthchecks
docker compose ps
```

If tasks fail:
- Check task JSON syntax
- Verify URLs are accessible
- Test Playwright commands manually
- Review evaluation criteria

## Resources

- Full WebArena documentation: See `docs/webarena.md`
- alignerr CLI documentation: `alignerr --help`
- Example environments:
  - `work/test_simple/` - Minimal example
  - `work/pet_store_demo/` - Complete demo with full README
- Mothership repo: See `README-mothership.md` for system overview

## Getting Help

- Check existing environments in `work/` for examples
- Review GitHub Actions logs for submission issues
- Contact repository maintainers for access issues
- Use `alignerr config` to verify CLI setup

