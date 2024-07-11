import { EXPECTED_MULTI_LINE_STRING } from '../../../constants';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';

const {
  AGENT_SERVICE: { SERVICE_DESCRIPTION },
} = FIELD_IDS;

/**
 * assertAgentServiceFieldValues
 * Assert all field values in the "agent service" form.
 * @param {String} expectedDescription: Expected service description
 * @param {String} agentIsCharging: Agent is charging
 */
const assertAgentServiceFieldValues = ({
  expectedDescription = EXPECTED_MULTI_LINE_STRING,
  agentIsCharging = false,
}) => {
  cy.checkTextareaValue({
    fieldId: SERVICE_DESCRIPTION,
    expectedValue: expectedDescription,
  });

  if (agentIsCharging) {
    cy.assertYesRadioOptionIsChecked();
  } else {
    cy.assertNoRadioOptionIsChecked();
  }
};

export default assertAgentServiceFieldValues;
