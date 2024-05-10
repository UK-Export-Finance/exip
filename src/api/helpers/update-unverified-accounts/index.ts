import { Context } from '.keystone/types'; // eslint-disable-line
import { SuccessResponse } from '../../types';
import getUnverifiedAccounts from '../get-unverified-accounts';
import mapAndUpdateUnverifiedAccounts from '../map-and-update-unverified-accounts';

/**
 * updateUnverifiedAccounts
 * Gets accounts which have not been verified within 24hours
 * Sets inactive flag to true and updates updatedAta
 * returns success flag
 * @param {Context} KeystoneJS context API
 * @returns {Promise<SuccessResponse>} success flag
 */
const updateUnverifiedAccounts = async (context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Getting and updating unverified accounts');

    // gets inactive applications
    const accounts = await getUnverifiedAccounts(context);

    /**
     * if unverified accounts
     * then maps through them to create update objects
     * and updates account status to isInactive
     */
    if (accounts.length) {
      await mapAndUpdateUnverifiedAccounts(accounts, context);
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error('Error getting and updating unverified accounts %O', err);
    throw new Error(`Error getting and updating unverified accounts ${err}`);
  }
};

export default updateUnverifiedAccounts;
