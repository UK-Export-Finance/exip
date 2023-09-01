import gql from 'graphql-tag';

const applicationsQuery = gql`
  query ($accountId: ID!, $take: Int!, $skip: Int!) {
    applications(where: { owner: { id: { equals: $accountId } } }, orderBy: { updatedAt: desc }, take: $take, skip: $skip) {
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
    applicationsCount(where: { owner: { id: { equals: $accountId } } })
  }
`;

export default applicationsQuery;
