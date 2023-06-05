import validateWebsiteAddress from '.';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/website', () => {
  const fieldId = 'website';
  const errorMessage = 'incorrect format';
  const errors = {};

  it('should return an error when website is invalid', () => {
    const website = 'http://www';

    const result = validateWebsiteAddress(website, fieldId, errorMessage, errors);
    const expected = generateValidationErrors(fieldId, errorMessage);

    expect(result).toEqual(expected);
  });

  it('should NOT return an error when website is valid', () => {
    const website = 'http://google.com';

    const result = validateWebsiteAddress(website, fieldId, errorMessage, errors);

    expect(result).toEqual({});
  });
});
