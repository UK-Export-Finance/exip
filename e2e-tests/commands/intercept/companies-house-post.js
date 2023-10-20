import {
  COMPANIES_HOUSE_NUMBER as EXAMPLE_COMPANIES_HOUSE_NUMBER,
} from '../../constants/examples';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER, COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * interceptCompaniesHousePost
 * Intercept a POST to companies house API.
 * This allows us to:
 * - Call the API many times during E2E tests without hitting rate limits.
 * - Remove the delay of calling the API and waiting for a response.
 * Steps:
 * 1) Invoke cy.intercept() for the "post companies house number route"
 * 2) When the route is intercepted, return a redirect to the "company details" route, as per the user journey.
 * @param {String} Company number - defaults to EXAMPLE_COMPANIES_HOUSE_NUMBER
 */
const interceptCompaniesHousePost = ({ companyNumber = EXAMPLE_COMPANIES_HOUSE_NUMBER }) => {
  console.info('Intercepting companies house POST with company number: %s', companyNumber);

  /**
   * Define:
   * - POST companies house number route to intercept
   * - GET company details route for redirection
   */
  const postUrl = `${baseUrl}${COMPANIES_HOUSE_NUMBER}`;
  const redirectUrl = `${baseUrl}${COMPANY_DETAILS}`;

  /**
   * Intercept the POST companies house number route.
   * Redirect to GET company details route.
   */
  cy.intercept({ url: postUrl, method: 'POST' }, async (req) => {
    req.redirect(redirectUrl, 301);
  });
};

export default interceptCompaniesHousePost;
