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
- `Declaration` table - 2x new fields - `version`, `exportContract`.
- `Declaration` table - 3x removed fields - `antiBribery`, `confirmationAndAcknowledgements`, `howDataWillBeUsed.
- `DeclarationAntiBribery` table - removed.
- `DeclarationConfidentiality` table - removed.
- `DeclarationConfirmationAndAcknowledgement` table - removed.
- `DeclarationHowDataWillBeUsed` table - removed.
- `Eligibility` table - 1x new field - `hasEndBuyer`.
- `ExportContract` table - 2x new relationships - `agent`, `privateMarket`.
- `ExportContract` table - 1x new field - `paymentTermsDescription`.
- `Policy` table - 1x new relationship - `jointlyInsuredParty`.
- `SectionReview` table - 1x new field - `exportContract`.
- Various tables/columns - changes to VARCHAR values.

## Additionally, version 2 has various new tables

- AccountStatus
- BuyerContact
- BuyerRelationship
- BuyerTradingHistory
- CompanyDifferentTradingAddress
- DeclarationVersion
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

Note - there are 2 new fields that are created with a default currency code (GBP). Otherwise, any applications that are half complete will error when a user tries to continue the application:

1. BuyerTradingHistory table - `currencyCode` column.
2. Business table - `turnoverCurrencyCode` column.

## Prerequisites :gear:

To set up and run the API locally to test this data migration, you'll need the following prerequisites:

- Node.js version 16.17.0 or higher along with the corresponding `npm` package manager.
- A MySQL database with the version 1 (MVP) data structure.
- An operational API (parent directory - see the API's README).
- The `DATABASE_URL` environment variable should be configured to point to your local MySQL database, for example: `mysql://root:@localhost:1234/db-name`.
- The local `DATABASE_USER` environment variable
- The local `DATABASE_PASSWORD` environment variable
- The local `CUID_FINGERPRINT` environment variable
- `mysql2` NPM package installed as an API dependency.
- `ts-node` NPM package installed locally.

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
9. Remove old declaration fields.
10. Remove old declaration content tables.
11. Create new application relationships.
12. Exit the process.

## How to ensure that data migration was successful

1. All user accounts should have an AccountStatus table.
2. All applications should be aligned with the version 2 data model (listed above).
3. In the UI, all existing accounts work as expected (sign in, suspension etc)
4. In the UI, all existing applications with a status of "in progress" can be progressed and successfully submitted.

:warning: After running the migration script, `npm run dev` in the API will fail. `npm run start` should be used instead.

This is because, during `npm run dev`, KeystoneJS/prisma checks the schema against the database. It will then attempt to automatically build the database, with the latest schema. After running the migration script, this will fail because KeystoneJS/prisma attempts to create foreign key constraints that already exist.

We manage our own data migration, so we do not need these checks to run.

To run `npm run dev` after running the migration script, it can be achieved by adding a `--no-db-push` to the `package.json` `dev` script. However, this should only be used for debugging purposes in development environments only.

In a data migration scenario outside of a development environment, `npm run start` should be used.

## SQL and KeystoneJS queries

In many instances, we need to obtain certain pieces of data that are currently stored in the database, and move these to another place.

If the database and the KeystoneJS schema are out of sync (as it would be prior to running the migration script), KeystoneJS will not return all the data. For example, if field X is in the database, but it's been moved in the KeystoneJS/GraphQL schema, the GraphQL query will simply not return field X, because it is no longer in the schema.

Therefore, it is not possible to use KeystoneJS context queries to obtain version 1 data in the database, whilst executing data migration.

Therefore, we use raw SQL queries via the `mysql2` NPM package to obtain data, move data, create new tables and fields etc.

## What happens to applications that are in progress :microscope:

Due to the nature of GraphQL and KeystoneJS - the version 1 and version 2 data models are essentially "out of sync".

If we try to run the version 2 API, with version 1 data, things will not work.

Similarly, if we migrate the database and the API is running on version 2 - any applications created with the version 1 data model need to be migrated to the new version 2 model - hence why we need migration logic.

This means that if a user has completed e.g 3 out of 5 sections of an application and then we migrate to version 2, the user's application will be migrated from version 1 (MVP) to version 2 ("No PDF"). Depending on the previously submitted answers, some sections may now be marked as incomplete - because version 2 has different or additional requirements, compared to version 1 (MVP).

This is an intentional behaviour, so that a user can continue to complete and submit an application. The alternative to this is to ask a user to start again, which is not recommended.

If you have any specific questions or need further guidance related to this data migration or the API, please feel free to ask.
