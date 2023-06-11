/// <reference types="Cypress" />

describe('products', () => {
  beforeEach(function () {
    cy.fixture('admin.json').then((adminData) => {
      cy.getLoginToken(adminData.testPassword).then((token) => {
        cy.disableAllProducts(token)
        cy.createTestProducts(token)
        cy.wrap({
          authorization: `Bearer ${token}`,
        }).as('adminAuthHeader')
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

  describe('get all', () => {
    it('retrieve all active products', () => {
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then((products) => expect(products.length).to.eq(2))
    })
  })

  describe('get by ID', () => {
    it('retrieve specific product', () => {
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then(
          (products) =>
            products.find((product) => product.name === 'Test Product 1').id
        )
        .then((id) =>
          cy
            .request(`http://127.0.0.1:8788/api/products/${id}`)
            .its('body')
            .then((product) => expect(product.name).to.eq('Test Product 1'))
        )
    })

    it('fails with 404 for invalid ID', () => {
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8788/api/products/invalid_id',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 404)
    })
  })

  describe('create new', function () {
    it('creates new product', function () {
      cy.request({
        url: 'http://127.0.0.1:8788/api/products',
        method: 'POST',
        body: {
          name: 'Test Product 3',
          description: 'This product is used for Cypress E2E testing.',
          image: 'https://picsum.photos/id/2/512/512',
          price: 30,
        },
        headers: this.adminAuthHeader,
      })
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then((products) => {
          const product = products.find(
            (product) => product.name === 'Test Product 3'
          ).id
          expect(product).to.exist
        })
    })

    it('rejects with 401 without auth', () => {
      cy.request({
        url: 'http://127.0.0.1:8788/api/products',
        method: 'POST',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 401)
    })

    it('rejects with 400 for invalid payload', function () {
      cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8788/api/products',
        headers: this.adminAuthHeader,
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 400)
    })
  })

  describe('update by ID', function () {
    it('updates product information', function () {
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then(
          (products) =>
            products.find((product) => product.name === 'Test Product 2').id
        )
        .then((id) =>
          cy.request({
            url: `http://127.0.0.1:8788/api/products/${id}`,
            method: 'PUT',
            body: {
              name: 'Test Product 4',
              description: 'This product is used for Cypress E2E testing.',
              image: 'https://picsum.photos/id/2/512/512',
              price: 40,
            },
            headers: this.adminAuthHeader,
          })
        )
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then((products) => {
          const product = products.find(
            (product) => product.name === 'Test Product 4'
          )
          expect(product).to.exist
        })
    })

    it('rejects with 404 for invalid id', function () {
      cy.request({
        url: `http://127.0.0.1:8788/api/products/invalid_id`,
        method: 'PUT',
        body: {
          name: 'Test Product 4',
          description: 'This product is used for Cypress E2E testing.',
          image: 'https://picsum.photos/id/2/512/512',
          price: 40,
        },
        headers: this.adminAuthHeader,
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 404)
    })

    it('rejects with 400 for invalid payload', function () {
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then(
          (products) =>
            products.find((product) => product.name === 'Test Product 2').id
        )
        .then((id) =>
          cy
            .request({
              url: `http://127.0.0.1:8788/api/products/${id}`,
              method: 'PUT',
              headers: this.adminAuthHeader,
              failOnStatusCode: false,
            })
            .its('status')
            .should('eq', 400)
        )
    })

    it('rejects with 401 without auth', function () {
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then(
          (products) =>
            products.find((product) => product.name === 'Test Product 2').id
        )
        .then((id) =>
          cy
            .request({
              url: `http://127.0.0.1:8788/api/products/${id}`,
              method: 'PUT',
              body: {
                name: 'Test Product 4',
                description: 'This product is used for Cypress E2E testing.',
                image: 'https://picsum.photos/id/2/512/512',
                price: 40,
              },
              failOnStatusCode: false,
            })
            .its('status')
            .should('eq', 401)
        )
    })
  })

  describe('remove by ID', function () {
    it('removes product', function () {
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then(
          (products) =>
            products.find((product) => product.name === 'Test Product 2').id
        )
        .then((id) =>
          cy.request({
            url: `http://127.0.0.1:8788/api/products/${id}`,
            method: 'DELETE',
            headers: this.adminAuthHeader,
          })
        )
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then((products) => {
          const product = products.find(
            (product) => product.name === 'Test Product 2'
          )
          expect(product).to.not.exist
        })
    })

    it('rejects with 401 without auth', function () {
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then(
          (products) =>
            products.find((product) => product.name === 'Test Product 2').id
        )
        .then((id) =>
          cy
            .request({
              url: `http://127.0.0.1:8788/api/products/${id}`,
              method: 'DELETE',
              failOnStatusCode: false,
            })
            .its('status')
            .should('eq', 401)
        )
    })

    it('rejects with 404 for invalid ID', function () {
      cy.request({
        url: `http://127.0.0.1:8788/api/products/invalid_id`,
        headers: this.adminAuthHeader,
        method: 'DELETE',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 404)
    })
  })
})

describe('auth', () => {
  beforeEach(function () {
    cy.fixture('admin.json').then((adminData) => {
      cy.getLoginToken(adminData.testPassword)
        .then((token) => ({
          authorization: `Bearer ${token}`,
        }))
        .as('adminAuthHeader')
    })
  })

  describe('login', function () {
    it('returns login token', () => {
      cy.fixture('admin.json').then((adminData) => {
        return cy
          .request({
            method: 'POST',
            url: 'http://127.0.0.1:8788/api/auth',
            body: {
              password: adminData.testPassword,
            },
          })
          .its('body.token')
          .should('exist')
      })
    })

    it('rejects with 401 for invalid password', () => {
      return cy
        .request({
          method: 'POST',
          url: 'http://127.0.0.1:8788/api/auth',
          failOnStatusCode: false,
          body: {
            password: 'wrong password',
          },
        })
        .its('status')
        .should('eq', 401)
    })

    it('rejects with 400 for invalid payload', () => {
      return cy
        .request({
          method: 'POST',
          url: 'http://127.0.0.1:8788/api/auth',
          failOnStatusCode: false,
        })
        .its('status')
        .should('eq', 400)
    })
  })

  describe('check', function () {
    it('returns true with auth', function () {
      cy.request({
        url: 'http://127.0.0.1:8788/api/auth/check',
        headers: this.adminAuthHeader,
      })
        .its('body.authenticated')
        .should('eq', true)
    })

    it('returns false without auth', function () {
      cy.request('http://127.0.0.1:8788/api/auth/check')
        .its('body.authenticated')
        .should('eq', false)
    })
  })
})

describe('checkout', () => {
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

  describe('create new', () => {
    it('returns Stripe checkout URL', () => {
      cy.request('http://127.0.0.1:8788/api/products')
        .its('body')
        .then((products) => {
          const line_items = products.map((product) => ({
            price: product.priceId,
            quantity: 1,
          }))
          cy.log(products)
          cy.log(line_items)
          cy.request({
            method: 'POST',
            url: 'http://127.0.0.1:8788/api/checkouts',
            body: {
              line_items: line_items,
            },
          })
            .its('body')
            .then(({ sessionUrl }) => expect(sessionUrl).to.exist)
        })
    })

    it('rejects with 400 for invalid payload', () => {
      cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8788/api/checkouts',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 400)
    })
  })

  describe('get by ID', () => {
    it('rejects with 404 for invalid ID', () => {
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8788/api/checkouts/invalid_id',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 404)
    })
  })
})
