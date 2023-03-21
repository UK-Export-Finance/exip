import mapYesNoField from './map-yes-no-field';

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
    it('should return "undefined"', () => {
      const response = mapYesNoField();

      expect(response).toEqual(undefined);
    });
  });
});
