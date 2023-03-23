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
          goodsOrServicesDescription
          finalDestinationCountryCode
        }
        exporter {
          id
        }
        exporterCompany {
          id
          companyName
          companyNumber
          companyWebsite
          hasTradingName
          hasTradingAddress
          dateOfCreation
          phoneNumber
          financialYearEndDate
          sicCodes {
            id
            sicCode
          }
          registeredOfficeAddress {
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
        exporterBusiness {
          id
          goodsOrServicesSupplied
          totalYearsExporting
          totalEmployeesUK
          totalEmployeesInternational
          estimatedAnnualTurnover
          exportsTurnoverPercentage
        }
        exporterBroker {
          id
          isUsingBroker
          name
          addressLine1
          addressLine2
          town
          county
          postcode
          email
        }
        buyer {
          id
          companyOrOrganisationName
          address
          country {
            isoCode
            name
          }
          registrationNumber
          website
          contactFirstName
          contactLastName
          contactPosition
          contactEmail
          canContactBuyer
          exporterIsConnectedWithBuyer
          exporterHasTradedWithBuyer
        }
        declaration {
          id
          agreeToConfidentiality
          agreeToAntiBribery
          hasAntiBriberyCodeOfConduct
          willExportWithAntiBriberyCodeOfConduct
          agreeToConfirmationAndAcknowledgements
          agreeHowDataWillBeUsed
        }
      }
    }
  }
`;

export default applicationQuery;
