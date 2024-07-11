/**
 * clickSubmitButtonMultipleTimes
 * Click the submit button multiple times.
 * This is particularly useful when a test needs to skip past X amount of forms,
 * in order to test a particular form in the middle of a section.
 * @param {Integer} count: Amount of times to click the submit button.
 */
const clickSubmitButtonMultipleTimes = ({ count }) => {
  const arr = new Array(count).fill();

  arr.forEach(() => {
    cy.clickSubmitButton();
  });
};

export default clickSubmitButtonMultipleTimes;
