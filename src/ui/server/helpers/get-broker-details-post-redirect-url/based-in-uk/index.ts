import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { BrokerDetailsRedirectUrlChildParams } from '../../../../types';

const {
  POLICY: { BROKER_ADDRESSES_ROOT, BROKER_ADDRESSES_CHANGE, BROKER_ADDRESSES_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * basedInUkRedirectUrl
 * Get a redirect URL for "Broker details - Based in UK" conditions.
 * @param {String} baseUrl: Base URL, e.g /apply/:referenceNumber
 * @param {Boolean} isAChangeRoute: If the route is a "change" route
 * @param {Boolean} isACheckAndChangeRoute: If the route is a "check and change" route
 * @returns {String} Redirect URL
 */
const basedInUkRedirectUrl = ({ baseUrl, isAChangeRoute, isACheckAndChangeRoute }: BrokerDetailsRedirectUrlChildParams) => {
  if (isAChangeRoute) {
    return `${baseUrl}${BROKER_ADDRESSES_CHANGE}`;
  }

  if (isACheckAndChangeRoute) {
    return `${baseUrl}${BROKER_ADDRESSES_CHECK_AND_CHANGE}`;
  }

  return `${baseUrl}${BROKER_ADDRESSES_ROOT}`;
};

export default basedInUkRedirectUrl;
