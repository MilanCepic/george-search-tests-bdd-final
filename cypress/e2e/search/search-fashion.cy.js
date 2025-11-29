/// <reference types="cypress" />

describe("Transaction Search - Fashion", () => {
  beforeEach(() => {
    cy.session("george-session", () => {
      cy.loginGeorge();
    });

    cy.visitOverview();
  });

  it("Loads all transactions, verifies exact count, checks first & random details", () => {
    cy.get('[data-cy="search-trigger-button"]').should("be.visible").click();

    cy.get('[data-cy="search-keyword"]').should("be.visible").and("not.be.disabled").clear().type("Fashion{enter}");

    cy.get('[data-cy="transactions-search-summary"]', { timeout: 15000 })
      .invoke("text")
      .then((text) => {
        const totalTransactions = parseInt(text);

        cy.loadAllTransactions().then((loadedCount) => {
          expect(loadedCount).to.eq(totalTransactions);

          cy.get(".g-button-collapsible").eq(0).click();
          cy.get('[data-cy="category-badge"]').should("contain", "Fashion");

          cy.get("body").then(($body) => {
            if ($body.find('[data-cy="modal-close"]').length > 0) {
              cy.get('[data-cy="modal-close"]').click({ force: true });
            }
          });

          const randomIndex = Math.floor(Math.random() * loadedCount);
          cy.get(".g-button-collapsible").eq(randomIndex).click();
          cy.get('[data-cy="category-badge"]').should("contain", "Fashion");
        });
      });
  });
});
