import getValidFields from '.';

describe('helpers/get-valid-fields', () => {
  const mockFormData = {
    fieldA: true,
    fieldB: 'Mock',
    fieldC: 'Mock value',
  };

  const mockErrorList = {
    fieldA: {
      text: 'Field A is incorrect',
      order: 1,
    },
  };

  describe('when there are fields that have validation errors and fields that do NOT have validation errors', () => {
    it('should only return the valid fields', () => {
      const result = getValidFields(mockFormData, mockErrorList);

      const expected = {
        fieldB: mockFormData.fieldB,
        fieldC: mockFormData.fieldC,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when there are fields that do NOT have validation errors but have empty values', () => {
    it('should return all fields, including fields with empty values', () => {
      mockFormData.fieldB = '';

      const result = getValidFields(mockFormData, {});

      const expected = {
        fieldA: mockFormData.fieldA,
        fieldB: mockFormData.fieldB,
        fieldC: mockFormData.fieldC,
      };

      expect(result).toEqual(expected);
    });
  });
});
