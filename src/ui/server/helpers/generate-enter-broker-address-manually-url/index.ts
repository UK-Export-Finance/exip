import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT, BROKER_MANUAL_ADDRESS_CHANGE, BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * generateEnterBrokerAddressManuallyUrl
 * If the route is a "change" route, the URL should be BROKER_MANUAL_ADDRESS_CHANGE.
 * If the route is a "check-and-change" route, the URL should be BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE.
 * Otherwise, BROKER_MANUAL_ADDRESS.
 * Without this, during the "change your answers" journey, a user would not be immediately taken back to "check your answers"
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} isAChangeRoute: If the last part of a string/URL is 'change'
 * @param {Boolean} isACheckAndChangeRoute: If the last part of a string/URL is 'check-and-change'
 * @return {String} "Enter address manually" URL
 */
const generateEnterBrokerAddressManuallyUrl = (referenceNumber: number, isAChangeRoute: boolean, isACheckAndChangeRoute: boolean) => {
  let url = `${INSURANCE_ROOT}/${referenceNumber}`;

  if (isAChangeRoute) {
    url += BROKER_MANUAL_ADDRESS_CHANGE;

    return url;
  }

  if (isACheckAndChangeRoute) {
    url += BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE;

    return url;
  }

  url += BROKER_MANUAL_ADDRESS_ROOT;

  return url;
};

export default generateEnterBrokerAddressManuallyUrl;
