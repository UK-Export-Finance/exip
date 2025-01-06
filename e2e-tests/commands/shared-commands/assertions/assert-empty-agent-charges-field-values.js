import { field } from '../../../pages/shared';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { checkAutocompleteInput } from '../../../shared-test-assertions';

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM, PERCENTAGE, PERCENTAGE_CHARGE, COUNTRY_CODE },
} = FIELD_IDS;

/**
 * assertEmptyAgentChargesFieldValues
 * Assert all field values in the "agent charges" form are empty.
 */
const assertEmptyAgentChargesFieldValues = () => {
  cy.assertRadioOptionIsNotChecked(field(`${METHOD}-${FIXED_SUM}`).input());

  cy.assertRadioOptionIsNotChecked(field(`${METHOD}-${PERCENTAGE}`).input());
  cy.assertEmptyFieldValue(PERCENTAGE_CHARGE);

  checkAutocompleteInput.checkEmptyResults(COUNTRY_CODE);
};

export default assertEmptyAgentChargesFieldValues;
