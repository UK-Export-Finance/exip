import isCheckAndChangeRoute from '.';

describe('server/helpers/is-change-route', () => {
  describe("when the url's last substring is `check-and-change`", () => {
    it('should return true', () => {
      const mockUrl = 'mock/check-and-change';
      const result = isCheckAndChangeRoute(mockUrl);

      expect(result).toEqual(true);
    });
  });

  describe("when the url's last substring is`change`", () => {
    it('should return false', () => {
      const mockUrl = 'mock/change';
      const result = isCheckAndChangeRoute(mockUrl);

      expect(result).toEqual(false);
    });
  });

  describe("when the url's last substring is NOT `change`", () => {
    it('should return false', () => {
      const mockUrl = 'mock/not-change';
      const result = isCheckAndChangeRoute(mockUrl);

      expect(result).toEqual(false);
    });
  });
});
