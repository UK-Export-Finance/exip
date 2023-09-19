import mapCisCountry from '.';
import mapRiskCategory from './map-risk-category';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canGetAQuoteByEmail from './can-get-a-quote-by-email';
import cannotGetAQuote from './cannot-get-a-quote';
import canApplyOnline from './can-apply-online';
import canApplyOffline from './can-apply-offline';
import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../constants';
import mockCisCountries from '../../../test-mocks/mock-CIS-countries';
import { MappedCisCountry } from '../../../types';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country', () => {
  const { 1: initialMockCountry } = mockCisCountries;

  const mockCountryBase = {
    ...initialMockCountry,
    marketName: initialMockCountry.marketName,
    riskCategory: EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD,
    isoCode: initialMockCountry.isoCode,
    shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
  };

  it('should return an object', () => {
    const result = mapCisCountry(mockCountryBase);

    const mapped = {
      name: mockCountryBase.marketName,
      isoCode: mockCountryBase.isoCode,
      riskCategory: mapRiskCategory(mockCountryBase.ESRAClassificationDesc),
      shortTermCover: mapShortTermCoverAvailable(mockCountryBase.shortTermCoverAvailabilityDesc),
      nbiIssueAvailable: mapNbiIssueAvailable(mockCountryBase.NBIIssue),
      canGetAQuoteOnline: false,
      canGetAQuoteByEmail: false,
      cannotGetAQuote: false,
      canApplyOnline: false,
      canApplyOffline: false,
      cannotApply: false,
    } as MappedCisCountry;

    mapped.canGetAQuoteOnline = canGetAQuoteOnline(mapped);
    mapped.canGetAQuoteByEmail = canGetAQuoteByEmail(mapped);

    mapped.cannotGetAQuote = cannotGetAQuote(mapped);
    mapped.canApplyOnline = canApplyOnline(mockCountryBase.shortTermCoverAvailabilityDesc);
    mapped.canApplyOffline = canApplyOffline(mockCountryBase.shortTermCoverAvailabilityDesc);

    mapped.cannotApply = !mapped.canApplyOnline && !mapped.canApplyOffline;

    expect(result).toEqual(mapped);
  });
});
