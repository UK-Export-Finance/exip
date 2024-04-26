import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import { EXPECTED_MULTI_LINE_STRING } from '../../constants';

const { LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN } } = POLICY_FIELD_IDS;

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
  financialAddress = EXPECTED_MULTI_LINE_STRING,
}) => {
  cy.completeLossPayeeFinancialDetailsInternationalForm({ bicSwiftCode, iban, financialAddress });
  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeFinancialDetailsInternationalForm;
