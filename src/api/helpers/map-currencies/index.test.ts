import mapCurrencies, { getSupportedCurrencies } from '.';
import mockCurrencies from '../../test-mocks/mock-currencies';

describe('helpers/map-currencies', () => {
  describe('getSupportedCurrencies', () => {
    it('should only return supported currencies (GBP, EUR, USD)', () => {
      const result = getSupportedCurrencies(mockCurrencies);

      const expected = [mockCurrencies[0], mockCurrencies[2], mockCurrencies[3]];

      expect(result).toEqual(expected);
    });
  });

  describe('mapCurrencies', () => {
    const supportedCurrencies = getSupportedCurrencies(mockCurrencies);

    it('should return an array of mapped objects', () => {
      const result = mapCurrencies(supportedCurrencies);

      const expected = supportedCurrencies.map((currency) => ({
        isoCode: currency.isoCode,
        text: currency.name,
      }));

      expect(result).toEqual(expected);
    });

    describe('when renderIsoCodeInText is passed', () => {
      it('should return an array of mapped objects with ISO codes in the text', () => {
        const result = mapCurrencies(supportedCurrencies);

        const expected = supportedCurrencies.map((currency) => ({
          isoCode: currency.isoCode,
          text: `${currency.isoCode} - ${currency.name}`,
        }));

        expect(result).toEqual(expected);
      });
    });
  });
});
