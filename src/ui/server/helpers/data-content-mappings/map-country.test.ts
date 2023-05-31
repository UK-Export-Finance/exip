import mapCountry from './map-country';
import { FIELD_IDS } from '../../constants';
import { mockSession } from '../../test-mocks';

describe('server/helpers/map-country', () => {
  it('should return country name', () => {
    const country = mockSession.submittedData.quoteEligibility[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY];

    const result = mapCountry(country);

    const expected = `${country.name}`;

    expect(result).toEqual(expected);
  });
});
