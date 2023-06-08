/// <reference types="Cypress" />

describe('public api', () => {
  it('can be reached', () => {
    cy.request('http://127.0.0.1:8788/api/hello')
      .its('body')
      .should('eq', 'Hello!')
  })
})

describe('admin api', () => {
  beforeEach(() => {
    cy.getAdminTestPass().then((password) => {
      cy.getLoginToken(password)
        .then((token) => ({
          authorization: `Bearer ${token}`,
        }))
        .as('adminAuthHeader')
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
