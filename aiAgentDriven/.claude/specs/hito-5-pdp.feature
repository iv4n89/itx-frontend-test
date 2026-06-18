Feature: Product Details Page

  Scenario: Show product image in the left column
    Given a product with an image URL
    When the details page renders
    Then the product image is displayed in the left column

  Scenario: Show product specs in the right column
    Given a product with brand "Apple", model "iPhone 14", cpu "A15", ram "6GB"
    When the details page renders
    Then brand, model, cpu and ram are visible in the right column

  Scenario: Show all required spec fields when present
    Given a product with all fields: brand, model, price, cpu, ram, os,
      displayResolution, battery, primaryCamera, secondaryCmera, dimentions, weight
    When ProductSpecs renders
    Then all those fields are visible

  Scenario: Hide spec fields that are absent in the product data
    Given a product without a cpu field
    When ProductSpecs renders
    Then no cpu label or value is shown

  Scenario: Show weight with the gram suffix
    Given a product with weight "206"
    When ProductSpecs renders
    Then the text "206g" is visible

  Scenario: Show a link to navigate back to the product list
    Given the user is on a product detail page
    When the details page renders
    Then a link pointing to "/" is visible

  Scenario: Show color selector buttons with the color name
    Given a product with colors [{ code: 1, name: "Black" }, { code: 2, name: "White" }]
    When Actions renders
    Then two buttons are shown with labels "Black" and "White"

  Scenario: Show storage selector buttons with the storage name
    Given a product with storages [{ code: 1, name: "128GB" }, { code: 2, name: "256GB" }]
    When Actions renders
    Then two buttons are shown with labels "128GB" and "256GB"

  Scenario: Auto-select color when only one option is available
    Given a product with a single color option
    When the details page loads
    Then that color is selected by default

  Scenario: Auto-select storage when only one option is available
    Given a product with a single storage option
    When the details page loads
    Then that storage is selected by default

  Scenario: Do not auto-select when multiple color options exist
    Given a product with two or more color options
    When the details page loads
    Then no color is selected by default

  Scenario: Do not auto-select when multiple storage options exist
    Given a product with two or more storage options
    When the details page loads
    Then no storage is selected by default

  Scenario: Mark the selected color button as active
    Given a product with colors Black and White
    When the user selects "White"
    Then the "White" button has the selected style
    And the "Black" button does not have the selected style

  Scenario: Mark the selected storage button as active
    Given a product with storages 128GB and 256GB
    When the user selects "256GB"
    Then the "256GB" button has the selected style
    And the "128GB" button does not have the selected style

  Scenario: Disable the add button when color is not selected
    Given a product with multiple color options
    And no color has been selected
    When Actions renders
    Then the "Añadir al carrito" button is disabled

  Scenario: Disable the add button when storage is not selected
    Given a product with multiple storage options
    And no storage has been selected
    When Actions renders
    Then the "Añadir al carrito" button is disabled

  Scenario: Enable the add button when both color and storage are selected
    Given the user has selected a color and a storage
    When Actions renders
    Then the "Añadir al carrito" button is enabled

  Scenario: Add product to cart with selected color and storage
    Given the user has selected colorCode 2 and storageCode 1
    When the user clicks "Añadir al carrito"
    Then addToCart is called with the product id, colorCode 2 and storageCode 1

  Scenario: Cart count in header updates after adding a product
    Given the cart count is 0
    When the user adds a product and the API responds with count 1
    Then the header displays 1

  Scenario: Cart count persists after a page reload
    Given the user added a product and the count became 3
    When the user reloads the page
    Then the header still displays 3

  Scenario: Product detail is served from cache on repeated visits within one hour
    Given the user visited the product detail page for id "ABC123"
    When the user navigates away and returns to the same product within one hour
    Then no new network request is made to "/api/product/ABC123"

  Scenario: Document title updates to the product name on the details page
    Given a product with brand "Apple" and model "iPhone 14"
    When the details page renders
    Then document.title reflects the product name
