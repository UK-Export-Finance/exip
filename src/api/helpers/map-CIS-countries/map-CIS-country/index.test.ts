import mapCisCountry from '.';
import mapEsraClassification from './map-esra-classification';
import mapShortTermCoverAvailable from './map-short-term-cover-available';
import mapNbiIssueAvailable from './map-NBI-issue-available';
import noOnlineSupport from './no-online-support';
import canGetAQuoteOnline from './can-get-a-quote-online';
import cannotGetAQuote from './cannot-get-a-quote';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
import canApplyOffline from './can-apply-for-quote-offline';
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
    shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER.ILC,
    marketRiskAppetitePublicDesc: CIS.NO_COVER,
  };

  it('should return an object', () => {
    const result = mapCisCountry(mockCountryBase);

    const esraClassification = mapEsraClassification(mockCountryBase.ESRAClassificationDesc);
    const shortTermCover = mapShortTermCoverAvailable(mockCountryBase.shortTermCoverAvailabilityDesc);
    const nbiIssueAvailable = mapNbiIssueAvailable(mockCountryBase.NBIIssue);

    const countryRating = mockCisCountry.countryRatingDesc;

    const mapped: MappedCisCountry = {
      countryRating,
      esraClassification,
      isoCode: mockCountryBase.isoCode,
      name: mockCountryBase.marketName,
      nbiIssueAvailable,
      shortTermCover,

      noOnlineSupport: noOnlineSupport({
        countryRating,
        esraClassification: mockCisCountry.ESRAClassificationDesc,
        shortTermCover: mockCisCountry.shortTermCoverAvailabilityDesc,
      }),

      canGetAQuoteOnline: canGetAQuoteOnline({ shortTermCover, nbiIssueAvailable, esraClassification }),

      canGetAQuoteOffline: canApplyOffline(mockCountryBase.shortTermCoverAvailabilityDesc),

      cannotGetAQuote: cannotGetAQuote({ shortTermCover, nbiIssueAvailable, esraClassification }),

      canApplyForInsuranceOnline: canApplyForInsuranceOnline(mockCisCountry),
    };

    expect(result).toEqual(mapped);
  });
});
