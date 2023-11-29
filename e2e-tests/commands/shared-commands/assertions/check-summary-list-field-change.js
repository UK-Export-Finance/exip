/**
 * clicks change link and checks that page goes to correct route
 * @param {Object} fieldVariables
 * @param {String} referenceNumber
 */
export const checkChangeLinkUrl = (fieldVariables, referenceNumber) => {
  const { route, fieldId, summaryList } = fieldVariables;

  summaryList.field(fieldId).changeLink().click();

  cy.assertChangeAnswersPageUrl({ referenceNumber, route, fieldId });
};

/**
 * checks if value is set in summary list
 * @param {Object} fieldVariables
 */
export const checkChangeAnswerRendered = (fieldVariables) => {
  const {
    newValue, fieldId, summaryList,
  } = fieldVariables;

  cy.checkText(
    summaryList.field(fieldId).value(),
    newValue,
  );
};
