import isValidReqOriginalUrl from '.';

describe('helpers/is-valid-req-original-url', () => {
  describe('when provided url is not value', () => {
    it('should return false', () => {
      const mockUrl = 'abc!';

      const result = isValidReqOriginalUrl(mockUrl);

      expect(result).toEqual(false);
    });
  });

  describe('when provided url is an empty string', () => {
    it('should return false', () => {
      const mockUrl = '';

      const result = isValidReqOriginalUrl(mockUrl);

      expect(result).toEqual(false);
    });
  });

  describe('when provided url contains a space', () => {
    it('should return false', () => {
      const mockUrl = 'abc ';

      const result = isValidReqOriginalUrl(mockUrl);

      expect(result).toEqual(false);
    });
  });

  describe('when provided url only contains letters', () => {
    it('should return true', () => {
      const mockUrl = 'abc';

      const result = isValidReqOriginalUrl(mockUrl);

      expect(result).toEqual(true);
    });
  });

  describe('when provided url contains letters and numbers', () => {
    it('should return true', () => {
      const mockUrl = 'abc123';

      const result = isValidReqOriginalUrl(mockUrl);

      expect(result).toEqual(true);
    });
  });

  describe('when provided url only contains numbers', () => {
    it('should return true', () => {
      const mockUrl = '123';

      const result = isValidReqOriginalUrl(mockUrl);

      expect(result).toEqual(true);
    });
  });

  describe('when provided url contains letters, numbers, "/", "?", "&", "-" and "="', () => {
    it('should return true', () => {
      const mockUrl = '123abc/?&-=';

      const result = isValidReqOriginalUrl(mockUrl);

      expect(result).toEqual(true);
    });
  });
});
