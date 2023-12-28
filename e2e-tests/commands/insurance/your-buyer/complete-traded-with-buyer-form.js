import { yesRadioInput, noRadioInput } from '../../../pages/shared';

/**
 * completeTradedWithBuyerForm
 * Completes the "traded with buyer" form.
 * @param {Object} Object with flags on how to complete the form.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "traded with buyer" radio. Defaults to "no".
 */
const completeTradedWithBuyerForm = ({ exporterHasTradedWithBuyer = false }) => {
  if (exporterHasTradedWithBuyer) {
    yesRadioInput().click();
  } else {
    noRadioInput().click();
  }
};

export default completeTradedWithBuyerForm;
