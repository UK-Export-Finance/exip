export default (selector, expectedValue) => {
  selector.should('have.value', expectedValue);
};
