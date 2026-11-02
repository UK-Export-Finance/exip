import { ROUTES } from '../../../constants';

const {
  YOUR_BUYER: { FAILED_TO_PAY },
} = ROUTES.INSURANCE;

/**
 * completeFailedToPayForm
 * Complete the "failed to pay" form
 * @param {boolean} failedToPay: Buyer has failed to pay the exporter on the time - defaults to false
 */
const completeFailedToPayForm = ({ failedToPay = false }) => {
  cy.assertPathnameContains(FAILED_TO_PAY);
  if (failedToPay) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeFailedToPayForm;
