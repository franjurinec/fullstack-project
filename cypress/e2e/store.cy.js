/// <reference types="Cypress" />

describe('store home', () => {
  it('loads', () => {
    cy.visit('http://127.0.0.1:8788/')

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000) // Delay for image loading before screenshot
    cy.screenshot()
  })
})
