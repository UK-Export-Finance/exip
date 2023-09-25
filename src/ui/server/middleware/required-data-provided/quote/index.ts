import { FIELD_IDS, ROUTES } from '../../../constants';
import { Request, RequiredDataStateQuoteEligibility, Response, SubmittedDataQuoteEligibility } from '../../../../types';
import { getRoutesAsArray, routeIsKnown, hasRequiredData } from '../helpers';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';

const {
  START,
  BUYER_BODY,
  BUYER_COUNTRY,
  BUYER_COUNTRY_CHANGE,
  CANNOT_APPLY,
  CHECK_YOUR_ANSWERS,
  EXPORTER_LOCATION,
  EXPORTER_LOCATION_CHANGE,
  GET_A_QUOTE_BY_EMAIL,
  UK_GOODS_OR_SERVICES,
  UK_GOODS_OR_SERVICES_CHANGE,
  NEED_TO_START_AGAIN,
  POLICY_TYPE,
  POLICY_TYPE_CHANGE,
  TELL_US_ABOUT_YOUR_POLICY,
  TELL_US_ABOUT_YOUR_POLICY_CHANGE,
  YOUR_QUOTE,
} = ROUTES.QUOTE;

const {
  ELIGIBILITY: {
    VALID_BUYER_BODY,
    VALID_EXPORTER_LOCATION,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    CURRENCY,
    PERCENTAGE_OF_COVER,
    CONTRACT_VALUE,
    CREDIT_PERIOD,
    MAX_AMOUNT_OWED,
  },
} = FIELD_IDS;

/**
 * allRequiredData
 * For each route that requires data submitted from a previous route in the user flow,
 * Create an array of all field IDs from the previous routes.
 * @param {Object} all submitted data
 * @returns {Object}
 */
export const allRequiredData = (submittedData: SubmittedDataQuoteEligibility): RequiredDataStateQuoteEligibility => {
  const requiredDataState = {} as RequiredDataStateQuoteEligibility;

  requiredDataState[BUYER_COUNTRY] = [];

  requiredDataState[BUYER_BODY] = [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY];

  requiredDataState[EXPORTER_LOCATION] = [...requiredDataState[BUYER_BODY], VALID_BUYER_BODY];

  requiredDataState[UK_GOODS_OR_SERVICES] = [...requiredDataState[EXPORTER_LOCATION], VALID_EXPORTER_LOCATION];

  requiredDataState[POLICY_TYPE] = [...requiredDataState[UK_GOODS_OR_SERVICES], HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  requiredDataState[TELL_US_ABOUT_YOUR_POLICY] = [...requiredDataState[POLICY_TYPE], FIELD_IDS.POLICY_TYPE];

  if (isSinglePolicyType(submittedData[FIELD_IDS.POLICY_TYPE])) {
    requiredDataState[TELL_US_ABOUT_YOUR_POLICY] = [...requiredDataState[TELL_US_ABOUT_YOUR_POLICY]];
  }

  requiredDataState[CHECK_YOUR_ANSWERS] = [...requiredDataState[TELL_US_ABOUT_YOUR_POLICY], FIELD_IDS.POLICY_LENGTH, CURRENCY, PERCENTAGE_OF_COVER];

  if (isSinglePolicyType(submittedData[FIELD_IDS.POLICY_TYPE])) {
    requiredDataState[CHECK_YOUR_ANSWERS] = [...requiredDataState[CHECK_YOUR_ANSWERS], CONTRACT_VALUE];
  }

  if (isMultiplePolicyType(submittedData[FIELD_IDS.POLICY_TYPE])) {
    requiredDataState[CHECK_YOUR_ANSWERS] = [...requiredDataState[CHECK_YOUR_ANSWERS], CREDIT_PERIOD, MAX_AMOUNT_OWED];
  }

  requiredDataState[YOUR_QUOTE] = [...requiredDataState[CHECK_YOUR_ANSWERS]];

  return requiredDataState;
};

export const generateRequiredDataState = (submittedData: SubmittedDataQuoteEligibility): RequiredDataStateQuoteEligibility => {
  const requiredDataState = {} as RequiredDataStateQuoteEligibility;

  const required = allRequiredData(submittedData);

  requiredDataState[BUYER_COUNTRY] = required[BUYER_COUNTRY];
  requiredDataState[BUYER_COUNTRY_CHANGE] = required[BUYER_COUNTRY];
  requiredDataState[BUYER_BODY] = required[BUYER_BODY];
  requiredDataState[EXPORTER_LOCATION] = required[EXPORTER_LOCATION];
  requiredDataState[EXPORTER_LOCATION_CHANGE] = required[EXPORTER_LOCATION];
  requiredDataState[UK_GOODS_OR_SERVICES] = required[UK_GOODS_OR_SERVICES];
  requiredDataState[UK_GOODS_OR_SERVICES_CHANGE] = required[UK_GOODS_OR_SERVICES];
  requiredDataState[POLICY_TYPE] = required[POLICY_TYPE];
  requiredDataState[POLICY_TYPE_CHANGE] = required[POLICY_TYPE];
  requiredDataState[TELL_US_ABOUT_YOUR_POLICY] = required[TELL_US_ABOUT_YOUR_POLICY];
  requiredDataState[TELL_US_ABOUT_YOUR_POLICY_CHANGE] = required[TELL_US_ABOUT_YOUR_POLICY];
  requiredDataState[CHECK_YOUR_ANSWERS] = required[CHECK_YOUR_ANSWERS];
  requiredDataState[YOUR_QUOTE] = required[YOUR_QUOTE];

  return requiredDataState;
};

/**
 * requiredQuoteEligibilityDataProvided
 * Prevent users from accessing a page if all previous forms in the user flow have not been submitted.
 * Without this, a user could manually navigate to e.g, page/form no.4 - bypassing previous forms or, manually go directly to the final quote page.
 * The last 3 pages in the user flow require data from the previous forms. Not having this data will result in errors/bad UX.
 * Depending on the URL/part of the user flow, and previously submitted data.
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {String} next Callback function name
 * @returns {Function} next() if all required data is provided, otherwise redirect to an exit page.
 */
export const requiredQuoteEligibilityDataProvided = (req: Request, res: Response, next: () => void) => {
  const { originalUrl: url, method } = req;

  // get all defined routes as an array
  const routesArray = getRoutesAsArray(ROUTES.QUOTE);

  // array of routes that do not require any data checks.
  const irrelevantRoutes = [BUYER_COUNTRY, CANNOT_APPLY, GET_A_QUOTE_BY_EMAIL, NEED_TO_START_AGAIN, START];

  const isIrrelevantRoute = (route: string) => irrelevantRoutes.includes(route);

  // do not run any data checks if the requested route is one of the following:
  // is a route that does not require any data checks
  // is 404 page
  // or the request is not a GET request.
  if (isIrrelevantRoute(url) || !routeIsKnown(routesArray, url) || method !== 'GET') {
    return next();
  }

  if (req.session?.submittedData) {
    const { submittedData } = req.session;
    const requiredDataState = generateRequiredDataState(submittedData.quoteEligibility);

    if (!hasRequiredData(url, requiredDataState, submittedData.quoteEligibility)) {
      return res.redirect(NEED_TO_START_AGAIN);
    }
  } else if (!hasRequiredData(url, generateRequiredDataState({}), {})) {
    return res.redirect(NEED_TO_START_AGAIN);
  }

  return next();
};
