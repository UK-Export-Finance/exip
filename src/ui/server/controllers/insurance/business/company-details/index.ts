import { PAGES } from '../../../../content-strings';
import { Request, Response, CompanyHouseResponse } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import companiesHouseValidation from './validation/companies-house';
import companyHouseResponseValidation from './validation/companies-house-response';

import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';

const { COMPANY_HOUSE } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const PAGE_VARIABLES = {
  POST_ROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
  FIELDS: COMPANY_HOUSE,
};

/**
 * gets the template for company details page
 * @param req
 * @param res
 * @returns res
 */
const get = async (req: Request, res: Response) => {
  return res.render(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
  });
};

/**
 * posts companies house number to company house api
 * validates input and response from companies house api and shows relevant errors if they exist
 * populates a summary list with the company information if no validation errors
 * @param req
 * @param res
 * @returns template with validation errors or summary list with company details populated
 */
const postCompaniesHouseSearch = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const { companiesHouseNumber } = body;
    // checks if input is correctly formatted before searching
    const validationErrors = companiesHouseValidation(body);

    if (validationErrors) {
      return res.render(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        validationErrors,
        companiesHouseNumber,
      });
    }

    let company = {} as CompanyHouseResponse;

    // if number provided, then sends to companies house API as keystone query
    if (companiesHouseNumber) {
      try {
        company = await api.keystone.getCompaniesHouseInformation(companiesHouseNumber);
      } catch (error) {
        console.error('Error posting to companies house API', { error });
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }
    }

    // checks that success flag is not false and apiError flag is not set
    const responseValidationErrors = companyHouseResponseValidation(company);

    if (responseValidationErrors) {
      return res.render(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        validationErrors: responseValidationErrors,
        companiesHouseNumber,
      });
    }

    // populates summary list with company information
    const summaryList = companyHouseSummaryList(company);

    return res.render(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
      ...corePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      SUMMARY_LIST: summaryList,
      companiesHouseNumber,
    });
  } catch (error) {
    console.error('Error posting companies house search', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { get, postCompaniesHouseSearch };
