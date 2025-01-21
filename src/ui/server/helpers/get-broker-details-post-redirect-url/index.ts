import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import isChangeRoute from '../is-change-route';
import isCheckAndChangeRoute from '../is-check-and-change-route';
import brokerDetailsDataChangeFlags from '../broker-details-data-change-flags';
import basedInUkRedirectUrl from './based-in-uk';
import notBasedInUkRedirectUrl from './not-based-in-uk';
import { BrokerDetailsRedirectUrlParams } from '../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const { IS_BASED_IN_UK } = POLICY_FIELD_IDS.BROKER_DETAILS;

/**
 * getBrokerDetailsPostRedirectUrl
 * Get a redirect URL for the "Broker details" POST controller.
 * @param {Number} referenceNumber: Application reference number
 * @param {String} originalUrl: Original URL
 * @param {RequestBody} formBody: Form body
 * @param {ApplicationBroker} brokerData: Application Broker data
 * @returns {Object} Application
 */
const getBrokerDetailsPostRedirectUrl = ({ referenceNumber, originalUrl, formBody, brokerData }: BrokerDetailsRedirectUrlParams) => {
  const baseUrl = `${INSURANCE_ROOT}/${referenceNumber}`;

  const isBasedInUk = formBody[IS_BASED_IN_UK] === 'true';
  const isNotBasedInUk = formBody[IS_BASED_IN_UK] === 'false';

  const isAChangeRoute = isChangeRoute(originalUrl);
  const isACheckAndChangeRoute = isCheckAndChangeRoute(originalUrl);

  const { postcodeOrBuildingNumberNameHasChanged, manualAddressRequired } = brokerDetailsDataChangeFlags(formBody, brokerData);

  if (isBasedInUk) {
    return basedInUkRedirectUrl({
      baseUrl,
      isAChangeRoute,
      isACheckAndChangeRoute,
      postcodeOrBuildingNumberNameHasChanged,
    });
  }

  if (isNotBasedInUk) {
    return notBasedInUkRedirectUrl({
      baseUrl,
      isAChangeRoute,
      isACheckAndChangeRoute,
      manualAddressRequired,
    });
  }

  return `${baseUrl}${BROKER_MANUAL_ADDRESS_ROOT}`;
};

export default getBrokerDetailsPostRedirectUrl;
