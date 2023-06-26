import { FIELD_IDS } from '../../../constants';
import {
  RequiredDataStateQuoteEligibility,
  RequiredDataStateInsuranceEligibility,
  SubmittedDataQuoteEligibility,
  SubmittedDataInsuranceEligibility,
} from '../../../../types';

/**
 * getRoutesAsArray
 * transform all routes into an array of strings
 * @returns {Array}
 */
export const getRoutesAsArray = (routes: object): Array<string> => Object.values(routes);

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
 * hasRequiredData
 * Get a list of required data for a route,
 * Check if the total amount of submitted data matches the total amount of required fields.
 * @param {String} route
 * @param {Object} required data for each route
 * @param {Object} all submitted data
 * @returns {Boolean}
 */
export const hasRequiredData = (
  route: string,
  requiredDataState: RequiredDataStateQuoteEligibility | RequiredDataStateInsuranceEligibility,
  submittedData: SubmittedDataQuoteEligibility | SubmittedDataInsuranceEligibility,
) => {
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
