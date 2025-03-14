import canGetAQuoteOnline from '.';
import esraClassificationIsStandardHighOrVeryHigh from '../esra-classification-is-standard-high-or-very-high';
import shortTermCoverIsYesReferOrUnlisted from '../short-term-cover-is-yes-refer-or-unlisted';
import countryRatingIsAorB from '../country-rating-is-a-or-b';
import { mockCisCountry } from '../../../../test-mocks';

describe('helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-online', () => {
  it('should return the result of 3x conditions', () => {
    const result = canGetAQuoteOnline(mockCisCountry);

    const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, marketRiskAppetitePublicDesc } = mockCisCountry;

    const expected =
      esraClassificationIsStandardHighOrVeryHigh(ESRAClassificationDesc) &&
      shortTermCoverIsYesReferOrUnlisted(shortTermCoverAvailabilityDesc) &&
      countryRatingIsAorB(marketRiskAppetitePublicDesc);

    expect(result).toEqual(expected);
  });
});
