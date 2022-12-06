import gql from 'graphql-tag';

const applicationQuery = gql`
  query ($referenceNumber: ID) {
    referenceNumber(where: { id: $referenceNumber }) {
      id
      application {
        id
        createdAt
        updatedAt
        submissionDeadline
        submissionType
        eligibility {
          buyerCountry {
            isoCode
            name
          }
          hasMinimumUkGoodsOrServices
          validExporterLocation
          hasCompaniesHouseNumber
          otherPartiesInvolved
          paidByLetterOfCredit
          needPreCreditPeriodCover
          wantCoverOverMaxAmount
          wantCoverOverMaxPeriod
        }
      }
    }
  }
`;

export default applicationQuery;
