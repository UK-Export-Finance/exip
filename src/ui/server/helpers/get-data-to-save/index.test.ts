import getDataToSave from '.';
import generateValidationErrors from '../validation';

describe('server/helpers/get-data-to-save', () => {
  const mockFormBody = {
    test: 'is test',
    otherField: true,
  };

  describe('when errorList is populated', () => {
    const mockErrorList = generateValidationErrors('otherField', 'error', {}).errorList;

    it('should strip out otherField as has validation errors', () => {
      const response = getDataToSave(mockFormBody, mockErrorList);

      const expected = {
        test: 'is test',
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when errorList is not populated', () => {
    it('should return form body', () => {
      const response = getDataToSave(mockFormBody);

      expect(response).toEqual(mockFormBody);
    });
  });
});
