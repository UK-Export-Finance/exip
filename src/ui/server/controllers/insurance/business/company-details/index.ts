import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import constructPayload from '../../../../helpers/construct-payload';
import companyDetailsValidation from './validation/company-details';
import { isPopulatedArray } from '../../../../helpers/array';
import mapAndSave from '../map-and-save/company-details';
import { companiesHouseSummaryList } from '../../../../helpers/summary-lists/companies-house';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Application, Request, Response } from '../../../../../types';

const {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_NAME },
} = BUSINESS_FIELD_IDS;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: COMPANY_DETAILS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS_SAVE_AND_BACK,
    ALTERNATIVE_TRADING_ADDRESS_ROOT,
    NATURE_OF_BUSINESS_ROOT,
    CHECK_YOUR_ANSWERS,
    COMPANY_DETAILS_ROOT,
    ALTERNATIVE_TRADING_ADDRESS_CHANGE,
    ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const TEMPLATE = COMPANY_DETAILS_TEMPLATE;

export const FIELD_IDS = [HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_NAME];

const IS_APPLICATION_SUMMARY_LIST = true;

const pageVariables = (referenceNumber: number) => ({
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
  DIFFERENT_COMPANIES_HOUSE_NUMBER_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`,
  FIELDS: BUSINESS_FIELD_IDS,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
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

    const mappedApplication = mapApplicationToFormFields(application) as Application;

    const { company } = mappedApplication;

    const submittedValues = {
      [HAS_DIFFERENT_TRADING_NAME]: company?.[HAS_DIFFERENT_TRADING_NAME],
      [TRADING_ADDRESS]: company?.[TRADING_ADDRESS],
      [WEBSITE]: company?.[WEBSITE],
      [PHONE_NUMBER]: company?.[PHONE_NUMBER],
      [DIFFERENT_TRADING_NAME]: company?.[DIFFERENT_TRADING_NAME],
    };

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables(application.referenceNumber),
      submittedValues,
      SUMMARY_LIST: companiesHouseSummaryList(mappedApplication.company, IS_APPLICATION_SUMMARY_LIST),
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

    const mappedApplication = mapApplicationToFormFields(application) as Application;

    const { referenceNumber, company } = mappedApplication;

    const payload = constructPayload(req.body, FIELD_IDS);

    const sanitisedHasTradingAddress = sanitiseValue({ key: TRADING_ADDRESS, value: payload[TRADING_ADDRESS] });

    const submittedValues = {
      /**
       * If trading name is a string of "true",
       * convert to a boolean.
       */
      [HAS_DIFFERENT_TRADING_NAME]: sanitiseValue({ key: HAS_DIFFERENT_TRADING_NAME, value: payload[HAS_DIFFERENT_TRADING_NAME] }),
      [TRADING_ADDRESS]: sanitisedHasTradingAddress,
      [WEBSITE]: payload[WEBSITE],
      [PHONE_NUMBER]: payload[PHONE_NUMBER],
      [DIFFERENT_TRADING_NAME]: payload[DIFFERENT_TRADING_NAME],
    };

    const validationErrors = companyDetailsValidation(payload);

    if (isPopulatedArray(Object.keys(validationErrors))) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues,
        SUMMARY_LIST: companiesHouseSummaryList(company, IS_APPLICATION_SUMMARY_LIST),
      });
    }

    const saveResponse = await mapAndSave.companyDetails(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * Flag to determine if "alternative trading address" field is required.
     * This field is required if TRADING_ADDRESS is "yes"/true and an address has not been provided.
     * This enables us to handle many scenarios that require different redirects:
     * 1) When TRADING_ADDRESS is "yes"/true:
     * - Regular form POST.
     * - Change answers form POST.
     * - Check/change answers form POST.
     * 2) When TRADING_ADDRESS is "no"/false:
     * - Regular form POST.
     * - Change answers form POST.
     * - Check/change answers form POST.
     */
    const tradingAddressIsRequired = sanitisedHasTradingAddress;

    /**
     * If "different trading address" has been submitted as "yes"/true,
     * the trading address does not exist
     * and the route is NOT a check-and-change route,
     * redirect to ALTERNATIVE_TRADING_ADDRESS_ROOT.
     */
    if (submittedValues[TRADING_ADDRESS] && !(isChangeRoute(req.originalUrl) || isCheckAndChangeRoute(req.originalUrl))) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`);
    }

    /**
     * Default routes for:
     * 1) Check your answers.
     * 2) Check and change your answers.
     */
    let changeRoute = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    let checkAndChangeRoute = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

    /**
     * If "different trading address" has been submitted as "yes"/true,
     * the trading address does not exist
     * and the route is a change route,
     * redirect to ALTERNATIVE_TRADING_ADDRESS_CHANGE
     */
    if (tradingAddressIsRequired && isChangeRoute(req.originalUrl)) {
      changeRoute = `${INSURANCE_ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_CHANGE}`;
    }

    /**
     * If "different trading address" has been submitted as "yes"/true,
     * the trading address does not exist
     * and the route is a check-and-change route,
     * redirect to ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE
     */
    if (tradingAddressIsRequired && isCheckAndChangeRoute(req.originalUrl)) {
      checkAndChangeRoute = `${INSURANCE_ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE}`;
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(changeRoute);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(checkAndChangeRoute);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`);
  } catch (err) {
    console.error('Error updating application - your business - company details %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
