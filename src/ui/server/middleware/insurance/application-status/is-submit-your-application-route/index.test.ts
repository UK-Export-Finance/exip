import isSubmitYourApplicationRoute, { mapSubmitYourApplicationRoutes } from '.';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT, CODE_OF_CONDUCT, EXPORTING_WITH_CODE_OF_CONDUCT },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    HOW_YOUR_DATA_WILL_BE_USED,
  },
} = INSURANCE_ROUTES;

describe('middleware/insurance/application-status/is-submit-your-application-route', () => {
  describe('mapSubmitYourApplicationRoutes', () => {
    it('should return an array of mapped routes', () => {
      const result = mapSubmitYourApplicationRoutes(referenceNumber);

      const routes = Object.values({
        ...CHECK_YOUR_ANSWERS,
        CONFIDENTIALITY,
        ANTI_BRIBERY_ROOT,
        CODE_OF_CONDUCT,
        EXPORTING_WITH_CODE_OF_CONDUCT,
        CONFIRMATION_AND_ACKNOWLEDGEMENTS,
        HOW_YOUR_DATA_WILL_BE_USED,
      });

      const expected = routes.map((route) => `${INSURANCE_ROOT}/${referenceNumber}${route}`);

      expect(result).toEqual(expected);
    });
  });

  describe('isSubmitYourApplicationRoute', () => {
    describe('when a route includes a "submit your application" route', () => {
      it('should return true', () => {
        const mockUrl = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;

        const result = isSubmitYourApplicationRoute(mockUrl, referenceNumber);

        expect(result).toEqual(true);
      });
    });

    describe('when a route does NOT include a "submit your application" route', () => {
      it('should return false', () => {
        const mockUrl = `${INSURANCE_ROOT}/${referenceNumber}/a-different-route`;

        const result = isSubmitYourApplicationRoute(mockUrl, referenceNumber);

        expect(result).toEqual(false);
      });
    });
  });
});
