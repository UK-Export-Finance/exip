import { FIELD_IDS, ROUTES } from '../constants';
import { Request, RequiredDataState, Response, SubmittedData } from '../../types';
import { isSinglePolicyType, isMultiPolicyType } from '../helpers/policy-type';

const { ROOT, COOKIES, PROBLEM_WITH_SERVICE, QUOTE } = ROUTES;

const {
  BUYER_BODY,
  BUYER_COUNTRY,
  BUYER_COUNTRY_CHANGE,
  CANNOT_OBTAIN_COVER,
  CHECK_YOUR_ANSWERS,
  COMPANY_BASED,
  COMPANY_BASED_CHANGE,
  GET_A_QUOTE_BY_EMAIL,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE,
  NEED_TO_START_AGAIN,
  POLICY_TYPE,
  POLICY_TYPE_CHANGE,
  TELL_US_ABOUT_YOUR_POLICY,
  TELL_US_ABOUT_YOUR_POLICY_CHANGE,
  YOUR_QUOTE,
} = QUOTE;

/**
 * getRoutesAsArray
 * transform all routes into an array of strings
 * @returns {Array}
 */
export const getRoutesAsArray = (): Array<string> => {
  const routes = {
    ROOT,
    COOKIES,
    PROBLEM_WITH_SERVICE,
    ...QUOTE,
  };

  return Object.values(routes);
};

/**
 * routeIsKnown
 * check if a route is a known route. If not, it's a 404 page.
 * @returns {Boolean}
 */
export const routeIsKnown = (knownRoutes: Array<string>, route: string): boolean => {
  if (knownRoutes.includes(route)) {
    return true;
  }

  return false;
};

/**
 * allRequiredData
 * For each route that requires data submitted from a previous route in the user flow,
 * Create an array of all field IDs from the previous routes.
 * @param {Object} all submitted data
 * @returns {Object}
 */
