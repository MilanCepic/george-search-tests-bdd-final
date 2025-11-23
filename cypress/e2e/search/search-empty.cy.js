/// <reference types="cypress" />

describe("Empty search - should return all transactions", () => {
  beforeEach(() => {
    cy.session("george-session", () => {
      cy.loginGeorge();
    });

    cy.visitOverview();
  });

  it("Empty search shows full transaction list", () => {
    cy.get('[data-cy="search-trigger-button"]').click();

    cy.get('[data-cy="search-keyword"]').should("be.visible").and("have.value", "");

    cy.get('[data-cy="search-trigger-button"]').click();

    cy.get(".g-button-collapsible", { timeout: 15000 }).should("exist").and("have.length.greaterThan", 0);
  });
});
