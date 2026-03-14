# Running Playwright Tests

This project uses **Playwright** for end-to-end testing. Below are the common ways to run and observe tests during development.

---

## Run All Tests

Run the full Playwright test suite:

```bash
npx playwright test
```

---

# Watch Tests Running

## Headed Mode (See the Browser)

Run tests with the browser visible so you can watch them execute.

```bash
npx playwright test --headed
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium --headed
```

---

## Playwright UI Mode (Recommended)

Launch the interactive Playwright test runner.

```bash
npx playwright test --ui
```

Features:

- Run individual tests
- Watch tests execute in the browser
- Inspect logs and errors
- Re-run failed tests
- View traces and screenshots

---

## Debug Mode

Run tests with the **Playwright Inspector**, allowing step-by-step debugging.

```bash
npx playwright test --debug
```

This will:

- Open the browser
- Pause execution
- Allow step-through inspection

---

## Watch Mode (Auto Re-run Tests)

Automatically rerun tests when files change.

```bash
npx playwright test --watch
```

Useful when actively developing tests.

---

# Helpful Commands

Install Playwright browsers (if needed):

```bash
npx playwright install
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

Run a single test by name:

```bash
npx playwright test -g "test name"
```

---

# Recommended Workflow

For most development:

```bash
npx playwright test --ui
```

This provides the best debugging and visibility when writing or troubleshooting tests.