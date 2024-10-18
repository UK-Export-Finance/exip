# EXIP API - data migration - version 2 to version 3 :file_folder:

This directory contains source code for migrating version 2 of EXIP data into the version 3 data structure.

- Version 1 is MVP. This is the first release with account and application functionalities.
- Version 2 is "No PDF". This is a large iteration of MVP, where we allow more applications through and collect more information, depending on answers a user provides.
- Version 3 is a small iteration of "No PDF". This is mostly design and content improvements, however 1x field has been added to the database.

## In version 3, the following data has been added

- `Policy` table - 1x new field - `requestedCreditLimit`.

## Prerequisites :gear:

To set up and run the API locally to test this data migration, you'll need the following prerequisites:

- Node.js version 16.17.0 or higher along with the corresponding `npm` package manager.
- A MySQL database with the version 2 (No PDF) data structure.
- An operational API (parent directory - see the API's README).
- The `DATABASE_URL` environment variable should be configured to point to your local MySQL database, for example: `mysql://root:@localhost:1234/db-name`.
- The local `DATABASE_USER` environment variable
- The local `DATABASE_PASSWORD` environment variable
- The local `CUID_FINGERPRINT` environment variable
- `mysql2` NPM package installed as an API dependency.
- `ts-node` NPM package installed locally.

## Running Locally :computer:

1. Ensure that your database has the version 2 (No PDF) data structure.
2. In the API directory, execute `npm run data-migration`.

The migration should successfully do the following:

1. Connect to the database.
2. Remove the application `migratedV1toV2` field.
3. Create a new application `migratedV2toV3` field.
4. Create a new requestedCreditLimit field in the policy table.
5. Update the application version number.
6. Update the new application `migratedV2toV3` field.

## How to ensure that data migration was successful

1. All applications should be aligned with the version 3 data model (listed above)
2. In the UI, all existing applications with a status of "in progress" can be progressed and successfully submitted.

# TODO

## Might not need this section anymore.

:warning: After running the migration script, `npm run dev` in the API will fail. `npm run start` should be used instead.

This is because, during `npm run dev`, KeystoneJS/prisma checks the schema against the database. It will then attempt to automatically build the database, with the latest schema. After running the migration script, this will fail because KeystoneJS/prisma attempts to create foreign key constraints that already exist.

We manage our own data migration, so we do not need these checks to run.

To run `npm run dev` after running the migration script, it can be achieved by adding a `--no-db-push` to the `package.json` `dev` script. However, this should only be used for debugging purposes in development environments only.

In a data migration scenario outside of a development environment, `npm run start` should be used.

## What happens to applications that are in progress :microscope:

Due to the nature of GraphQL and KeystoneJS - the version 2 and version 3 data models are essentially "out of sync".

If we try to run the version 3 API, with version 2 data, things will not work.

Similarly, if we migrate the database and the API is running on version 3 - any applications created with the version 2 data model need to be migrated to the new version 3 model - hence why we need migration logic.

This means that if a user has completed e.g all questions in an application, but has not yet submitted - and then we migrate to version 3, the user's application will be migrated from version 2 ("No PDF") to version 3 ("No PDF iterations"). Because this migration is minimal, only one section will be marked as incomplete - the "Policy" section. Because the `requestedCreditLimit` field is now required as part of version 3 ("No PDF interations).

This is an intentional behaviour, so that a user can continue to complete and submit an application. The alternative to this is to ask a user to start again, which is not recommended.

If you have any specific questions or need further guidance related to this data migration or the API, please feel free to ask.
