# EXIP API - data migration - version 4 to version 5 :file_folder:

This directory contains source code for migrating version 4 of EXIP data into the version 5 data structure.

## In version 4, the following has changed

- `Broker` table - 2x new fields - `buildingNumberOrName`, `isBasedInUk`.

## Running Locally :computer:

1. Ensure that your database has the version 4 data structure.
2. In the API directory, execute `npm run data-migration`.

The migration should successfully do the following:

1. Connect to the database.
2. Create a new `buildingNumberOrName` field in the broker table.
3. Create a new `isBasedInUk` field in the broker table.
4. Update the application version number.
5. Update in progress application's to have a `migratedTo` value of 5.

## How to ensure that data migration was successful

1. All applications should be aligned with the version 5 data model (listed above)
2. In the UI, all existing applications with a status of "in progress" can be progressed and successfully submitted.

## What happens to applications that are in progress :microscope:

Due to the nature of GraphQL and KeystoneJS - the version 4 and version 5 data models are essentially "out of sync".

If we try to run the version 5 API, with version 4 data, things will not work.

Similarly, if we migrate the database and the API is running on version 5 - any applications created with the version 4 data model need to be migrated to the new version 5 model - hence why we need migration logic.

This means that if a user has completed e.g all questions in an application, but has not yet submitted - and then we migrate to version 5, the user's application will be migrated from version 4 to version 5. Because this migration is minimal, only one section will be marked as incomplete - the "Broker" section. Because the new "broker" fields are now required as part of version 5.

This is an intentional behaviour, so that a user can continue to complete and submit an application. The alternative to this is to ask a user to start again, which is not recommended.

If you have any specific questions or need further guidance related to this data migration or the API, please feel free to ask.
