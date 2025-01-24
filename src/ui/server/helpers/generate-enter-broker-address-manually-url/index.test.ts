import generateEnterBrokerAddressManuallyUrl from '.';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT, BROKER_MANUAL_ADDRESS_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/generate-enter-broker-address-manually-url', () => {
  const referenceNumber = 123;

  describe('when isAChangeRoute is true', () => {
    it('should return the correct url', () => {
      const isAChangeRoute = true;

      const response = generateEnterBrokerAddressManuallyUrl(referenceNumber, isAChangeRoute);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_CHANGE}`;

      expect(response).toEqual(expected);
    });
  });

  describe('when isAChangeRoute is true', () => {
    it('should return the correct url', () => {
      const isAChangeRoute = false;

      const response = generateEnterBrokerAddressManuallyUrl(referenceNumber, isAChangeRoute);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`;

      expect(response).toEqual(expected);
    });
  });
});
