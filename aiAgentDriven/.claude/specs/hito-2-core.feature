Feature: Core data layer

  Scenario: Build the request URL from the environment variable
    Given the env variable VITE_API_BASE_URL is "https://itx-frontend-test.onrender.com"
    When apiFetch is called with "/api/product"
    Then the request is sent to "https://itx-frontend-test.onrender.com/api/product"

  Scenario: Return parsed JSON on a successful response
    Given the API responds with status 200 and a JSON body
    When apiFetch is called with any path
    Then the resolved value is the parsed JSON object

  Scenario: Propagate the error on a failed network request
    Given the fetch call rejects with a network error
    When apiFetch is called
    Then the error is propagated to the caller

  Scenario: Fetch the full product list
    Given the repository is initialized
    When fetchProducts is called
    Then a GET request is sent to "/api/product"
    And the response array is returned

  Scenario: Fetch a single product by id
    Given a product with id "ABC123" exists in the API
    When fetchProduct is called with id "ABC123"
    Then a GET request is sent to "/api/product/ABC123"
    And the product object is returned

  Scenario: Add a product to the cart
    Given a product with id "ABC123", colorCode 1 and storageCode 2
    When addToCart is called with those values
    Then a POST request is sent to "/api/cart"
    And the request body contains id "ABC123", colorCode 1 and storageCode 2
    And the response count is returned

  Scenario: Return all products when the search query is empty
    Given a list of products from different brands
    When filterProducts is called with an empty query
    Then all products are returned

  Scenario: Filter products by brand (case-insensitive)
    Given a list that includes an Apple product and a Samsung product
    When filterProducts is called with query "apple"
    Then only the Apple product is returned

  Scenario: Filter products by model (case-insensitive)
    Given a list that includes a product with model "Galaxy S22"
    When filterProducts is called with query "galaxy"
    Then that product is returned

  Scenario: Return empty list when no product matches the query
    Given a list of products
    When filterProducts is called with query "zzznomatch"
    Then an empty array is returned

  Scenario: Match products whose brand OR model contains the query
    Given a product with brand "Apple" and model "iPhone 14"
    And another product with brand "Samsung" and model "iPhone SE clone"
    When filterProducts is called with query "iphone"
    Then both products are returned
