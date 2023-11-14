import gql from 'graphql-tag';

const companiesHouseQuery = gql`
  query getCompaniesHouseInformation($companiesHouseNumber: String!) {
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
      isActive
      success
      apiError
      notFound
    }
  }
`;

export default companiesHouseQuery;
