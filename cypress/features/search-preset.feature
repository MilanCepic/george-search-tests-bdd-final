Feature: Search using date presets
  As a George user
  I want to quickly filter my transactions using predefined date ranges
  So that I can easily review transactions for a specific period

  Background:
    Given the user is logged into George
    And the user is on the Overview page

  Scenario: Selecting the "Last Month" preset returns filtered results
    When the user opens the search bar
    And the user clicks into the search field to open the date presets
    And the user selects the "Last Month" preset
    Then the search results summary should be visible
    And the results count should be greater than zero
    And at least one transaction should be displayed in the list