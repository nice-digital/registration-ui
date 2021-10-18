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
Cypress.Commands.add('login', (email, password) => {
  cy.get('#username', { timeout: 10000 }).should('be.visible');
  cy.get('#username')
    .type(Cypress.env('EMAIL1'))
    .should('have.value', Cypress.env('EMAIL1'));
  cy.get('#password')
    .type(Cypress.env('PASSWORD1'))
    .should('have.value', Cypress.env('PASSWORD1'));
  cy.get('[data-qa-sel="login-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('#my-account-button').click();
  cy.get('[href="/api/auth/logout"]', { timeout: 10000 }).should('be.visible');
  cy.get('#my-account > li:nth-child(4) > a').click();
});
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
