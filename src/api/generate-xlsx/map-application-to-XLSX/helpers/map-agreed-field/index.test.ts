import mapYesNoField from '.';
import { DEFAULT, XLSX } from '../../../../content-strings';

describe('api/generate-xlsx/map-application-to-xlsx/helpers/map-agreed-field', () => {
  describe('when value is true', () => {
    const value = true;

    it(`should return "${XLSX.AGREED}"`, () => {
      const response = mapYesNoField(value);

      expect(response).toEqual(XLSX.AGREED);
    });
  });

  describe('when value is not true', () => {
    const value = false;

    it(`should return "${DEFAULT.EMPTY}"`, () => {
      const response = mapYesNoField(value);

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });

  describe('when value is undefined', () => {
    it(`should return "${DEFAULT.EMPTY}"`, () => {
      const response = mapYesNoField();

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });
});
