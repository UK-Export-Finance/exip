# EXIP API - data migration :file_folder:

This directory contains source code for migrating one version of EXIP
data, into another, new version of the data model.

For example, in MVP we had one table to collect data about a Buyer. In
the next version of EXIP ("No PDF"), the data model has changed so
that there are 4x tables relating to the Buyer - allowing us to
collect more information.

Therefore, we need to be able to migrate any existing data, into the
new model/structure.

As EXIP is iterated, this directory can be used to migrate data, if
required.

## Data migration versions

1. Version 1 is MVP. This is the first release with account and
   application functionalities.
2. Version 2 is "No PDF". This is a large iteration of MVP, where we
   allow more applications through and collect more information,
   depending on answers a user provides.
3. Version 3 is a small iteration of "No PDF", which is now "Public
   beta". This is mostly design and content improvements, however 1x
   field has been added to the database.
4. Version 4 is an iteration of "Public beta". This contains
   additional "declarations" questions which required new database
   tables and fields.

## Prerequisites :gear:

To set up and run the API locally to test this data migration, you'll
need the following prerequisites:

- Node.js version 16.17.0 or higher along with the corresponding `npm`
  package manager.
- A MySQL database with the version 2 (No PDF) data structure.
- An operational API (parent directory - see the API's README).
- The `DATABASE_URL` environment variable should be configured to
  point to your local MySQL database, for example:
  `mysql://root:@localhost:1234/db-name`.
- The local `DATABASE_USER` environment variable
- The local `DATABASE_PASSWORD` environment variable
- The local `CUID_FINGERPRINT` environment variable
- `mysql2` NPM package installed as an API dependency.
- `ts-node` NPM package installed locally.
