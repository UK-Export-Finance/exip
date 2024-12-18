import canApplyForInsuranceOnline from '.';
import hasValidEsraClassification from './has-valid-esra-classification';
import hasValidShortTermCover from './has-valid-short-term-cover';
import creditRatingIsAorB from '../credit-rating-is-a-or-b';
import { mockCisCountry } from '../../../../test-mocks';

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online', () => {
  it('should return the result of 3x conditions', () => {
    const result = canApplyForInsuranceOnline(mockCisCountry);

    const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, marketRiskAppetitePublicDesc } = mockCisCountry;

    const expected =
      hasValidEsraClassification(ESRAClassificationDesc) &&
      hasValidShortTermCover(shortTermCoverAvailabilityDesc) &&
      creditRatingIsAorB(marketRiskAppetitePublicDesc);

    expect(result).toEqual(expected);
  });
});
