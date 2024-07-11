import { field as fieldSelector, autoCompleteField } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import { EXPECTED_MULTI_LINE_STRING } from '../../../constants';
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
 * @param {String} expectedIban: IBAN
 * @param {String} expectedBicSwiftCode: BIC swift code
 * @param {String} expectedFinancialAddress: Financial address
 */
const assertLossPayeeFinancialInternationalFieldValues = ({
  expectedIban = LOSS_PAYEE_FINANCIAL_INTERNATIONAL[IBAN],
  expectedBicSwiftCode = LOSS_PAYEE_FINANCIAL_INTERNATIONAL[BIC_SWIFT_CODE],
  expectedFinancialAddress = EXPECTED_MULTI_LINE_STRING,
}) => {
  if (expectedIban) {
    cy.checkValue(fieldSelector(IBAN), expectedIban);
  }

  if (expectedBicSwiftCode) {
    cy.checkValue(autoCompleteField(BIC_SWIFT_CODE), expectedBicSwiftCode);
  }

  if (expectedFinancialAddress) {
    cy.checkTextareaValue({
      fieldId: FINANCIAL_ADDRESS,
      expectedValue: expectedFinancialAddress,
    });
  }
};

export default assertLossPayeeFinancialInternationalFieldValues;
