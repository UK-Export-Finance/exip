import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * assertAllSectionsUrl
 * Assert that the URL is the "all sections" URL of an application.
 * @param {Number} referenceNumber: Application reference number
 */
const assertAllSectionsUrl = (referenceNumber) => {
  const allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

  cy.assertAllSectionsUrl(allSectionsUrl);
};

export default assertAllSectionsUrl;
