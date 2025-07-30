import { ROUTES } from '../../constants';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;

/**
 * generateChangeLink
 * generates a change link depending on if coming from a section's check your answers page (/change)
 * or application level check your answers (/check-and-change)
 * @param {string} route: Route for page if coming from check your answers in prepare application
 * @param {string} routeCheckAndChange: Route for if coming from check your answers section
 * @param {string} anchorTag: Change link's anchor tag
 * @param {string} referenceNumber: Application reference number
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @param {boolean} isInsuranceEligibility: If change link is for insurance eligibility section - defaults to false
 * @returns
 */
const generateChangeLink = (
  route: string,
  routeCheckAndChange: string,
  anchorTag: string,
  referenceNumber?: number,
  checkAndChange?: boolean,
  isInsuranceEligibility = false,
) => {
  /**
   * if isInsuranceEligibility then incoming route already contains INSURANCE_ROOT
   * only need to add anchor tag and return
   */
  if (isInsuranceEligibility) {
    return `${route}${anchorTag}`;
  }

  const rootUrl = `${INSURANCE_ROOT}/${referenceNumber}`;

  if (checkAndChange) {
    return `${rootUrl}${routeCheckAndChange}${anchorTag}`;
  }

  return `${rootUrl}${route}${anchorTag}`;
};

export default generateChangeLink;
