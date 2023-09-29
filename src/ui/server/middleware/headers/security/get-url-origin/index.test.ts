import getUrlOrigin from '.';

describe('middleware/headers/security/get-url-origin', () => {
  it('should return the the origin of the URL', () => {
    const mockUrl = 'https://gov.uk/test';

    const result = getUrlOrigin(mockUrl);

    const expected = 'gov.uk';

    expect(result).toEqual(expected);
  });

  describe('when the origin contains dashes', () => {
    it('should return the the origin of the URL', () => {
      const mockUrl = 'https://get-a-ukef-product.gov.uk';

      const result = getUrlOrigin(mockUrl);

      const expected = 'get-a-ukef-product.gov.uk';

      expect(result).toEqual(expected);
    });
  });

  describe('when the origin is localhost', () => {
    it('should return the the origin of the URL', () => {
      const mockUrl = 'https://localhost:1234';

      const result = getUrlOrigin(mockUrl);

      const expected = 'localhost';

      expect(result).toEqual(expected);
    });
  });

  describe('when the origin contains azurewebsites', () => {
    it('should return the the origin of the URL', () => {
      const mockUrl = 'https://get-a-ukef-product.azurewebsites.net';

      const result = getUrlOrigin(mockUrl);

      const expected = 'get-a-ukef-product.azurewebsites.net';

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided string is not a valid url', () => {
    it('should return an empty string', () => {
      const mockUrl = 'not-a-url';

      const result = getUrlOrigin(mockUrl);

      expect(result).toEqual('');
    });
  });
});
