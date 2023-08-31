import gql from 'graphql-tag';

const applicationsQuery = gql`
  query ($accountId: ID!) {
    applications(where: { owner: { id: { equals: $accountId } } }, orderBy: { updatedAt: desc }) {
      status
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
      submissionDate
    }
  }
`;

export default applicationsQuery;
