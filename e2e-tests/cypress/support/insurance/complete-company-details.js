import { companyDetails } from '../../e2e/pages/your-business';
import { submitButton, yesRadioInput } from '../../e2e/pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../../constants';

export default () => {
  companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
  yesRadioInput().first().click();
  yesRadioInput().eq(1).click();
  submitButton().click();
};
