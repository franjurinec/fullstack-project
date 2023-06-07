/// <reference types="Cypress" />

describe('api', () => {
  it('can be reached', () => {
    cy.request('http://127.0.0.1:8788/api/hello')
      .its('body')
      .should('eq', 'Hello!')
  })
})
