import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

/**
 * assertEmptyLossPayeeFinancialInternationalFieldValues
 * Assert all field values in the "loss payee financial international" form are empty.
 */
const assertEmptyLossPayeeFinancialInternationalFieldValues = () => {
  cy.assertEmptyFieldValue(IBAN);

  cy.assertEmptyAutocompleteFieldValue(BIC_SWIFT_CODE);

  cy.checkTextareaValue({
    fieldId: FINANCIAL_ADDRESS,
    expectedValue: '',
  });
};

export default assertEmptyLossPayeeFinancialInternationalFieldValues;
