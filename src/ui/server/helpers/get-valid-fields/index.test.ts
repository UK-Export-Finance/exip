import getValidFields from '.';

describe('helpers/get-valid-fields', () => {
  const mockFormData = {
    fieldA: '',
    fieldB: true,
  };

  const mockErrorList = {
    fieldA: {
      text: 'Enter field A',
      order: 1,
    },
  };

  describe('when there are fields that have validation errors and fields that do NOT have validation errors', () => {
    it('should only return the valid fields', () => {
      const result = getValidFields(mockFormData, mockErrorList);

      const expected = {
        fieldB: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when formData is not provided', () => {
    it('should return an empty object', () => {
      // @ts-ignore
      const result = getValidFields(undefined, mockErrorList);

      expect(result).toEqual({});
    });
  });

  describe('when formData is provided and errorList is not', () => {
    it('should return formData as iss', () => {
      // @ts-ignore
      const result = getValidFields(mockFormData, undefined);

      expect(result).toEqual(mockFormData);
    });
  });
});
