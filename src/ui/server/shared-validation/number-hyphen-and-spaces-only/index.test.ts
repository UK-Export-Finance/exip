import numberHyphenSpacesOnlyValidation from '.';
import { REGEX } from '../../constants';
import generateValidationErrors from '../../helpers/validation';
import regexValidation from '../regex-validation';
import { RequestBody } from '../../../types';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';

describe('shared-validation/number-hyphen-and-spaces-only', () => {
  const FIELD_ID = 'FIELD_ID';
  const MINIMUM = 6;
  const MAXIMUM = 6;

  const mockBody = {
    [FIELD_ID]: '11-22-33',
  } as RequestBody;

  describe('invalid field values', () => {
    describe('when a value is not provided', () => {
      it('should return a validation errors', () => {
        const mockEmptyBody = {};

        const result = numberHyphenSpacesOnlyValidation(mockEmptyBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when the provided value has a letter', () => {
      it('should return the result of regexValidation"', () => {
        mockBody[FIELD_ID] = '11-22-3E';

        const result = numberHyphenSpacesOnlyValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

        const expected = regexValidation(
          mockBody[FIELD_ID],
          FIELD_ID,
          REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE,
          mockErrorMessagesObject.INCORRECT_FORMAT,
          mockErrors,
        );

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
