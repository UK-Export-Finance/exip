import mapEsraClassification from './map-esra-classification';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import noOnlineSupport from './no-online-support';
import canGetAQuoteOnline from './can-get-a-quote-online';
import cannotGetAQuote from './cannot-get-a-quote';
import canApplyForAQuoteOffline from './can-apply-for-quote-offline';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
import { CisCountry, MappedCisCountry } from '../../../types';

/**
 * mapCisCountry
 * Map a CIS country to cleaner structure
 * @param {CisCountry} CIS Country
 * @returns {MappedCisCountry} Mapped country
 */
export const mapCisCountry = (cisCountry: CisCountry): MappedCisCountry => {
  const { countryRatingDesc, ESRAClassificationDesc, isoCode, marketName, shortTermCoverAvailabilityDesc } = cisCountry;

  const esraClassification = mapEsraClassification(cisCountry.ESRAClassificationDesc);
  const nbiIssueAvailable = mapNbiIssueAvailable(cisCountry.NBIIssue);
  const shortTermCover = mapShortTermCoverAvailable(cisCountry.shortTermCoverAvailabilityDesc);

  const countryRating = countryRatingDesc;

  const mapped: MappedCisCountry = {
    countryRating,
    esraClassification,
    isoCode,
    name: marketName,
    nbiIssueAvailable,
    shortTermCover,

    noOnlineSupport: noOnlineSupport({
      countryRating,
      esraClassification: ESRAClassificationDesc,
      shortTermCover: shortTermCoverAvailabilityDesc,
    }),

    canGetAQuoteOnline: canGetAQuoteOnline({ shortTermCover, nbiIssueAvailable, esraClassification }),

    canGetAQuoteOffline: canApplyForAQuoteOffline(cisCountry.shortTermCoverAvailabilityDesc),

    cannotGetAQuote: cannotGetAQuote({ shortTermCover, nbiIssueAvailable, esraClassification }),

    canApplyForInsuranceOnline: canApplyForInsuranceOnline(cisCountry),
  };

  return mapped;
};

export default mapCisCountry;
