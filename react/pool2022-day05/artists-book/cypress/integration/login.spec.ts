describe('Buttons and links', function () {
  it('Check Login button', function () {
    cy.visit('http://localhost:3000/login');
    cy.get('#login')
  });
  it('Check Register button', function () {
    cy.visit('http://localhost:3000/login');
    cy.get('#register').click();
    cy.url().should('include', '/register');
  });
  it('Check number of inputs', function () {
    cy.visit('http://localhost:3000/login');
    cy.get('input').should('have.length', 2);
  });
});
