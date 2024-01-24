import { noRadioInput, yesRadioInput } from '../../pages/shared';

/**
 * completeAndSubmitAnotherCompanyForm
 * Complete and submit the "Another company" form
 * @param {Boolean} otherCompanyInvolved: Flag for if another company is involved. If true, submit yes. Otherwise, no.
 */
const completeAndSubmitAnotherCompanyForm = ({ otherCompanyInvolved = false }) => {
  if (otherCompanyInvolved) {
    yesRadioInput().click();
  } else {
    noRadioInput().click();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitAnotherCompanyForm;
