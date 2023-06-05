import { submitButton } from '../../e2e/pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../../constants';

export default () => {
  cy.completeCompanyDetailsForm(COMPANIES_HOUSE_NUMBER);

  submitButton().click();
};
