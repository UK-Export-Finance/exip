import { Context } from '.keystone/types'; // eslint-disable-line
import { SuccessResponse } from '../../types';
import getInactiveApplications from '../get-inactive-applications';
import mapAndUpdateInactiveApplications from '../map-and-update-inactive-applications';

/**
 * updateInactiveApplications
 * Gets inactive applications which have not been updated for SUBMISSION_DEADLINE_IN_DAYS
 * Sets their status to Abandoned
 * returns success flag
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<SuccessResponse>} success flag
 */
const updateInactiveApplications = async (context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Getting and updating inactive applications');

    // gets inactive applications
    const applications = await getInactiveApplications(context);

    /**
     * if inactive applications
     * then maps through them to create update object
     * and updates application statuses to abandoned
     */
    if (applications.length) {
      await mapAndUpdateInactiveApplications(applications, context);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error getting and updating inactive applications %o', error);

    throw new Error(`Error getting and updating inactive applications ${error}`);
  }
};

export default updateInactiveApplications;
