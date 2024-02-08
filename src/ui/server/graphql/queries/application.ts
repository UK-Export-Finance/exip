import gql from 'graphql-tag';

const applicationQuery = gql`
  query referenceNumber($referenceNumber: ID!) {
    referenceNumber(where: { id: $referenceNumber }) {
      id
      application {
        id
        version
        createdAt
        updatedAt
        dealType
        submissionCount
        submissionDeadline
        submissionType
        submissionDate
        status
        eligibility {
          id
          buyerCountry {
            isoCode
            name
          }
          coverPeriod {
            id
            value
            valueId
          }
          hasMinimumUkGoodsOrServices
          hasEndBuyer
          hasCompaniesHouseNumber
          otherPartiesInvolved
          paidByLetterOfCredit
          totalContractValue {
            id
            value
            valueId
          }
          validExporterLocation
        }
        policy {
          id
          needPreCreditPeriodCover
          policyType
          requestedStartDate
          contractCompletionDate
          totalValueOfContract
          creditPeriodWithBuyer
          policyCurrencyCode
          totalMonthsOfCover
          totalSalesToBuyer
          maximumBuyerWillOwe
          jointlyInsuredParty {
            id
            requested
            companyName
            companyNumber
            country {
              isoCode
              name
            }
          }
        }
        policyContact {
          id
          firstName
          lastName
          email
          position
          isSameAsOwner
        }
        exportContract {
          id
          goodsOrServicesDescription
          finalDestinationKnown
          finalDestinationCountryCode
        }
        owner {
          id
          firstName
          lastName
          email
        }
        company {
          id
          companyName
          companyNumber
          companyWebsite
          hasDifferentTradingName
          differentTradingName
          hasDifferentTradingAddress
          dateOfCreation
          phoneNumber
          financialYearEndDate
          sicCodes {
            id
            sicCode
            industrySectorName
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
          differentTradingAddress {
            id
            fullAddress
          }
        }
        business {
          id
          goodsOrServicesSupplied
          totalYearsExporting
          totalEmployeesUK
          estimatedAnnualTurnover
          exportsTurnoverPercentage
          turnoverCurrencyCode
          hasCreditControlProcess
        }
        broker {
          id
          isUsingBroker
          name
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
          buyerTradingHistory {
            id
            exporterHasTradedWithBuyer
            currencyCode
            outstandingPayments
            failedPayments
            totalOverduePayments
            totalOutstandingPayments
          }
          contact {
            id
            contactFirstName
            contactLastName
            contactPosition
            contactEmail
            canContactBuyer
          }
          relationship {
            id
            exporterIsConnectedWithBuyer
            connectionWithBuyerDescription
            exporterHasPreviousCreditInsuranceWithBuyer
            exporterHasBuyerFinancialAccounts
            previousCreditInsuranceWithBuyerDescription
          }
        }
        sectionReview {
          id
          eligibility
          policy
          business
          buyer
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
