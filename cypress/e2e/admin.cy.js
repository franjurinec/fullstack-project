describe('admin portal', () => {
  beforeEach(() =>
    cy
      .fixture('admin.json')
      .its('testPassword')
      .then((password) => cy.login(password))
  )

  it('loads', () => {
    // TODO: Check admin portal displays normally
  })
})
