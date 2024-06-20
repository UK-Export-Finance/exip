import connectToDatabase from './connect-to-database';
import createTables from './create-tables';
import updateAccounts from './update-accounts';
import updateApplications from'./update-applications';
import getAllAccounts from './get-all-accounts';
import getAllBuyers from './get-all-buyers';
import getAllApplications from './get-all-applications';
import createNewAccountStatusRelationships from './create-new-account-status-relationships';
import createNewApplicationRelationships from './create-new-application-relationships';
import getKeystoneContext from '../test-helpers/get-keystone-context';
// import getKeystoneContext from './get-keystone-context';

// TODO: seems that we shoud only touch applications that do NOT have a submitted status

const dataMigration = async () => {
  try {
    console.info('🚀 Beginning data migration');

    const connection = await connectToDatabase();

    if (connection) {
      console.info('✅ Connected to database. Creating new tables');

      await createTables.accountStatus(connection);

      await createTables.buyerContact(connection);
      await createTables.buyerRelationship(connection);
      await createTables.buyerTradingHistory(connection);

      await createTables.companyDifferentTradingAddress(connection);

      await createTables.jointlyInsuredParty(connection);

      await createTables.nominatedLossPayee(connection);

      // NOTE: need to create the vector tables first.
      await createTables.lossPayeeFinancialInternationalVector(connection);
      await createTables.lossPayeeFinancialInternational(connection);
      await createTables.lossPayeeFinancialUkVector(connection);
      await createTables.lossPayeeFinancialUk(connection);
    }

    console.info('✅ New tables successfully created.');

    // NOTE: these tables require creation before creating new application relationships 

    console.info('✅ Updating existing tables.');

    await updateAccounts.statusField(connection);
    await updateAccounts.statusConstraint(connection);

    await updateAccounts.isVerifiedField(connection);
    await updateAccounts.isBlockedField(connection);

    await updateApplications.exportContractFields(connection);
    await updateApplications.nominatedLossPayeeField(connection);
    await updateApplications.nominatedLossPayeeConstraint(connection);
    await updateApplications.companyFields(connection);
    await updateApplications.companyConstraint(connection);

    await updateApplications.businessFields(connection);

    await updateApplications.brokerFullAddressField(connection);

    await updateApplications.eligibilityHasEndBuyerField(connection);

    await updateApplications.declarationsExportContractField(connection);


    console.info('✅ Applications successfully updated.');

    // console.info('✅ Creating export contract tables.');

    await createTables.exportContractAgentServiceCharge(connection);
    await createTables.exportContractAgentService(connection);
    await createTables.exportContractAgent(connection);
    await createTables.privateMarket(connection);

    console.info('✅ Export contract tables successfully created.');

    const context = await getKeystoneContext();

    console.info('✅ Obtained keystone context. Executing additional queries');

    const accounts = await getAllAccounts(connection);

    await createNewAccountStatusRelationships({
      context,
      accounts,
    });

    const buyers = await getAllBuyers(connection);

    await updateApplications.buyerContactFields(buyers, context);
    await updateApplications.buyerRelationshipFields(buyers, context);
    await updateApplications.buyerTradingHistoryFields(buyers, context);
    await updateApplications.buyerFields(connection);

    const { applications, applicationIdsConnectArray } = await getAllApplications(context);

    await createNewApplicationRelationships({
      context,
      applicationIdsConnectArray,
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
