import { field } from '../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import application from '../../../fixtures/application';

const { TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = FIELD_IDS;

const { BUYER } = application;

/**
 * completeOutstandingOrOverduePaymentsForm
 * Complete the "outstanding or overdue payments" form
 * @param {String} amountOverDue: enter the amount overdue - default to application value
 * @param {String} totalOutstanding: enter the total outstanding - default to application value
 */
const completeOutstandingOrOverduePaymentsForm = ({ amountOverDue = BUYER[TOTAL_AMOUNT_OVERDUE], totalOutstanding = BUYER[TOTAL_OUTSTANDING_PAYMENTS] }) => {
  cy.keyboardInput(field(TOTAL_AMOUNT_OVERDUE).input(), amountOverDue);
  cy.keyboardInput(field(TOTAL_OUTSTANDING_PAYMENTS).input(), totalOutstanding);
};

export default completeOutstandingOrOverduePaymentsForm;
