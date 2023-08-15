import { submitButton } from '../../pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../constants';

export default () => {
  cy.completeCompanyDetailsForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER });

  submitButton().click();
};
