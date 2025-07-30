import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import application from '../../../fixtures/application';

const { TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = FIELD_IDS;

const { BUYER } = application;

/**
 * completeAndSubmitOutstandingOrOverduePaymentsForm
 * Complete and submit the "outstanding or overdue payments" form
 * @param {string} amountOverDue: enter the amount overdue - defaults to BUYER[TOTAL_AMOUNT_OVERDUE]
 * @param {string} totalOutstanding: enter the total outstanding - defaults to BUYER[TOTAL_OUTSTANDING_PAYMENTS]
 */
const completeAndSubmitOutstandingOrOverduePaymentsForm = ({
  amountOverDue = BUYER[TOTAL_AMOUNT_OVERDUE],
  totalOutstanding = BUYER[TOTAL_OUTSTANDING_PAYMENTS],
}) => {
  cy.completeOutstandingOrOverduePaymentsForm({
    amountOverDue,
    totalOutstanding,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitOutstandingOrOverduePaymentsForm;
