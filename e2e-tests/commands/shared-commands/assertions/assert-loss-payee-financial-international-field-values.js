import { field as fieldSelector, autoCompleteField } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../fixtures/application';

const { LOSS_PAYEE_FINANCIAL_INTERNATIONAL } = mockApplication.POLICY;

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    BIC_SWIFT_CODE, IBAN,
  },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

/**
 * assertLossPayeeFinancialInternationalFieldValues
 * Assert all field values in the "loss payee financial international" form.
 * @param {String} expectedAccountNumber: Account number
 * @param {String} expectedSortCode: Sort code
 * @param {String} expectedFinancialAddress: Financial address
 */
const assertLossPayeeFinancialInternationalFieldValues = ({
  expectedIban = LOSS_PAYEE_FINANCIAL_INTERNATIONAL[IBAN],
  expectedBicSwiftCode = LOSS_PAYEE_FINANCIAL_INTERNATIONAL[BIC_SWIFT_CODE],
  expectedFinancialAddress = LOSS_PAYEE_FINANCIAL_INTERNATIONAL[FINANCIAL_ADDRESS],
}) => {
  cy.checkValue(fieldSelector(IBAN), expectedIban);
  cy.checkValue(autoCompleteField(BIC_SWIFT_CODE), expectedBicSwiftCode);
  cy.checkTextareaValue({
    fieldId: FINANCIAL_ADDRESS,
    expectedValue: expectedFinancialAddress,
  });
};

export default assertLossPayeeFinancialInternationalFieldValues;
