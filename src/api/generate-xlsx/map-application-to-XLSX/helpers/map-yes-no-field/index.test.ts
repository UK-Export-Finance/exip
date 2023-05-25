import mapYesNoField from '.';
import { DEFAULT } from '../../../../content-strings';

describe('api/generate-xlsx/map-application-to-xlsx/helpers/map-yes-no-field', () => {
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
