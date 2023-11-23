const checkYourAnswersPage = {
  warning: () => cy.get('[data-cy="warning"]'),
  cannotChangeResponses: () => cy.get('[data-cy="cannot-change-responses"]'),
};

export default checkYourAnswersPage;
