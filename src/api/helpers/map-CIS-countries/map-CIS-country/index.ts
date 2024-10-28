import mapRiskCategory from './map-risk-category';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
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

  const riskCategory = mapRiskCategory(cisCountry.ESRAClassificationDesc);
  const shortTermCover = mapShortTermCoverAvailable(cisCountry.shortTermCoverAvailabilityDesc);
  const nbiIssueAvailable = mapNbiIssueAvailable(cisCountry.NBIIssue);

  const mapped = {
    name: marketName,
    isoCode,
    riskCategory,
    shortTermCover,
    nbiIssueAvailable,
  } as MappedCisCountry;

  mapped.canGetAQuoteOnline = canGetAQuoteOnline({ shortTermCover, nbiIssueAvailable, riskCategory });

  mapped.canGetAQuoteOffline = canApplyOffline(cisCountry.shortTermCoverAvailabilityDesc);

  mapped.canGetAQuoteByEmail = canGetAQuoteByEmail({ shortTermCover, nbiIssueAvailable, riskCategory });

  mapped.cannotGetAQuote = cannotGetAQuote({ shortTermCover, nbiIssueAvailable, riskCategory });

  mapped.canApplyForInsuranceOnline = canApplyForInsuranceOnline(shortTermCover, riskCategory);

  mapped.noInsuranceSupport = noInsuranceSupportAvailable(cisCountry.marketRiskAppetitePublicDesc);

  return mapped;
};

export default mapCisCountry;
