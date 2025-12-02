Feature: Search transactions by keyword "Fashion"
  As a George user
  I want to search for transactions by typing a keyword
  So that I can quickly find all payments related to Fashion

  Background:
    Given the user is logged into George
    And the user is on the Overview page

  Scenario: Search for "Fashion" returns complete and correct results
    When the user opens the search bar
    And the user types "Fashion" into the search field and submits the search
    Then the search results summary should be visible
    And all transaction results are loaded by scrolling
    Then the loaded transactions count should equal the expected total count

    When the user opens the first transaction in the list
    Then the transaction details should show the category "Fashion"

    When the user opens a random transaction from the list
    Then the transaction details should show the category "Fashion"