import numberHyphenSpacesOnlyValidation from '.';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';
import { RequestBody } from '../../../types';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/number-hyphen-and-spaces-only', () => {
  const FIELD_ID = 'FIELD_ID';
  const MINIMUM = 6;
  const MAXIMUM = 6;

  const mockBody = {
    [FIELD_ID]: '11-22-33',
  } as RequestBody;

  describe('invalid field values', () => {
    describe('when a value is not provided', () => {
      it('should return validation errors', () => {
        const mockEmptyBody = {};

        const result = numberHyphenSpacesOnlyValidation(mockEmptyBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when the provided value has a letter', () => {
      it('should return validation errors"', () => {
        mockBody[FIELD_ID] = '11-22-3E';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when the provided value has a special character', () => {
      it('should return validation errors"', () => {
        mockBody[FIELD_ID] = '11-22-3!';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when the provided value is below minimum length', () => {
      it('should return validation errors', () => {
        mockBody[FIELD_ID] = '11-22';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when the provided value is above maximum length', () => {
      it('should return validation errors', () => {
        mockBody[FIELD_ID] = '11-22-33-44';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.ABOVE_MAXIMUM, mockErrors);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('valid field values', () => {
    describe('when the provided value is at minimum/maximum', () => {
      it('should return provided errors object', () => {
        mockBody[FIELD_ID] = '11-22-33';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        expect(result).toEqual(mockErrors);
      });
    });

    describe('when the provided value does not have hyphens or spaces', () => {
      it('should return provided errors object', () => {
        mockBody[FIELD_ID] = '112233';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        expect(result).toEqual(mockErrors);
      });
    });

    describe('when the provided value has spaces', () => {
      it('should return provided errors object', () => {
        mockBody[FIELD_ID] = '11 22 33';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        expect(result).toEqual(mockErrors);
      });
    });

    describe('when the provided value has spaces and hyphens', () => {
      it('should return provided errors object', () => {
        mockBody[FIELD_ID] = '11 22-33';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        expect(result).toEqual(mockErrors);
      });
    });
  });
});
