import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { BrokerDetailsRedirectUrlChildParams } from '../../../../types';

const {
  POLICY: { BROKER_ADDRESSES_ROOT, BROKER_ADDRESSES_CHANGE, BROKER_ADDRESSES_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * basedInUkRedirectUrl
 * Get a redirect URL for "Broker details - Based in UK" conditions.
 * @param {string} baseUrl: Base URL, e.g /apply/:referenceNumber
 * @param {boolean} isAChangeRoute: If the route is a "change" route
 * @param {boolean} isACheckAndChangeRoute: If the route is a "check and change" route
 * @returns {string} Redirect URL
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
