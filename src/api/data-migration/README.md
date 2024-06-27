# EXIP API - data migration :file_folder:

This directory contains source code for migrating one version of EXIP data, into another, new version of the data model.

For example, in MVP we had one table to collect data about a Buyer. In the next version of EXIP ("No PDF"), the data model has changed so that there are 4x tables relating to the Buyer - allowing us to collect more information.

Therefore, we need to be able to migrate any existing data, into the new model/structure.

As EXIP is iterated, this directory can be used to migrate data, if required.
