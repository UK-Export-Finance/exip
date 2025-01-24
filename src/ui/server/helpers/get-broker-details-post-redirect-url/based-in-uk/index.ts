import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { BrokerDetailsBasedInUkRedirectUrlParams } from '../../../../types';

const {
  POLICY: { BROKER_ADDRESSES_ROOT, BROKER_ADDRESSES_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

/**
 * basedInUkRedirectUrl
 * Get a redirect URL for "Broker details - Based in UK" conditions.
 * @param {String} baseUrl: Base URL, e.g /apply/:referenceNumber
 * @param {Boolean} isAChangeRoute: If the route is a "change" route
 * @param {Boolean} isACheckAndChangeRoute: If the route is a "check and change" route
 * @param {Boolean} postcodeOrBuildingNumberNameHasChanged: If postcode/building number has changed
 * @returns {String} Redirect URL
 */
const basedInUkRedirectUrl = ({
  baseUrl,
  isAChangeRoute,
  isACheckAndChangeRoute,
  postcodeOrBuildingNumberNameHasChanged,
}: BrokerDetailsBasedInUkRedirectUrlParams) => {
  if (isAChangeRoute) {
    return postcodeOrBuildingNumberNameHasChanged ? `${baseUrl}${BROKER_ADDRESSES_CHANGE}` : `${baseUrl}${CHECK_YOUR_ANSWERS}`;
  }

  if (isACheckAndChangeRoute) {
    return `${baseUrl}${CHECK_AND_CHANGE_ROUTE}`;
  }

  return `${baseUrl}${BROKER_ADDRESSES_ROOT}`;
};

export default basedInUkRedirectUrl;
