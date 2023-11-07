import { submitButton } from '../../pages/shared';

export default () => {
  cy.completeCompanyDetailsForm({});

  submitButton().click();
};
