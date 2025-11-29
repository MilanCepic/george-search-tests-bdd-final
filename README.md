# George Transaction Search – Cypress Automation Suite

Automated end-to-end tests for the George AT banking platform, focused on validating the transaction search functionality using Cypress v14+ with Cucumber and Gherkin (BDD).

The suite demonstrates stable automation of a real banking UI using BDD approach with Cucumber and Gherkin, including session-based login, custom Cypress commands, infinite scroll handling, and comprehensive search scenarios with edge cases.

⸻

📦 Installation

```bash
# Install dependencies
npm install

# Setup credentials (required before running tests)
cp cypress.env.example.json cypress.env.json
# Edit cypress.env.json and add your test credentials
# Contact project owner for test account credentials if needed

# Verify installation
npm test
```

🔐 Setup Credentials

Before running tests, you need to configure your credentials:

1. Copy `cypress.env.example.json` to `cypress.env.json`
2. Fill in your test credentials in `cypress.env.json`:
   - Contact the project owner for test account credentials
   - Or use your own test account if you have access to the test environment
3. The `cypress.env.json` file is already in `.gitignore` and will not be committed

⚠️ **Note:** Test credentials are required to run the tests. The test environment URL is `https://george.fat3.sparkasse.at` (FAT = Functional Acceptance Testing environment).

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

