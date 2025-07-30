import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { BrokerDetailsNotBasedInUkRedirectUrlParams } from '../../../../types';

const {
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT, BROKER_MANUAL_ADDRESS_CHANGE, BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

/**
 * notBasedInUkRedirectUrl
 * Get a redirect URL for "Broker details - Not based in UK" conditions.
 * @param {string} baseUrl: Base URL, e.g /apply/:referenceNumber
 * @param {boolean} isAChangeRoute: If the route is a "change" route
 * @param {boolean} isACheckAndChangeRoute: If the route is a "check and change" route
 * @param {boolean} manualAddressRequired: If a manual address is required
 * @returns {string} Redirect URL
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
