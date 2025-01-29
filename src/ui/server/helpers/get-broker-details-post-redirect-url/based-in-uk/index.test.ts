import basedInUkRedirectUrl from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { referenceNumber } from '../../../test-mocks';

const {
  POLICY: { BROKER_ADDRESSES_ROOT, BROKER_ADDRESSES_CHANGE, BROKER_ADDRESSES_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const mockBaseUrl = `/mock-base-url/${referenceNumber}`;

const baseParams = {
  baseUrl: mockBaseUrl,
  isAChangeRoute: false,
  isACheckAndChangeRoute: false,
  postcodeOrBuildingNumberNameHasChanged: false,
};

describe('server/helpers/src/ui/server/helpers/get-broker-details-post-redirect-url/based-in-uk', () => {
  describe('when isAChangeRoute is true', () => {
    const isAChangeRoute = true;

    describe('when postcodeOrBuildingNumberNameHasChanged is true', () => {
      it('should return the correct URL', () => {
        const result = basedInUkRedirectUrl({
          ...baseParams,
          isAChangeRoute,
          postcodeOrBuildingNumberNameHasChanged: true,
        });

        const expected = `${mockBaseUrl}${BROKER_ADDRESSES_CHANGE}`;

        expect(result).toEqual(expected);
      });
    });

    describe('when postcodeOrBuildingNumberNameHasChanged is false', () => {
      it('should return the correct URL', () => {
        const result = basedInUkRedirectUrl({
          ...baseParams,
          isAChangeRoute,
          postcodeOrBuildingNumberNameHasChanged: false,
        });

        const expected = `${mockBaseUrl}${CHECK_YOUR_ANSWERS}`;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when isACheckAndChangeRoute is true', () => {
    describe('when postcodeOrBuildingNumberNameHasChanged is true', () => {
      it('should return the correct URL', () => {
        const result = basedInUkRedirectUrl({
          ...baseParams,
          isACheckAndChangeRoute: true,
          postcodeOrBuildingNumberNameHasChanged: true,
        });

        const expected = `${mockBaseUrl}${BROKER_ADDRESSES_CHECK_AND_CHANGE}`;

        expect(result).toEqual(expected);
      });
    });

    describe('when postcodeOrBuildingNumberNameHasChanged is false', () => {
      it('should return the correct URL', () => {
        const result = basedInUkRedirectUrl({
          ...baseParams,
          isACheckAndChangeRoute: true,
          postcodeOrBuildingNumberNameHasChanged: false,
        });

        const expected = `${mockBaseUrl}${CHECK_AND_CHANGE_ROUTE}`;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when isAChangeRoute and isACheckAndChangeRoute are false', () => {
    it('should return the correct URL', () => {
      const result = basedInUkRedirectUrl(baseParams);

      const expected = `${mockBaseUrl}${BROKER_ADDRESSES_ROOT}`;

      expect(result).toEqual(expected);
    });
  });
});
