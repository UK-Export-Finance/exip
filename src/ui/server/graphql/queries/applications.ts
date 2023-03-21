import gql from 'graphql-tag';

const applicationsQuery = gql`
  query {
    applications(
      orderBy: { updatedAt: desc }
    ) {
      status
      updatedAt
      referenceNumber
      buyer {
        country {
          name
        }
        companyOrOrganisationName
      }
      policyAndExport {
        policyType
        totalValueOfContract
        maximumBuyerWillOwe
      }
    }
  }
`;

export default applicationsQuery;
