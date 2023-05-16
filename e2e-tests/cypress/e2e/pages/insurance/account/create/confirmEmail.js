const confirmEmailPage = {
  weSentLinkTo: () => cy.get('[data-cy="we-sent-link-to"]'),
  checkYourEmail: () => cy.get('[data-cy="check-your-email"]'),
  havingProblems: {
    heading: () => cy.get('[data-cy="having-problems-heading"]'),
    requestNew: {
      youCan: () => cy.get('[data-cy="request-new-you-can"]'),
      link: () => cy.get('[data-cy="request-new-link"]'),
      ifNotReceived: () => cy.get('[data-cy="request-new-if-not-received"]'),
    },
    wrongEmail: {
      enteredIncorrectly: () => cy.get('[data-cy="entered-incorrectly"]'),
      createAccountAgainLink: () => cy.get('[data-cy="create-account-again-link"]'),
    },
  },
};

export default confirmEmailPage;
