import connectToDatabase from './connect-to-database';
import createTables from './create-tables';
import updateApplications from'./update-applications';
import getAllApplications from './get-all-applications';
import createNewApplicationRelationships from './create-new-application-relationships';
import getKeystoneContext from './get-keystone-context';

// TODO: seems that we shoud only touch applications that do NOT have a submitted status

const dataMigration = async () => {
  try {
    console.info('🚀 Beginning data migration');

    const connection = await connectToDatabase();

    if (connection) {
      console.info('✅ Connected to database. Creating new tables');

      // TEMPORARILY commented out for easier local dev.
      // await createTables.accountStatus(connection);
      // await createTables.jointlyInsuredParty(connection);
    }

    console.info('✅ New tables successfully created. Updating applications');

    // TEMPORARILY commented out for easier local dev.
    // await updateApplications.nominatedLossPayeeField(connection);
    // await updateApplications.nominatedLossPayeeConstraint(connection);

    console.info('✅ Applications successfully updated.');

    const context = await getKeystoneContext();

    console.info('✅ Obtained keystone context. Executing keystone/prisma queries');

    // TODO: rename idsConnectArray to include applications?
    const { applications, idsConnectArray } = await getAllApplications(context);

    await createNewApplicationRelationships({
      context,
      applicationIdsConnectArray: idsConnectArray,
      applications,
    });

    console.info('🎉 Migration complete. Exiting script');

    process.exit();
  } catch (err) {
    console.error(`🚨 error with data migration %O`, err);

    throw new Error(`🚨 error with data migration ${err}`);
  }
};

dataMigration();
