import gql from 'graphql-tag';

const companiesHouseQuery = gql`
  query ($companiesHouseNumber: String!) {
    getCompaniesHouseInformation(companiesHouseNumber: $companiesHouseNumber) {
      companyName
      registeredOfficeAddress {
        careOf
        premises
        addressLine1
        addressLine2
        locality
        region
        postalCode
        country
      }
      companyNumber
      dateOfCreation
      sicCodes
      industrySectorNames
      financialYearEndDate
      success
      apiError
    }
  }
`;

export default companiesHouseQuery;
