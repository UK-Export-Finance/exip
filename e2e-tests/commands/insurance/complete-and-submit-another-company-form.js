import { noRadioInput } from '../../pages/shared';

/**
 * completeAndSubmitAnotherCompanyForm
 * Complete and submit the "Another company" form
 */
const completeAndSubmitAnotherCompanyForm = () => {
  noRadioInput().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitAnotherCompanyForm;
