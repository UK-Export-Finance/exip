const pageNotFoundPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  body1: () => cy.get('[data-cy="body-1"]'),
  body2: () => cy.get('[data-cy="body-2"]'),
};

export default pageNotFoundPage;
