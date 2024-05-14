import { field as fieldSelector, autoCompleteField } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_UK: {
    ACCOUNT_NUMBER, SORT_CODE,
  },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

/**
 * assertEmptyLossPayeeFinancialUkFieldValues
 * Assert all field values in the "loss payee financial uk" form are empty.
 */
const assertEmptyLossPayeeFinancialUkFieldValues = () => {
  cy.checkValue(fieldSelector(ACCOUNT_NUMBER), '');

  cy.checkValue(autoCompleteField(SORT_CODE), '');

  cy.checkTextareaValue({
    fieldId: FINANCIAL_ADDRESS,
    expectedValue: '',
  });
};

export default assertEmptyLossPayeeFinancialUkFieldValues;
