import { Context } from '.keystone/types'; // eslint-disable-line
import getAccountByField from '../helpers/get-account-by-field';
import generate from '../helpers/generate-otp';
import { AddOtpToAccountVariables } from '../types';

/**
 * addAndGetOtp
 * - Generate and add a OTP to an account and return in the response.
 * - NOTE: this is used for E2E testing purposes only.
 * - The alternative approach is to have email inbox testing capabilities which can be risky/flaky.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the AddOtpToAccount mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag and OTP
 */
const addAndGetOtp = async (root: any, variables: AddOtpToAccountVariables, context: Context) => {
  try {
    console.info('Adding OTP to exporter account');

    const { email } = variables;

    // Get the account the email is associated with.
    const exporter = await getAccountByField(context, 'email', email);

    if (!exporter) {
      console.info('Unable to generate and add OTP to exporter account - no account found');

      return { success: false };
    }

    const otp = generate.otp();

    const { securityCode, salt, hash, expiry } = otp;

    // update the account.
    const accountUpdate = {
      otpSalt: salt,
      otpHash: hash,
      otpExpiry: expiry,
    };

    await context.db.Exporter.updateOne({
      where: { id: exporter.id },
      data: accountUpdate,
    });

    return {
      success: true,
      securityCode,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Adding OTP to exporter account (addAndGetOtp mutation) ${err}`);
  }
};

export default addAndGetOtp;
