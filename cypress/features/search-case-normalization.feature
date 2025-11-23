Feature: Search input normalizes case into "Fashion"
  As a George user
  I want the search bar to automatically normalize input
  So that searches work correctly regardless of letter casing

  Background:
    Given the user is logged into George
    And the user is on the Overview page

  Scenario Outline: Search term is normalized to "Fashion"
    When the user opens the search bar
    And the user types "<inputValue>" into the search field
    Then the search field should display "Fashion"

    Examples:
      | inputValue |
      | FASHION    |
      | fAsHiOn    |
      | fashion    |