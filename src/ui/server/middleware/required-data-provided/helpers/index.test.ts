import { getRoutesAsArray, routeIsKnown, hasRequiredData } from '.';
import { FIELD_IDS, ROUTES } from '../../../constants';
import { generateRequiredData } from '../insurance/eligibility';
import { mockSession, mockCountries } from '../../../test-mocks';

const { INSURANCE } = ROUTES;

describe('middleware/required-data-provided/helpers', () => {
  const mockRoutes = {
    a: 'A',
    b: 'B',
  };

  describe('getRoutesAsArray', () => {
    it('should return all routes as an array of strings', () => {
      const result = getRoutesAsArray(mockRoutes);

      const expected = Object.values(mockRoutes);

      expect(result).toEqual(expected);
    });
  });

  describe('routeIsKnown', () => {
    describe('when a route is in the list of routes', () => {
      it('should return true', () => {
        const routes = getRoutesAsArray(mockRoutes);
        const route = mockRoutes.b;

        const result = routeIsKnown(routes, route);

        expect(result).toEqual(true);
      });
    });

    describe('when a route is NOT in the list of routes', () => {
      it('should return false', () => {
        const routes = getRoutesAsArray(mockRoutes);
        const route = '/unknown-404-page';

        const result = routeIsKnown(routes, route);

        expect(result).toEqual(false);
      });
    });
  });

  describe('hasRequiredData', () => {
    const mockRequiredDataState = generateRequiredData();

    describe('when total amount of submitted fields matches the total of required fields', () => {
      it('should return true', () => {
        const result = hasRequiredData(INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, mockRequiredDataState, mockSession.submittedData.insuranceEligibility);

        expect(result).toEqual(true);
      });
    });

    describe('when total amount of submitted fields does NOT match the total of required fields', () => {
      it('should return false', () => {
        const result = hasRequiredData(INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, mockRequiredDataState, {});

        expect(result).toEqual(false);
      });
    });

    describe(`when ${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY} submitted data with true canApplyOnline flag`, () => {
      it('should return true', () => {
        const mockSubmittedData = {
          [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY]: {
            ...mockCountries[0],
            canApplyOnline: true,
          },
        };

        const result = hasRequiredData(INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, mockRequiredDataState, mockSubmittedData);

        expect(result).toEqual(true);
      });
    });

    describe(`when ${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY} submitted data with false canApplyOnline flag`, () => {
      it('should return false', () => {
        const mockSubmittedData = {
          [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY]: {
            ...mockCountries[0],
            canApplyOnline: false,
          },
        };

        const result = hasRequiredData(INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, mockRequiredDataState, mockSubmittedData);

        expect(result).toEqual(false);
      });
    });
  });
});
