import { ROUTES } from '../../constants';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;

/**
 * generateChangeLink
 * generates a change link depending on if coming from a section's check your answers page (/change)
 * or application level check your answers (/check-and-change)
 * @param {String} route route for page if coming from check your answers in prepare application
 * @param {String} routeCheckAndChange route for if coming from check your answers section
 * @param {String} anchorTag
 * @param {String} referenceNumber
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns
 */
const generateChangeLink = (route: string, routeCheckAndChange: string, anchorTag: string, referenceNumber: number, checkAndChange: boolean) => {
  const rootUrl = `${INSURANCE_ROOT}/${referenceNumber}`;

  if (checkAndChange) {
    return `${rootUrl}${routeCheckAndChange}${anchorTag}`;
  }

  return `${rootUrl}${route}${anchorTag}`;
};

export default generateChangeLink;
