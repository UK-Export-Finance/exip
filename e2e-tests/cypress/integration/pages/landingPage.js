const landingPage = {
  visit: () => cy.visit('/'),
  heading: () => cy.get('[data-cy="heading"]'),
  intro: () => cy.get('[data-cy="intro"]'),
};

export default landingPage;
