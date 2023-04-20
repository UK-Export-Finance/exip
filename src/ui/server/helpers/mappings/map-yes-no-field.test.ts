import mapYesNoField from './map-yes-no-field';
import { DEFAULT } from '../../content-strings';
import { FIELD_VALUES } from '../../constants';

describe('server/helpers/mappings/mapYesNoField', () => {
  describe('when value is true', () => {
    const value = true;

    it(`should return "${FIELD_VALUES.YES}"`, () => {
      const response = mapYesNoField(value);

      expect(response).toEqual(FIELD_VALUES.YES);
    });
  });

  describe('when value is "false"', () => {
    const value = false;

    it(`should return "${FIELD_VALUES.NO}"`, () => {
      const response = mapYesNoField(value);

      expect(response).toEqual(FIELD_VALUES.NO);
    });
  });

  describe('when value is "undefined"', () => {
    it(`should return ${DEFAULT.EMPTY}`, () => {
      const response = mapYesNoField();

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });
});
