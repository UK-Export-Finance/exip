import validateWebsiteAddress from '.';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/website', () => {
  const errors = {};

  describe('with errors', () => {
    const fieldId = 'website';
    const errorMessage = 'incorrect format';

    it('should display error when website is not complete "http://www"', () => {
      const website = 'http://www';

      const result = validateWebsiteAddress(website, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when website is not complete "http://google."', () => {
      const website = 'http://google.';

      const result = validateWebsiteAddress(website, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when website is empty', () => {
      const website = '';

      const result = validateWebsiteAddress(website, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });
  });

  describe('without errors', () => {
    const fieldId = 'website';
    const errorMessage = 'incorrect format';

    it('should not display error when website is in the correct format', () => {
      const website = 'http://www.google.com';

      const result = validateWebsiteAddress(website, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error when website is in the correct format but does not contain "www."', () => {
      const website = 'http://google.com';

      const result = validateWebsiteAddress(website, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error when website is in the correct format and has "/"', () => {
      const website = 'http://google.com/123';

      const result = validateWebsiteAddress(website, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });
  });
});
