import connectToDatabase from './connect-to-database';
import createTables from './create-tables';
import updateAccounts from './update-accounts';
import updateApplications from './update-applications';
import createNewAccountStatusRelationships from './create-new-account-status-relationships';
import createNewApplicationRelationships from './create-new-application-relationships';
import updateBuyers from './update-buyers';
import getKeystoneContext from '../test-helpers/get-keystone-context';

// TODO: seems that we should only touch applications that do NOT have a submitted status

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

    await createNewAccountStatusRelationships(connection, context);

    await updateBuyers(connection, context);

    await createNewApplicationRelationships(context);

    console.info('🎉 Migration complete. Exiting script');

    process.exit();
  } catch (err) {
    console.error(`🚨 error with data migration %O`, err);

    throw new Error(`🚨 error with data migration ${err}`);
  }
};

dataMigration();
