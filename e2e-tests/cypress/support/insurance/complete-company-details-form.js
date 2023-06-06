import { companyDetails } from '../../e2e/pages/your-business';

/**
 * completeCompaniesDetailsForm
 * fills in the company details form
 * fills in optional fields if they are provided
 * does not submit the form
 * @param {Object} companyDetailsVariables - companiesHouseNumber, phoneNumber and website
 */
const completeCompaniesDetailsForm = ({ companiesHouseNumber, phoneNumber, website }) => {
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
