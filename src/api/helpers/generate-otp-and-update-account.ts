import { Context } from '.keystone/types'; // eslint-disable-line
import generate from './generate-otp';
import { AddAndGetOtpResponse } from '../types';

/**
 * generateOTPAndUpdateAccount
 * - Generate an OTP, save to the exporter account
 * @param {Object} KeystoneJS context API
 * @param {String} Exporter account ID
 * @returns {Object} Object with success flag and security code
 */
const generateOTPAndUpdateAccount = async (context: Context, accountId: string): Promise<AddAndGetOtpResponse> => {
  try {
    console.info('Adding OTP to exporter account');
    // generate OTP.
    const otp = generate.otp();

    const { securityCode, salt, hash, expiry } = otp;

    // update the account
    const accountUpdate = {
      otpSalt: salt,
      otpHash: hash,
      otpExpiry: expiry,
    };

    await context.db.Exporter.updateOne({
      where: { id: accountId },
      data: accountUpdate,
    });

    return {
      success: true,
      securityCode,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Adding OTP to exporter account ${err}`);
  }
};

export default generateOTPAndUpdateAccount;
