# EXIP API - data migration - version 3 to version 4 :file_folder:

This directory contains source code for migrating version 3 of EXIP data into the version 4 data structure.

## In version 4, the following has changed

- `Declaration` table - 1x new relationship - `modernSlavery`.
- 1x new table - `DeclarationModernSlavery`.
- 1x new table - `DeclarationModernSlaveryVersion`.

## Running Locally :computer:

1. Ensure that your database has the version 3 (No PDF) data structure.
2. In the API directory, execute `npm run data-migration`.

The migration should successfully do the following:

1. Connect to the database.
2. Remove the application `migratedV2toV3` field.
3. Create a new application `migratedV3toV4` field.
4. Create a new `modernSlavery` field in the declaration table.
5. Create new `DeclarationModernSlavery` and `DeclarationModernSlaveryVersion` tables.
6. Create appropriate declaration relationships
7. Update the application version number.
8. Update the new application `migratedV3toV4` field.

## How to ensure that data migration was successful

1. All applications should be aligned with the version 4 data model (listed above)
2. In the UI, all existing applications with a status of "in progress" can be progressed and successfully submitted.

## What happens to applications that are in progress :microscope:

Due to the nature of GraphQL and KeystoneJS - the version 3 and version 4 data models are essentially "out of sync".

If we try to run the version 4 API, with version 3 data, things will not work.

Similarly, if we migrate the database and the API is running on version 4 - any applications created with the version 3 data model need to be migrated to the new version 4 model - hence why we need migration logic.

This means that if a user has completed e.g all questions in an application, but has not yet submitted - and then we migrate to version 4, the user's application will be migrated from version 3 ("Public beta") to version 4 ("Public beta iterations"). Because this migration is minimal, only one section will be marked as incomplete - the "Declarations" section. Because the new "modern slavery" fields are now required as part of version 4 ("Public beta iterations").

This is an intentional behaviour, so that a user can continue to complete and submit an application. The alternative to this is to ask a user to start again, which is not recommended.

If you have any specific questions or need further guidance related to this data migration or the API, please feel free to ask.
