import SHARED from './shared';

const checkYourAnswersYourBuyer = {
  ...SHARED,
  summaryList: {
    field: (fieldId) => ({
      key: () => cy.get(`.${fieldId}-key`),
      value: () => cy.get(`.${fieldId}-value`),
      changeLink: () => cy.get(`[data-cy="${fieldId}-change-link"]`),
    }),
  },
};

export default checkYourAnswersYourBuyer;
