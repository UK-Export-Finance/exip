import { Context } from '.keystone/types'; // eslint-disable-line
import { Account } from '../../types';

/**
 * getUnverifiedAccounts
 * gets unverified accounts - not updated for 24hours
 * returns array of accounts including status
 * @param {Context} context
 * @returns {Promise<Account[]>} Array of accounts
 */
const getUnverifiedAccounts = async (context: Context): Promise<Account[]> => {
  try {
    console.info('Getting unverified accounts - getUnverifiedAccounts helper');

    /**
     * queries accounts which have a verificationExpiry before now
     * and where their isVerified, isBlocked or isInactive statuses are false
     * returns array accounts and their status
     */
    const accounts = (await context.query.Account.findMany({
      where: {
        AND: [
          { verificationExpiry: { lt: new Date() } },
          { status: { isVerified: { equals: false } } },
          { status: { isBlocked: { equals: false } } },
          { status: { isInactive: { equals: false } } },
        ],
      },
      query:
        'id firstName lastName email otpSalt otpHash otpExpiry salt hash passwordResetHash passwordResetExpiry verificationHash verificationExpiry reactivationHash reactivationExpiry updatedAt status { id isBlocked isVerified isInactive updatedAt }',
    })) as Array<Account>;

    return accounts;
  } catch (err) {
    console.error('Error getting unverified accounts (getUnverifiedAccounts helper) %O', err);

    throw new Error(`Error getting unverified accounts (getUnverifiedAccounts helper) ${err}`);
  }
};

export default getUnverifiedAccounts;
