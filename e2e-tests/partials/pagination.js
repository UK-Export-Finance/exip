const pagination = {
  listItems: () => cy.get('.govuk-pagination__item'),
  listItem: (index) => cy.get('.govuk-pagination__item').eq(index),
  listItemLink: (index) => cy.get('.govuk-pagination__link').eq(index),
  nextLink: () => cy.get('.govuk-pagination__next a'),
  previousLink: () => cy.get('.govuk-pagination__prev a'),
};

export default pagination;
