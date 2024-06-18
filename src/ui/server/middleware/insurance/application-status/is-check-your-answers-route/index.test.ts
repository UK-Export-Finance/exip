import isCheckYourAnswersRoute, { mapCheckYourAnswersRoutes } from '.';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { referenceNumber } from '../../../../test-mocks';

const { CHECK_YOUR_ANSWERS, INSURANCE_ROOT } = INSURANCE_ROUTES;

describe('middleware/insurance/application-status/is-check-your-answers-route', () => {
  describe('mapCheckYourAnswersRoutes', () => {
    it('should return an array of mapped routes', () => {
      const result = mapCheckYourAnswersRoutes(referenceNumber);

      const routes = Object.values(CHECK_YOUR_ANSWERS).filter((route) => route !== CHECK_YOUR_ANSWERS.ROOT);

      const expected = routes.map((route) => `${INSURANCE_ROOT}/${referenceNumber}${route}`);

      expect(result).toEqual(expected);
    });
  });

  describe('isCheckYourAnswersRoute', () => {
    describe('when a route includes a "check your answers" route', () => {
      it('should return true', () => {
        const mockUrl = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;

        const result = isCheckYourAnswersRoute(mockUrl, referenceNumber);

        expect(result).toEqual(true);
      });
    });

    describe('when a route does NOT include a "check your answers" route', () => {
      it('should return false', () => {
        const mockUrl = `${INSURANCE_ROOT}/${referenceNumber}/a-different-route`;

        const result = isCheckYourAnswersRoute(mockUrl, referenceNumber);

        expect(result).toEqual(false);
      });
    });
  });
});
