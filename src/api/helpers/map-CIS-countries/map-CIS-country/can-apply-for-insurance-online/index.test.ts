import canApplyForInsuranceOnline from '.';
import esraClassificationIsStandardHighOrVeryHigh from '../esra-classification-is-standard-high-or-very-high';
import hasValidShortTermCover from './has-valid-short-term-cover';
import countryRatingIsAorB from '../country-rating-is-a-or-b';
import { mockCisCountry } from '../../../../test-mocks';

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online', () => {
  it('should return the result of 3x conditions', () => {
    const result = canApplyForInsuranceOnline(mockCisCountry);

    const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, marketRiskAppetitePublicDesc } = mockCisCountry;

    const expected =
      esraClassificationIsStandardHighOrVeryHigh(ESRAClassificationDesc) &&
      hasValidShortTermCover(shortTermCoverAvailabilityDesc) &&
      countryRatingIsAorB(marketRiskAppetitePublicDesc);

    expect(result).toEqual(expected);
  });
});
