import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { BrokerDetailsNotBasedInUkRedirectUrlParams } from '../../../../types';

const {
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT, BROKER_MANUAL_ADDRESS_CHANGE, BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

/**
 * notBasedInUkRedirectUrl
 * Get a redirect URL for "Broker details - Not based in UK" conditions.
 * @param {String} baseUrl: Base URL, e.g /apply/:referenceNumber
 * @param {Boolean} isAChangeRoute: If the route is a "change" route
 * @param {Boolean} isACheckAndChangeRoute: If the route is a "check and change" route
 * @param {Boolean} manualAddressRequired: If a manual address is required
 * @returns {String} Redirect URL
 */
const notBasedInUkRedirectUrl = ({ baseUrl, isAChangeRoute, isACheckAndChangeRoute, manualAddressRequired }: BrokerDetailsNotBasedInUkRedirectUrlParams) => {
  if (isAChangeRoute) {
    return manualAddressRequired ? `${baseUrl}${BROKER_MANUAL_ADDRESS_CHANGE}` : `${baseUrl}${CHECK_YOUR_ANSWERS}`;
  }

  if (isACheckAndChangeRoute) {
    return manualAddressRequired ? `${baseUrl}${BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE}` : `${baseUrl}${CHECK_AND_CHANGE_ROUTE}`;
  }

  return `${baseUrl}${BROKER_MANUAL_ADDRESS_ROOT}`;
};

export default notBasedInUkRedirectUrl;