export const allRequiredData = (submittedData: SubmittedData): RequiredDataState => {
  const requiredDataState = {} as RequiredDataState;

  requiredDataState[BUYER_COUNTRY] = [];

  requiredDataState[BUYER_BODY] = [FIELD_IDS.BUYER_COUNTRY];

  requiredDataState[COMPANY_BASED] = [...requiredDataState[BUYER_BODY], FIELD_IDS.VALID_BUYER_BODY];

  requiredDataState[HAS_MINIMUM_UK_GOODS_OR_SERVICES] = [...requiredDataState[COMPANY_BASED], FIELD_IDS.VALID_COMPANY_BASE];

  requiredDataState[POLICY_TYPE] = [...requiredDataState[HAS_MINIMUM_UK_GOODS_OR_SERVICES], FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  requiredDataState[TELL_US_ABOUT_YOUR_POLICY] = [...requiredDataState[POLICY_TYPE], FIELD_IDS.POLICY_TYPE, FIELD_IDS.POLICY_LENGTH];

  requiredDataState[CHECK_YOUR_ANSWERS] = [...requiredDataState[TELL_US_ABOUT_YOUR_POLICY], FIELD_IDS.CURRENCY, FIELD_IDS.PERCENTAGE_OF_COVER];

  if (isSinglePolicyType(submittedData[FIELD_IDS.POLICY_TYPE])) {
    requiredDataState[CHECK_YOUR_ANSWERS] = [...requiredDataState[CHECK_YOUR_ANSWERS], FIELD_IDS.CONTRACT_VALUE];
  }

  if (isMultiPolicyType(submittedData[FIELD_IDS.POLICY_TYPE])) {
    requiredDataState[CHECK_YOUR_ANSWERS] = [...requiredDataState[CHECK_YOUR_ANSWERS], FIELD_IDS.CREDIT_PERIOD, FIELD_IDS.MAX_AMOUNT_OWED];
  }

  requiredDataState[YOUR_QUOTE] = [...requiredDataState[CHECK_YOUR_ANSWERS]];

  return requiredDataState;
};

export const generateRequiredDataState = (submittedData: SubmittedData): RequiredDataState => {
  const requiredDataState = {} as RequiredDataState;

  const required = allRequiredData(submittedData);

  requiredDataState[BUYER_COUNTRY] = required[BUYER_COUNTRY];
  requiredDataState[BUYER_COUNTRY_CHANGE] = required[BUYER_COUNTRY];
  requiredDataState[BUYER_BODY] = required[BUYER_BODY];
  requiredDataState[COMPANY_BASED] = required[COMPANY_BASED];
  requiredDataState[COMPANY_BASED_CHANGE] = required[COMPANY_BASED];
  requiredDataState[HAS_MINIMUM_UK_GOODS_OR_SERVICES] = required[HAS_MINIMUM_UK_GOODS_OR_SERVICES];
  requiredDataState[HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE] = required[HAS_MINIMUM_UK_GOODS_OR_SERVICES];
  requiredDataState[POLICY_TYPE] = required[POLICY_TYPE];
  requiredDataState[POLICY_TYPE_CHANGE] = required[POLICY_TYPE];
  requiredDataState[TELL_US_ABOUT_YOUR_POLICY] = required[TELL_US_ABOUT_YOUR_POLICY];
  requiredDataState[TELL_US_ABOUT_YOUR_POLICY_CHANGE] = required[TELL_US_ABOUT_YOUR_POLICY];
  requiredDataState[CHECK_YOUR_ANSWERS] = required[CHECK_YOUR_ANSWERS];
  requiredDataState[YOUR_QUOTE] = required[YOUR_QUOTE];

  return requiredDataState;
};

/**
 * hasRequiredData
 * Get a list of required data for a route,
 * Check if the total amount of submitted data matches the total amount of required fields.
 * @param {String} route
 * @param {Object} all submitted data
 * @returns {Boolean}
 */
export const hasRequiredData = (route: string, submittedData: SubmittedData) => {
  const requiredDataState = generateRequiredDataState(submittedData);

  const requiredData = requiredDataState[route];

  let suppliedDataCount = 0;

  requiredData.forEach((fieldId: string) => {
    if (submittedData[fieldId]) {
      suppliedDataCount += 1;
    }
  });

  if (suppliedDataCount === requiredData.length) {
    return true;
  }

  return false;
};

/**
 * requiredDataProvided
 * Prevent users from accessing a page if all previous forms in the user flow have not been submitted.
 * Without this, a user could manually navigate to e.g, page/form no.4 - bypassing previous forms or, manually go directly to the final quote page.
 * The last 3 pages in the user flow require data from the previous forms. Not having this data will result in errors/bad UX.
 * Depending on the URL/part of the user flow, and previously submitted data.
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {String} next Callback function name
 * @returns {Function} next() if all required data is provided, otherwise redirect to an exit page.
 */
export const requiredDataProvided = (req: Request, res: Response, next: () => void) => {
  const { originalUrl: url, method } = req;

  // get all defined routes as an array
  const routesArray = getRoutesAsArray();

  // array of routes that do not require any data checks.
  const irrelevantRoutes = [ROOT, BUYER_COUNTRY, CANNOT_OBTAIN_COVER, GET_A_QUOTE_BY_EMAIL, COOKIES, NEED_TO_START_AGAIN, PROBLEM_WITH_SERVICE];

  const isIrrelevantRoute = (route: string) => irrelevantRoutes.includes(route);

  // do not run any data checks if the requested route is one of the following:
  // is a route that does nout require any data checks
  // is assets
  // is 404 page or 'problem with service' page
  // or the request is not a GET request.
  if (isIrrelevantRoute(url) || url.includes('/assets') || !routeIsKnown(routesArray, url) || method !== 'GET') {
    return next();
  }

  if (req.session && req.session.submittedData) {
    const { submittedData } = req.session;

    if (!hasRequiredData(url, submittedData)) {
      return res.redirect(NEED_TO_START_AGAIN);
    }
  } else if (!hasRequiredData(url, {})) {
    return res.redirect(NEED_TO_START_AGAIN);
  }

  return next();
};
