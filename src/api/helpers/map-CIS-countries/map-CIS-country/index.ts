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
  } as MappedCisCountry;

  mapped.canGetAQuoteOnline = canGetAQuoteOnline({ shortTermCover, nbiIssueAvailable, esraClassification });

  mapped.canGetAQuoteOffline = canApplyForAQuoteOffline(cisCountry.shortTermCoverAvailabilityDesc);

  mapped.canGetAQuoteByEmail = canGetAQuoteByEmail({ shortTermCover, nbiIssueAvailable, esraClassification });

  mapped.cannotGetAQuote = cannotGetAQuote({ shortTermCover, nbiIssueAvailable, esraClassification });

  mapped.canApplyForInsuranceOnline = canApplyForInsuranceOnline(cisCountry);

  mapped.noOnlineInsuranceSupport = noOnlineInsuranceSupport({
    countryRating: countryRatingDesc,
    esraClassification: ESRAClassificationDesc,
    shortTermCover: shortTermCoverAvailabilityDesc,
  });

  // TODO: EMS-4065 - noInsuranceSupport.

  return mapped;
};

export default mapCisCountry;
