import gql from 'graphql-tag';

const applicationsQuery = gql`
  query applications($accountId: ID!, $take: Int!, $skip: Int!) {
    applications(
      where: { AND: [{ owner: { id: { equals: $accountId } } }, { status: { not: { equals: "Abandoned" } } }] }
      orderBy: { updatedAt: desc }
      take: $take
      skip: $skip
    ) {
      status
      referenceNumber
      buyer {
        country {
          name
        }
        companyOrOrganisationName
      }
      policy {
        policyCurrencyCode
        policyType
        totalValueOfContract
        maximumBuyerWillOwe
      }
      submissionDate
    }
    applicationsCount(where: { AND: [{ owner: { id: { equals: $accountId } } }, { status: { not: { equals: "Abandoned" } } }] })
  }
`;

export default applicationsQuery;
