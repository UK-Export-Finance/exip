import { yesRadioInput, noRadioInput } from '../../../pages/shared';

/**
 * completeBuyerFinancialInformationForm
 * Completes the "buyer financial information" form.
 * @param {Object} Object with flags on how to complete the form.
 * - exporterHasBuyerFinancialAccounts: Should submit "yes" to "buyer financial information" radio. Defaults to "no".
 */
const completeBuyerFinancialInformationForm = ({ exporterHasBuyerFinancialAccounts = false }) => {
  if (exporterHasBuyerFinancialAccounts) {
    yesRadioInput().click();
  } else {
    noRadioInput().click();
  }
};

export default completeBuyerFinancialInformationForm;
