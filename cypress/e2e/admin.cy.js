/// <reference types="Cypress" />

describe('admin portal', () => {
  beforeEach(() => cy.fixture('admin.json').its('testPassword').then(cy.login))

  it('loads', () => {
    // TODO: Check admin portal displays normally
  })
})
