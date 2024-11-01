import { Context, ObjectType } from '../../types';

/**
 * updateApplicationsData
 * Updates many applications with the provided data
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationData: update applications data
 * @returns {Promise<Array<Application>>} Created applications and reference number
 */
const updateApplicationsData = async (context: Context, updateData: ObjectType) => {
  console.info('Updating many applications');

  try {
    const updatedApplications = await context.db.Application.updateMany({
      data: updateData,
    });

    return updatedApplications;
  } catch (error) {
    console.error('Error updating many applications - helper %o', error);

    throw new Error(`Updating many applications - helper ${error}`);
  }
};

export default updateApplicationsData;
