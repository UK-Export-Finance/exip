import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const { CHECK_YOUR_ANSWERS, INSURANCE_ROOT } = INSURANCE_ROUTES;

/**
 * mapCheckYourAnswersRoutes
 * Add "insurance/{referenceNumber}" to each route
 * @param {Number} Application reference number
 * @returns {Array} Check your answers routes with insurance/{referenceNumber} prefix
 */
export const mapCheckYourAnswersRoutes = (referenceNumber: number) => {
  const routesArray = Object.values(CHECK_YOUR_ANSWERS).filter((route) => route !== CHECK_YOUR_ANSWERS.ROOT);

  const mapped = routesArray.map((route) => `${INSURANCE_ROOT}/${referenceNumber}${route}`);

  return mapped;
};

/**
 * isCheckYourAnswersRoute
 * Check if a given URL is a "check your answers" route
 * @param {String} URL
 * @param {Number} Application reference number
 * @returns {Boolean}
 */
const isCheckYourAnswersRoute = (url: string, referenceNumber: number) => {
  const CHECK_YOUR_ANSWERS_ROUTES = mapCheckYourAnswersRoutes(referenceNumber);

  if (CHECK_YOUR_ANSWERS_ROUTES.includes(url)) {
    return true;
  }

  return false;
};

export default isCheckYourAnswersRoute;
