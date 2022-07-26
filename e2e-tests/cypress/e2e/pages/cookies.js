const cookiesPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  body1: () => cy.get('[data-cy="body-1"]'),
  body2: () => cy.get('[data-cy="body-2"]'),
  essentialCookies: {
    heading: () => cy.get('[data-cy="essential-cookies-heading"]'),
    intro: () => cy.get('[data-cy="essential-cookies-intro"]'),
    table: {
      head: {
        cell1: () => cy.get('[data-cy="essential-cookies-table-head-cell-1"]'),
        cell2: () => cy.get('[data-cy="essential-cookies-table-head-cell-2"]'),
        cell3: () => cy.get('[data-cy="essential-cookies-table-head-cell-3"]'),
      },
      body: {
        row1: {
          cell1: () => cy.get('[data-cy="essential-cookies-table-row-1-cell-1"]'),
          cell2: () => cy.get('[data-cy="essential-cookies-table-row-1-cell-2"]'),
          cell3: () => cy.get('[data-cy="essential-cookies-table-row-1-cell-3"]'),
        },
        row2: {
          cell1: () => cy.get('[data-cy="essential-cookies-table-row-2-cell-1"]'),
          cell2: () => cy.get('[data-cy="essential-cookies-table-row-2-cell-2"]'),
          cell3: () => cy.get('[data-cy="essential-cookies-table-row-2-cell-3"]'),
        },
      },
    },
  },
};

export default cookiesPage;
