const checkYourAnswersPage = {
  summaryLists: {
    export: {
      heading: () => cy.get('[data-cy="summaryList-heading-export"]'),
    },
    policy: {
      heading: () => cy.get('[data-cy="summaryList-heading-policy"]'),
    },
  },
};

export default checkYourAnswersPage;
