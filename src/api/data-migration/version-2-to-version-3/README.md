# EXIP API - data migration - version 2 to version 3 :file_folder:

This directory contains source code for migrating version 2 of EXIP
data into the version 3 data structure.

## In version 3, the following has changed

- `Policy` table - 1x new field - `requestedCreditLimit`.

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
2. In the UI, all existing applications with a status of "in progress" can be progressed and
   successfully submitted.

## What happens to applications that are in progress :microscope:

Due to the nature of GraphQL and KeystoneJS - the version 2 and
version 3 data models are essentially "out of sync".

If we try to run the version 3 API, with version 2 data, things will
not work.

Similarly, if we migrate the database and the API is running on
version 3 - any applications created with the version 2 data model
need to be migrated to the new version 3 model - hence why we need
migration logic.

This means that if a user has completed e.g all questions in an
application, but has not yet submitted - and then we migrate to
version 3, the user's application will be migrated from version 2
("No PDF") to version 3 ("No PDF iterations"). Because this migration
is minimal, only one section will be marked as incomplete - the
"Policy" section. Because the `requestedCreditLimit` field is now
required as part of version 3 ("No PDF iterations").

This is an intentional behaviour, so that a user can continue to
complete and submit an application. The alternative to this is to ask
a user to start again, which is not recommended.

If you have any specific questions or need further guidance related to
this data migration or the API, please feel free to ask.
