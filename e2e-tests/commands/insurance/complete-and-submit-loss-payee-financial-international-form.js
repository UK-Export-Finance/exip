import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const { LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE }, FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeAndSubmitLossPayeeFinancialInternationalForm
 * Complete and submit "loss payee bank details (international)" form
 * @param {String} sortCode: sortCode value - defaults to application fixture sort code.
 * @param {String} accountNumber: accountNumber value - defaults to application fixture account number.
 * @param {String} financialAddress: financialAddress value - defaults to application fixture financial address.
 */
const completeAndSubmitLossPayeeFinancialInternationalForm = ({
  sortCode = POLICY.LOSS_PAYEE_FINANCIAL_UK[ACCOUNT_NUMBER],
  accountNumber = POLICY.LOSS_PAYEE_FINANCIAL_UK[SORT_CODE],
  financialAddress = POLICY.LOSS_PAYEE_FINANCIAL_UK[FINANCIAL_ADDRESS],
}) => {
  cy.completeLossPayeeFinancialInternationalForm({ sortCode, accountNumber, financialAddress });
  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeFinancialInternationalForm;
