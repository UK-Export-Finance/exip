import esraClassificationIsStandardHighOrVeryHigh from '../esra-classification-is-standard-high-or-very-high';
import shortTermCoverIsYesReferOrUnlisted from '../short-term-cover-is-yes-refer-or-unlisted';
import countryRatingIsAorB from '../country-rating-is-a-or-b';
import { CisCountry } from '../../../../types';

/**
 * canApplyForInsuranceOnline
 * Check if a country can apply for insurance online.
 * @param {CisCountry} cisCountry: CIS country
 * @returns {boolean}
 */
const canApplyForInsuranceOnline = (cisCountry: CisCountry): boolean => {
  const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, countryRatingDesc } = cisCountry;

  const conditions =
    esraClassificationIsStandardHighOrVeryHigh(ESRAClassificationDesc) &&
    shortTermCoverIsYesReferOrUnlisted(shortTermCoverAvailabilityDesc) &&
    countryRatingIsAorB(countryRatingDesc);

  return conditions;
};

export default canApplyForInsuranceOnline;
