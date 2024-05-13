import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';

const {
  AGENT_SERVICE: { SERVICE_DESCRIPTION },
} = FIELD_IDS;

/**
 * assertEmptyAgentServiceFieldValues
 * Assert all field values in the "agent service" form are empty.
 */
const assertEmptyAgentServiceFieldValues = () => {
  cy.checkTextareaValue({
    fieldId: SERVICE_DESCRIPTION,
    expectedValue: '',
  });

  cy.assertYesRadioOptionIsNotChecked();
  cy.assertNoRadioOptionIsNotChecked();
};

export default assertEmptyAgentServiceFieldValues;
