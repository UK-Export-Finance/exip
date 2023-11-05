const confirmationAcknowledgementsPage = {
  listItems: {
    intro: () => cy.get("[data-cy='paragraph-1']"),
    level1: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-1-item-${itemNumber}']`),
    },
    level2: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-2-item-${itemNumber}']`),
    },
  },
};

export default confirmationAcknowledgementsPage;
