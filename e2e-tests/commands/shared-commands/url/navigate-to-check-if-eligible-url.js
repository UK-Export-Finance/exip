import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const {
  ELIGIBILITY: { CHECK_IF_ELIGIBLE },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * navigateToCheckIfEligibleUrl
 * Navigate to the "check if eligible" URL of the eligibility process.
 * @returns {Window}
 */
const navigateToCheckIfEligibleUrl = () => {
  const checkIfEligibleUrl = `${baseUrl}${CHECK_IF_ELIGIBLE}`;

  cy.visit(checkIfEligibleUrl);
};

export default navigateToCheckIfEligibleUrl;
