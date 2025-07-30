import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const {
  FINANCIAL_ADDRESS,
  LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE },
} = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeAndSubmitLossPayeeFinancialDetailsUkForm
 * Complete and submit "loss payee financial details (UK)" form
 * @param {string} sortCode: sortCode value - defaults to application fixture sort code.
 * @param {string} accountNumber: accountNumber value - defaults to application fixture account number.
 * @param {string} financialAddress: financialAddress value - defaults to application fixture financial address.
 */
const completeAndSubmitLossPayeeFinancialDetailsUkForm = ({
  accountNumber = POLICY.LOSS_PAYEE_FINANCIAL_UK[ACCOUNT_NUMBER],
  sortCode = POLICY.LOSS_PAYEE_FINANCIAL_UK[SORT_CODE],
  financialAddress = POLICY.LOSS_PAYEE_FINANCIAL_UK[FINANCIAL_ADDRESS],
}) => {
  cy.completeLossPayeeFinancialDetailsUkForm({ sortCode, accountNumber, financialAddress });
  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeFinancialDetailsUkForm;
