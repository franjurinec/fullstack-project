/// <reference types="Cypress" />

describe('public api', () => {
  it('can be reached', () => {
    cy.request('http://127.0.0.1:8788/api/hello')
      .its('body')
      .should('eq', 'Hello!')
  })

  it('returns products', cy.ensureOneProduct)

  it('forbidden from adding products', () => {
    cy.request({
      url: 'http://127.0.0.1:8788/api/products',
      method: 'POST',
      failOnStatusCode: false,
    })
      .its('status')
      .should('eq', 401)
  })

  it('fails the auth check', function () {
    cy.request({
      url: 'http://127.0.0.1:8788/api/auth/check',
      headers: this.adminAuthHeader,
    })
      .its('body.authenticated')
      .should('eq', false)
  })
})

describe('admin api', () => {
  before(cy.ensureOneProduct)

  beforeEach(() => {
    cy.fixture('admin.json').then((adminData) => {
      cy.getLoginToken(adminData.testPassword)
        .then((token) => ({
          authorization: `Bearer ${token}`,
        }))
        .as('adminAuthHeader')
    })
  })

  it('allows getting the login token', () => {
    cy.fixture('admin.json').then((adminData) => {
      cy.getLoginToken(adminData.testPassword).should('exist')
    })
  })

  // Needs to use 'function' syntax to access 'this'
  it('passes the auth check', function () {
    cy.request({
      url: 'http://127.0.0.1:8788/api/auth/check',
      headers: this.adminAuthHeader,
    })
      .its('body.authenticated')
      .should('eq', true)
  })
})
