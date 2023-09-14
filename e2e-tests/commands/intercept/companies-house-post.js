import api from '../api';
import {
  COMPANIES_HOUSE_NUMBER,
} from '../../constants/examples';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import mockCompanies from '../../fixtures/companies';

const {
  ROOT,
  EXPORTER_BUSINESS: { COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER_ROUTE, COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * interceptCompaniesHousePost
 * Intercept a POST to companies house API.
 * This allows us to:
 * - Call the API many times during E2E tests and avoid hitting rate limits.
 * - Remove the delay of calling the API and waiting for a response.
 * Steps:
 * 1) Get application data
 * 2) Store the application's company and company address IDs from our database.
 * 3) Invoke cy.intercept() for the "post companies house number route"
 * 4) When the route is intercepted, call our API and manually update the application's company and company address.
 * 5) Return a redirect to the "company details" route, as per the user journey. This page displays the company data stored in the database.
 * @param {String} Application reference number
 * @param {String} Company number - defaults to COMPANIES_HOUSE_NUMBER
 */
const interceptCompaniesHousePost = ({ referenceNumber, companyNumber = COMPANIES_HOUSE_NUMBER }) => {
  let companyId;
  let companyAddressId;
  let companySicCodeIds;

  /**
   * Get the application.
   * Store the application's company and company address IDs.
   */
  api.getApplicationByReferenceNumber(referenceNumber).then((application) => {
    const {
      company: {
        registeredOfficeAddress,
        sicCodes,
      },
    } = application;

    companyId = application.company.id;
    companyAddressId = registeredOfficeAddress.id;
    companySicCodeIds = sicCodes.map((sicCode) => ({ id: sicCode.id }));
  });

  /**
   * Define routes with the application's reference number:
   * - POST companies house number route
   * - GET company details route
   */
  const postUrl = `${baseUrl}${ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER_ROUTE}`;
  const redirectUrl = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

  /**
   * Intercept the POST companies house number route.
   * Manually update the application's company data via mock data.
   * Redirect to GET company details route.
   */
  cy.intercept({ url: postUrl, method: 'POST' }, async (req) => {
    const updateObj = mockCompanies[companyNumber];

    if (updateObj) {
      updateObj.oldSicCodes = companySicCodeIds;

      return api.updateCompanyAndCompanyAddress(
        companyId,
        companyAddressId,
        updateObj,
      ).then(() => {
        req.redirect(redirectUrl, 301);
      });
    }

    return null;
  });
};

export default interceptCompaniesHousePost;
