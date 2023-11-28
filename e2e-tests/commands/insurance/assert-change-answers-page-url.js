import { INSURANCE_ROOT } from '../../constants/routes/insurance';

const baseUrl = Cypress.config('baseUrl');

/**
 * assertChangeAnswersPageUrl
 * Construct and check a page URL for any "change/check answers" page.
 * E.g assertChangeAnswersPageUrl(1234, '/policy/services', 'startDate', 'heading')
 * @param {Number} Application reference number
 * @param {String} Expected route
 * @param {String} Field ID for the field that is being changed/navigated to
 * @param {String} Optional fragment suffix for the URL. E.g 'heading', 'label'. Defaults to label.
 */
const assertChangeAnswersPageUrl = (referenceNumber, route, fieldId, fragmentSuffix, isInsuranceEligibility = false) => {
  let expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${route}`;

  if (isInsuranceEligibility) {
    expected = `${baseUrl}${route}`;
  }

  if (fieldId) {
    expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${route}#${fieldId}`;

    if (isInsuranceEligibility) {
      expected = `${baseUrl}${route}#${fieldId}`;
    }

    if (fragmentSuffix) {
      expected = `${expected}-${fragmentSuffix}`;
    } else {
      expected = `${expected}-label`;
    }
  }

  cy.assertUrl(expected);
};

export default assertChangeAnswersPageUrl;
