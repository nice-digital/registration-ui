Feature: Guidance list
  As a user of Registration
  I can login to the application

  Background:
    Given I open the url "/"

  Scenario Outline: Navigate to each guidance list tab
    Then I expect that element "body #__next > div.container > a" is visible

