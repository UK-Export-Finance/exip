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
          id
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
        policyAndExport {
          id
          policyType
          requestedStartDate
          contractCompletionDate
          totalValueOfContract
          creditPeriodWithBuyer
          policyCurrencyCode
          totalMonthsOfCover
          totalSalesToBuyer
          maximumBuyerWillOwe
        }
        exporterCompany {
          id
          companyName
          companyNumber
          companyWebsite
          hasTradingName
          hasTradingAddress
        }
        exporterCompanyAddress {
          id
          addressLine1
          addressLine2
          careOf
          locality
          region
          postalCode
          country
          premises
        }
      }
    }
  }
`;

export default applicationQuery;
