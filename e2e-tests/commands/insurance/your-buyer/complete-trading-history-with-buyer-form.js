import { yesRadioInput, noRadioInput } from '../../../pages/shared';

/**
 * completeTradingHistoryWithBuyerForm
 * Complete the "trading history with buyer" form
 * @param {Boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 * @param {Boolean} failedToPay: Buyer has failed to pay the exporter on the time
 */
const completeTradingHistoryWithBuyerForm = ({ outstandingPayments = false, failedToPay = false }) => {
  if (outstandingPayments) {
    yesRadioInput().first().click();
  } else {
    noRadioInput().first().click();
  }

  if (failedToPay) {
    yesRadioInput().last().click();
  } else {
    noRadioInput().last().click();
  }
};

export default completeTradingHistoryWithBuyerForm;
