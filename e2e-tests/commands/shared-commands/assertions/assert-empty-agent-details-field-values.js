import { field } from '../../../pages/shared';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { checkAutocompleteInput } from '../../../shared-test-assertions';

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

/**
 * assertEmptyAgentDetailsFieldValues
 * Assert all field values in the "agent details" form are empty.
 */
const assertEmptyAgentDetailsFieldValues = () => {
  cy.checkValue(field(NAME), '');

  cy.checkTextareaValue({
    fieldId: FULL_ADDRESS,
    expectedValue: '',
  });

  checkAutocompleteInput.checkEmptyResults(COUNTRY_CODE);
};

export default assertEmptyAgentDetailsFieldValues;
