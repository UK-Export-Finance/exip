import { INSURANCE_ROOT } from '../../../constants/routes/insurance';

const assertChangeAnswersPageUrl = (referenceNumber, route, fieldId, fragmentSuffix) => {
  let expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${route}#${fieldId}`;

  if (fragmentSuffix) {
    expected = `${expected}-${fragmentSuffix}`;
  } else {
    expected = `${expected}-label`;
  }

  cy.url().should('eq', expected);
};

export default assertChangeAnswersPageUrl;
