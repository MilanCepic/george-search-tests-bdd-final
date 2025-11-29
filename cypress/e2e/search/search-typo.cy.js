/// <reference types="cypress" />

describe("Search typo test - no matching results", () => {
  beforeEach(() => {
    cy.session("george-session", () => {
      cy.loginGeorge();
    });

    cy.visitOverview();
  });

  it("Typing 'Fashionn' shows no-results message", () => {
    cy.get('[data-cy="search-trigger-button"]').click();

    cy.get('[data-cy="search-keyword"]').should("be.visible").and("not.be.disabled");
    cy.get('[data-cy="search-keyword"]').clear({ force: true });
    cy.get('[data-cy="search-keyword"]').type("Fashionn{enter}");

    cy.get('[data-cy="no-search-results"]').should("be.visible");

    cy.contains("I'm sorry").should("be.visible");
    cy.contains("There are no transactions that match your search criteria.").should("be.visible");
  });
});
