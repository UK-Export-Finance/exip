import { FIELD_IDS } from '../../../constants';
import { workingWithBuyerPage } from '../../../pages/insurance/your-buyer';
import { submitButton } from '../../../pages/shared';

const {
  WORKING_WITH_BUYER: {
    TRADED_WITH_BUYER,
  },
} = FIELD_IDS.INSURANCE.YOUR_BUYER;

/**
 * completeAndSubmitWorkingWithBuyerForm
 * Completes and submits the "working with buyer" form.
 * @param {Object} Object with flags on how to complete the form.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" form. Defaults to "yes".
 */
export default ({ exporterHasTradedWithBuyer = true }) => {
  if (exporterHasTradedWithBuyer) {
    workingWithBuyerPage[TRADED_WITH_BUYER].yesRadioInput().click();
  } else {
    workingWithBuyerPage[TRADED_WITH_BUYER].noRadioInput().click();
  }

  submitButton().click();
};
