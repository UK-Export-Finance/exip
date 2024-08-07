import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { Request, RequiredDataStateInsuranceEligibility, Response } from '../../../../../types';
import { getRoutesAsArray, routeIsKnown, hasRequiredData } from '../../helpers';

const { ELIGIBILITY, ACCOUNT } = INSURANCE_ROUTES;

const {
  HAVE_AN_ACCOUNT,
  CANNOT_APPLY,
  CHECK_IF_ELIGIBLE,
  NEED_TO_START_AGAIN,
  BUYER_COUNTRY,
  BUYER_COUNTRY_CHANGE,
  EXPORTER_LOCATION,
  EXPORTER_LOCATION_CHANGE,
  UK_GOODS_OR_SERVICES,
  UK_GOODS_OR_SERVICES_CHANGE,
  END_BUYER,
  END_BUYER_CHANGE,
  CHECK_YOUR_ANSWERS,
  TOTAL_VALUE_INSURED,
  TOTAL_VALUE_INSURED_CHANGE,
  COVER_PERIOD,
  COVER_PERIOD_CHANGE,
  LONG_TERM_COVER,
  COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_CHANGE,
  NO_COMPANIES_HOUSE_NUMBER,
  ENTER_COMPANIES_HOUSE_NUMBER,
  ENTER_COMPANIES_HOUSE_NUMBER_CHANGE,
  COMPANIES_HOUSE_UNAVAILABLE,
  COMPANY_NOT_ACTIVE,
  COMPANY_DETAILS,
  COMPANY_DETAILS_CHANGE,
  CANNOT_APPLY_MULTIPLE_RISKS,
  ELIGIBLE_TO_APPLY_ONLINE,
  CONTRACT_TOO_SHORT,
  PARTY_TO_CONSORTIUM,
  PARTY_TO_CONSORTIUM_CHANGE,
  MEMBER_OF_A_GROUP,
  MEMBER_OF_A_GROUP_CHANGE,
  MEMBER_OF_A_GROUP_EXIT,
  PARTY_TO_CONSORTIUM_EXIT,
} = ELIGIBILITY;

const {
  ELIGIBILITY: {
    VALID_EXPORTER_LOCATION,
    HAS_COMPANIES_HOUSE_NUMBER,
    BUYER_COUNTRY: BUYER_COUNTRY_FIELD_ID,
    TOTAL_CONTRACT_VALUE,
    COVER_PERIOD: COVER_PERIOD_FIELD_ID,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    HAS_END_BUYER,
    IS_PARTY_TO_CONSORTIUM,
    IS_MEMBER_OF_A_GROUP,
  },
  COMPANY,
} = INSURANCE_FIELD_IDS;

export const generateRequiredData = (): RequiredDataStateInsuranceEligibility => {
  const requiredData = {} as RequiredDataStateInsuranceEligibility;

  requiredData[EXPORTER_LOCATION] = [];
  requiredData[EXPORTER_LOCATION_CHANGE] = [];

  requiredData[COMPANIES_HOUSE_NUMBER] = [VALID_EXPORTER_LOCATION];
  requiredData[COMPANIES_HOUSE_NUMBER_CHANGE] = [VALID_EXPORTER_LOCATION];

  requiredData[ENTER_COMPANIES_HOUSE_NUMBER] = [...requiredData[COMPANIES_HOUSE_NUMBER], HAS_COMPANIES_HOUSE_NUMBER];
  requiredData[ENTER_COMPANIES_HOUSE_NUMBER_CHANGE] = [...requiredData[COMPANIES_HOUSE_NUMBER], HAS_COMPANIES_HOUSE_NUMBER];

  /**
   * Company details route requires:
   * - All data provided in previous forms, including companies house data.
   * It does not seem necessary to list every single companies house field.
   * Instead, we can simply define that a company object is required.
   * This object is only generated after successfully retrieving data from companies house.
   */
  requiredData[COMPANY_DETAILS] = [...requiredData[ENTER_COMPANIES_HOUSE_NUMBER], COMPANY];
  requiredData[COMPANY_DETAILS_CHANGE] = [...requiredData[ENTER_COMPANIES_HOUSE_NUMBER], COMPANY];

  requiredData[BUYER_COUNTRY] = [...requiredData[COMPANY_DETAILS]];
  requiredData[BUYER_COUNTRY_CHANGE] = [...requiredData[COMPANY_DETAILS]];

  requiredData[TOTAL_VALUE_INSURED] = [...requiredData[BUYER_COUNTRY], BUYER_COUNTRY_FIELD_ID];
  requiredData[TOTAL_VALUE_INSURED_CHANGE] = [...requiredData[BUYER_COUNTRY], BUYER_COUNTRY_FIELD_ID];

  requiredData[COVER_PERIOD] = [...requiredData[TOTAL_VALUE_INSURED], TOTAL_CONTRACT_VALUE];
  requiredData[COVER_PERIOD_CHANGE] = [...requiredData[TOTAL_VALUE_INSURED], TOTAL_CONTRACT_VALUE];

  requiredData[UK_GOODS_OR_SERVICES] = [...requiredData[COVER_PERIOD], COVER_PERIOD_FIELD_ID];
  requiredData[UK_GOODS_OR_SERVICES_CHANGE] = [...requiredData[COVER_PERIOD], COVER_PERIOD_FIELD_ID];

  requiredData[END_BUYER] = [...requiredData[UK_GOODS_OR_SERVICES], HAS_MINIMUM_UK_GOODS_OR_SERVICES];
  requiredData[END_BUYER_CHANGE] = [...requiredData[UK_GOODS_OR_SERVICES], HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  requiredData[PARTY_TO_CONSORTIUM] = [...requiredData[END_BUYER], HAS_END_BUYER];
  requiredData[PARTY_TO_CONSORTIUM_CHANGE] = [...requiredData[END_BUYER], HAS_END_BUYER];

  requiredData[MEMBER_OF_A_GROUP] = [...requiredData[PARTY_TO_CONSORTIUM], IS_PARTY_TO_CONSORTIUM];
  requiredData[MEMBER_OF_A_GROUP_CHANGE] = [...requiredData[PARTY_TO_CONSORTIUM], IS_PARTY_TO_CONSORTIUM];

  requiredData[CHECK_YOUR_ANSWERS] = [...requiredData[MEMBER_OF_A_GROUP], IS_MEMBER_OF_A_GROUP];

  requiredData[ELIGIBLE_TO_APPLY_ONLINE] = [...requiredData[CHECK_YOUR_ANSWERS]];

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
  const routesArray = getRoutesAsArray(INSURANCE_ROUTES.ELIGIBILITY);

  // array of routes that do not require any data checks.
  const irrelevantRoutes = [
    CANNOT_APPLY,
    CHECK_IF_ELIGIBLE,
    NO_COMPANIES_HOUSE_NUMBER,
    COMPANIES_HOUSE_UNAVAILABLE,
    COMPANY_NOT_ACTIVE,
    CANNOT_APPLY_MULTIPLE_RISKS,
    NEED_TO_START_AGAIN,
    LONG_TERM_COVER,
    HAVE_AN_ACCOUNT,
    ACCOUNT.CREATE.YOUR_DETAILS,
    ACCOUNT.SIGN_IN.ROOT,
    CONTRACT_TOO_SHORT,
    MEMBER_OF_A_GROUP_EXIT,
    PARTY_TO_CONSORTIUM_EXIT,
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
