describe('Good front for Home page', () => {
	it('Go to home Page', () => {
		cy.visit('/');
	});

	it('Good title', () => {
		cy.get('#app-title').should('contain', 'Artists Book');
	});

	it('Good sub title', () => {
		cy.get('#app-sub-title').should('contain', 'Manage your favorite Artists');
	});

	it('Good number of buttons', () => {
		cy.get('button').should('have.length', 2);
	});

	it('Good name for create account button', () => {
		cy.get('#homePage-register-button').should('contain', 'Create an account');
	});

	it('Good name for login button', () => {
		cy.get('#homePage-login-button').should('contain', 'Login');
	});
});

describe('Create account button for Home page', () => {
	it('Go to home Page', () => {
		cy.visit('/');
	});

	it('Good URL redirect for create account button', () => {
		cy.get('#homePage-register-button').click().url().should('eq', `${Cypress.config().baseUrl}/register`);
	});
});

describe('Login button in Home page', () => {
	it('Go to home Page', () => {
		cy.visit('/');
	});

	it('Good URL redirect for login button', () => {
		cy.get('#homePage-login-button').click().url().should('eq', `${Cypress.config().baseUrl}/login`);
	});
});
