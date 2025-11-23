# George Transaction Search – Cypress Automation Suite

Automated end-to-end tests for the George AT banking platform, focused on validating the transaction search functionality using Cypress v14+ with Cucumber and Gherkin (BDD).

The suite demonstrates:
• Stable automation of a real banking UI
• Session-based login to avoid repeated login steps
• Custom Cypress commands
• Handling infinite scroll
• Search scenarios + edge cases
• BDD approach with Cucumber and Gherkin feature files
• Executable Gherkin scenarios with step definitions

⸻

📦 Installation

```bash
# Install dependencies
npm install

# Verify installation
npm test
```

⸻

🚀 Tech Stack
• Cypress v14+
• JavaScript (ES6)
• Cucumber (via @badeball/cypress-cucumber-preprocessor)
• Gherkin feature files (executable)
• esbuild (for bundling)

⸻

📁 Project Structure

```bash
cypress/
├── e2e/
│ └── search/
│ ├── search-fashion.cy.js ← Legacy Cypress tests (kept for reference)
│ ├── search-case-normalization.cy.js
│ ├── search-clear-results.cy.js
│ ├── search-empty.cy.js
│ ├── search-preset.cy.js
│ ├── search-special-characters.cy.js
│ └── search-typo.cy.js
│
├── features/ # BDD feature files (executable with Cucumber)
│ ├── search/
│ │ └── common.js ← Step definitions for all features
│ ├── search-fashion.feature ← MAIN TEST (required by assignment)
│ ├── search-case-normalization.feature
│ ├── search-clear-results.feature
│ ├── search-empty.feature
│ ├── search-preset.feature
│ ├── search-special-characters.feature
│ └── search-typo.feature
│
├── support/
│ ├── commands.js # login + helpers
│ └── e2e.js
│
├── fixtures/
│ └── example.json
│
cypress.config.js
package.json
README.md
```

🔐 Session Login (Reusable)

Login is implemented once in commands.js, reused via cy.session():

```bash
cy.session("george-session", () => {cy.loginGeorge();});
```

Additional helper:

```bash
cy.visitOverview();
```

⭐ Main Automated Scenario (Required by Assignment)

📄 search-fashion.feature

Covers the exact acceptance criteria using BDD approach: 1. Open search 2. Enter "Fashion" 3. Read summary count 4. Lazy-load all results 5. Verify:
• loaded count == summary count
• first + random transaction contain "Fashion" badge

The scenario is written in Gherkin syntax and executed via Cucumber preprocessor.

⸻

➕ Additional Scenarios (Bonus)

These tests are not required but were added to demonstrate deeper QA ability:
• Case normalization (“FASHION”, “fAsHiOn”, “fashion”)
• Search typo (“Fashionn”) → no results
• Empty search → full results list
• Clear search → X button resets UI
• Special characters (#$%@) → no results
• Date preset (“Last Month”) → results appear

⸻

▶️ Running the Tests

Open Cypress UI:

```bash
npm run test:open
# or
npx cypress open
```

Run all BDD feature tests (recommended):

```bash
npm test
# or
npm run test:feature
# or
npx cypress run --spec "cypress/features/**/*.feature"
```

Run full suite (includes legacy .cy.js tests):

```bash
npm run test:headless
# or
npx cypress run
```

Run specific feature file:

```bash
npx cypress run --spec "cypress/features/search-fashion.feature"
```

🧩 Cucumber & Gherkin Integration

This project uses **@badeball/cypress-cucumber-preprocessor** which is fully compatible with Cypress v14+.

**Feature Files:**
All test scenarios are written in Gherkin syntax and stored in `cypress/features/`. These are executable test files, not just documentation.

**Step Definitions:**
Step definitions are located in `cypress/features/search/common.js` and implement all the Gherkin steps used across feature files.

**Configuration:**

- Cucumber preprocessor is configured in `cypress.config.js`
- Step definitions path is configured in `package.json` under `cypress-cucumber-preprocessor`
- Uses `nonGlobalStepDefinitions: true` for co-located step definitions

**Benefits:**

- Human-readable test scenarios
- Separation of test logic (features) from implementation (step definitions)
- Easy collaboration between technical and non-technical team members
- Reusable step definitions across multiple scenarios
