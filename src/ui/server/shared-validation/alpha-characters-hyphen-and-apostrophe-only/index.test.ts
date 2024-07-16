import alphaCharactersHyphenAndApostropheOnlyValidation from '.';
import regexValidation from '../regex-validation';
import { mockErrors, mockErrorMessagesObject } from '../../test-mocks';
import { REGEX } from '../../constants';

describe('shared-validation/alpha-characters-hyphen-and-apostrophe-only', () => {
  const mockFieldId = 'Mock field';

  it('should return the result of regexValidation', () => {
    const mockValue = 'mock!';

    const result = alphaCharactersHyphenAndApostropheOnlyValidation(mockValue, mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

    const expected = regexValidation(
      mockValue,
      mockFieldId,
      REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE,
      mockErrorMessagesObject.INCORRECT_FORMAT,
      mockErrors,
    );

    expect(result).toEqual(expected);
  });
});
