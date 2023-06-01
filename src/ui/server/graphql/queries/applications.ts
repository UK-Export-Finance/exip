import gql from 'graphql-tag';

const applicationsQuery = gql`
  query ($accountId: ID!) {
    applications(where: { owner: { id: { equals: $accountId } } }, orderBy: { updatedAt: desc }) {
      status
      updatedAt
      referenceNumber
      buyer {
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
