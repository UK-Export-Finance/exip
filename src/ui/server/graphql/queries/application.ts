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
        migratedV1toV2
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
          hasCompaniesHouseNumber
          hasMinimumUkGoodsOrServices
          hasEndBuyer
          isMemberOfAGroup
          isPartyToConsortium
          otherPartiesInvolved
          paidByLetterOfCredit
          totalContractValue {
            id
            value
            valueId
          }
          validExporterLocation
        }
        nominatedLossPayee {
          id
          isAppointed
          isLocatedInUk
          isLocatedInternationally
          name
          financialUk {
            id
            accountNumber
            sortCode
            bankAddress
          }
          financialInternational {
            id
            iban
            bicSwiftCode
            bankAddress
          }
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
            countryCode
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
          awardMethod {
            id
            value
          }
          otherAwardMethod
          goodsOrServicesDescription
          finalDestinationKnown
          finalDestinationCountryCode
          paymentTermsDescription
          privateMarket {
            id
            attempted
            declinedDescription
          }
          agent {
            id
            isUsingAgent
            name
            fullAddress
            countryCode
            service {
              id
              serviceDescription
              agentIsCharging
              charge {
                id
                percentageCharge
                fixedSumAmount
                fixedSumCurrencyCode
                method
                payableCountryCode
              }
            }
          }
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
          fullAddress
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
          exportContract
          business
          buyer
          policy
        }
        declaration {
          id
          agreeToConfidentiality
          agreeToAntiBribery
          hasAntiBriberyCodeOfConduct
          willExportWithAntiBriberyCodeOfConduct
          agreeToConfirmationAndAcknowledgements
        }
      }
    }
  }
`;

export default applicationQuery;
