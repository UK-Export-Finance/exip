import { companyDetails } from '../../e2e/pages/your-business';

const completeAndSubmitCompaniesHouseSearchForm = ({ companiesHouseNumber }) => {
  cy.keyboardInput(companyDetails.companiesHouseSearch(), companiesHouseNumber);
  companyDetails.companiesHouseSearchButton().click();
};

export default completeAndSubmitCompaniesHouseSearchForm;
