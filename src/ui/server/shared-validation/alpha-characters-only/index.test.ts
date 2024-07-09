import alphaCharactersOnlyValidation from '.';
import regexValidation from '../regex-validation';
import { mockErrors, mockErrorMessagesObject } from '../../test-mocks';
import { REGEX } from '../../constants';

const mockFieldId = 'mockId';

describe('shared-validation/alpha-characters-only', () => {
  describe('when a string contains numbers', () => {
    it('should return the result of regexValidation', () => {
      const mockValue = 'mock!';

      const result = alphaCharactersOnlyValidation(mockValue, mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      const expected = regexValidation(mockValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
