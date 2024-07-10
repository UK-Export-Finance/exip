import generateRedirectUrl from '.';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const { MVP_INSURANCE_ROOT, INSURANCE_ROOT } = INSURANCE_ROUTES;

describe('server/helpers/generate-redirect-url', () => {
  describe(`when a URL contains one instance of ${MVP_INSURANCE_ROOT}`, () => {
    it(`should replace the instance with ${INSURANCE_ROOT}`, () => {
      const mockUrl = `/mock-url${MVP_INSURANCE_ROOT}`;

      const result = generateRedirectUrl(mockUrl);

      const expected = `/mock-url${INSURANCE_ROOT}`;

      expect(result).toEqual(expected);
    });
  });

  describe(`when a URL contains more than one instance of ${MVP_INSURANCE_ROOT}`, () => {
    it(`should replace only the first instance with ${INSURANCE_ROOT}`, () => {
      const mockUrl = `/mock-url${MVP_INSURANCE_ROOT}/example${MVP_INSURANCE_ROOT}`;

      const result = generateRedirectUrl(mockUrl);

      const expected = `/mock-url${INSURANCE_ROOT}/example${MVP_INSURANCE_ROOT}`;

      expect(result).toEqual(expected);
    });
  });

  describe(`when a URL does NOT contain an instance of ${MVP_INSURANCE_ROOT}`, () => {
    it('should return the URL as is', () => {
      const mockUrl = `/mock-url${INSURANCE_ROOT}`;

      const result = generateRedirectUrl(mockUrl);

      expect(result).toEqual(mockUrl);
    });
  });
});
