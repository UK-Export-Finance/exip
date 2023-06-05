import { companyDetails } from '../../e2e/pages/your-business';

const completeCompaniesDetailsForm = (companiesHouseNumber, phoneNumber, website) => {
  cy.keyboardInput(companyDetails.companiesHouseSearch(), companiesHouseNumber);
  companyDetails.tradingNameYesRadioInput().click();
  companyDetails.tradingAddressYesRadioInput().click();

  if (phoneNumber) {
    cy.keyboardInput(companyDetails.phoneNumber(), phoneNumber);
  }

  if (website) {
    cy.keyboardInput(companyDetails.companyWebsite(), website);
  }
};

export default completeCompaniesDetailsForm;
