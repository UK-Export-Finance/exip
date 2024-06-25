# EXIP API - data migration - version 1 to version 2 :file_folder:

This directory contains source code for migrating version 1 of EXIP data into the version 2 data structure.

- Version 1 is MVP. This is the first release with account and application functionalities.
- Version 2 is "No PDF". This is a large iteration of MVP, where we allow more applications through and collect more information, depending on answers a user provides.

## In version 2, the following data has changed

- `Account` table - 2x fields have been moved to a new `AccountStatus` table.
- `Application` table - 1x new relationship - `nominatedLossPayee`.
- `Broker` table - 1x new field - `fullAddress`.
- `Business` table - 2x new fields - `turnoverCurrencyCode`, `hasCreditControlProcess`.
- `Buyer` table - 2x removed fields - `contactFirstName`, `contactLastName`.
- `Buyer` table - 3x new relationships - `buyerTradingHistory`, `contact`, `relationship`.
- `Company` table - 1x new relationship - `differentTradingAddress`.
- `Company` table - 1x new field - `differentTradingName`.
- `Eligibility` table - 1x new field - `hasEndBuyer`.
- `ExportContract` table - 2x new relationships - `agent`, `privateMarket`.
- `ExportContract` table - 1x new field - `paymentTermsDescription`.
- `Policy` table - 1x new relationship - `jointlyInsuredParty`.
- `SectionReview` table - 1x new field - `exportContract`.

## Additionally, version 2 has verious new tables

- AccountStatus
- BuyerContact
- BuyerRelationship
- BuyerTradingHistory
- CompanyDifferentTradingAddress
- ExportContractAgent
- ExportContractAgentService
- ExportContractAgentServiceCharge
- JointlyInsuredParty
- LossPayeeFinancialInternational
- LossPayeeFinancialInternationalVector
- LossPayeeFinancialUk
- LossPayeeFinancialUkVector
- NominatedLossPayee
- PrivateMarket

## Prerequisites :gear:

To set up and run the API locally, you'll need the following prerequisites:

- Node.js version 16.17.0 or higher along with the corresponding `npm` package manager.
- A MySQL database with the version 1 (MVP) data structure.
- An operational API (parent directory - see the API's README).
- The `DATABASE_URL` environment variable should be configured to point to your local MySQL database, for example: `mysql://root:@localhost:1234/db-name`.
- The local `NODE_ENV` environment variable set to `migration`.
- The local `DATABASE_USER` environment variable set to the database's user.
- `mysql2` NPM package installed as an API dependency.

## Running Locally :computer:

1. Ensure that your database has the version 1 (MVP) data structure.
2. In the API directory, execute `npm run data-migration`.

The migration should successfully do the following:

1. Connect to the database.
2. Create new tables.
3. Update accounts.
4. Update applications.
5. Obtain KeystoneJS context.
6. Create new account status relationships.
7. Remove old account status fields.
8. Update buyers.
9. Create new application relationships.
10. Exit the process.

If you have any specific questions or need further guidance related to this data migration or the API, please feel free to ask.
