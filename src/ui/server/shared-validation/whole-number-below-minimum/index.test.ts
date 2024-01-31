import wholeNumberBelowMinimumValidation from '.';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';
import { RequestBody } from '../../../types';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/whole-number-below-minimum', () => {
  const FIELD_ID = 'FIELD_ID';
  const MINIMUM = 1;

  const mockBody = {
    [FIELD_ID]: '0',
  } as RequestBody;

  describe('when the provided number is below minimum', () => {
    it('should return validation errors', () => {
      const response = wholeNumberBelowMinimumValidation(mockBody, FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors, MINIMUM);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('when the provided number is at minimum', () => {
    it('should return null', () => {
      mockBody[FIELD_ID] = '1';
      const response = wholeNumberBelowMinimumValidation(mockBody, FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors, MINIMUM);

      expect(response).toBeNull();
    });
  });

  describe('when the provided number above minimum', () => {
    it('should return null', () => {
      mockBody[FIELD_ID] = '200';

      const response = wholeNumberBelowMinimumValidation(mockBody, FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors, MINIMUM);

      expect(response).toBeNull();
    });
  });
});
