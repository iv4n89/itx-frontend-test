Feature: App shell

  Scenario: Initialize cart count from localStorage on mount
    Given localStorage contains "cart-count" with value "3"
    When CartProvider mounts
    Then the cartCount is 3

  Scenario: Initialize cart count to zero when localStorage is empty
    Given localStorage does not contain "cart-count"
    When CartProvider mounts
    Then the cartCount is 0

  Scenario: Persist cart count to localStorage when it changes
    Given CartProvider is mounted with cartCount 0
    When addToCart is called and the API responds with count 2
    Then localStorage "cart-count" is updated to "2"

  Scenario: Update cartCount after adding a product
    Given CartProvider is mounted with cartCount 1
    When addToCart is called and the API responds with count 2
    Then cartCount is 2

  Scenario: addToCart sends the correct payload to the API
    Given a product with id "ABC123", colorCode 1, storageCode 2
    When addToCart is called with those values
    Then the cart repository receives id "ABC123", colorCode 1, storageCode 2

  Scenario: Header title links to the home page
    Given the user is on any page
    When the Header renders
    Then the title is a link pointing to "/"

  Scenario: Header shows the current cart count
    Given the cartCount in CartContext is 5
    When the Header renders
    Then the cart icon displays 5

  Scenario: BreadCrumb renders all navigation items
    Given breadcrumb items: [{ label: "Inicio", to: "/" }, { label: "Detalle", to: null }]
    When BreadCrumb renders
    Then "Inicio" is shown as a link
    And "Detalle" is shown as plain text

  Scenario: BreadCrumb last item is not a link
    Given breadcrumb items with the last item having to: null
    When BreadCrumb renders
    Then the last item has no anchor element

  Scenario: BreadCrumb separates items with a visual separator
    Given breadcrumb items with two entries
    When BreadCrumb renders
    Then a separator ">" is shown between items

  Scenario: CartIcon displays the count passed as prop
    Given a count of 7
    When CartIcon renders
    Then the text "7" is visible

  Scenario: Skeleton applies the base class plus any extra class
    Given a Skeleton with className "product-image"
    When Skeleton renders
    Then the element has both classes "skeleton" and "product-image"

  Scenario: useDocumentTitle updates the document title
    Given the hook receives the string "Product List"
    When useDocumentTitle runs
    Then document.title equals "Product List"

  Scenario: Layout renders the header and the child route
    Given a route that renders the Layout
    When the user navigates to that route
    Then the Header is present in the document
    And the child route content is rendered inside the layout
