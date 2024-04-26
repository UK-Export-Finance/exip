import { field as fieldSelector, autoCompleteField } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../fixtures/application';
import { EXPECTED_MULTI_LINE_STRING } from '../../../constants';

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
 * @param {String} expectedFinancialAddress: Financial address
 */
const assertLossPayeeFinancialUkFieldValues = ({
  expectedAccountNumber = LOSS_PAYEE_FINANCIAL_UK[ACCOUNT_NUMBER],
  expectedSortCode = LOSS_PAYEE_FINANCIAL_UK[SORT_CODE],
  expectedFinancialAddress = EXPECTED_MULTI_LINE_STRING,
}) => {
  cy.checkValue(fieldSelector(ACCOUNT_NUMBER), expectedAccountNumber);
  cy.checkValue(autoCompleteField(SORT_CODE), expectedSortCode);
  cy.checkTextareaValue({
    fieldId: FINANCIAL_ADDRESS,
    expectedValue: expectedFinancialAddress,
  });
};

export default assertLossPayeeFinancialUkFieldValues;
