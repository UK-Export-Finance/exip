import gql from 'graphql-tag';

// query for companies house information - address is an object
const companiesHouseQuery = gql`
  query ($companiesHouseNumber: String!) {
    getCompaniesHouseInformation(companiesHouseNumber: $companiesHouseNumber) {
      companyName
      registeredOfficeAddress {
        careOf
        premises
        addressLineOne
        addressLineTwo
        locality
        region
        postalCode
        country
      }
      companyNumber
      dateOfCreation
      sicCodes
      success
      apiError
    }
  }
`;

export default companiesHouseQuery;
