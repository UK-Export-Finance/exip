import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import field from '../../pages/shared/field';

const { LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE }, FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeLossPayeeFinancialDetailsUkForm
 * Complete "loss payee financial details (UK)" form
 * @param {String} sortCode: sortCode value - defaults to application fixture.
 * @param {String} accountNumber: accountNumber value - defaults to application fixture.
 * @param {String} financialAddress: financialAddress value - defaults to application fixture.
 * @param {Boolean} clearInputs: Clear all inputs before submitting new values
 */
const completeLossPayeeFinancialDetailsUkForm = ({
  accountNumber = POLICY.LOSS_PAYEE_FINANCIAL_UK[ACCOUNT_NUMBER],
  sortCode = POLICY.LOSS_PAYEE_FINANCIAL_UK[SORT_CODE],
  financialAddress = POLICY.LOSS_PAYEE_FINANCIAL_UK[FINANCIAL_ADDRESS],
  clearInputs = false,
}) => {
  if (clearInputs) {
    field(ACCOUNT_NUMBER).input().clear();
    field(SORT_CODE).input().clear();
    field(FINANCIAL_ADDRESS).textarea().clear();
  }

  if (accountNumber) {
    cy.keyboardInput(field(ACCOUNT_NUMBER).input(), accountNumber);
  }

  if (sortCode) {
    cy.keyboardInput(field(SORT_CODE).input(), sortCode);
  }

  if (financialAddress) {
    cy.keyboardInput(field(FINANCIAL_ADDRESS).textarea(), financialAddress);
  }
};

export default completeLossPayeeFinancialDetailsUkForm;
