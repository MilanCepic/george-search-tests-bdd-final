/// <reference types="cypress" />

describe("Clear search resets results", () => {
  beforeEach(() => {
    cy.session("george-session", () => {
      cy.loginGeorge();
    });

    cy.visitOverview();
  });

  it("Searches for 'Fees', then clears the search and verifies the results reset", () => {
    cy.get('[data-cy="search-trigger-button"]').click();

    cy.get('[data-cy="search-keyword"]').should("be.visible").clear().type("Fees{enter}");

    cy.get('[data-cy="transactions-search-summary"]', { timeout: 15000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const total = parseInt(text);
        expect(total).to.be.greaterThan(0);

        cy.get("svg.ico-error").first().click({ force: true });

        cy.get('[data-cy="transactions-search-summary"]').should("not.exist");

        cy.get('[data-cy="search-keyword"]').should("have.value", "");
      });
  });
});
