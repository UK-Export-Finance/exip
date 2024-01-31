import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import application from '../../../fixtures/application';

const { TOTAL_OUTSTANDING, AMOUNT_OVERDUE } = FIELD_IDS;

const { BUYER } = application;

/**
 * completeAndSubmitTradingHistoryWithBuyerForm
 * Complete and submit the "trading history with buyer" form
 * @param {Boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 * @param {Boolean} failedToPay: Buyer has failed to pay the exporter on the time
 * @param {String} amountOverDue: enter the amount overdue - default to application value
 * @param {String} totalOutstanding: enter the total outstanding - default to application value
 */
const completeAndSubmitTradingHistoryWithBuyerForm = ({
  outstandingPayments = false, failedToPay = false, amountOverDue = BUYER[AMOUNT_OVERDUE], totalOutstanding = BUYER[TOTAL_OUTSTANDING],
}) => {
  cy.completeTradingHistoryWithBuyerForm({
    outstandingPayments, failedToPay, amountOverDue, totalOutstanding,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitTradingHistoryWithBuyerForm;
