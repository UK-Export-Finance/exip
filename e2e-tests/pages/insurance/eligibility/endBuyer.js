const endBuyerPage = {
  summary: () => cy.get('[data-cy="end-buyers-description"] summary'),
  details: () => cy.get('[data-cy="end-buyers-description"]'),
  list: {
    intro: () => cy.get('[data-cy="end-buyers-description-list-intro"]'),
    item: (index) => cy.get(`[data-cy="end-buyers-description-list-item-${index}"]`),
  },
  outro: {
    singleRiskOnly: () => cy.get('[data-cy="end-buyers-description-outro-single-risk-only"]'),
    tryingMultipleRisk: () => cy.get('[data-cy="end-buyers-description-outro-trying-multiple-risks"]'),
    toFindOutMore: () => cy.get('[data-cy="end-buyers-description-outro-to-find-out-more"]'),
  },
};

export default endBuyerPage;
