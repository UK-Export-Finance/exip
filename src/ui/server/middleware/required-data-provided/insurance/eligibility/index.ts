import { FIELD_IDS, ROUTES } from '../../../../constants';
import { Request, RequiredDataStateInsuranceEligibility, Response } from '../../../../../types';
import { getRoutesAsArray, routeIsKnown, hasRequiredData } from '../../helpers';

const { APPLY_OFFLINE, SPEAK_TO_UKEF_EFM, ELIGIBILITY, ACCOUNT } = ROUTES.INSURANCE;

const {
  CANNOT_APPLY,
  CHECK_IF_ELIGIBLE,
  NEED_TO_START_AGAIN,
  BUYER_COUNTRY,
  EXPORTER_LOCATION,
  UK_GOODS_OR_SERVICES,
  INSURED_AMOUNT,
  INSURED_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  ELIGIBLE_TO_APPLY_ONLINE,
  ACCOUNT_TO_APPLY_ONLINE,
} = ELIGIBILITY;

const {
  ELIGIBILITY: { VALID_EXPORTER_LOCATION, HAS_MINIMUM_UK_GOODS_OR_SERVICES },
} = FIELD_IDS;

export const generateRequiredData = (): RequiredDataStateInsuranceEligibility => {
  const requiredData = {} as RequiredDataStateInsuranceEligibility;

  requiredData[EXPORTER_LOCATION] = [];

  requiredData[COMPANIES_HOUSE_NUMBER] = [VALID_EXPORTER_LOCATION];

  requiredData[BUYER_COUNTRY] = [...requiredData[COMPANIES_HOUSE_NUMBER], FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER];

  requiredData[INSURED_AMOUNT] = [...requiredData[BUYER_COUNTRY], FIELD_IDS.INSURANCE.ELIGIBILITY.BUYER_COUNTRY];

  requiredData[INSURED_PERIOD] = [...requiredData[INSURED_AMOUNT], FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_AMOUNT];

  requiredData[UK_GOODS_OR_SERVICES] = [...requiredData[INSURED_PERIOD], FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_PERIOD];

  requiredData[ELIGIBLE_TO_APPLY_ONLINE] = [...requiredData[BUYER_COUNTRY], HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  return requiredData;
};

/**
 * requiredInsuranceEligibilityDataProvided
 * Prevent users from accessing a page if all previous forms in the user flow have not been submitted.
 * Without this, a user could manually navigate to e.g, page/form no.4 - bypassing previous forms or, manually go directly to the final "you are eligible" page.
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {String} next Callback function name
 * @returns {Function} next() if all required data is provided, otherwise redirect to an exit page.
 */
export const requiredInsuranceEligibilityDataProvided = (req: Request, res: Response, next: () => void) => {
  const { originalUrl: url, method } = req;

  // get all defined routes as an array
  const routesArray = getRoutesAsArray(ROUTES.INSURANCE.ELIGIBILITY);

  // array of routes that do not require any data checks.
  const irrelevantRoutes = [
    CANNOT_APPLY,
    APPLY_OFFLINE,
    SPEAK_TO_UKEF_EFM,
    CHECK_IF_ELIGIBLE,
    NEED_TO_START_AGAIN,
    ACCOUNT_TO_APPLY_ONLINE,
    ACCOUNT.CREATE.YOUR_DETAILS,
    ACCOUNT.SIGN_IN.ROOT,
  ];

  const isIrrelevantRoute = (route: string) => irrelevantRoutes.includes(route);

  // do not run any data checks if the requested route is one of the following:
  // is a route that does not require any data checks
  // is 404 page
  // or the request is not a GET request.
  if (isIrrelevantRoute(url) || !routeIsKnown(routesArray, url) || method !== 'GET') {
    return next();
  }

  const requiredData = generateRequiredData();

  if (req.session?.submittedData) {
    const { submittedData } = req.session;

    if (!hasRequiredData(url, requiredData, submittedData.insuranceEligibility)) {
      return res.redirect(NEED_TO_START_AGAIN);
    }
  } else if (!hasRequiredData(url, requiredData, {})) {
    return res.redirect(NEED_TO_START_AGAIN);
  }

  return next();
};
