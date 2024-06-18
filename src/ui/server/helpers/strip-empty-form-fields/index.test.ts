import stripEmptyFormFields from '.';

describe('helpers/strip-empty-form-fields', () => {
  describe("when a field has a value of ''", () => {
    it('should return form fields without the empty field', () => {
      const mockFormData = {
        a: '',
        b: true,
      };

      const result = stripEmptyFormFields(mockFormData);

      const expected = { b: true };

      expect(result).toEqual(expected);
    });
  });

  describe('when a field has a value of null', () => {
    it('should return form fields without the empty field', () => {
      const mockFormData = {
        a: null,
        b: true,
      };

      const result = stripEmptyFormFields(mockFormData);

      const expected = { b: true };

      expect(result).toEqual(expected);
    });
  });

  describe('when a field has a value of false boolean', () => {
    it('should return the field', () => {
      const mockFormData = {
        a: false,
      };

      const result = stripEmptyFormFields(mockFormData);

      const expected = { a: false };

      expect(result).toEqual(expected);
    });
  });

  describe('when a field has a value of 0', () => {
    it('should return the field', () => {
      const mockFormData = {
        a: 0,
      };

      const result = stripEmptyFormFields(mockFormData);

      const expected = { a: 0 };

      expect(result).toEqual(expected);
    });
  });

  describe('when a field has a value of undefined', () => {
    it('should return form fields without the empty field', () => {
      const mockFormData = {
        a: undefined,
        b: true,
      };

      const result = stripEmptyFormFields(mockFormData);

      const expected = { b: true };

      expect(result).toEqual(expected);
    });
  });

  describe('when there are multiple fields with empty values', () => {
    it('should return form fields without the empty fields', () => {
      const mockFormData = {
        a: '',
        b: null,
        c: undefined,
        d: true,
        e: 'Mock value',
      };

      const result = stripEmptyFormFields(mockFormData);

      const expected = {
        d: true,
        e: 'Mock value',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when "nullOrEmptyStringFields" is populated', () => {
    it('should return form fields without the empty fields unless they are in "nullOrEmptyStringFields"', () => {
      const mockFormData = {
        a: '',
        b: null,
        c: undefined,
        d: true,
        e: 'Mock value',
      };

      const nullOrEmptyStringFields = ['a', 'c'];

      const result = stripEmptyFormFields(mockFormData, nullOrEmptyStringFields);

      const expected = {
        a: '',
        c: undefined,
        d: true,
        e: 'Mock value',
      };

      expect(result).toEqual(expected);
    });
  });
});
