const companiesHouseUnavailablePage = {
  reason: () => cy.get('[data-cy="reason"]'),
  tryAgain: () => cy.get('[data-cy="try-again"]'),
  tryAgainLink: () => cy.get('[data-cy="try-again-link"]'),
  continue: () => cy.get('[data-cy="continue"]'),
  continueLink: () => cy.get('[data-cy="continue-link"]'),
  information: () => cy.get('[data-cy="information"]'),
};

export default companiesHouseUnavailablePage;
