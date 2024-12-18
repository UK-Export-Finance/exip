import mapCisCountry from '.';
import mapEsraClassification from './map-esra-classification';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canGetAQuoteByEmail from './can-get-a-quote-by-email';
import cannotGetAQuote from './cannot-get-a-quote';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
import canApplyOffline from './can-apply-for-quote-offline';
import noOnlineInsuranceSupport from './no-online-insurance-support';
import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../constants';
import { MappedCisCountry } from '../../../types';
import { mockCisCountry } from '../../../test-mocks';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country', () => {
  const mockCountryBase = {
    ...mockCisCountry,
    marketName: mockCisCountry.marketName,
    esraClassification: EXTERNAL_API_MAPPINGS.CIS.ESRA_CLASSIFICATION.STANDARD,
    isoCode: mockCisCountry.isoCode,
    shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
    marketRiskAppetitePublicDesc: CIS.NO_COVER,
  };

  it('should return an object', () => {
    const result = mapCisCountry(mockCountryBase);

    const esraClassification = mapEsraClassification(mockCountryBase.ESRAClassificationDesc);
    const shortTermCover = mapShortTermCoverAvailable(mockCountryBase.shortTermCoverAvailabilityDesc);
    const nbiIssueAvailable = mapNbiIssueAvailable(mockCountryBase.NBIIssue);

    const mapped = {
      countryRating: mockCisCountry.countryRatingDesc,
      esraClassification,
      isoCode: mockCountryBase.isoCode,
      name: mockCountryBase.marketName,
      nbiIssueAvailable,
      shortTermCover,
      canGetAQuoteOnline: false,
      canGetAQuoteOffline: false,
      canGetAQuoteByEmail: false,
      cannotGetAQuote: false,
      noInsuranceSupport: false,
    } as MappedCisCountry;

    mapped.canGetAQuoteOnline = canGetAQuoteOnline({ shortTermCover, nbiIssueAvailable, esraClassification });

    mapped.canGetAQuoteOffline = canApplyOffline(mockCountryBase.shortTermCoverAvailabilityDesc);

    mapped.canGetAQuoteByEmail = canGetAQuoteByEmail({ shortTermCover, nbiIssueAvailable, esraClassification });

    mapped.cannotGetAQuote = cannotGetAQuote({ shortTermCover, nbiIssueAvailable, esraClassification });

    mapped.canApplyForInsuranceOnline = canApplyForInsuranceOnline(mockCisCountry);

    mapped.noInsuranceSupport = noOnlineInsuranceSupport({
      countryRating: mockCisCountry.countryRatingDesc,
      esraClassification: mockCisCountry.ESRAClassificationDesc,
      shortTermCover: mockCisCountry.shortTermCoverAvailabilityDesc,
    });

    expect(result).toEqual(mapped);
  });
});
