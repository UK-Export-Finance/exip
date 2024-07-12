const manageAccountPage = {
  emailLink: () => cy.get('[data-cy="email-link"]'),
  emailPrefix: () => cy.get('[data-cy="email-prefix"]'),
};

export default manageAccountPage;
