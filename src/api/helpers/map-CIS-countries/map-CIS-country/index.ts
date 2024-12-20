import mapEsraClassification from './map-esra-classification';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canGetAQuoteByEmail from './can-get-a-quote-by-email';
import canApplyForAQuoteOffline from './can-apply-for-quote-offline';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
import noOnlineInsuranceSupport from './no-online-insurance-support';
import noSupport from './no-support';
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

    canGetAQuoteOnline: canGetAQuoteOnline(cisCountry),

    canGetAQuoteOffline: canApplyForAQuoteOffline(cisCountry.shortTermCoverAvailabilityDesc),

    canGetAQuoteByEmail: canGetAQuoteByEmail({ shortTermCover, nbiIssueAvailable, esraClassification }),

    cannotGetAQuote: noSupport({
      countryRating,
      esraClassification: ESRAClassificationDesc,
      shortTermCover: shortTermCoverAvailabilityDesc,
    }),

    canApplyForInsuranceOnline: canApplyForInsuranceOnline(cisCountry),

    noOnlineInsuranceSupport: noOnlineInsuranceSupport({
      countryRating,
      esraClassification: ESRAClassificationDesc,
      shortTermCover: shortTermCoverAvailabilityDesc,
    }),

    noInsuranceSupport: noSupport({
      countryRating,
      esraClassification: ESRAClassificationDesc,
      shortTermCover: shortTermCoverAvailabilityDesc,
    }),
  };

  return mapped;
};

export default mapCisCountry;
