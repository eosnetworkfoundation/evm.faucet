describe('Base Page', () => {
  it('navigation has image', () => {
    cy.visit('/');
    cy.get('nav').find('img').should('have.attr', 'src', '/eos-evm.svg');
  });
});
