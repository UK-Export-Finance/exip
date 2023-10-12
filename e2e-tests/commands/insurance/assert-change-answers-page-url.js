import { INSURANCE_ROOT } from '../../constants/routes/insurance';

/**
 * assertChangeAnswersPageUrl
 * Construct and check a page URL for any "change/check answers" page.
 * E.g assertChangeAnswersPageUrl(1234, '/policy/services', 'startDate', 'heading')
 * @param {Number} Application reference number
 * @param {String} Expected route
 * @param {String} Field ID for the field that is being changed/navigated to
 * @param {String} Optional fragment suffix for the URL. E.g 'heading', 'label'. Defaults to label.
 */
const assertChangeAnswersPageUrl = (referenceNumber, route, fieldId, fragmentSuffix) => {
  let expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${route}`;

  if (fieldId) {
    expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${route}#${fieldId}`;

    if (fragmentSuffix) {
      expected = `${expected}-${fragmentSuffix}`;
    } else {
      expected = `${expected}-label`;
    }
  }

  cy.assertUrl(expected);
};

export default assertChangeAnswersPageUrl;
