import { field } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_DETAILS: { NAME, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY },
} = POLICY_FIELD_IDS;

/**
 * assertEmptyLossPayeeDetailsFieldValues
 * Assert all field values in the "loss payee details" form are empty.
 */
const assertEmptyLossPayeeDetailsFieldValues = () => {
  cy.checkValue(field(NAME), '');

  cy.assertRadioOptionIsNotChecked(field(`location-${IS_LOCATED_IN_UK}`).input());
  cy.assertRadioOptionIsNotChecked(field(`location-${IS_LOCATED_INTERNATIONALLY}`).input());
};

export default assertEmptyLossPayeeDetailsFieldValues;
