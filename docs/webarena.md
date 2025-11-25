# WebArena Environment - Technical Guide

This guide explains how to build and configure your WebArena environment in this repository.

## What is WebArena?

WebArena is a benchmark for evaluating AI agents on realistic web-based tasks. Your environment consists of:
- **Docker Compose services** that define the web environment
- **Task definitions** with expected behaviors and validation criteria
- **Reference action sequences** showing how to complete each task

## Your Working Structure

Your environment is located at:
```
work/2025-11-25-newton-muon-c1c28595/problems/webarena/2025-11-25-newton-muon-c1c28595/
```

**Required files:**
```
├── metadata.json          # Problem metadata and configuration
├── docker-compose.yaml    # Service definitions
├── README.md              # Problem description
└── tasks/                 # Task definitions
    ├── easy/
    │   └── task_001.json
    ├── medium/
    │   └── task_050.json
    └── hard/
        └── task_100.json
```

**Your application files:**
```
├── html/                  # Option 1: Static files for nginx
│   ├── index.html
│   ├── style.css
│   └── *.js
OR
├── environment/           # Option 2: Custom application
    ├── backend/
    ├── frontend/
    └── data/
```

## Building Your Environment

### 1. Define Services

Edit `docker-compose.yaml` to define your web services:

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "3000:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
      interval: 5s
      timeout: 3s
      retries: 3
      start_period: 5s
```

**Key requirements:**
- All services must have healthchecks
- Use unique ports (e.g., 3001) that don't conflict
- Use read-only mounts where possible

### 2. Configure metadata.json

```json
{
  "benchmark": "webarena",
  "problem_data": {
    "instance_id": "your_instance_id",
    "description": "Brief description of the problem",
    "base_url": "http://localhost:3000",
    "require_reset": false,
    "tasks": [
      "easy/task_001.json",
      "medium/task_050.json",
      "hard/task_100.json"
    ],
    "timing": {
      "wait_compose_startup_seconds": 30,
      "wait_page_load_seconds": 5,
      "wait_between_actions_seconds": 1,
      "wait_page_render_seconds": 5,
      "wait_video_capture_seconds": 2,
      "playwright_action_timeout_ms": 15000
    }
  }
}
```

**Timing configuration:**
- `wait_compose_startup_seconds`: How long to wait for Docker services to start
- `wait_page_load_seconds`: Delay after page navigation
- `wait_between_actions_seconds`: Delay between Playwright actions
- `wait_page_render_seconds`: Wait for page to render before evaluation
- `wait_video_capture_seconds`: Extra wait before stopping video recording
- `playwright_action_timeout_ms`: Timeout for individual Playwright actions

### 3. Define Tasks

Create task files in `tasks/` organized by difficulty:

**tasks/easy/task_001.json:**
```json
{
  "sites": ["web"],
  "task_id": 1,
  "require_login": false,
  "storage_state": null,
  "start_url": "http://localhost:3000",
  "geolocation": null,
  "intent_template": "Navigate to homepage and verify title contains {{expected_text}}",
  "instantiation_dict": {
    "expected_text": "Welcome"
  },
  "intent": "Navigate to homepage and verify title contains Welcome",
  "require_reset": false,
  "eval": {
    "eval_types": ["program_html"],
    "reference_answers": [],
    "reference_url": "",
    "program_html": [
      {
        "url": "http://localhost:3000",
        "required_contents": ["Welcome"],
        "locator": "document.title"
      }
    ]
  },
  "reference_action_sequence": {
    "action_set_tag": "playwright",
    "action_sequence": [
      "page.goto('http://localhost:3000')",
      "page.wait_for_load_state('networkidle')",
      "page.stop('success')"
    ]
  }
}
```

**Task fields:**
- `sites`: List of service names this task uses
- `task_id`: Unique integer identifier
- `require_login`: Whether authentication is needed
- `storage_state`: Path to auth state file (if require_login=true)
- `start_url`: Where the agent begins
- `intent_template`: Task description with `{{parameters}}`
- `instantiation_dict`: Values for template parameters
- `intent`: Fully instantiated task description
- `require_reset`: Whether to reset environment before task
- `eval`: Evaluation criteria (see Evaluation Types below)
- `reference_action_sequence`: Ground truth Playwright actions

## Evaluation Types

WebArena supports multiple evaluation mechanisms:

#### program_html
Most robust - checks for specific content in the DOM:
```json
"eval": {
  "eval_types": ["program_html"],
  "program_html": [
    {
      "url": "http://localhost:3000/success",
      "required_contents": ["Success", "completed"],
      "locator": "document.body.innerText"
    }
  ]
}
```

#### url_match
Validates the final URL:
```json
"eval": {
  "eval_types": ["url_match"],
  "reference_url": "http://localhost:3000/dashboard"
}
```

#### string_match
Checks for strings in page content:
```json
"eval": {
  "eval_types": ["string_match"],
  "reference_answers": ["Success", "Completed"]
}
```

**Best practices:**
- Use `program_html` for robust validation
- Combine multiple eval types for stronger checks
- Provide multiple `required_contents` for better coverage
- Avoid relying solely on `string_match`

## Testing Locally

Before pushing your changes, test your environment:

```bash
cd work/2025-11-25-newton-muon-c1c28595/problems/webarena/2025-11-25-newton-muon-c1c28595

