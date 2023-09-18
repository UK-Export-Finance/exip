import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const { ROOT: INSURANCE_ROOT, APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * assertApplicationSubmittedUrl
 * @param {Number} Application reference number
 */
const assertApplicationSubmittedUrl = (referenceNumber) => {
  const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

  cy.assertUrl(expected);
};

export default assertApplicationSubmittedUrl;
