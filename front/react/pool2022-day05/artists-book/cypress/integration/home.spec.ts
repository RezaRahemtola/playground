describe('Buttons and links', function () {
  it('Check Register button', function () {
    cy.visit('http://localhost:3000');
    cy.get('#register').click();
    cy.url().should('include', '/register');
  });
  it('Check Login button', function () {
    cy.visit('http://localhost:3000');
    cy.get('#login').click();
    cy.url().should('include', '/login');
  });
});
