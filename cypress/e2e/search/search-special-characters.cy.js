/// <reference types="cypress" />

describe("Search with special characters returns no results", () => {
  beforeEach(() => {
    cy.session("george-session", () => {
      cy.loginGeorge();
    });

    cy.visitOverview();
  });

  it("Typing special characters '#$%@' shows no-results message", () => {
    cy.get('[data-cy="search-trigger-button"]').click();

    cy.get('[data-cy="search-keyword"]').should("be.visible");
    cy.get('[data-cy="search-keyword"]').clear({ force: true });
    cy.get('[data-cy="search-keyword"]').type("#$%@{enter}");

    cy.get('[data-cy="no-search-results"]', { timeout: 10000 }).should("be.visible");

    cy.contains("I'm sorry").should("be.visible");
    cy.contains("There are no transactions that match your search criteria.").should("be.visible");
  });
});
