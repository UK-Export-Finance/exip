import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const { ROOT: INSURANCE_ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * assertAllSectionsUrl
 * @param {Number} Application reference number
 */
const assertAllSectionsUrl = (referenceNumber) => {
  const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

  cy.assertUrl(expected);
};

export default assertAllSectionsUrl;
