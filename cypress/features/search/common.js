import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Background steps
Given("the user is logged into George", () => {
  cy.session("george-session", () => {
    cy.loginGeorge();
  });
});

Given("the user is on the Overview page", () => {
  cy.visitOverview();
});

// Search bar interactions
When("the user opens the search bar", () => {
  cy.get('[data-cy="search-trigger-button"]').should("be.visible").click();
});

When("the user types {string} into the search field and submits the search", (searchTerm) => {
  cy.get('[data-cy="search-keyword"]').should("be.visible").and("not.be.disabled");
  cy.get('[data-cy="search-keyword"]').clear({ force: true });
  cy.get('[data-cy="search-keyword"]').type(`${searchTerm}{enter}`);
});

When("the user types {string} into the search field", (searchTerm) => {
  cy.get('[data-cy="search-keyword"]').should("be.visible");
  cy.get('[data-cy="search-keyword"]').clear({ force: true });
  // Wait a bit for clear to complete and element to stabilize
  cy.wait(100);
  cy.get('[data-cy="search-keyword"]').type(searchTerm, { delay: 0 });
  // Wait for normalization to complete
  cy.wait(200);
});

When("the search field is empty", () => {
  cy.get('[data-cy="search-keyword"]').should("be.visible");
  cy.get('[data-cy="search-keyword"]').clear({ force: true });
});

When("the user triggers the search without entering a keyword", () => {
  cy.get('[data-cy="search-trigger-button"]').click();
});

When("the user clicks the clear search button", () => {
  cy.get("svg.ico-error").first().click({ force: true });
});

// Date preset interactions
When("the user clicks into the search field to open the date presets", () => {
  cy.get('[data-cy="search-keyword"]').should("be.visible").click();
});

When('the user selects the {string} preset', (presetName) => {
  if (presetName === "Last Month") {
    cy.get('[data-cy="search-dropdown-item-lastMonth"]').should("be.visible").click({ force: true });
  } else {
    cy.contains(presetName, { timeout: 5000 }).should("be.visible").click();
  }
});

// Search results verification
Then("the search results summary should be visible", () => {
  cy.get('[data-cy="transactions-search-summary"]', { timeout: 15000 }).should("be.visible");
});

Then("the search results summary should not be visible", () => {
  cy.get('[data-cy="transactions-search-summary"]').should("not.exist");
});

Then("the results count should match the number of loaded transactions", () => {
  cy.get('[data-cy="transactions-search-summary"]', { timeout: 15000 })
    .invoke("text")
    .then((text) => {
      const totalTransactions = parseInt(text);
      cy.loadAllTransactions().then((loadedCount) => {
        expect(loadedCount).to.eq(totalTransactions);
      });
    });
});

Then("the results count should be greater than {int}", (count) => {
  cy.get('[data-cy="transactions-search-summary"]', { timeout: 15000 })
    .invoke("text")
    .then((text) => {
      const totalTransactions = parseInt(text);
      expect(totalTransactions).to.be.greaterThan(count);
    });
});

Then("the results count should be greater than zero", () => {
  cy.get('[data-cy="transactions-search-summary"]', { timeout: 15000 })
    .invoke("text")
    .then((text) => {
      const totalTransactions = parseInt(text);
      expect(totalTransactions).to.be.greaterThan(0);
    });
});

// Search field verification
Then("the search field should display {string}", (expectedValue) => {
  // Re-query the element to avoid stale reference after normalization
  cy.get('[data-cy="search-keyword"]', { timeout: 5000 }).should("have.value", expectedValue);
});

Then("the search field should be empty", () => {
  cy.get('[data-cy="search-keyword"]').should("have.value", "");
});

// Transaction loading and verification
When("all transaction results are loaded by scrolling", () => {
  cy.loadAllTransactions();
});

Then("the loaded transactions count should equal the expected total count", () => {
  cy.get('[data-cy="transactions-search-summary"]', { timeout: 15000 })
    .invoke("text")
    .then((text) => {
      const totalTransactions = parseInt(text);
      cy.loadAllTransactions().then((loadedCount) => {
        expect(loadedCount).to.eq(totalTransactions);
      });
    });
});

// Transaction details verification
When("the user opens the first transaction in the list", () => {
  cy.get(".g-button-collapsible").eq(0).click();
});

Then("the transaction details should show the category {string}", (category) => {
  cy.get('[data-cy="category-badge"]').should("contain", category);
  
  // Close modal if it exists
  cy.get("body").then(($body) => {
    if ($body.find('[data-cy="modal-close"]').length > 0) {
      cy.get('[data-cy="modal-close"]').click({ force: true });
    }
  });
});

When("the user opens a random transaction from the list", () => {
  cy.loadAllTransactions().then((loadedCount) => {
    const randomIndex = Math.floor(Math.random() * loadedCount);
    cy.get(".g-button-collapsible").eq(randomIndex).click();
  });
});

// No results message verification
Then("a no-results message should be displayed", () => {
  cy.get('[data-cy="no-search-results"]', { timeout: 10000 }).should("be.visible");
});

Then('the message title should be {string}', (title) => {
  cy.contains(title, { timeout: 10000 }).should("be.visible");
});

Then('the message text should be {string}', (messageText) => {
  cy.contains(messageText, { timeout: 10000 }).should("be.visible");
});

// Full list verification
Then("the full list of transactions should be displayed", () => {
  cy.get(".g-button-collapsible", { timeout: 10000 }).should("have.length.greaterThan", 0);
});

Then("at least one transaction should be visible", () => {
  cy.get(".g-button-collapsible", { timeout: 10000 }).should("have.length.greaterThan", 0);
});

Then("at least one transaction should be displayed in the list", () => {
  cy.get(".g-button-collapsible", { timeout: 10000 }).should("have.length.greaterThan", 0);
});

