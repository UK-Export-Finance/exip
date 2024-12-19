import hasValidEsraClassification from './has-valid-esra-classification';
import hasValidShortTermCover from './has-valid-short-term-cover';
import countryRatingIsAorB from '../country-rating-is-a-or-b';
import { CisCountry } from '../../../../types';

/**
 * canApplyForInsuranceOnline
 * Check if a country can apply for insurance online.
 * @param {CisCountry} cisCountry: CIS country
 * @returns {Boolean}
 */
const canApplyForInsuranceOnline = (cisCountry: CisCountry): boolean => {
  const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, countryRatingDesc } = cisCountry;

  const conditions =
    hasValidEsraClassification(ESRAClassificationDesc) && hasValidShortTermCover(shortTermCoverAvailabilityDesc) && countryRatingIsAorB(countryRatingDesc);

  return conditions;
};

export default canApplyForInsuranceOnline;
