import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const { LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN }, FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const { POLICY } = application;
/**
 * completeAndSubmitLossPayeeFinancialDetailsInternationalForm
 * Complete and submit "loss payee bank details (international)" form
 * @param {String} bicSwiftCode: BIC/Swift value - defaults to application fixture.
 * @param {String} iban: IBAN value - defaults to application fixture.
 * @param {String} financialAddress: financialAddress value - defaults to application fixture.
 */
const completeAndSubmitLossPayeeFinancialDetailsInternationalForm = ({
  bicSwiftCode = POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[BIC_SWIFT_CODE],
  iban = POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[IBAN],
  financialAddress = POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[FINANCIAL_ADDRESS],
}) => {
  cy.completeLossPayeeFinancialDetailsInternationalForm({ bicSwiftCode, iban, financialAddress });
  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeFinancialDetailsInternationalForm;
