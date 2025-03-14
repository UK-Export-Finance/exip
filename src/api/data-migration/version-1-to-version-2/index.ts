import connectToDatabase from '../connect-to-database';
import createTables from './create-tables';
import updateAccounts from './update-accounts';
import updateApplications from './update-applications';
import createNewAccountStatusRelationships from './create-new-account-status-relationships';
import removeAccountStatusFields from './update-accounts/remove-account-status-fields';
import removeDeclarationFields from './remove-declaration-fields';
import getAllBuyers from './get-all-buyers';
import updateBuyers from './update-buyers';
import createNewApplicationRelationships from './create-new-application-relationships';
import removeDeclarationContentTables from './remove-declaration-content-tables';

/**
 * dataMigration
 * Update all accounts and applications from the MVP data model/structure,
 * to the new "No PDF" data model/structure.
 * @returns {Function} process.exit()
 */
const dataMigration = async () => {
  try {
    console.info('🚀 Beginning data migration (v1 to v2)');

    const connection = await connectToDatabase();

    console.info('✅ Connected to database');

    await createTables(connection);

    console.info('✅ New tables successfully created. Updating existing tables.');

    await updateAccounts(connection);

    await updateApplications(connection);

    console.info('✅ Applications successfully updated');

    await createNewAccountStatusRelationships(connection);

    await removeAccountStatusFields(connection);

    console.info('✅ Accounts successfully updated.');

    const buyers = await getAllBuyers(connection);

    await updateBuyers(connection, buyers);

    console.info('✅ Buyers successfully updated.');

    await createNewApplicationRelationships(connection);

    console.info('✅ Application relationships successfully updated.');

    await removeDeclarationFields(connection);

    await removeDeclarationContentTables(connection);

    console.info('✅ Declarations successfully updated.');

    console.info('🎉 Migration complete. Exiting script');

    process.exit();
  } catch (error) {
    console.error('🚨 Error with data migration %o', error);

    throw new Error(`🚨 Error with data migration ${error}`);
  }
};

dataMigration();
