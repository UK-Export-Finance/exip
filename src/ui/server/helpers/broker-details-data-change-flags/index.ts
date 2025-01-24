import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { isEmptyString } from '../string';
import { ApplicationBroker, RequestBody } from '../../../types';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME },
} = POLICY_FIELD_IDS;

interface BrokerDetailsDataChangeFlagsParams {
  postcodeOrBuildingNumberNameHasChanged: boolean;
  manualAddressRequired: boolean;
}

/**
 * brokerDetailsDataChangeFlags
 * Check the state of a form body VS the saved broker data.
 * The request body is expected to be posted from the "broker details" form.
 * Depending on the checks, return certain flags to assist with redirection.
 * @param {RequestBody} formBody: Form body
 * @param {ApplicationBroker} brokerData: Saved broker data
 * @returns {BrokerDetailsDataChangeFlagsParams}
 */
const brokerDetailsDataChangeFlags = (formBody: RequestBody, brokerData: ApplicationBroker): BrokerDetailsDataChangeFlagsParams => {
  let postcodeOrBuildingNumberNameHasChanged = false;
  let manualAddressRequired = false;

  const isBasedInUk = formBody[IS_BASED_IN_UK] === 'true';

  if (isBasedInUk) {
    const postcodeHasChanged = formBody[POSTCODE] !== brokerData[POSTCODE];
    const buildingNumberOrNameHasChanged = formBody[BUILDING_NUMBER_OR_NAME] !== brokerData[BUILDING_NUMBER_OR_NAME];

    postcodeOrBuildingNumberNameHasChanged = postcodeHasChanged || buildingNumberOrNameHasChanged;
  }

  if (!isBasedInUk) {
    manualAddressRequired = isEmptyString(brokerData[POSTCODE]);
  }

  return {
    postcodeOrBuildingNumberNameHasChanged,
    manualAddressRequired,
  };
};

export default brokerDetailsDataChangeFlags;
