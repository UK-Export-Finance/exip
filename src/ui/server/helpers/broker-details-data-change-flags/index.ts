import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { ApplicationBroker, RequestBody } from '../../../types';
import { isEmptyString } from '../string';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

/**
 * brokerDetailsDataChangeFlags
 * Check the state of a form body VS the saved broker data.
 * The request body is expected to be posted from the "broker details" form.
 * Depending on the checks, return certain flags to assist with redirection.
 * @param {RequestBody} formBody: Form body
 * @param {ApplicationBroker} brokerData: Saved broker data
 * @returns {Object}
 */
const brokerDetailsDataChangeFlags = (formBody: RequestBody, brokerData: ApplicationBroker) => {
  let postcodeOrBuildingNumberNameHasChanged = false;
  let manualAddressRequired = false;

  const isBasedInUk = formBody[IS_BASED_IN_UK] === 'true';
  const isNotBasedInUk = formBody[IS_BASED_IN_UK] === 'false';

  if (isBasedInUk) {
    const postcodeHasChanged = formBody[POSTCODE] !== brokerData[POSTCODE];
    const buildingNumberOrNameHasChanged = formBody[BUILDING_NUMBER_OR_NAME] !== brokerData[BUILDING_NUMBER_OR_NAME];

    postcodeOrBuildingNumberNameHasChanged = postcodeHasChanged || buildingNumberOrNameHasChanged;
  }

  if (isNotBasedInUk) {
    manualAddressRequired = isEmptyString(brokerData[FULL_ADDRESS]);
  }

  return {
    postcodeOrBuildingNumberNameHasChanged,
    manualAddressRequired,
  };
};

export default brokerDetailsDataChangeFlags;
