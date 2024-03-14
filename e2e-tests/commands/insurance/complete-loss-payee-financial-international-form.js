import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import field from '../../pages/shared/field';

const { LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN }, FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeLossPayeeFinancialInternationalForm
 * Complete the "loss payee financial details (international)" form
 * @param {String} bicSwiftCode: BIC/Swift value - defaults to application fixture.
 * @param {String} iban: IBAN value - defaults to application fixture.
 * @param {String} financialAddress: financialAddress value - defaults to application fixture.
 */
const completeLossPayeeFinancialInternationalForm = ({
  bicSwiftCode = POLICY.LOSS_PAYEE_FINANCIAL_INERTNATIONAL[BIC_SWIFT_CODE],
  iban = POLICY.LOSS_PAYEE_FINANCIAL_INERTNATIONAL[IBAN],
  financialAddress = POLICY.LOSS_PAYEE_FINANCIAL_INERTNATIONAL[FINANCIAL_ADDRESS],
}) => {
  cy.keyboardInput(field(BIC_SWIFT_CODE).input(), bicSwiftCode);
  cy.keyboardInput(field(IBAN).input(), iban);
  cy.keyboardInput(field(FINANCIAL_ADDRESS).textarea(), financialAddress);
};

export default completeLossPayeeFinancialInternationalForm;
