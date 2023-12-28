import { submitButton } from '../../../pages/shared';

/**
 * completeAndSubmitConnectionToTheBuyerForm
 * Completes and submits the "traded with buyer" form.
 * @param {Object} Object with flags on how to complete the form.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "traded with buyer" radio. Defaults to "no".
 */
const completeAndSubmitTradedWithBuyerForm = ({ exporterHasTradedWithBuyer = false }) => {
  cy.completeTradedWithBuyerForm({ exporterHasTradedWithBuyer });

  submitButton().click();
};

export default completeAndSubmitTradedWithBuyerForm;
