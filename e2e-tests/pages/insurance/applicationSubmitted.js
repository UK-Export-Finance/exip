const applicationSubmittedPage = {
  panel: {
    yourReference: () => cy.get('[data-cy="your-reference"]'),
    referenceNumber: () => cy.get('[data-cy="reference-number"]'),
  },
  whatHappensNext: {
    heading: () => cy.get('[data-cy="what-happens-next-heading"]'),
    intro: () => cy.get('[data-cy="what-happens-next-intro"]'),
    listItem: (index) => cy.get(`[data-cy="what-happens-next-list-item-${index}"]`),
    climateChangeFactors: () => cy.get('[data-cy="what-happens-next-climate-change-factors"]'),
  },
  decisionFromUs: {
    heading: () => cy.get('[data-cy="decision-from-us-heading"]'),
    timeframe: () => cy.get('[data-cy="decision-from-us-timeframe"]'),
    extraInfo: () => cy.get('[data-cy="decision-from-us-extra-info"]'),
  },
  actions: {
    startNewApplication: () => cy.get('[data-cy="start-new-application"]'),
    giveFeedback: () => cy.get('[data-cy="give-feedback"]'),
  },
  research: {
    heading: () => cy.get('[data-cy="research-heading"]'),
    carryOut: () => cy.get('[data-cy="research-carry-out"]'),
    takePartLink: () => cy.get('[data-cy="research-take-part-link"]'),
    ifYouLike: () => cy.get('[data-cy="research-if-you-like"]'),
  },
};

export default applicationSubmittedPage;
