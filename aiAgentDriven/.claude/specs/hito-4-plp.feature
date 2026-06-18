Feature: Product List Page

  Scenario: Show all products returned by the API
    Given the API returns a list of 8 products
    When the home page loads
    Then 8 product items are displayed

  Scenario: Show loading skeletons while products are being fetched
    Given the API has not yet responded
    When the home page renders
    Then skeleton placeholders are shown instead of product cards

  Scenario: Each product card shows image, brand, model and price
    Given a product with brand "Apple", model "iPhone 14", price "999" and an image URL
    When the Item renders
    Then the image is visible
    And the text "Apple" is visible
    And the text "iPhone 14" is visible
    And the text "999" is visible

  Scenario: Clicking a product navigates to its detail page
    Given a product with id "ABC123"
    When the user clicks on that product card
    Then the browser navigates to "/product/ABC123"

  Scenario: Show all products when the search input is empty
    Given the product list is loaded with 8 items
    And the search input is empty
    When the page renders
    Then all 8 items are displayed

  Scenario: Filter products in real time as the user types
    Given the product list contains an Apple and a Samsung product
    When the user types "apple" in the search input
    Then only the Apple product is displayed
    And the Samsung product is not displayed

  Scenario: Filter by model name
    Given the product list contains a product with model "Galaxy S22"
    When the user types "galaxy" in the search input
    Then the Galaxy S22 product is displayed

  Scenario: Show no products when the query matches nothing
    Given the product list is loaded
    When the user types "zzznomatch" in the search input
    Then no product cards are displayed

  Scenario: Restore all products when the search input is cleared
    Given the user previously typed "apple" filtering the list
    When the user clears the search input
    Then all products are displayed again

  Scenario: Search triggers on every input change without debounce
    Given the search input is focused
    When the user changes the input value
    Then the product list updates immediately

  Scenario: Grid shows a maximum of 4 columns on wide screens
    Given the browser viewport is wide (desktop)
    When the items grid renders with 8 products
    Then products are arranged in rows of up to 4 columns

  Scenario: Grid adapts to fewer columns on narrow screens
    Given the browser viewport is narrow (mobile)
    When the items grid renders
    Then products are arranged in a single column
