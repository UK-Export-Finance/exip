import connectToDatabase from './connect-to-database';
import createTables from './create-tables';
import updateApplications from'./update-applications';
import getAllApplications from './get-all-applications';
import createNewApplicationRelationships from './create-new-application-relationships';
import getKeystoneContext from './get-keystone-context';

// TODO: seems that we shoud only touch applications that do NOT have a submitted status

const dataMigration = async () => {
  console.info('✅ Beginning data migration');

  const connection = await connectToDatabase();

  if (connection) {
    console.info('✅ Connected to database. Creating new tables');

    await createTables.accountStatus(connection);
  }

  console.info('✅ New tables successfully created. Updating applications');

  await updateApplications.nominatedLossPayeeField(connection);
  await updateApplications.nominatedLossPayeeConstraint(connection);

  console.info('✅ Applications successfully updated.');

  const context = await getKeystoneContext();

  console.info('✅ Obtained keystone context. Executing keystone/prisma queries');

  const { idsConnectArray } = await getAllApplications(context);

  console.info('✅ Creating new relationships for all applications');

  await createNewApplicationRelationships.lossPayee(context, idsConnectArray);


  // const creationResponse = await context.db.Account.createOne({
  //   data: {
  //     firstName: 'Tony',
  //     lastName: 'Test migration',
  //     email: 'mock@migration.com',
  //     salt: 'mock salt',
  //     hash: 'mock hash',
  //   }
  // });

  // await context.db.AccountStatus.createOne({
  //   data: {
  //     account: {
  //       connect: {
  //         id: creationResponse.id,
  //       },
  //     },
  //   },
  // });

  // context.db.AccountStatus.cre

  // console.log('creating a mock country for testing purposes');

  // await context.db.Country.createOne({
  //   data: {
  //     name: 'Mock country migration name',
  //     isoCode: 'ABC',
  //   },
  // });

  // console.log('created a mock country for testing purposes');

  console.info('🎉 Migration complete. Exiting script');

  process.exit();
};

dataMigration();
