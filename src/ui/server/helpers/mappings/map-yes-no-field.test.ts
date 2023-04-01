import mapYesNoField from './map-yes-no-field';
import { DEFAULT } from '../../../../content-strings';

describe('server/helpers/mappings/mapYesNoField', () => {
  describe('when value is true', () => {
    const value = true;

    it('should return "Yes"', () => {
      const response = mapYesNoField(value);

      expect(response).toEqual('Yes');
    });
  });

  describe('when value is "false"', () => {
    const value = false;

    it('should return "No"', () => {
      const response = mapYesNoField(value);

      expect(response).toEqual('No');
    });
  });

  describe('when value is "undefined"', () => {
    it(`should return ${DEFAULT.EMPTY}`, () => {
      const response = mapYesNoField();

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });
});
