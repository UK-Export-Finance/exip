import { yesRadioInput, noRadioInput } from '../../../pages/shared';

/**
 * completeTradedWithBuyerForm
 * Completes the "traded with buyer" form.
 * @param {Object} Object with flags on how to complete the form.
 * - hasTradedWithBuyer: Should submit "yes" to "traded with buyer" radio. Defaults to "no".
 */
const completeTradedWithBuyerForm = ({ hasTradedWithBuyer = false }) => {
  if (hasTradedWithBuyer) {
    yesRadioInput().click();
  } else {
    noRadioInput().click();
  }
};

export default completeTradedWithBuyerForm;
