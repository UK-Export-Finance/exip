/**
 * submitAndAssertChangeAnswersPageUrl
 * submits and construct and check a page URL for any "change/check answers" page.
 * E.g assertChangeAnswersPageUrl(1234, '/policy/services', 'startDate', 'heading')
 * @param {Number} Application reference number
 * @param {String} Expected route
 * @param {String} Field ID for the field that is being changed/navigated to
 * @param {String} Optional fragment suffix for the URL. E.g 'heading', 'label'. Defaults to label.
 * @param {Boolean} isInsuranceEligibility if check answers page is insurance eligibility or not - defaults to false
 */
const submitAndAssertChangeAnswersPageUrl = ({
  referenceNumber, route, fieldId, fragmentSuffix, isInsuranceEligibility = false,
}) => {
  cy.clickSubmitButton();
  cy.assertChangeAnswersPageUrl({
    referenceNumber, route, fieldId, fragmentSuffix, isInsuranceEligibility,
  });
};

export default submitAndAssertChangeAnswersPageUrl;
