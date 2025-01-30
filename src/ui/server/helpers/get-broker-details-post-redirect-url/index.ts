import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import isChangeRoute from '../is-change-route';
import isCheckAndChangeRoute from '../is-check-and-change-route';
import basedInUkRedirectUrl from './based-in-uk';
import notBasedInUkRedirectUrl from './not-based-in-uk';
import { BrokerDetailsRedirectUrlParams } from '../../../types';

const { INSURANCE_ROOT } = INSURANCE_ROUTES;

const { IS_BASED_IN_UK } = POLICY_FIELD_IDS.BROKER_DETAILS;

/**
 * getBrokerDetailsPostRedirectUrl
 * Get a redirect URL for the "Broker details" POST controller.
 * @param {Number} referenceNumber: Application reference number
 * @param {String} originalUrl: Original URL
 * @param {RequestBody} formBody: Form body
 * @returns {Object} Application
 */
const getBrokerDetailsPostRedirectUrl = ({ referenceNumber, originalUrl, formBody }: BrokerDetailsRedirectUrlParams) => {
  const baseUrl = `${INSURANCE_ROOT}/${referenceNumber}`;

  const isBasedInUk = formBody[IS_BASED_IN_UK] === 'true';

  const isAChangeRoute = isChangeRoute(originalUrl);
  const isACheckAndChangeRoute = isCheckAndChangeRoute(originalUrl);

  const manualAddressRequired = formBody[IS_BASED_IN_UK] === 'false';

  if (isBasedInUk) {
    return basedInUkRedirectUrl({
      baseUrl,
      isAChangeRoute,
      isACheckAndChangeRoute,
    });
  }

  return notBasedInUkRedirectUrl({
    baseUrl,
    isAChangeRoute,
    isACheckAndChangeRoute,
    manualAddressRequired,
  });
};

export default getBrokerDetailsPostRedirectUrl;
