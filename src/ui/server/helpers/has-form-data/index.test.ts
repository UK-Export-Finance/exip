import hasFormData, { stripEmptyFormFields } from '.';

describe('helpers/has-form-data', () => {
  describe('stripEmptyFormFields', () => {
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

    describe('when no form data is provided', () => {
      it('should return an empty object', () => {
        // @ts-ignore
        const result = stripEmptyFormFields();

        expect(result).toEqual({});
      });
    });
  });

  describe('hasFormData', () => {
    describe('when a form has a field that is not _csrf', () => {
      it('should return true', () => {
        const mockFormData = {
          _csrf: '1234',
          mockField: true,
        };

        const result = hasFormData(mockFormData);

        expect(result).toEqual(true);
      });
    });

    describe('when a form does NOT have a field other than _csrf', () => {
      it('should return false', () => {
        const mockFormData = { _csrf: '1234' };

        const result = hasFormData(mockFormData);

        expect(result).toEqual(false);
      });
    });

    describe('when no form data is provided', () => {
      it('should return false', () => {
        // @ts-ignore
        const result = hasFormData();

        expect(result).toEqual(false);
      });
    });

    describe('when no form data is empty', () => {
      it('should return false', () => {
        const result = hasFormData({});

        expect(result).toEqual(false);
      });
    });
  });
});
