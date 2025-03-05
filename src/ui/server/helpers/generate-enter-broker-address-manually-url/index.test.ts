import generateEnterBrokerAddressManuallyUrl from '.';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT, BROKER_MANUAL_ADDRESS_CHANGE, BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/generate-enter-broker-address-manually-url', () => {
  const referenceNumber = 123;

  describe('when isAChangeRoute is true', () => {
    it('should return the correct url', () => {
      const isAChangeRoute = true;
      const isACheckAndChangeRoute = false;

      const response = generateEnterBrokerAddressManuallyUrl(referenceNumber, isAChangeRoute, isACheckAndChangeRoute);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_CHANGE}`;

      expect(response).toEqual(expected);
    });
  });

  describe('when isACheckAndChangeRoute is true', () => {
    it('should return the correct url', () => {
      const isAChangeRoute = false;
      const isACheckAndChangeRoute = true;

      const response = generateEnterBrokerAddressManuallyUrl(referenceNumber, isAChangeRoute, isACheckAndChangeRoute);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE}`;

      expect(response).toEqual(expected);
    });
  });

  describe('when isAChangeRoute and isACheckAndChangeRoute are false', () => {
    it('should return the correct url', () => {
      const isAChangeRoute = false;
      const isACheckAndChangeRoute = false;

      const response = generateEnterBrokerAddressManuallyUrl(referenceNumber, isAChangeRoute, isACheckAndChangeRoute);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`;

      expect(response).toEqual(expected);
    });
  });
});
