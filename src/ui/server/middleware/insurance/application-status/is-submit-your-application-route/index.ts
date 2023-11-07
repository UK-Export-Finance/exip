import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const {
  INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT, CODE_OF_CONDUCT, EXPORTING_WITH_CODE_OF_CONDUCT },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    HOW_YOUR_DATA_WILL_BE_USED,
  },
} = INSURANCE_ROUTES;

/**
 * mapSubmitYourApplicationRoutes
 * Add "insurance/{referenceNumber}" to each route in the "submit your application" group.
 * The "submit your application" group includes all routes for "check your answers" and "declarations".
 * @param {Number} Application reference number
 * @returns {Array} Submit your application routes with insurance/{referenceNumber} prefix
 */
export const mapSubmitYourApplicationRoutes = (referenceNumber: number) => {
  const routesArray = Object.values({
    ...CHECK_YOUR_ANSWERS,
    CONFIDENTIALITY,
    ANTI_BRIBERY_ROOT,
    CODE_OF_CONDUCT,
    EXPORTING_WITH_CODE_OF_CONDUCT,
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    HOW_YOUR_DATA_WILL_BE_USED,
  });

  const mapped = routesArray.map((route) => `${INSURANCE_ROOT}/${referenceNumber}${route}`);

  return mapped;
};

/**
 * isSubmitYourApplicationRoute
 * Check if a given URL is a route in the "submit your application" group ("check your answers" and "declarations").
 * @param {String} URL
 * @param {Number} Application reference number
 * @returns {Boolean}
 */
const isSubmitYourApplicationRoute = (url: string, referenceNumber: number) => {
  const ROUTES = mapSubmitYourApplicationRoutes(referenceNumber);

  if (ROUTES.includes(url)) {
    return true;
  }

  return false;
};

export default isSubmitYourApplicationRoute;
