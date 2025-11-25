# WebArena Environment - Contributor Guide

This repository is a collaborative workspace for building a WebArena environment. Contributors work together in a single shared directory to create web-based tasks for AI agent evaluation.

## Working Directory

**Your work directory is:**
```
work/2025-11-25-newton-muon-c1c28595/problems/webarena/2025-11-25-newton-muon-c1c28595/
```

**Structure you should maintain:**
```
├── metadata.json              # Problem configuration
├── docker-compose.yaml        # Services definition
├── README.md                  # Problem description
├── html/                      # Static website files
│   ├── index.html
│   ├── style.css
│   └── *.js
└── tasks/                     # Task definitions
    ├── easy/
    │   ├── task_001.json
    │   └── task_002.json
    ├── medium/
    └── hard/
```

**Important:** Do not create new directories or move files outside this structure.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Git configured
- Access to this repository

### Development Workflow

1. **Navigate to working directory:**
   ```bash
   cd work/2025-11-25-newton-muon-c1c28595/problems/webarena/2025-11-25-newton-muon-c1c28595
   ```

2. **Modify the environment:**
   - **Services**: Edit `docker-compose.yaml` to define web services
   - **Configuration**: Update `metadata.json` for problem settings
   - **Tasks**: Add/edit JSON files in `tasks/easy/`, `tasks/medium/`, `tasks/hard/`
   - **Website**: Create/modify files in `html/` directory
   - **Documentation**: Update `README.md` to describe your problem

3. **Test locally:**
   ```bash
   # Start services
   docker compose up -d
   
   # Check health
   docker compose ps
   
   # Test in browser
   open http://localhost:3001  # or your configured port
   
   # View logs
   docker compose logs
   
   # Stop services
   docker compose down
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update WebArena environment"
   git push origin main
   ```

GitHub Actions will automatically submit and evaluate your work.


## What You Can Modify

Within the working directory, you can:

- ✓ **Add/edit HTML, CSS, JavaScript files** in `html/`
- ✓ **Create task definitions** in `tasks/easy/`, `tasks/medium/`, `tasks/hard/`
- ✓ **Modify services** in `docker-compose.yaml`
- ✓ **Update configuration** in `metadata.json`
- ✓ **Document changes** in `README.md`
- ✓ **Add supporting files** (images, data files, etc.)

Do not:
- ✗ Create new problem directories
- ✗ Move files outside the working directory
- ✗ Modify files in `libs/`, `.github/`, or root level

## Automatic Submission

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

## Viewing Results

After submission completes, results are available in multiple places:

1. **GitHub Pages** - View aggregated reports at your repository's GitHub Pages URL
   - Includes all agent evaluation reports
   - Side-by-side comparisons of agent performance
   - Videos and screenshots of agent interactions

2. **GitHub Actions Artifacts** - Download from the Actions run page:
   - `evaluation-results` - Complete results directory
   - `validation-reports` - HTML validation reports
   - `github-pages` - Pre-packaged Pages deployment

Results include:
- HTML reports with side-by-side comparisons
- Video recordings of agent interactions (.webm files)
- Screenshots at each step
- Trajectory data (JSON)
- Pass/fail metrics by agent

## Resources

- **WebArena specification:** [docs/webarena.md](docs/webarena.md)
- **Example tasks:** See existing JSON files in `tasks/` directory
- **Docker Compose docs:** https://docs.docker.com/compose/
- **Playwright (for reference actions):** https://playwright.dev/

## Getting Help

- **Examples:** Check existing files in `work/` directory
- **Submission issues:** Review GitHub Actions logs
- **Docker problems:** Use `docker compose logs` to debug
- **Task format:** Look at existing task JSON files in `tasks/`

