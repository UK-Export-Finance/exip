import { PAGES } from '../../../../content-strings';
import { Request, Response, CompanyHouseResponse } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import companiesHouseValidation from './validation/companies-house';
import companyHouseResponseValidation from './validation/companies-house-response';

import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';

const { COMPANY_HOUSE } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const get = async (req: Request, res: Response) => {
  return res.render(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
      BACK_LINK: req.headers.referer,
    }),
    POSTROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
    FIELD_IDS: COMPANY_HOUSE,
  });
};

/**
 * posts to company house api
 * returns summary list if company found
 * or returns validation errors if not found, errors with input or companies house api is down
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
        POSTROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
        FIELD_IDS: COMPANY_HOUSE,
        validationErrors,
        companiesHouseNumber,
      });
    }

    let company = {} as CompanyHouseResponse;
    let summaryList = {};

    // if number provided, then sends to companies house API as keystone query
    if (companiesHouseNumber) {
      company = await api.keystone.getCompaniesHouseInformation(companiesHouseNumber);
    }

    // checks that success flag is not false and apiError flag is not set
    const responseValidationErrors = companyHouseResponseValidation(company);

    if (responseValidationErrors) {
      return res.render(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        POSTROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
        FIELD_IDS: COMPANY_HOUSE,
        validationErrors: responseValidationErrors,
        companiesHouseNumber,
      });
    }

    // populates summary list with company information
    summaryList = companyHouseSummaryList(company);

    return res.render(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
      ...corePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      POSTROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
      FIELD_IDS: COMPANY_HOUSE,
      SUMMARY_LIST: summaryList,
      companiesHouseNumber,
    });
  } catch (error) {
    console.error('Error posting companies house search', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { get, postCompaniesHouseSearch };
