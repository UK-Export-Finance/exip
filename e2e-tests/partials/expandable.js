export const expandable = {
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
        definitionListItemChild: (listItem, childItem) => cy.get(`[data-cy="row-${row}-cell-definition-list-item-${listItem}-child-${childItem}"]`),
      }),
    },
  },
};
