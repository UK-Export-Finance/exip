import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import constructPayload from '../../../../helpers/construct-payload';
import companyDetailsValidation from './validation/company-details';
import { isPopulatedArray } from '../../../../helpers/array';
import mapAndSave from '../map-and-save/company-details';
import { populateCompaniesHouseSummaryList } from './helpers/populate-companies-house-summary-list';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
} = BUSINESS_FIELD_IDS;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: COMPANY_DETAILS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = COMPANY_DETAILS_TEMPLATE;

export const FIELD_IDS = [TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER];

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { COMPANY_DETAILS_SAVE_AND_BACK, NATURE_OF_BUSINESS_ROOT, CHECK_YOUR_ANSWERS, COMPANY_DETAILS_ROOT } = EXPORTER_BUSINESS_ROUTES;

const pageVariables = (referenceNumber: number) => {
  return {
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
    DIFFERENT_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`,
    FIELDS: BUSINESS_FIELD_IDS,
  };
};

/**
 * gets the template for company details page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders company details page with/without previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { company } = application;

    // values from application if they exist
    const submittedValues = {
      [TRADING_NAME]: company?.[TRADING_NAME],
      [TRADING_ADDRESS]: company?.[TRADING_ADDRESS],
      [WEBSITE]: company?.[WEBSITE],
      [PHONE_NUMBER]: company?.[PHONE_NUMBER],
    };

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables(application.referenceNumber),
      submittedValues,
      SUMMARY_LIST: populateCompaniesHouseSummaryList(company),
    });
  } catch (err) {
    console.error('Error getting company details %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts company details
 * runs validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Nature of business page with or without errors
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber, company } = application;

    const payload = constructPayload(req.body, FIELD_IDS);

    // populate submittedValues
    const submittedValues = {
      // if trading name is string true, then convert to boolean true
      [TRADING_NAME]: sanitiseValue({ key: TRADING_NAME, value: payload[TRADING_NAME] }),
      [TRADING_ADDRESS]: sanitiseValue({ key: TRADING_ADDRESS, value: payload[TRADING_ADDRESS] }),
      [WEBSITE]: payload[WEBSITE],
      [PHONE_NUMBER]: payload[PHONE_NUMBER],
    };

    // run validation on other fields on page
    const validationErrors = companyDetailsValidation(payload);

    // if any errors then render template with errors
    if (isPopulatedArray(Object.keys(validationErrors))) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues,
        SUMMARY_LIST: populateCompaniesHouseSummaryList(company),
      });
    }

    // if no errors, then runs save api call to db
    const saveResponse = await mapAndSave.companyDetails(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`);
  } catch (err) {
    console.error('Error updating application - your business - company details %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
