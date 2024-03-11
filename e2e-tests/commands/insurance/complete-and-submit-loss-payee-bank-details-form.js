import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const { LOSS_PAYEE_UK_BANK_DETAILS: { ACCOUNT_NUMBER, SORT_CODE }, BANK_ADDRESS } = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeAndSubmitLossPayeeBankDetailsForm
 * Complete and submit "loss payee bank details" form
 * @param {String} sortCode: sortCode value - defaults to application fixture sort code.
 * @param {String} accountNumber: accountNumber value - defaults to application fixture account number.
 * @param {String} bankAddress: bankAddress value - defaults to application fixture bank address.
 */
const completeAndSubmitLossPayeeBankDetailsForm = ({
  sortCode = POLICY[ACCOUNT_NUMBER],
  accountNumber = POLICY[SORT_CODE],
  bankAddress = POLICY[BANK_ADDRESS],
}) => {
  cy.completeLossPayeeBankDetailsForm({ sortCode, accountNumber, bankAddress });
  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeBankDetailsForm;
