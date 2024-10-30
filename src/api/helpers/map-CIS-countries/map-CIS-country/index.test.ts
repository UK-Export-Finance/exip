import mapCisCountry from '.';
import mapEsraClassification from './map-esra-classification';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canGetAQuoteByEmail from './can-get-a-quote-by-email';
import cannotGetAQuote from './cannot-get-a-quote';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
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
    esraClassification: EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD,
    isoCode: initialMockCountry.isoCode,
    shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
    marketRiskAppetitePublicDesc: CIS.NO_COVER,
  };

  it('should return an object', () => {
    const result = mapCisCountry(mockCountryBase);

    const esraClassification = mapEsraClassification(mockCountryBase.ESRAClassificationDesc);
    const shortTermCover = mapShortTermCoverAvailable(mockCountryBase.shortTermCoverAvailabilityDesc);
    const nbiIssueAvailable = mapNbiIssueAvailable(mockCountryBase.NBIIssue);

    const mapped = {
      name: mockCountryBase.marketName,
      isoCode: mockCountryBase.isoCode,
      esraClassification,
      shortTermCover,
      nbiIssueAvailable,
      canGetAQuoteOnline: false,
      canGetAQuoteOffline: false,
      canGetAQuoteByEmail: false,
      cannotGetAQuote: false,
      canApplyForInsuranceOnline: false,
      noInsuranceSupport: false,
    } as MappedCisCountry;

    mapped.canGetAQuoteOnline = canGetAQuoteOnline({ shortTermCover, nbiIssueAvailable, esraClassification });
    mapped.canGetAQuoteOffline = canApplyOffline(mockCountryBase.shortTermCoverAvailabilityDesc);
    mapped.canGetAQuoteByEmail = canGetAQuoteByEmail({ shortTermCover, nbiIssueAvailable, esraClassification });
    mapped.cannotGetAQuote = cannotGetAQuote({ shortTermCover, nbiIssueAvailable, esraClassification });

    mapped.canApplyForInsuranceOnline = canApplyForInsuranceOnline(mapped.shortTermCover);

    mapped.noInsuranceSupport = noInsuranceSupportAvailable(mockCountryBase.marketRiskAppetitePublicDesc);

    expect(result).toEqual(mapped);
  });
});
