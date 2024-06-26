import mapRiskCategory from './map-risk-category';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canGetAQuoteByEmail from './can-get-a-quote-by-email';
import cannotGetAQuote from './cannot-get-a-quote';
import canApplyOnline from './can-apply-online';
import canApplyOffline from './can-apply-offline';
import { CisCountry, MappedCisCountry } from '../../../types';

/**
 * mapCisCountry
 * Map a CIS country to cleaner structure
 * @param {CisCountry} CIS Country
 * @returns {MappedCisCountry} Mapped country
 */
export const mapCisCountry = (country: CisCountry): MappedCisCountry => {
  const mapped = {
    name: country.marketName,
    isoCode: country.isoCode,
    riskCategory: mapRiskCategory(country.ESRAClassificationDesc),
    shortTermCover: mapShortTermCoverAvailable(country.shortTermCoverAvailabilityDesc),
    nbiIssueAvailable: mapNbiIssueAvailable(country.NBIIssue),
  } as MappedCisCountry;

  mapped.canGetAQuoteOnline = canGetAQuoteOnline(mapped);
  mapped.canGetAQuoteByEmail = canGetAQuoteByEmail(mapped);

  mapped.cannotGetAQuote = cannotGetAQuote(mapped);

  mapped.canApplyOnline = canApplyOnline(country.shortTermCoverAvailabilityDesc);
  mapped.canApplyOffline = canApplyOffline(country.shortTermCoverAvailabilityDesc);

  mapped.cannotApply = !mapped.canApplyOnline && !mapped.canApplyOffline;

  return mapped;
};

export default mapCisCountry;
