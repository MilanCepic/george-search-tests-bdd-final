// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginGeorge", () => {
  cy.visit("https://george.fat3.sparkasse.at");

  // USERNAME
  cy.origin("https://login.fat.sparkasse.at", () => {
    cy.get('input[name="j_username"]')
      .should("be.visible")
      .type(Cypress.env("george_username"));
    cy.get("#submitButton").click();
  });

  // PASSWORD
  cy.origin("https://login.fat.sparkasse.at", () => {
    cy.get('input[name="j_password"]')
      .should("be.visible")
      .type(Cypress.env("george_password"));
    cy.get("#submitButton").click();
  });

  cy.contains("Overview", { timeout: 20000 }).should("be.visible");
});
Cypress.Commands.add("loadAllTransactions", () => {
  let previousCount = 0;

  function scrollAndWait() {
    return cy.get(".g-button-collapsible").then(($items) => {
      const currentCount = $items.length;

      if (currentCount > previousCount) {
        previousCount = currentCount;

        // Scroll to bottom of the list
        cy.get(".g-button-collapsible").last().scrollIntoView();

        // Wait for lazy loading
        cy.wait(1500);

        // Repeat until no new items appear
        return scrollAndWait();
      }

      return currentCount;
    });
  }

  return scrollAndWait();
});
Cypress.Commands.add("visitOverview", () => {
  cy.visit("https://george.fat3.sparkasse.at/index.html#/overview");
});
