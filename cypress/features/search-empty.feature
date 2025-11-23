Feature: Empty search returns all transactions
  As a George user
  I want the search field to allow empty queries
  So that clicking search without input shows all transactions

  Background:
    Given the user is logged into George
    And the user is on the Overview page

  Scenario: Empty search shows full transaction list
    When the user opens the search bar
    And the search field is empty
    And the user triggers the search without entering a keyword
    Then the full list of transactions should be displayed
    And at least one transaction should be visible