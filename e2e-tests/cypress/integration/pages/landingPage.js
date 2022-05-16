const landingPage = {
  visit: () => cy.visit('/'),
  heading: () => cy.get('[data-cy="heading"]'),
  description: () => cy.get('[data-cy="description"]'),
  coverAgainst: {
    intro: () => cy.get('[data-cy="cover-against-intro"]'),
    listItems: () => cy.get('[data-cy="cover-against-list"] li'),
  },
  useServiceTo: {
    intro: () => cy.get('[data-cy="use-service-to-intro"]'),
    listItems: () => cy.get('[data-cy="use-service-to-list"] li'),
  },
  completionTime: () => cy.get('[data-cy="completion-time"]'),
  submitButton: () => cy.get('[data-cy="submitButton"]'),
  beforeYouStart: {
    heading: () => cy.get('[data-cy="before-you-start-heading"]'),
    intro: () => cy.get('[data-cy="before-you-start-intro"]'),
    listItems: () => cy.get('[data-cy="before-you-start-list"] li'),
    listItemLinks: () => cy.get('[data-cy="before-you-start-list"] li a'),
  },
};

export default landingPage;
