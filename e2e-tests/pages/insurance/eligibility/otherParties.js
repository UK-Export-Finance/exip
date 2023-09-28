const otherPartiesPage = {
  description: {
    summary: () => cy.get('[data-cy="other-parties"] summary'),
    details: () => cy.get('[data-cy="other-parties"]'),
    list: {
      intro: () => cy.get('[data-cy="other-parties-list-intro"]'),
      item1: () => cy.get('[data-cy="other-parties-list-item-1"]'),
      item2: () => cy.get('[data-cy="other-parties-list-item-2"]'),
      item3: () => cy.get('[data-cy="other-parties-list-item-3"]'),
      item4: () => cy.get('[data-cy="other-parties-list-item-4"]'),
      item5: () => cy.get('[data-cy="other-parties-list-item-5"]'),
    },
  },
};

export default otherPartiesPage;
