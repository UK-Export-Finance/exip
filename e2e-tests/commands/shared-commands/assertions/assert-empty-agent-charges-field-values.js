import { field } from '../../../pages/shared';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { SYMBOLS } from '../../../constants';
import { checkAutocompleteInput } from '../../../shared-test-assertions';

const {
  AGENT_CHARGES: {
    METHOD,
    FIXED_SUM,
    FIXED_SUM_AMOUNT,
    PERCENTAGE,
    PERCENTAGE_CHARGE,
    COUNTRY_CODE,
  },
} = FIELD_IDS;

/**
 * assertEmptyAgentChargesFieldValues
 * Assert all field values in the "agent charges" form are empty.
 */
const assertEmptyAgentChargesFieldValues = () => {
  cy.assertRadioOptionIsNotChecked(field(`${METHOD}-${FIXED_SUM}`).input());
  cy.checkValue(field(FIXED_SUM_AMOUNT), '');

  cy.assertPrefix({ fieldId: FIXED_SUM_AMOUNT, value: SYMBOLS.GBP });

  cy.assertRadioOptionIsNotChecked(field(`${METHOD}-${PERCENTAGE}`).input());
  cy.checkValue(field(PERCENTAGE_CHARGE), '');

  checkAutocompleteInput.checkEmptyResults(COUNTRY_CODE);
};

export default assertEmptyAgentChargesFieldValues;
