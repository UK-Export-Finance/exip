import { Context } from '../../types';

/**
 * timestamp
 * Update an application's "updated" timestamp
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Application
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
  } catch (err) {
    console.error('Error updating application updatedAt timestamp %O', err);

    throw new Error(`Updating application updatedAt timestamp ${err}`);
  }
};

const updateApplication = {
  timestamp,
};

export default updateApplication;
