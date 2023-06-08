/// <reference types="Cypress" />

describe('admin portal', () => {
  beforeEach(() => {
    cy.fixture('admin.json').its('testPassword').then(cy.login)
    cy.visit('http://127.0.0.1:8788/admin')
  })

  it('displays admin elements', () => {
    cy.contains('Admin Center')
    cy.get('[data-test-id="admin-table"]').should('be.visible')
    cy.screenshot()
  })

  it('add product modal', () => {
    cy.contains('+ New Product').click()
    cy.contains('Add Product')
    cy.get('[data-test-id="product-add-form"]').should('be.visible')
    cy.contains('Submit')
    cy.screenshot()
  })

  it('edit product modal', () => {
    cy.contains('Edit').first().click()
    cy.contains('Edit Product')
    cy.get('[data-test-id="product-edit-form"]').should('be.visible')
    cy.contains('Submit')
    cy.screenshot()
  })

  it('allows signing out', () => {
    cy.contains('Sign Out').click()
    cy.contains('Authenticate')
    cy.screenshot()
  })
})
