# Pet Store Demo - WebArena Example

A simple e-commerce pet store demonstrating WebArena task creation and validation.

## Overview

This is a complete WebArena environment featuring:
- Static website with nginx
- Product browsing and filtering
- Shopping cart with localStorage
- Multiple tasks at different difficulty levels
- Full evaluation criteria

## Structure

```
pet_store_demo/
├── docker-compose.yaml    # nginx web server
├── metadata.json          # WebArena configuration
├── html/                  # Static website files
│   ├── index.html        # Homepage
│   ├── products.html     # Product listing
│   ├── product.html      # Product details
│   ├── cart.html         # Shopping cart
│   ├── style.css         # Styles
│   └── *.js              # JavaScript functionality
└── tasks/                 # Task definitions
    ├── easy/
    │   ├── task_001.json # Navigate to homepage
    │   └── task_002.json # Navigate to products
```

## Running Locally

### Start the environment:

```bash
cd work/pet_store_demo
docker compose up -d
```

### Verify services are healthy:

```bash
docker compose ps
```

### Access the site:

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Stop the environment:

```bash
docker compose down
```

## Tasks

### Easy Tasks (1-2 actions)

**task_001.json** - Navigate to homepage
- Start URL: Homepage
- Action: Load page and verify title
- Validation: Title contains "Pet Store"

**task_002.json** - Navigate to products page
- Start URL: Homepage  
- Actions: Click "Products" link
- Validation: Products page loads with "Our Products" heading

### Medium Tasks (5-10 actions)

**task_050.json** - Add item to cart
- Start URL: Homepage
- Actions: Navigate to products, add Premium Dog Food to cart, view cart
- Validation: Cart page shows product name and price

**task_051.json** - Complete checkout
- Start URL: Homepage
- Actions: Navigate to products, add Cat Scratching Post, view cart, checkout
- Validation: Success message with confirmation number appears

## Testing with Playwright

You can test tasks manually using Playwright:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    
    # Task 001: Navigate to homepage
    page.goto('http://localhost:3001')
    page.wait_for_load_state('networkidle')
    assert 'Pet Store' in page.title()
    
    # Task 002: Navigate to products
    page.get_by_role('link', name='Products').click()
    page.wait_for_load_state('networkidle')
    assert 'Our Products' in page.content()
    
    browser.close()
```

## Key Features

### Evaluation Mechanisms

All tasks use multiple evaluation types:
- **url_match**: Validates final URL
- **program_html**: Checks for specific content in DOM
- **string_match**: Searches for text in page

### Realistic Interactions

- Navigation between pages
- Button clicks and form interactions
- JavaScript-driven cart functionality
- Alert dialog handling
- LocalStorage state management

### Proper Wait Conditions

Reference actions include:
- `wait_for_load_state('networkidle')` for page loads
- `wait_for_timeout()` for JavaScript execution
- Dialog handlers for alerts

## Extending This Example

### Add More Products

Edit `html/products.html` and update the `products` object in `html/script.js`.

### Add New Pages

Create new HTML files in `html/` directory (automatically served by nginx).

### Create More Tasks

Add task JSON files in `tasks/` directory organized by difficulty:
- `tasks/easy/` (1-5 actions)

Update `metadata.json` to include new tasks in the `tasks` array.

### Add Authentication

1. Create login page with form
2. Set `require_login: true` in tasks
3. Generate storage_state file with authenticated session
4. Reference storage_state in task JSON

## Troubleshooting

### Services won't start

```bash
# Check if port 3001 is in use
lsof -i :3001

# View logs
docker compose logs
```

### Tasks fail validation

```bash
# Test reference actions manually with Playwright
# Check that all URLs are accessible
curl http://localhost:3001
curl http://localhost:3001/products.html
```

### Cart not working

- Verify JavaScript is enabled
- Check browser console for errors
- Ensure localStorage is available
- Clear localStorage: `page.evaluate('localStorage.clear()')`
