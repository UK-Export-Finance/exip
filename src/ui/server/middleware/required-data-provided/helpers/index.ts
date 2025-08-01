import { FIELD_IDS } from '../../../constants';
import { ObjectType } from '../../../../types';

/**
 * getRoutesAsArray
 * transform all routes into an array of strings
 * @returns {Array}
 */
export const getRoutesAsArray = (routes: object): Array<string> => Object.values(routes);

/**
 * routeIsKnown
 * check if a route is a known route. If not, it's a 404 page.
 * @returns {boolean}
 */
export const routeIsKnown = (knownRoutes: Array<string>, route: string): boolean => {
  if (knownRoutes.includes(route)) {
    return true;
  }

  return false;
};

/**
 * hasRequiredData
 * Get a list of required data for a route,
 * Check if the total amount of submitted data matches the total amount of required fields.
 * @param {string} route
 * @param {ObjectType} required data for each route
 * @param {ObjectType} all submitted data
 * @returns {boolean}
 */
export const hasRequiredData = (route: string, requiredDataState: ObjectType, submittedData: ObjectType) => {
  const requiredData = requiredDataState[route];

  let suppliedDataCount = 0;

  requiredData.forEach((fieldId: string) => {
    if (fieldId === FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY) {
      /**
       * If the field is "buyer country"
       * We need to make sure that the country has support to apply or get a quote online
       */
      if (submittedData?.[fieldId]?.canApplyOnline) {
        suppliedDataCount += 1;
      }
    } else if (submittedData[fieldId] || submittedData[fieldId] === false) {
      suppliedDataCount += 1;
    }
  });

  if (suppliedDataCount === requiredData.length) {
    return true;
  }

  return false;
};
