import { field as fieldSelector, autoCompleteField } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../fixtures/application';

const { LOSS_PAYEE_FINANCIAL_UK } = mockApplication.POLICY;

const {
  LOSS_PAYEE_FINANCIAL_UK: {
    ACCOUNT_NUMBER, SORT_CODE,
  },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

/**
 * assertLossPayeeFinancialUkFieldValues
 * Assert all field values in the "loss payee financial uk" form.
 * @param {String} expectedAccountNumber: Account number
 * @param {String} expectedSortCode: Sort code
 * @param {String} expectedBankAddress: Bank address
 */
const assertLossPayeeFinancialUkFieldValues = ({
  expectedAccountNumber = LOSS_PAYEE_FINANCIAL_UK[ACCOUNT_NUMBER],
  expectedSortCode = LOSS_PAYEE_FINANCIAL_UK[SORT_CODE],
  expectedBankAddress = LOSS_PAYEE_FINANCIAL_UK[FINANCIAL_ADDRESS],
}) => {
  cy.checkValue(fieldSelector(ACCOUNT_NUMBER), expectedAccountNumber);
  cy.checkValue(autoCompleteField(SORT_CODE), expectedSortCode);
  cy.checkTextareaValue({
    fieldId: FINANCIAL_ADDRESS,
    expectedValue: expectedBankAddress,
  });
};

export default assertLossPayeeFinancialUkFieldValues;
