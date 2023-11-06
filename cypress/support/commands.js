Cypress.Commands.add('getTextFromElement', (selector) => {
    return cy.get(selector).invoke('text');
  });
