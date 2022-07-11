const mapCountry = require('./map-country');
const { FIELD_IDS } = require('../../constants');
const { mockSession } = require('../../test-mocks');

describe('server/helpers/map-country', () => {
  it('should return country name', () => {
    const country = mockSession.submittedData[FIELD_IDS.BUYER_COUNTRY];

    const result = mapCountry(country);

    const expected = `${country.name}`;

    expect(result).toEqual(expected);
  });

  describe('when there is no value', () => {
    it('should return a dash', () => {
      const result = mapCountry();

      expect(result).toEqual('-');
    });
  });
});
