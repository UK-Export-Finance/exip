const listPage = {
  listItems: {
    intro: () => cy.get("[data-cy='intro']"),
    level1: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-1-item-${itemNumber}']`),
    },
    level2: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-2-item-${itemNumber}']`),
      itemLevel: (itemNumber, level) => cy.get(`[data-cy='list-level-2-item-${itemNumber}']`).eq(level),
    },
    level3: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-3-item-${itemNumber}']`),
    },
  },
};

export default listPage;
