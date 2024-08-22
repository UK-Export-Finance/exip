/**
 * submitAndAssertChangeAnswersPageUrl
 * submits and construct and check a page URL for any "change/check answers" page.
 * E.g assertChangeAnswersPageUrl(1234, '/policy/services', 'startDate', 'heading')
 * @param {Number} referenceNumber: Application reference number
 * @param {String} route: Expected route
 * @param {String} fieldId: Field ID for the field that is being changed/navigated to
 * @param {String} fragmentSuffix: Optional fragment suffix for the URL. E.g 'heading', 'label'. Defaults to label.
 * @param {Boolean} isInsuranceEligibility: If check answers page is insurance eligibility or not - defaults to false
 */
const submitAndAssertChangeAnswersPageUrl = ({ referenceNumber, route, fieldId, fragmentSuffix, isInsuranceEligibility = false }) => {
  cy.clickSubmitButton();
  cy.assertChangeAnswersPageUrl({
    referenceNumber,
    route,
    fieldId,
    fragmentSuffix,
    isInsuranceEligibility,
  });
};

export default submitAndAssertChangeAnswersPageUrl;
