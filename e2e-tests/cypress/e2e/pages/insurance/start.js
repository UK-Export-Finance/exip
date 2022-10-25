const startPage = {
  intro: () => cy.get('[data-cy="intro"]'),
  list: {
    intro: () => cy.get('[data-cy="list-intro"]'),
    item1: () => cy.get('[data-cy="list-item-1"]'),
    item2: () => cy.get('[data-cy="list-item-2"]'),
    item3: () => cy.get('[data-cy="list-item-3"]'),
    item4: () => cy.get('[data-cy="list-item-4"]'),
  },
  body1: () => cy.get('[data-cy="body-1"]'),
  body2: () => cy.get('[data-cy="body-2"]'),
  body3: () => cy.get('[data-cy="body-3"]'),
  body4: () => cy.get('[data-cy="body-4"]'),
};

export default startPage;
