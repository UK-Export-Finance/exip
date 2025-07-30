import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import { ApplicationBroker, ObjectType } from '../../../../types';

const {
  USING_BROKER,
  BROKER_DETAILS: {
    NAME,
    EMAIL,
    IS_BASED_IN_UK,
    BUILDING_NUMBER_OR_NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    POSTCODE,
    BROKER_NAME,
    BROKER_EMAIL,
    BROKER_BUILDING_NUMBER_OR_NAME,
    BROKER_ADDRESS_LINE_1,
    BROKER_ADDRESS_LINE_2,
    BROKER_POSTCODE,
  },
  BROKER_MANUAL_ADDRESS: { BROKER_FULL_ADDRESS, FULL_ADDRESS },
} = POLICY_FIELD_IDS;

/**
 * mapBroker
 * Map the broker to avoid clashes with other fields with the same name
 * e.g name, email, address fields.
 * @param {ApplicationBroker} broker
 * @returns {object} ApplicationBroker with slightly different field IDs
 */
const mapBroker = (broker: ApplicationBroker) => {
  const { isUsingBroker, isBasedInUk, fullAddress } = broker;

  const mapped: ObjectType = {
    id: broker.id,
    [USING_BROKER]: isUsingBroker,
  };

  if (isUsingBroker) {
    mapped[IS_BASED_IN_UK] = isBasedInUk;
    mapped[BROKER_NAME] = broker[NAME];
    mapped[BROKER_EMAIL] = broker[EMAIL];

    if (isBasedInUk && !fullAddress) {
      mapped[BROKER_BUILDING_NUMBER_OR_NAME] = broker[BUILDING_NUMBER_OR_NAME];
      mapped[BROKER_ADDRESS_LINE_1] = broker[ADDRESS_LINE_1];
      mapped[BROKER_ADDRESS_LINE_2] = broker[ADDRESS_LINE_2];
      mapped[BROKER_POSTCODE] = broker[POSTCODE];
    } else {
      mapped[BROKER_FULL_ADDRESS] = broker[FULL_ADDRESS];
    }
  }

  return mapped;
};

export default mapBroker;
