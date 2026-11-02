import { ROUTES } from '../../../constants';

const {
  YOUR_BUYER: { TRADED_WITH_BUYER },
} = ROUTES.INSURANCE;

/**
 * completeTradedWithBuyerForm
 * Completes the "traded with buyer" form.
 * @param {object} Object with flags on how to complete the form.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "traded with buyer" radio. Defaults to false.
 */
const completeTradedWithBuyerForm = ({ exporterHasTradedWithBuyer = false }) => {
  cy.assertPathnameContains(TRADED_WITH_BUYER);
  if (exporterHasTradedWithBuyer) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeTradedWithBuyerForm;
