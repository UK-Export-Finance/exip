const confidentialityPage = {
  listItems: {
    intro: () => cy.get("[data-cy='intro']"),
    level1: {
      item1: () => cy.get("[data-cy='list-level-1-item-1']"),
      item2: () => cy.get("[data-cy='list-level-1-item-2']"),
      item3: () => cy.get("[data-cy='list-level-1-item-3']"),
    },
    level2: {
      item1: () => cy.get("[data-cy='list-level-2-item-1']"),
      item2: () => cy.get("[data-cy='list-level-2-item-2']"),
      item3: () => cy.get("[data-cy='list-level-2-item-3']"),
      item4: () => cy.get("[data-cy='list-level-2-item-4']"),
    },
    level3: {
      item1: () => cy.get("[data-cy='list-level-3-item-1']"),
      item2: () => cy.get("[data-cy='list-level-3-item-2']"),
    },
  },
};

export default confidentialityPage;
