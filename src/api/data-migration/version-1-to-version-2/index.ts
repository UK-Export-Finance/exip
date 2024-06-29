import connectToDatabase from './connect-to-database';
import createTables from './create-tables';
import updateAccounts from './update-accounts';
import updateApplications from './update-applications';
import createNewAccountStatusRelationships from './create-new-account-status-relationships';
import removeAccountStatusFields from './update-accounts/remove-account-status-fields';
import createNewApplicationRelationships from './create-new-application-relationships';
import getAllBuyers from './get-all-buyers';
import updateBuyers from './update-buyers';
import getKeystoneContext from '../../test-helpers/get-keystone-context';

/**
 * dataMigration
 * Update all accounts and applications from the MVP data model/structure,
 * to the new "No PDF" data model/structure.
 * @returns {Function} process.exit()
 */
const dataMigration = async () => {
  try {
    console.info('🚀 Beginning data migration');

    const connection = await connectToDatabase();

    console.info('✅ Connected to database');

    await createTables(connection);

    console.info('✅ New tables successfully created. Updating existing tables.');

    await updateAccounts(connection);

    await updateApplications(connection);

    console.info('✅ Applications successfully updated.');

    const context = await getKeystoneContext();

    console.info('✅ Obtained keystone context. Executing additional queries');

    await createNewAccountStatusRelationships(connection);

    const buyers = await getAllBuyers(connection);

    await updateBuyers(connection, buyers);

    await createNewApplicationRelationships(context, connection);

    // await removeAccountStatusFields(connection);

    console.info('🎉 Migration complete. Exiting script');

    process.exit();
  } catch (err) {
    console.error(`🚨 error with data migration %O`, err);

    throw new Error(`🚨 error with data migration ${err}`);
  }
};

dataMigration();
