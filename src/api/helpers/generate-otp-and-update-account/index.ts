import generate from '../generate-otp';
import update from '../update-account';
import { AddAndGetOtpResponse, Context } from '../../types';

/**
 * generateOTPAndUpdateAccount
 * - Generate an OTP, save to the account
 * @param {Object} KeystoneJS context API
 * @param {String} Exporter account ID
 * @returns {Promise<Object>} Object with success flag and access code
 */
const generateOTPAndUpdateAccount = async (context: Context, accountId: string): Promise<AddAndGetOtpResponse> => {
  try {
    console.info('Adding OTP to an account');
    // generate OTP.
    const otp = generate.otp();

    const { securityCode, salt, hash, expiry } = otp;

    // update the account
    const accountUpdate = {
      otpSalt: salt,
      otpHash: hash,
      otpExpiry: expiry,
      isInactive: false,
    };

    await update.account(context, accountId, accountUpdate);

    return {
      success: true,
      securityCode,
    };
  } catch (err) {
    console.error('Error adding OTP to an account %O', err);
    throw new Error(`Adding OTP to an account ${err}`);
  }
};

export default generateOTPAndUpdateAccount;