# Start services
docker compose up -d

# Check service health
docker compose ps

# Test in browser
open http://localhost:3001

# View logs if needed
docker compose logs

# Stop services
docker compose down
```

**What to test:**
- All services start and become healthy
- Your application loads correctly
- Navigation works as expected
- Forms and interactions behave correctly
- Tasks are actually completable manually

## Quality Metrics

The system tracks quality metrics for tasks and model performance:

### Task Quality Metrics
- **Eval Types**: Number of evaluation mechanisms (url_match, program_html, string_match)
- **Reference Answers**: Count of expected answer strings
- **HTML Checks**: Number of program_html validation checks
- **URL Validation**: Whether URL matching is configured

### Model Diagnostics
- **Failure Mode**: Classification of why tasks fail (success, eval_mismatch, navigation_timeout, ui_element_missing, parsing_failure, max_step_exceeded, repeat_loop_abort, tool_execution_error, unknown)
- **Interaction Complexity**: Unique URLs visited, unique tools used, total steps
- **Reference Step Ratio**: Actual steps / reference steps (efficiency metric)

These metrics appear in evaluation reports and help identify task quality issues.

## Docker Compose Best Practices

### Always Include Healthchecks

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:80"]
  interval: 10s
  timeout: 5s
  retries: 3
  start_period: 10s
```

### Use Appropriate Ports

Avoid conflicts by using unique port ranges:
- Web apps: 3000-3099
- Databases: 5432 (PostgreSQL), 3306 (MySQL)
- Custom services: 9000+

### Mount Volumes Properly

```yaml
volumes:
  - ./html:/usr/share/nginx/html:ro  # Read-only
  - ./data:/app/data                 # Read-write for persistence
```

### Network Configuration

Services should communicate via service names:
```yaml
services:
  frontend:
    depends_on:
      backend:
        condition: service_healthy
    environment:
      - BACKEND_URL=http://backend:8000
  
  backend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
```

## Task Design Guidelines

### Difficulty Levels

**Easy (1-49):**
- 1-5 actions
- Single page interactions
- Simple form fills
- Basic navigation
- Direct button clicks

**Medium (50-99):**
- 5-15 actions
- Multi-page workflows
- Form validation
- Search and filter
- Simple decision making

**Hard (100+):**
- 15+ actions
- Complex workflows
- Multiple decision points
- Error handling
- Conditional logic

### Writing Good Tasks

1. **Clear Intent**: Task description should be unambiguous
   ```json
   "intent": "Log in with username 'user1' and navigate to the settings page"
   ```

2. **Realistic**: Tasks should represent actual user goals
   - ✅ "Transfer $50 from checking to savings"
   - ❌ "Click button with id 'btn-123'"

