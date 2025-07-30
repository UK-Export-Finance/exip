import { Context } from '../../types';

/**
 * timestamp
 * Update an application's "updated" timestamp
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @returns {Promise<object>} Application
 */
const timestamp = async (context: Context, applicationId: string) => {
  try {
    console.info('Updating application updatedAt timestamp');

    const now = new Date();

    const application = await context.db.Application.updateOne({
      where: {
        id: applicationId,
      },
      data: {
        updatedAt: now,
      },
    });

    return application;
  } catch (error) {
    console.error('Error updating application updatedAt timestamp %o', error);

    throw new Error(`Updating application updatedAt timestamp ${error}`);
  }
};

const updateApplication = {
  timestamp,
};

export default updateApplication;
