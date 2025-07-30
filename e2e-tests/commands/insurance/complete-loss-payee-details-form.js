import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import field from '../../pages/shared/field';
import { radios } from '../../pages/shared';

const {
  LOSS_PAYEE_DETAILS: { NAME, LOCATION, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY },
} = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeLossPayeeDetailsForm
 * Complete "loss payee details" form
 * @param {boolean} name: loss payee name
 * @param {boolean} locatedInUK: if located in UK radio should be selected
 */
const completeLossPayeeDetailsForm = ({ name = POLICY[NAME], locatedInUK = true }) => {
  cy.keyboardInput(field(NAME).input(), name);

  if (locatedInUK) {
    const fieldId = `${LOCATION}-${IS_LOCATED_IN_UK}`;
    radios(fieldId).option.label().click();
  } else {
    const fieldId = `${LOCATION}-${IS_LOCATED_INTERNATIONALLY}`;
    radios(fieldId).option.label().click();
  }
};

export default completeLossPayeeDetailsForm;
