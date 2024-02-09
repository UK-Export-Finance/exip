import { field } from '../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import application from '../../../fixtures/application';

const { TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = FIELD_IDS;

const { BUYER } = application;

/**
 * completeTradingHistoryWithBuyerForm
 * Complete the "trading history with buyer" form
 * @param {Boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 * @param {Boolean} failedToPay: Buyer has failed to pay the exporter on the time
 * @param {String} amountOverDue: enter the amount overdue - default to application value
 * @param {String} totalOutstanding: enter the total outstanding - default to application value
 */
const completeTradingHistoryWithBuyerForm = ({
  outstandingPayments = false, failedToPay = false, amountOverDue = BUYER[TOTAL_AMOUNT_OVERDUE], totalOutstanding = BUYER[TOTAL_OUTSTANDING_PAYMENTS],
}) => {
  if (outstandingPayments) {
    cy.clickYesRadioInput(0);

    cy.keyboardInput(field(TOTAL_AMOUNT_OVERDUE).input(), amountOverDue);
    cy.keyboardInput(field(TOTAL_OUTSTANDING_PAYMENTS).input(), totalOutstanding);
  } else {
    cy.clickNoRadioInput();
  }

  if (failedToPay) {
    cy.clickYesRadioInput(1);
  } else {
    cy.clickNoRadioInput(1);
  }
};

export default completeTradingHistoryWithBuyerForm;
