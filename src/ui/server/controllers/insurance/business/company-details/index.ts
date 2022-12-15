import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import companiesHouseSearch from './helpers/companies-house-search.helper';
import companyDetailsValidation from './validation/company-details';

import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE,
    YOUR_COMPANY: { TRADING_NAME },
  },
} = FIELD_IDS.INSURANCE;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { COMPANY_HOUSE_SEARCH, COMPANY_DETAILS: COMPANY_DETAILS_ROUTE } = EXPORTER_BUSINESS_ROUTES;

const pageVariables = (referenceNumber: number) => ({
  POST_ROUTES: {
    COMPANIES_HOUSE: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_HOUSE_SEARCH}`,
    COMPANY_DETAILS: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROUTE}`,
  },
  FIELDS: EXPORTER_BUSINESS,
});

/**
 * gets the template for company details page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders company details page
 */
const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
  });
};

/**
 * posts companies house number to company house api
 * validates input and response from companies house api and shows relevant errors if they exist
 * populates a summary list with the company information if no validation errors
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} companyDetails template with validation errors or summary list with company details populated
 */
const postCompaniesHouseSearch = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { body } = req;

    const { companiesHouseNumber } = body;
    const submittedValues = {
      [COMPANY_HOUSE.INPUT]: companiesHouseNumber,
    };

    // checks if input is correctly formatted before searching
    const response = await companiesHouseSearch(body);
    const { validationErrors, apiError, company } = response;

    if (apiError) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    if (validationErrors && Object.keys(validationErrors).length) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues,
      });
    }

    if (company) {
      // populates summary list with company information
      const summaryList = companyHouseSummaryList(company);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        SUMMARY_LIST: summaryList,
        submittedValues,
      });
    }

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  } catch (error) {
    console.error('Error posting companies house search', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts company details
 * validates tradingName and companiesHouseInput fields
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Company details page with or without errors
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { body } = req;
    // runs companiesHouse validation and api call first for companiesHouse input
    const response = await companiesHouseSearch(body);

    const { apiError, companiesHouseNumber } = response;

    // if error, then there is problem with api/service to redirect
    if (apiError) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    let { validationErrors } = response;

    // populate submittedValues
    const submittedValues = {
      [COMPANY_HOUSE.INPUT]: companiesHouseNumber,
      // if trading name is string true, then convert to boolean true
      [TRADING_NAME]: sanitiseValue(body[TRADING_NAME]),
    };

    // run validation on other fields on page
    validationErrors = companyDetailsValidation(body, validationErrors);

    // if any errors then render template with errors
    if (validationErrors && Object.keys(validationErrors).length) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues,
      });
    }

    // TODO: Remove once page complete.  For testing purposes
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      validationErrors,
      submittedValues,
    });
  } catch (error) {
    console.error('Error posting company details', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, postCompaniesHouseSearch, post };
