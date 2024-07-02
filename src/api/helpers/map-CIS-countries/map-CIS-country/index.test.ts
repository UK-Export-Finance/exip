import mapCisCountry from '.';
import mapRiskCategory from './map-risk-category';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canGetAQuoteByEmail from './can-get-a-quote-by-email';
import cannotGetAQuote from './cannot-get-a-quote';
import applyForInsuranceOnline from './can-apply-for-insurance-online';
import canApplyOffline from './can-apply-offline';
import noInsuranceSupportAvailable from './no-insurance-support';
import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../constants';
import { MappedCisCountry } from '../../../types';
import { mockCisCountries } from '../../../test-mocks';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country', () => {
  const { 1: initialMockCountry } = mockCisCountries;

  const mockCountryBase = {
    ...initialMockCountry,
    marketName: initialMockCountry.marketName,
    riskCategory: EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD,
    isoCode: initialMockCountry.isoCode,
    shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
    marketRiskAppetitePublicDesc: CIS.NO_COVER,
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
      canGetAQuoteOffline: false,
      canGetAQuoteByEmail: false,
      cannotGetAQuote: false,
      canApplyForInsuranceOnline: false,
      noInsuranceSupport: false,
    } as MappedCisCountry;

    mapped.canGetAQuoteOnline = canGetAQuoteOnline(mapped);
    mapped.canGetAQuoteOffline = canApplyOffline(mockCountryBase.shortTermCoverAvailabilityDesc);
    mapped.canGetAQuoteByEmail = canGetAQuoteByEmail(mapped);
    mapped.cannotGetAQuote = cannotGetAQuote(mapped);

    mapped.canApplyForInsuranceOnline = applyForInsuranceOnline(mapped.shortTermCover);

    mapped.noInsuranceSupport = noInsuranceSupportAvailable(mockCountryBase.marketRiskAppetitePublicDesc);

    expect(result).toEqual(mapped);
  });
});
