# George Transaction Search – Cypress Automation Suite

Automated end-to-end tests for the George AT banking platform, focused on validating the transaction search functionality using Cypress v14+ (JavaScript).

The suite demonstrates:
• Stable automation of a real banking UI
• Session-based login to avoid repeated login steps
• Custom Cypress commands
• Handling infinite scroll
• Search scenarios + edge cases
• Optional Gherkin feature files for documentation

⸻

🚀 Tech Stack
• Cypress v14+
• JavaScript (ES6)
• Mocha test runner
• Gherkin features (documentation only)

⸻

📁 Project Structure

```bash
cypress/
├── e2e/
│ └── search/
│ ├── search-fashion.cy.js ← MAIN TEST (required by assignment)
│ ├── search-case-normalization.cy.js
│ ├── search-clear-results.cy.js
│ ├── search-empty.cy.js
│ ├── search-preset.cy.js
│ ├── search-special-characters.cy.js
│ └── search-typo.cy.js
│
├── features/ # optional BDD documentation
│ search-fashion.feature
│ search-case-normalization.feature
│ search-clear-results.feature
│ search-empty.feature
│ search-preset.feature
│ search-special-characters.feature
│ search-typo.feature
│
├── support/
│ commands.js # login + helpers
│ e2e.js
│
├── fixtures/
│ example.json
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

📄 search-fashion.cy.js

Covers the exact acceptance criteria: 1. Open search 2. Enter “Fashion” 3. Read summary count 4. Lazy-load all results 5. Verify:
• loaded count == summary count
• first + random transaction contain “Fashion” badge

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
npx cypress open
```

Run full suite:

```bash
npx cypress run
```

Run only search suite:

```bash
npx cypress run --spec "cypress/e2e/search/**/*.cy.js"
```

🧩 Gherkin Feature Files (Optional)

Cucumber is not used, because the official plugin is not compatible with Cypress v14+.
However, feature files are included for documentation, stored under:
cypress/features/
