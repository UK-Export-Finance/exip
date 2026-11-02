import { ROUTES } from '../../../constants';

const {
  YOUR_BUYER: { TRADING_HISTORY },
} = ROUTES.INSURANCE;

/**
 * completeTradingHistoryWithBuyerForm
 * Complete the "trading history with buyer" form
 * @param {boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 */
const completeTradingHistoryWithBuyerForm = ({ outstandingPayments = false }) => {
  cy.assertPathnameContains(TRADING_HISTORY);
  if (outstandingPayments) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeTradingHistoryWithBuyerForm;
