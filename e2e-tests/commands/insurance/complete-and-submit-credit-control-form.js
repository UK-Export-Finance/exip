import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

/**
 * completeAndSubmitCreditControlForm
 * complete and submit the "credit control" form.
 * @param {boolean}: hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input
 */
const completeAndSubmitCreditControlForm = ({ hasCreditControlProcess = true }) => {
  cy.assertPathnameContains(INSURANCE_ROUTES.EXPORTER_BUSINESS.CREDIT_CONTROL);

  if (hasCreditControlProcess) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitCreditControlForm;
