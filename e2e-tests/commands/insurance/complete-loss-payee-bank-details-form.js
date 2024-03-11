import application from '../../fixtures/application';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import field from '../../pages/shared/field';

const { LOSS_PAYEE_UK_BANK_DETAILS: { ACCOUNT_NUMBER, SORT_CODE }, BANK_ADDRESS } = POLICY_FIELD_IDS;

const { POLICY } = application;

/**
 * completeLossPayeeBankDetailsForm
 * Complete "loss payee bank details" form
 * @param {String} sortCode: sortCode value - defaults to application fixture sort code.
 * @param {String} accountNumber: accountNumber value - defaults to application fixture account number.
 * @param {String} bankAddress: bankAddress value - defaults to application fixture bank address.
 */
const completeLossPayeeBankDetailsForm = ({
  sortCode = POLICY[ACCOUNT_NUMBER],
  accountNumber = POLICY[SORT_CODE],
  bankAddress = POLICY[BANK_ADDRESS],
}) => {
  cy.keyboardInput(field(ACCOUNT_NUMBER).input(), accountNumber);
  cy.keyboardInput(field(SORT_CODE).input(), sortCode);
  cy.keyboardInput(field(BANK_ADDRESS).textarea(), bankAddress);
};

export default completeLossPayeeBankDetailsForm;
