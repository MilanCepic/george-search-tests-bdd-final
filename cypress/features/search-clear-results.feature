Feature: Clearing the search resets results
  As a George user
  I want to reset the search input
  So that the full transaction list is shown again after clearing

  Background:
    Given the user is logged into George
    And the user is on the Overview page

  Scenario: Search for "Fees" and then clear the search field
    When the user opens the search bar
    And the user types "Fees" into the search field and submits the search
    Then the search results summary should be visible
    And the results count should be greater than 0

    When the user clicks the clear search button
    Then the search results summary should not be visible
    And the search field should be empty