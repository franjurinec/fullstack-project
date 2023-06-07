/// <reference types="Cypress" />

describe('store', () => {
  before(() =>
    cy.request('http://127.0.0.1:8788/hello').its('status').should('eq', 200)
  )

  beforeEach(() => cy.visit('http://127.0.0.1:8788/'))

  it('displays store home elements (header, product cards)', () => {
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

describe('cart', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8788')
    cy.get('[data-test-class="product-card"]').first().click()
    cy.contains('Add to cart').click()
    cy.visit('http://127.0.0.1:8788/cart')
  })

  it('displays cart contents', () => {
    cy.get('[data-test-class="cart-display"]').should('be.visible')
    cy.contains('Checkout').should('be.visible')
    cy.contains('+1').should('be.visible')
    cy.screenshot()
  })
})