3. **Atomic**: Each task tests one capability
   - ✅ "Create a new savings rule"
   - ❌ "Create a savings rule, transfer money, and update profile"

4. **Verifiable**: Success should be clearly determinable
   ```json
   "program_html": [{
     "url": "http://localhost:3000/success",
     "required_contents": ["Transfer successful", "Confirmation #"]
   }]
   ```

5. **Reproducible**: Tasks should work consistently
   - Use `require_reset: true` if state matters
   - Avoid time-dependent checks
   - Handle async operations with proper waits

### Reference Action Sequences

Provide complete, working Playwright commands:

```json
"reference_action_sequence": {
  "action_set_tag": "playwright",
  "action_sequence": [
    "page.goto('http://localhost:3000')",
    "page.get_by_label('Username').fill('user1')",
    "page.get_by_label('Password').fill('password123')",
    "page.get_by_role('button', name='Sign In').click()",
    "page.wait_for_url('**/dashboard')",
    "page.get_by_role('link', name='Settings').click()",
    "page.wait_for_load_state('networkidle')",
    "page.stop('success')"
  ]
}
```

**Tips:**
- Use semantic selectors (`get_by_role`, `get_by_label`) over CSS selectors
- Include waits for navigation and async operations
- End with `page.stop('success')` or return value
- Test sequences manually before submitting

## Common Issues

### Services Not Starting

**Symptoms:** Docker Compose health checks fail

**Solutions:**
- Check logs: `docker compose -f docker-compose.yaml logs`
- Verify port availability: `lsof -i :3000`
- Check healthcheck commands work inside container
- Increase `start_period` in healthcheck

### Base URL Not Accessible

**Symptoms:** Validation fails at health check stage

**Solutions:**
- Ensure services expose correct ports in `docker-compose.yaml`
- Verify healthcheck passes: `docker compose ps`
- Check firewall settings
- Test URL manually: `curl http://localhost:3000`

### Ground Truth Fails

**Symptoms:** Reference actions don't complete successfully

**Solutions:**
- Test Playwright commands manually in a script
- Verify reference answers match actual page content
- Check start_url is correct and accessible
- Add waits for async operations
- Inspect screenshots in validation output

### Task Quality Validation Fails

**Symptoms:** Stage 2 validation reports insufficient verification

**Solutions:**
- Add `program_html` checks instead of relying on `string_match`
- Provide multiple `required_contents` in HTML checks
- Add `reference_url` for `url_match` evaluation
- Combine multiple eval types for robust validation

## Working in This Repository

This repository is set up for a single claimed task where contributors collaborate:

**Your working directory:**
```
work/2025-11-25-newton-muon-c1c28595/problems/webarena/2025-11-25-newton-muon-c1c28595/
```

**Workflow:**

1. **Build your environment** - Work in the directory above
2. **Test locally** - Use `docker compose up -d` to test your environment
3. **Push to main** - Automatic submission via GitHub Actions
4. **Evaluation** - Backend runs validation and agent testing
5. **Results** - Deployed to GitHub Pages with downloadable artifacts

**What you need:**
- Docker and Docker Compose for local testing
- Git for committing changes
- Access to this repository

See existing files in `work/` directory for examples of:
- Docker Compose service definitions
- Task JSON files with proper evaluation criteria
- Reference action sequences for ground truth validation

## Testing Your Environment Locally

Before pushing, test your environment:

```bash
cd work/2025-11-25-newton-muon-c1c28595/problems/webarena/2025-11-25-newton-muon-c1c28595

# Start services
docker compose up -d

# Check service health
docker compose ps

# View logs
docker compose logs

# Test in browser
open http://localhost:3001  # or your configured port

# Stop services
docker compose down
```

## Getting Help

- **Structure questions:** Check [README.md](../README.md) and [CONTRIBUTING.md](../CONTRIBUTING.md)
- **Task format:** Review existing task JSON files in `tasks/` directory
- **Docker issues:** `docker compose logs` to see service errors
- **Testing:** Use browser dev tools to debug your web application
- **Evaluation results:** Check GitHub Pages after submission

