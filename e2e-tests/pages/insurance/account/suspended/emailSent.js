const emailSentPage = {
  weSentLinkTo: () => cy.get('[data-cy="we-sent-link-to"]'),
  checkYourEmail: () => cy.get('[data-cy="check-your-email"]'),
  havingProblemsHeading: () => cy.get('[data-cy="having-problems-heading"]'),
};

export default emailSentPage;
