const beforeYouStartPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  intro1: () => cy.get('[data-cy="intro-1"]'),
  intro2: () => cy.get('[data-cy="intro-2"]'),
  useServiceTo: {
    intro: () => cy.get('[data-cy="use-service-to-intro"]'),
    listItems: () => cy.get('[data-cy="use-service-to-list"] li'),
  },
  youWillNeed: () => cy.get('[data-cy="you-will-need"]'),
  completionTime: () => cy.get('[data-cy="completion-time"]'),
  moreThanMaxPeriod: () => cy.get('[data-cy="more-than-max-period"]'),
  moreThanMaxPeriodLink: () => cy.get('[data-cy="more-than-max-period-link"]'),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default beforeYouStartPage;
