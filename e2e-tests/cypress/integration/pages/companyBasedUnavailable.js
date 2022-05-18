const companyBasedUnavailablePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  description: () => cy.get('[data-cy="description"]'),
  actions: {
    intro: () => cy.get('[data-cy="actions-intro"]'),
    listItems: () => cy.get('[data-cy="actions-list"] li'),
  },
};

export default companyBasedUnavailablePage;
