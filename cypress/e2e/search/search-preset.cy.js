/// <reference types="cypress" />

describe("Search date preset - last month", () => {
  beforeEach(() => {
    cy.session("george-session", () => {
      cy.loginGeorge();
    });

    cy.visitOverview();
  });

  it("Selecting 'last month' returns results", () => {
    cy.get('[data-cy="search-trigger-button"]').click();

    cy.get('[data-cy="search-keyword"]').click();

    cy.get('[data-cy="search-dropdown-item-lastMonth"]').should("be.visible").click({ force: true });

    cy.get('[data-cy="transactions-search-summary"]', { timeout: 15000 })
      .should("be.visible")
      .invoke("text")
      .then((txt) => {
        const total = parseInt(txt);
        expect(total).to.be.greaterThan(0);
      });

    cy.get(".g-button-collapsible").should("exist").and("have.length.greaterThan", 0);
  });
});
