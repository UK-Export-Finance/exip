export default (selector, expectedValue) => {
  selector.input().should('have.value', expectedValue);
};
