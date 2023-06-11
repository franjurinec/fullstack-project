/// <reference types="Cypress" />

before(function () {
  cy.fixture('admin.json').then((adminData) => {
    cy.getLoginToken(adminData.testPassword).then((token) => {
      cy.disableAllProducts(token)
      cy.createTestProducts(token)
    })
  })
})

after(function () {
  cy.fixture('admin.json').then(({ testPassword }) =>
    cy.getLoginToken(testPassword).then((token) => {
      cy.disableAllProducts(token)
    })
  )
})

describe('store home', () => {
  beforeEach(() => cy.visit('http://127.0.0.1:8788/'))

  it('displays store elements', () => {
    cy.get('header').should('be.visible')
    cy.get('[data-test-class="product-list"]').should('be.visible')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500) // wait for images to load before screenshot
    cy.screenshot()
  })

  it('allows opening product details', () => {
    cy.get('[data-test-class="product-card"]').first().click()
    cy.get('[data-test-class="product-details"]').should('be.visible')
  })

  it('allows opening cart', () => {
    cy.contains('CART').click()
    cy.get('[data-test-class="cart-display"]').should('be.visible')
  })
})

describe('product details', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8788')
    cy.get('[data-test-class="product-card"]').first().click()
  })

  it('displays product details', () => {
    cy.get('[data-test-id="product-name"]').should('be.visible')
    cy.get('[data-test-id="product-description"]').should('be.visible')
    cy.get('[data-test-id="product-price"]').should('be.visible')
    cy.get('[data-test-id="product-image"]').should('be.visible')
  })

  it('allows adding to cart', () => {
    cy.contains('Add to cart').click()
    cy.contains('Added to cart!')
    cy.get('[data-test-id="header-cart"]').contains('(1)')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500) // wait for images to load before screenshot
    cy.screenshot()
  })
})

describe('cart', () => {
  before(cy.ensureOneProduct)

  beforeEach(() => {
    cy.visit('http://127.0.0.1:8788')
    cy.get('[data-test-class="product-card"]').first().click()
    cy.contains('Add to cart').click()
    cy.visit('http://127.0.0.1:8788/cart')
  })

  it('displays cart contents', () => {
    cy.get('[data-test-class="cart-display"]').should('be.visible')
    cy.contains('Checkout').should('be.visible')
  })

  it('allows changing the number of items', () => {
    cy.contains('+1').click()
    cy.get('[data-test-class="cart-quantity"]').contains('2')
    cy.screenshot()
    cy.contains('-1').click()
    cy.get('[data-test-class="cart-quantity"]').contains('1')
  })

  it('allows Stripe checkout', () => {
    cy.contains('Checkout').click()
    cy.origin('https://checkout.stripe.com', () =>
      cy.url().should('include', 'checkout.stripe.com')
    )
  })
})
