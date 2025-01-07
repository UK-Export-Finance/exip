import mapEsraClassification from './map-esra-classification';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canGetAQuoteByEmail from './can-get-a-quote-by-email';
import cannotGetAQuote from './cannot-get-a-quote';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
import canApplyOffline from './can-apply-offline';
import noInsuranceSupportAvailable from './no-insurance-support';
import { CisCountry, MappedCisCountry } from '../../../types';

/**
 * mapCisCountry
 * Map a CIS country to cleaner structure
 * @param {CisCountry} CIS Country
 * @returns {MappedCisCountry} Mapped country
 */
export const mapCisCountry = (cisCountry: CisCountry): MappedCisCountry => {
  const { marketName, isoCode } = cisCountry;

  const esraClassification = mapEsraClassification(cisCountry.ESRAClassificationDesc);
  const nbiIssueAvailable = mapNbiIssueAvailable(cisCountry.NBIIssue);
  const shortTermCover = mapShortTermCoverAvailable(cisCountry.shortTermCoverAvailabilityDesc);

  const mapped = {
    name: marketName,
    esraClassification,
    isoCode,
    nbiIssueAvailable,
    shortTermCover,
  } as MappedCisCountry;

  mapped.canGetAQuoteOnline = canGetAQuoteOnline({ shortTermCover, nbiIssueAvailable, esraClassification });

  mapped.canGetAQuoteOffline = canApplyOffline(cisCountry.shortTermCoverAvailabilityDesc);

  mapped.canGetAQuoteByEmail = canGetAQuoteByEmail({ shortTermCover, nbiIssueAvailable, esraClassification });

  mapped.cannotGetAQuote = cannotGetAQuote({ shortTermCover, nbiIssueAvailable, esraClassification });

  mapped.canApplyForInsuranceOnline = canApplyForInsuranceOnline(shortTermCover, esraClassification);

  mapped.noInsuranceSupport = noInsuranceSupportAvailable(cisCountry.marketRiskAppetitePublicDesc);

  return mapped;
};

export default mapCisCountry;
