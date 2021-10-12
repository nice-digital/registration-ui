describe('Navigate to RegUi homepage', () => {
  it('Finds the Register as Stakeholder link', () => {
    cy.visit('http://localhost:3000/');
    cy.get('a').contains('Register as a stakeholder').click();
    cy.url().should('include', 'alpha-identity.nice.org.uk/login');
    cy.login();
  });
});
