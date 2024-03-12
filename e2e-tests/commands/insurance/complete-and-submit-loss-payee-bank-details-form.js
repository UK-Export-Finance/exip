import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const { LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE }, BANK_ADDRESS } = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeAndSubmitLossPayeeBankDetailsForm
 * Complete and submit "loss payee bank details" form
 * @param {String} sortCode: sortCode value - defaults to application fixture sort code.
 * @param {String} accountNumber: accountNumber value - defaults to application fixture account number.
 * @param {String} bankAddress: bankAddress value - defaults to application fixture bank address.
 */
const completeAndSubmitLossPayeeBankDetailsForm = ({
  sortCode = POLICY.LOSS_PAYEE_FINANCIAL_UK[ACCOUNT_NUMBER],
  accountNumber = POLICY.LOSS_PAYEE_FINANCIAL_UK[SORT_CODE],
  bankAddress = POLICY.LOSS_PAYEE_FINANCIAL_UK[BANK_ADDRESS],
}) => {
  cy.completeLossPayeeBankDetailsForm({ sortCode, accountNumber, bankAddress });
  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeBankDetailsForm;