• Case normalization ("FASHION", "fAsHiOn", "fashion")
• Search typo (“Fashionn”) → no results
• Empty search → full results list
• Clear search → X button resets UI
• Special characters (#$%@) → no results
• Date preset (“Last Month”) → results appear

⸻

▶️ Running the Tests

```bash
# Open Cypress UI
npm run test:open

# Run all BDD feature tests (recommended)
npm test

# Run full suite (includes legacy .cy.js tests)
npm run test:headless

# Run specific feature file
npx cypress run --spec "cypress/features/search-fashion.feature"
```

🧩 Cucumber & Gherkin Integration

This project uses **@badeball/cypress-cucumber-preprocessor** (compatible with Cypress v14+). All test scenarios are written in Gherkin syntax and stored in `cypress/features/` as executable test files. Step definitions are located in `cypress/features/search/common.js` and implement all Gherkin steps used across feature files.

**Configuration:**

- Cucumber preprocessor configured in `cypress.config.js`
- Step definitions path in `package.json` under `cypress-cucumber-preprocessor`
- Uses `nonGlobalStepDefinitions: true` for co-located step definitions

⸻

## 📝 Manual Testing Approach for Transaction Search

Below is my structured methodology for manually testing the Transaction Search functionality in the George platform.  
This approach ensures functional correctness, consistency, UI/UX compliance, and validation of all edge-case scenarios.

### 1. Understanding Requirements and Expected Behavior

Before creating or executing tests, I analyze search input behavior (case sensitivity, normalization), matching logic, infinite scroll behavior, display rules for results and empty states, and interaction behavior when clearing/updating search terms. This ensures test scenarios reflect real user workflows and business expectations.

### 2. Designing Manual Test Scenarios

I break the functionality into scenario groups:

**Positive Scenarios:** Valid keyword searches, substring/partial-word searches, proper result ordering and counts, full dataset loading via infinite scroll.

**Negative Scenarios:** Invalid inputs, unsupported formats, extremely long strings, searches on empty data sets.

**Edge Cases:** Case normalization ("FASHION", "faShIoN", "fashion" → same results), leading/trailing spaces, multiple consecutive spaces, special characters (#, %, /, -, $), fast repeated searches.

**UI/UX Scenarios:** Placeholder visibility, loading indicators during scroll, "no results" behavior, clear/reset button behavior, scroll restoration and list rendering integrity.

### 3. Writing Manual Test Cases

Each test case includes:

- Unique test ID
- Title
- Preconditions
- Detailed step-by-step instructions
- Required test data
- Expected result

All test cases are written clearly, so they can be executed even by someone without prior QA experience, while still conforming to company standards.

#### Example Test Case

**TC-SEARCH-001: Search for "Fashion" keyword and verify complete results**

**Test ID:** TC-SEARCH-001  
**Title:** Search for "Fashion" keyword and verify complete results  
**Priority:** High  
**Type:** Functional / Positive

**Preconditions:**

- User has valid credentials for George banking platform
- User is logged into the system
- User is on the Overview page
- Account contains transactions with "Fashion" category
- Browser is Chrome/Firefox/Safari (latest version)

**Test Data:**

- Search keyword: "Fashion"
- Expected category badge: "Fashion"

**Test Steps:**

| Step # | Action                                                                            | Expected Result                                      |
| ------ | --------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1      | Navigate to the George banking platform Overview page                             | User is on the Overview page                         |
| 2      | Locate and click the search trigger button (magnifying glass icon or search icon) | Search field is displayed                            |
| 3      | Verify the search field is displayed and enabled                                  | Search field is visible and enabled for input        |
| 4      | Type "Fashion" into the search field                                              | Text "Fashion" appears in the search field           |
| 5      | Press Enter or click the search button to submit the search                       | Search is executed                                   |
| 6      | Wait for search results to load (maximum 15 seconds)                              | Results appear within timeout period                 |
| 7      | Verify the search results summary is displayed (e.g., "X transactions found")     | Summary count is visible and shows number of results |
| 8      | Note the total number of transactions displayed in the summary                    | Summary count is recorded (e.g., "5 transactions")   |
| 9      | Scroll down the transaction list to trigger infinite scroll loading               | Additional transactions start loading                |
| 10     | Continue scrolling until no new transactions are loaded                           | All available transactions are loaded                |
| 11     | Count the total number of loaded transaction items                                | Total count of loaded items is recorded              |
| 12     | Verify that the loaded count matches the summary count                            | Loaded count equals summary count                    |
| 13     | Click on the first transaction in the list to open details                        | Transaction details modal/overlay opens              |
| 14     | Verify the transaction details modal/overlay is displayed                         | Modal is visible with transaction information        |
| 15     | Verify the category badge displays "Fashion"                                      | Category badge shows "Fashion" text                  |
| 16     | Close the transaction details (click X or outside modal)                          | Modal closes and returns to transaction list         |
| 17     | Select a random transaction from the list (not the first one)                     | Random transaction is identified                     |
| 18     | Open the random transaction details                                               | Random transaction details modal opens               |
| 19     | Verify the category badge displays "Fashion" for the random transaction           | Random transaction also shows "Fashion" badge        |
| 20     | Close the transaction details                                                     | Modal closes, test complete                          |

#### Quick Manual Test Checklist

For rapid validation of core search functionality, use this checklist:

**Basic Search Functionality:**

- [ ] Valid keyword search (e.g., "Fashion") returns results
- [ ] Search results summary displays correct count
- [ ] All matching transactions are displayed after scrolling
- [ ] Transaction badges match the search keyword
- [ ] Search field accepts input and displays typed text

**Case Normalization:**

- [ ] Uppercase search ("FASHION") works correctly
- [ ] Mixed case search ("fAsHiOn") works correctly
- [ ] Lowercase search ("fashion") works correctly
- [ ] All case variations return the same results

**Edge Cases:**

- [ ] Empty search shows all transactions
- [ ] Invalid keyword (e.g., "Fashionn") shows "no results" message
- [ ] Special characters (#$%@) show "no results" message
- [ ] Leading/trailing spaces are handled correctly
- [ ] Multiple consecutive spaces are normalized

**UI/UX Elements:**

- [ ] Clear/reset button (X) appears when search has value
- [ ] Clear button resets search and shows all transactions
- [ ] Search trigger button opens/closes search field
- [ ] Loading indicators appear during scroll
- [ ] "No results" message displays correct title and text
- [ ] Date presets (e.g., "Last Month") filter results correctly

**Infinite Scroll:**

- [ ] Scrolling loads additional transactions
- [ ] All available results are loaded after full scroll
- [ ] Loaded count matches summary count
- [ ] No duplicate transactions appear
- [ ] Scroll performance is acceptable (no lag/freezing)

**Transaction Details:**

- [ ] First transaction in list opens correctly
- [ ] Random transaction from list opens correctly
- [ ] Transaction details show correct category badge
- [ ] Modal/overlay closes properly
- [ ] Category badges match search keyword

### 4. Test Execution & Documentation

During execution, I verify search result correctness, infinite scroll behavior, stability with rapid search term switching, UI component consistency, and robustness across edge inputs. All issues are tracked with exact reproduction steps, expected vs actual behavior, environment details, and screenshots/videos. After fixes, I perform retest and focused regression to ensure high confidence in search functionality stability.
