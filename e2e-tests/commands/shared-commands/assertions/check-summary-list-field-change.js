/**
 * clicks change link and checks that page goes to correct route
 * @param {object} fieldVariables
 * @param {string} referenceNumber: Application reference number
 */
export const checkChangeLinkUrl = (fieldVariables, referenceNumber) => {
  const { route, fieldId, summaryList } = fieldVariables;

  summaryList.field(fieldId).changeLink().click();

  cy.assertChangeAnswersPageUrl({ referenceNumber, route, fieldId });
};

/**
 * checks if value is set in summary list
 * @param {object} fieldVariables
 * @param {number} index eg index of identical summary list rows
 */
export const checkChangeAnswerRendered = ({ fieldVariables, index }) => {
  const { newValue, fieldId, summaryList } = fieldVariables;

  let selector = summaryList.field(fieldId).value();

  if (index) {
    selector = selector.eq(index);
  }

  cy.checkText(selector, newValue);
};
