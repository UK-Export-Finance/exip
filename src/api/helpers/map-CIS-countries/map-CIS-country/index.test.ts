import mapCisCountry from '.';
import mapEsraClassification from './map-esra-classification';
import hasNoOnlineSupport from './has-no-online-support';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
import hasNoSupport from './has-no-support';
import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../constants';
import { MappedCisCountry } from '../../../types';
import { mockCisCountry } from '../../../test-mocks';
import isHighRiskCountry from './is-high-risk-country';

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

    const countryRating = mockCisCountry.countryRatingDesc;

    const mapped: MappedCisCountry = {
      countryRating,
      esraClassification,
      isoCode: mockCountryBase.isoCode,
      name: mockCountryBase.marketName,

      noOnlineSupport: hasNoOnlineSupport({
        countryRating,
        esraClassification: mockCisCountry.ESRAClassificationDesc,
        shortTermCover: mockCisCountry.shortTermCoverAvailabilityDesc,
      }),

      canGetAQuoteOnline: canGetAQuoteOnline(mockCisCountry),

      cannotGetAQuote: hasNoSupport({
        countryRating,
        esraClassification: mockCisCountry.ESRAClassificationDesc,
        shortTermCover: mockCisCountry.shortTermCoverAvailabilityDesc,
      }),

      canApplyForInsuranceOnline: canApplyForInsuranceOnline(mockCisCountry),

      noInsuranceSupport: hasNoSupport({
        countryRating,
        esraClassification: mockCisCountry.ESRAClassificationDesc,
        shortTermCover: mockCisCountry.shortTermCoverAvailabilityDesc,
      }),

      isHighRisk: isHighRiskCountry(esraClassification),
    };

    expect(result).toEqual(mapped);
  });
});
