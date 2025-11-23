Feature: Search with invalid characters
  As a George user
  I want the search bar to handle invalid input safely
  So that the system shows a clear message when no results match

  Background:
    Given the user is logged into George
    And the user is on the Overview page

  Scenario: Typing special characters returns no results
    When the user opens the search bar
    And the user types "#$%@" into the search field and submits the search
    Then a no-results message should be displayed
    And the message title should be "I'm sorry"
    And the message text should be "There are no transactions that match your search criteria."