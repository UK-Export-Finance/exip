import mapEsraClassification from './map-esra-classification';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canGetAQuoteByEmail from './can-get-a-quote-by-email';
import cannotGetAQuote from './cannot-get-a-quote';
import canApplyForAQuoteOffline from './can-apply-for-quote-offline';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
import noOnlineInsuranceSupport from './no-online-insurance-support';
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

  const mapped = {
    countryRating: countryRatingDesc,
    esraClassification,
    isoCode,
    name: marketName,
    nbiIssueAvailable,
    shortTermCover,

    canGetAQuoteOnline: canGetAQuoteOnline({ shortTermCover, nbiIssueAvailable, esraClassification }),

    canGetAQuoteOffline: canApplyForAQuoteOffline(cisCountry.shortTermCoverAvailabilityDesc),

    canGetAQuoteByEmail: canGetAQuoteByEmail({ shortTermCover, nbiIssueAvailable, esraClassification }),

    cannotGetAQuote: cannotGetAQuote({ shortTermCover, nbiIssueAvailable, esraClassification }),

    canApplyForInsuranceOnline: canApplyForInsuranceOnline(cisCountry),

    noOnlineInsuranceSupport: noOnlineInsuranceSupport({
      countryRating: countryRatingDesc,
      esraClassification: ESRAClassificationDesc,
      shortTermCover: shortTermCoverAvailabilityDesc,
    }),
  } as MappedCisCountry;

  // TODO: EMS-4065 - noInsuranceSupport.

  return mapped;
};

export default mapCisCountry;
