// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (password) => {
  cy.request('POST', 'http://127.0.0.1:8788/api/auth', { password })
    .its('body.token')
    .then((token) => localStorage.setItem('fj-admin-token', token))
})

Cypress.Commands.add('getLoginToken', (password) => {
  return cy
    .request('POST', 'http://127.0.0.1:8788/api/auth', { password })
    .its('body.token')
})

Cypress.Commands.add('ensureOneProduct', () => {
  return cy
    .request('http://127.0.0.1:8788/api/products')
    .its('body')
    .should('have.length.at.least', 1)
})

Cypress.Commands.add('disableAllProducts', (adminToken) => {
  cy.request('http://127.0.0.1:8788/api/products')
    .its('body')
    .then((products) => {
      products.forEach((product) =>
        cy.request({
          method: 'DELETE',
          url: `http://127.0.0.1:8788/api/products/${product.id}`,
          headers: {
            authorization: `Bearer ${adminToken}`,
          },
        })
      )
    })
})

Cypress.Commands.add('createTestProducts', (adminToken) => {
  const testProducts = [
    {
      name: 'Test Product 1',
      description: 'This product is used for Cypress E2E testing.',
      image: 'https://picsum.photos/id/2/512/512',
      price: 10,
    },
    {
      name: 'Test Product 2',
      description: 'This product is used for Cypress E2E testing.',
      image: 'https://picsum.photos/id/2/512/512',
      price: 20,
    },
  ]

  testProducts.forEach((product) => {
    cy.request({
      url: 'http://127.0.0.1:8788/api/products',
      method: 'POST',
      body: product,
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    })
  })
})
