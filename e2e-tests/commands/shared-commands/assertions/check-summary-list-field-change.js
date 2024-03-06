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
 * @param {Number} fieldNumber eg the first or second answer of identical field_id'd rows
 */
export const checkChangeAnswerRendered = (fieldVariables, fieldNumber) => {
  const {
    newValue, fieldId, summaryList,
  } = fieldVariables;

  if (fieldNumber) {
    cy.checkText(
      summaryList.field(fieldId).value().eq(fieldNumber),
      newValue,
    );
  } else {
    cy.checkText(
      summaryList.field(fieldId).value(),
      newValue,
    );
  }
};
