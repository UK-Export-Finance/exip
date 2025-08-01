import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import field from '../../pages/shared/field';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeLossPayeeFinancialDetailsInternationalForm
 * Complete the "loss payee financial details (international)" form
 * @param {string} bicSwiftCode: BIC/Swift value - defaults to application fixture.
 * @param {string} iban: IBAN value - defaults to application fixture.
 * @param {string} financialAddress: financialAddress value - defaults to application fixture.
 * @param {boolean} clearInputs: Clear all inputs before submitting new values
 */
const completeLossPayeeFinancialDetailsInternationalForm = ({
  bicSwiftCode = POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[BIC_SWIFT_CODE],
  iban = POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[IBAN],
  financialAddress = POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[FINANCIAL_ADDRESS],
  clearInputs = false,
}) => {
  if (clearInputs) {
    field(BIC_SWIFT_CODE).input().clear();
    field(IBAN).input().clear();
    field(FINANCIAL_ADDRESS).textarea().clear();
  }

  if (bicSwiftCode) {
    cy.keyboardInput(field(BIC_SWIFT_CODE).input(), bicSwiftCode);
  }

  if (iban) {
    cy.keyboardInput(field(IBAN).input(), iban);
  }

  if (financialAddress) {
    cy.keyboardInput(field(FINANCIAL_ADDRESS).textarea(), financialAddress);
  }
};

export default completeLossPayeeFinancialDetailsInternationalForm;
