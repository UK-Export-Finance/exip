import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * generateUseDifferentBrokerAddressUrl
 * If the route is a "change" route, the URL should be BROKER_DETAILS_CHANGE.
 * If the route is a "check-and-change" route, the URL should be BROKER_DETAILS_CHECK_AND_CHANGE.
 * Otherwise, BROKER_DETAILS.
 * Without this, during the "change your answers" journey, a user would not be immediately taken back to "check your answers"
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} isAChangeRoute: If the last part of a string/URL is 'change'
 * @param {boolean} isACheckAndChangeRoute: If the last part of a string/URL is 'check-and-change'
 * @return {string} "Use a different broker address" URL
 */
const generateUseDifferentBrokerAddressUrl = (referenceNumber: number, isAChangeRoute: boolean, isACheckAndChangeRoute: boolean) => {
  let url = `${INSURANCE_ROOT}/${referenceNumber}`;

  if (isAChangeRoute) {
    url += BROKER_DETAILS_CHANGE;

    return url;
  }

  if (isACheckAndChangeRoute) {
    url += BROKER_DETAILS_CHECK_AND_CHANGE;

    return url;
  }

  url += BROKER_DETAILS_ROOT;

  return url;
};

export default generateUseDifferentBrokerAddressUrl;
