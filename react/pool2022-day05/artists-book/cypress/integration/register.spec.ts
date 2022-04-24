describe('Buttons and links', function () {
  it('Check Register button', function () {
    cy.visit('http://localhost:3000/register');
    cy.get('#register')
  });
  it('Check number of inputs', function () {
    cy.get('input').should('have.length', 3);
  });
  it('Check Login button', function () {
    cy.get('#login').click();
    cy.url().should('include', '/login');
  });
});
