import alphaCharactersAndMinMaxLength from '.';
import alphaCharactersOnlyValidation from '../alpha-characters-only';
import minAndMaxLengthValidation from '../min-and-max-length';
import { mockErrors, mockErrorMessagesObject } from '../../test-mocks';

describe('shared-validation/alpha-characters-and-min-max-length', () => {
  const mockFieldId = 'Mock field';
  const minimum = 2;
  const maximum = 10;

  describe('when the value is not purely alpha/numerical', () => {
    it('should return alphaCharactersOnlyValidation', () => {
      const mockValue = 'mock!';

      const result = alphaCharactersAndMinMaxLength({
        value: mockValue,
        fieldId: mockFieldId,
        errorMessages: mockErrorMessagesObject,
        errors: mockErrors,
        minimum,
        maximum,
      });

      const expected = alphaCharactersOnlyValidation(mockValue, mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  it('should otherwise return minAndMaxLengthValidation', () => {
    const mockValue = 'mock';

    const result = alphaCharactersAndMinMaxLength({
      value: mockValue,
      fieldId: mockFieldId,
      errorMessages: mockErrorMessagesObject,
      errors: mockErrors,
      minimum,
      maximum,
    });

    const expected = minAndMaxLengthValidation({
      fieldId: mockFieldId,
      value: mockValue,
      errorMessages: mockErrorMessagesObject,
      errors: mockErrors,
      minimum,
      maximum,
    });

    expect(result).toEqual(expected);
  });
});
