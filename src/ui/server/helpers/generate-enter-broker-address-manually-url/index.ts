import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT, BROKER_MANUAL_ADDRESS_CHANGE },
} = INSURANCE_ROUTES;

/**
 * generateEnterBrokerAddressManuallyUrl
 * If the route is a "change" route,
 * the "enter address manually" link/URL should link to the BROKER_MANUAL_ADDRESS_CHANGE. Otherwise, BROKER_MANUAL_ADDRESS.
 * Otherwise, during the "change your answers" journey, a user would not be immediately taken back to "check your answers"
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} isAChangeRoute: If the last part of a string/URL is 'change'
 * Generate a URL for a "enter broker address manually" link
 */
const generateEnterBrokerAddressManuallyUrl = (referenceNumber: number, isAChangeRoute: boolean) => {
  let url = `${INSURANCE_ROOT}/${referenceNumber}`;

  if (isAChangeRoute) {
    url += BROKER_MANUAL_ADDRESS_CHANGE;
  } else {
    url += BROKER_MANUAL_ADDRESS_ROOT;
  }

  return url;
};

export default generateEnterBrokerAddressManuallyUrl;
