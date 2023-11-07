const antiBriberyPage = {
  listItems: {
    intro: () => cy.get("[data-cy='paragraph-1']"),
    level1: {
      item: (itemNumber) => cy.get(`[data-cy='list-level-1-item-${itemNumber}']`),
    },
    firstLevel2: {
      item: (itemNumber) => cy.get('.lower-alpha-counter-list').first().children(`[data-cy='list-level-2-item-${itemNumber}']`),
    },
    secondLevel2: {
      item: (itemNumber) => cy.get('.lower-alpha-counter-list').last().children(`[data-cy='list-level-2-item-${itemNumber}']`),
    },
  },
  expandable: {
    summary: () => cy.get('[data-cy="definition-of-terms"] summary'),
    details: () => cy.get('[data-cy="definition-of-terms"]'),
    table: {
      headers: {
        term: () => cy.get('[data-cy="header-term"]'),
        definition: () => cy.get('[data-cy="header-definition"]'),
      },
      body: {
        row: (row) => ({
          term: () => cy.get(`[data-cy="row-${row}-cell-term"]`),
          definition: () => cy.get(`[data-cy="row-${row}-cell-definition"]`),
          definitionListItem: (listItem) => cy.get(`[data-cy="row-${row}-cell-definition-list-item-${listItem}"]`),
        }),
      },
    },
  },
};

export default antiBriberyPage;
