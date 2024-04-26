const applicationSubmittedPage = {
  panel: {
    yourReference: () => cy.get('[data-cy="your-reference"]'),
    referenceNumber: () => cy.get('[data-cy="reference-number"]'),
  },
  whatHappensNext: {
    heading: () => cy.get('[data-cy="what-happens-next-heading"]'),
    intro: () => cy.get('[data-cy="what-happens-next-intro"]'),
    willSendEmail: () => cy.get('[data-cy="what-happens-next-will-send-email"]'),
    mayAlsoContact: () => cy.get('[data-cy="what-happens-next-may-also-contact"]'),
  },
  decisionFromUs: {
    heading: () => cy.get('[data-cy="decision-from-us-heading"]'),
    timeframe: () => cy.get('[data-cy="decision-from-us-timeframe"]'),
    questions: {
      intro: () => cy.get('[data-cy="decision-from-us-questions-intro"]'),
      link: () => cy.get('[data-cy="decision-from-us-questions-link"]'),
    }
  },
  helpUsImprove: {
    heading: () => cy.get('[data-cy="help-us-improve-heading"]'),
    carryOut: () => cy.get('[data-cy="help-us-improve-carry-out"]'),
    takePartLink: () => cy.get('[data-cy="help-us-improve-take-part-link"]'),
    ifYouLike: () => cy.get('[data-cy="help-us-improve-if-you-like"]'),
    feedback: {
      intro: () => cy.get('[data-cy="help-us-improve-feedback-intro"]'),
      link: () => cy.get('[data-cy="help-us-improve-feedback-link"]'),
    },
  },
};

export default applicationSubmittedPage;
