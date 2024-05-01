import { Context } from '.keystone/types'; // eslint-disable-line
import { SuccessResponse } from '../../../types';
import getInactiveApplications from '../../../helpers/get-inactive-applications';
import mapAndUpdateInactiveApplications from '../../../helpers/map-and-update-inactive-applications';

/**
 * getInactiveApplications
 * Gets inactive applications which have not been updated for 30 days
 * Sets their status to Abandoned
 * returns success flag
 * @param {Object} GraphQL root variables
 * @param {Context} KeystoneJS context API
 * @returns {Promise<SuccessResponse>} success flag
 */
const updateInactiveApplicationsMutation = async (root: any, context: Context): Promise<SuccessResponse> => {
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
  } catch (err) {
    console.error('Error getting and updating inactive applications %O', err);
    throw new Error(`Error getting and updating inactive applications ${err}`);
  }
};

export default updateInactiveApplicationsMutation;
