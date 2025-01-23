import esraClassificationIsStandardHighOrVeryHigh from '../esra-classification-is-standard-high-or-very-high';
import shortTermCoverIsYesReferOrUnlisted from '../short-term-cover-is-yes-refer-or-unlisted';
import countryRatingIsAorB from '../country-rating-is-a-or-b';
import { CisCountry } from '../../../../types';

/**
 * canGetAQuoteOnline
 * Check if a country can apply for a quote online.
 * @param {CisCountry} CIS Country
 * @returns {Boolean}
 */
const canGetAQuoteOnline = (cisCountry: CisCountry) => {
  const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, countryRatingDesc } = cisCountry;

  const conditions =
    esraClassificationIsStandardHighOrVeryHigh(ESRAClassificationDesc) &&
    shortTermCoverIsYesReferOrUnlisted(shortTermCoverAvailabilityDesc) &&
    countryRatingIsAorB(countryRatingDesc);

  return conditions;
};

export default canGetAQuoteOnline;
