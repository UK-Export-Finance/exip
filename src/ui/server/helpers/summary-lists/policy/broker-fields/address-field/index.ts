import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { POLICY as POLICY_ROUTES } from '../../../../../constants/routes/insurance/policy';
import { POLICY_FIELDS } from '../../../../../content-strings/fields/insurance';
import mapBrokerAddressBasedInTheUk from './based-in-the-uk';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import generateChangeLink from '../../../../generate-change-link';
import { ApplicationBroker } from '../../../../../../types';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const { BROKER_CONFIRM_ADDRESS_CHANGE, BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE } = POLICY_ROUTES;

/**
 * brokerAddressField
 * If IS_BASED_IN_UK is true, populate and return UK address field (BROKER_ADDRESSES)
 * If IS_BASED_IN_UK is false, populate and return a non-UK address field (BROKER_MANUAL_ADDRESS)
 * @param {ApplicationBroker} answers: Broker answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {SummaryListItemData} Broker address field
 */
const brokerAddressField = (answers: ApplicationBroker, referenceNumber: number, checkAndChange?: boolean) => {
  let field;
  let fieldValue;
  let href;

  const changeRoute = BROKER_CONFIRM_ADDRESS_CHANGE;
  const checkAndChangeRoute = BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE;

  if (answers[IS_BASED_IN_UK]) {
    field = getFieldById(POLICY_FIELDS.BROKER_ADDRESSES, SELECT_THE_ADDRESS);
    fieldValue = mapBrokerAddressBasedInTheUk(answers);

    href = generateChangeLink(changeRoute, checkAndChangeRoute, `#${SELECT_THE_ADDRESS}-label`, referenceNumber, checkAndChange);
  } else {
    field = getFieldById(POLICY_FIELDS.BROKER_MANUAL_ADDRESS, FULL_ADDRESS);
    fieldValue = answers[FULL_ADDRESS];

    href = generateChangeLink(changeRoute, checkAndChangeRoute, `#${FULL_ADDRESS}-label`, referenceNumber, checkAndChange);
  }

  const groupItem = fieldGroupItem(
    {
      field,
      data: answers,
      href,
      renderChangeLink: true,
    },
    fieldValue,
  );

  return groupItem;
};

export default brokerAddressField;
