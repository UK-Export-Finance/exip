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
 * @param {Number} index eg index of identical summary list rows
 */
export const checkChangeAnswerRendered = ({ fieldVariables, index }) => {
  const {
    newValue, fieldId, summaryList,
  } = fieldVariables;

  if (index) {
    cy.checkText(
      summaryList.field(fieldId).value().eq(index),
      newValue,
    );
  } else {
    cy.checkText(
      summaryList.field(fieldId).value(),
      newValue,
    );
  }
};
