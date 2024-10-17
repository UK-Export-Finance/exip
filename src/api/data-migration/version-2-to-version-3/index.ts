import connectToDatabase from '../connect-to-database';
import updateApplications from './update-applications';

/**
 * dataMigration
 * Update all accounts and applications from the MVP data model/structure,
 * to the new "No PDF" data model/structure.
 * @returns {Function} process.exit()
 */
const dataMigration = async () => {
  try {
    console.info('🚀 Beginning data migration (v2 to v3)');

    const connection = await connectToDatabase();

    await updateApplications(connection);

    console.info('✅ Applications successfully updated');

    console.info('🎉 Migration complete. Exiting script');

    process.exit();
  } catch (error) {
    console.error('🚨 error with data migration %o', error);

    throw new Error(`🚨 error with data migration ${error}`);
  }
};

dataMigration();
