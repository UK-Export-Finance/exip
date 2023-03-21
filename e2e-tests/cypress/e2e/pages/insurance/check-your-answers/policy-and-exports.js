import SHARED from './shared';

const checkYourAnswersPolicyAndExports = {
  ...SHARED,
  summaryList: {
    field: (fieldId) => ({
      key: () => cy.get(`.${fieldId}-key`),
      value: () => cy.get(`.${fieldId}-value`),
      changeLink: () => cy.get(`[data-cy="${fieldId}-change-link"]`),
    }),
  },
};

export default checkYourAnswersPolicyAndExports;
