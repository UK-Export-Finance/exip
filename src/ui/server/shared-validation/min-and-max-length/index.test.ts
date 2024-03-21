import minAndMaxLengthValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import { mockErrors, mockErrorMessagesObject } from '../../test-mocks';

describe('shared-validation/min-and-max-length', () => {
  const mockFieldId = 'Mock field';
  const minimum = 2;
  const maximum = 10;

  describe('when the field is below the minimum number of characters', () => {
    it('should return a validation error', () => {
      const mockFieldValue = 'a'.repeat(minimum - 1);

      const result = minAndMaxLengthValidation({
        value: mockFieldValue,
        fieldId: mockFieldId,
        errorMessages: mockErrorMessagesObject,
        errors: mockErrors,
        minimum,
        maximum,
      });

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the field is over the maximum number of characters', () => {
    const mockFieldValue = 'a'.repeat(maximum + 1);

    it('should return a validation error', () => {
      const result = minAndMaxLengthValidation({
        value: mockFieldValue,
        fieldId: mockFieldId,
        errorMessages: mockErrorMessagesObject,
        errors: mockErrors,
        minimum,
        maximum,
      });

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.ABOVE_MAXIMUM, mockErrors);

      expect(result).toEqual(expected);
    });

    describe('when there are other validation errors', () => {
      it('should return a validation error', () => {
        const mockErrorsOtherField = {
          errorList: {
            otherFieldId: {
              text: 'mock error',
            },
          },
        };

        const result = minAndMaxLengthValidation({
          value: mockFieldValue,
          fieldId: mockFieldId,
          errorMessages: mockErrorMessagesObject,
          errors: mockErrorsOtherField,
          minimum,
          maximum,
        });

        const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.ABOVE_MAXIMUM, mockErrorsOtherField);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockFieldValue = 'a'.repeat(minimum + 1);

      const result = minAndMaxLengthValidation({
        value: mockFieldValue,
        fieldId: mockFieldId,
        errorMessages: mockErrorMessagesObject,
        errors: mockErrors,
        minimum,
        maximum,
      });

      expect(result).toEqual(mockErrors);
    });
  });
});
