import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

/**
 * completeAndSubmitLossPayeeForm
 * Complete and submit "loss payee" form
 * @param {boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee". Defaults to false.
 */
const completeAndSubmitLossPayeeForm = ({ isAppointingLossPayee = false }) => {
  cy.assertPathnameContains(INSURANCE_ROUTES.POLICY.LOSS_PAYEE_ROOT);

  if (isAppointingLossPayee) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeForm;
