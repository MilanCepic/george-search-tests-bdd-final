Feature: Handling typos in search input
  As a George user
  I want to see a clear message when my search does not match any transaction
  So that I understand there are no results for my query

  Background:
    Given the user is logged into George
    And the user is on the Overview page

  Scenario: Typing an incorrect keyword returns no results
    When the user opens the search bar
    And the user types "Fashionn" into the search field and submits the search
    Then a no-results message should be displayed
    And the message title should be "I'm sorry"
    And the message text should be "There are no transactions that match your search criteria."