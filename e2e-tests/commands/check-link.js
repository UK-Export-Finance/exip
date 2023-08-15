export default (selector, expectedHref, expectedText) => {
  selector.should('have.attr', 'href', expectedHref);

  cy.checkText(selector, expectedText);
};
