export const checkYourAnswersNeedToStartNewApplication = {
  inset: {
    intro: () => cy.get('[data-cy="inset-intro"]'),
    applicationDeadline: () => cy.get('[data-cy="inset-application-deadline"]'),
  },
  linkButtons: {
    startNewApplication: () => cy.get('[data-cy="start-new-application-link-button"]'),
    returnToExistingApplication: () => cy.get('[data-cy="return-to-existing-application-link-button"]'),
  },
};
