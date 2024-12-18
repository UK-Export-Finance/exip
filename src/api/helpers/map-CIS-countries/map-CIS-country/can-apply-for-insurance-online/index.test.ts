import canApplyForInsuranceOnline from '.';
import hasValidEsraClassification from './has-valid-esra-classification';
import hasValidShortTermCover from './has-valid-short-term-cover';
import hasValidRating from './has-valid-rating';
import { mockCisCountry } from '../../../../test-mocks';

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online', () => {
  it('should return the result of 3x conditions', () => {
    const result = canApplyForInsuranceOnline(mockCisCountry);

    const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, marketRiskAppetitePublicDesc } = mockCisCountry;

    const expected =
      hasValidEsraClassification(ESRAClassificationDesc) &&
      hasValidShortTermCover(shortTermCoverAvailabilityDesc) &&
      hasValidRating(marketRiskAppetitePublicDesc);

    expect(result).toEqual(expected);
  });
});
