export default (selector, expectedHref) => {
  selector.should('have.attr', 'href', expectedHref);
};
