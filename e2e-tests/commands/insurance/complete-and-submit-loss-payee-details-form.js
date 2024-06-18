import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const { LOSS_PAYEE_DETAILS: { NAME } } = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeAndSubmitLossPayeeDetailsForm
 * Complete and submit "loss payee details" form
 * @param {Boolean} name: loss payee name
 * @param {Boolean} locatedInUK: if located in UK radio should be selected
 */
const completeAndSubmitLossPayeeDetailsForm = ({
  name = POLICY[NAME],
  locatedInUK = true,
}) => {
  cy.completeLossPayeeDetailsForm({ name, locatedInUK });

  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeDetailsForm;
