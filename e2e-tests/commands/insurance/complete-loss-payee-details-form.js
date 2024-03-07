import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import field from '../../pages/shared/field';

const { LOSS_PAYEE_DETAILS: { NAME, LOCATION, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY } } = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeLossPayeeDetailsForm
 * Complete "loss payee details" form
 * @param {Boolean} name: loss payee name
 * @param {Boolean} locatedInUK: if located in UK radio should be selected
 */
const completeLossPayeeDetailsForm = ({
  name = POLICY[NAME],
  locatedInUK = true,
}) => {
  cy.keyboardInput(field(NAME).input(), name);

  if (locatedInUK) {
    const fieldId = `${LOCATION}-${IS_LOCATED_IN_UK}`;
    field(fieldId).label().click();
  } else {
    const fieldId = `${LOCATION}-${IS_LOCATED_INTERNATIONALLY}`;
    field(fieldId).label().click();
  }
};

export default completeLossPayeeDetailsForm;
