import mapYesAlternateField from './map-yes-alternate-field';
import { DEFAULT } from '../../content-strings';
import { FIELD_VALUES } from '../../constants';

describe('server/helpers/mappings/map-yes-alternate-field', () => {
  describe('when value is true', () => {
    const value = true;

    it('should return alternate answer', () => {
      const alternateAnswer = 'value1';

      const response = mapYesAlternateField(value, alternateAnswer);

      expect(response).toEqual(alternateAnswer);
    });
  });

  describe('when value is "false"', () => {
    const value = false;

    it(`should return "${FIELD_VALUES.NO}"`, () => {
      const response = mapYesAlternateField(value);

      expect(response).toEqual(FIELD_VALUES.NO);
    });
  });

  describe('when value is "undefined"', () => {
    it(`should return ${DEFAULT.EMPTY}`, () => {
      const response = mapYesAlternateField();

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });
});
