import getFieldById from '.';

describe('server/helpers/get-field-by-id', () => {
  const mockFields = {
    a: { LABEL: 'Field A' },
    b: { LABEL: 'Field B' },
  };

  it('should return a field by ID', () => {
    const result = getFieldById(mockFields, 'a');

    const expected = {
      id: 'a',
      ...mockFields.a,
    };

    expect(result).toEqual(expected);
  });

  describe('when a field has a prefix provided', () => {
    it('should return an object with the provided ID', () => {
      const result = getFieldById(mockFields, 'a', 'prefix');

      const expected = {
        id: 'prefix-a',
        ...mockFields.a,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a field is not found', () => {
    it('should return an object with the provided ID', () => {
      const result = getFieldById(mockFields, 'c');

      const expected = { id: 'c' };
      expect(result).toEqual(expected);
    });
  });
});
