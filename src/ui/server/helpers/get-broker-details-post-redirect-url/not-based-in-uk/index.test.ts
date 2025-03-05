import notBasedInUkRedirectUrl from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { referenceNumber } from '../../../test-mocks';

const {
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT, BROKER_MANUAL_ADDRESS_CHANGE, BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const mockBaseUrl = `/mock-base-url/${referenceNumber}`;

const baseParams = {
  baseUrl: mockBaseUrl,
  isAChangeRoute: false,
  isACheckAndChangeRoute: false,
  manualAddressRequired: false,
};

describe('server/helpers/src/ui/server/helpers/get-broker-details-post-redirect-url/not-based-in-uk', () => {
  describe('when isAChangeRoute is true', () => {
    const isAChangeRoute = true;

    describe('when manualAddressRequired is true', () => {
      it('should return the correct URL', () => {
        const result = notBasedInUkRedirectUrl({
          ...baseParams,
          isAChangeRoute,
          manualAddressRequired: true,
        });

        const expected = `${mockBaseUrl}${BROKER_MANUAL_ADDRESS_CHANGE}`;

        expect(result).toEqual(expected);
      });
    });

    describe('when manualAddressRequired is false', () => {
      it('should return the correct URL', () => {
        const result = notBasedInUkRedirectUrl({
          ...baseParams,
          isAChangeRoute,
          manualAddressRequired: false,
        });

        const expected = `${mockBaseUrl}${CHECK_YOUR_ANSWERS}`;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when isACheckAndChangeRoute is true', () => {
    describe('when manualAddressRequired is true', () => {
      it('should return the correct URL', () => {
        const result = notBasedInUkRedirectUrl({
          ...baseParams,
          isACheckAndChangeRoute: true,
          manualAddressRequired: true,
        });

        const expected = `${mockBaseUrl}${BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE}`;

        expect(result).toEqual(expected);
      });
    });

    describe('when manualAddressRequired is false', () => {
      it('should return the correct URL', () => {
        const result = notBasedInUkRedirectUrl({
          ...baseParams,
          isACheckAndChangeRoute: true,
          manualAddressRequired: false,
        });

        const expected = `${mockBaseUrl}${CHECK_AND_CHANGE_ROUTE}`;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when isAChangeRoute and isACheckAndChangeRoute are false', () => {
    it('should return the correct URL', () => {
      const result = notBasedInUkRedirectUrl(baseParams);

      const expected = `${mockBaseUrl}${BROKER_MANUAL_ADDRESS_ROOT}`;

      expect(result).toEqual(expected);
    });
  });
});
