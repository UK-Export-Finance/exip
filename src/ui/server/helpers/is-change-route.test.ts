import isChangeRoute from './is-change-route';

describe('server/helpers/is-change-route', () => {
  describe("when the url's last substring is `change`", () => {
    it('should return true', () => {
      const mockUrl = 'mock/change';
      const result = isChangeRoute(mockUrl);

      expect(result).toEqual(true);
    });
  });

  describe("when the url's last substring is NOT `change`", () => {
    it('should return false', () => {
      const mockUrl = 'mock/not-change';
      const result = isChangeRoute(mockUrl);

      expect(result).toEqual(false);
    });
  });
});
