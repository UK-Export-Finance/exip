import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

/**
 * completeAndSubmitAnotherCompanyForm
 * Complete and submit the "Another company" form
 * @param {boolean} otherCompanyInvolved: Flag for if another company is involved. If true, submit yes. Otherwise, no.
 */
const completeAndSubmitAnotherCompanyForm = ({ otherCompanyInvolved = false }) => {
  cy.assertPathnameContains(INSURANCE_ROUTES.POLICY.ANOTHER_COMPANY);

  if (otherCompanyInvolved) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitAnotherCompanyForm;
