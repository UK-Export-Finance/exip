import connectToDatabase from '../connect-to-database';
import updateApplications from './update-applications';

/**
 * dataMigration
 * Update all applications from the V3 data model/structure,
 * to the V4 data model/structure.
 * @returns {Function} process.exit()
 */
const dataMigration = async () => {
  try {
    console.info('🚀 Beginning data migration (v3 to v4)');

    const connection = await connectToDatabase();

    await updateApplications(connection);

    console.info('✅ Applications successfully updated');

    console.info('🎉 Migration complete. Exiting script');

    process.exit();
  } catch (error) {
    console.error('🚨 Error with data migration %o', error);

    throw new Error(`🚨 Error with data migration ${error}`);
  }
};

dataMigration();
