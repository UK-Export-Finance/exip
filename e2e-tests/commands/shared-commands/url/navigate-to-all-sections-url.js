import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * navigateToAllSectionsUrl
 * Navigate to the "all sections" URL of an application
 * @param {Number} referenceNumber: Application reference number
 * @returns {Window}
 */
const navigateToAllSectionsUrl = (referenceNumber) => {
  const allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

  cy.visit(allSectionsUrl);
};

export default navigateToAllSectionsUrl;
