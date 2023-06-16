// Example of a custom command
Cypress.Commands.add('dataCy', (value) => {
	return cy.get(`[data-cy=${value}]`)
});

