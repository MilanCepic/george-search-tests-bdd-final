/// <reference types="cypress" />

describe("Search input normalizes case into 'Fashion'", () => {
  beforeEach(() => {
    cy.session("george-session", () => {
      cy.loginGeorge();
    });
    cy.visitOverview();
  });

  const variations = ["FASHION", "fAsHiOn", "fashion"];

  variations.forEach((term) => {
    it(`Typing "${term}" normalizes to "Fashion"`, () => {
      cy.get('[data-cy="search-trigger-button"]').click();

      cy.get('[data-cy="search-keyword"]').should("be.visible");
      cy.get('[data-cy="search-keyword"]').clear();
      cy.get('[data-cy="search-keyword"]').type(term);

      cy.get('[data-cy="search-keyword"]').should("have.value", "Fashion");

      cy.get('[data-cy="search-keyword"]').clear();
    });
  });
});
