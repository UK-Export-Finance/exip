const checkIfEligiblePage = {
  willAskQuestions: {
    listItem: (itemNumber) => cy.get(`[data-cy="will-ask-questions-list-item-${itemNumber}"]`),
  },
  willNeedCompaniesHouseNumber: () => cy.get('[data-cy="will-need-companies-house-number"]'),
  ifEligible: () => cy.get('[data-cy="if-eligible"]'),
  getImmediateAnswer: () => cy.get('[data-cy="get-immediate-answer"]'),
};

export default checkIfEligiblePage;
