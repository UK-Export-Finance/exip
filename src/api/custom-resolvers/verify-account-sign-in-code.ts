import { Context } from '.keystone/types'; // eslint-disable-line
import { isAfter } from 'date-fns';
import { ACCOUNT } from '../constants';
import getExporterById from '../helpers/get-exporter-by-id';
import isValidOTP from '../helpers/is-valid-otp';
import create from '../helpers/create-jwt';
import { VerifyAccountSignInCodeVariables, VerifyAccountSignInCodeResponse } from '../types';

const {
  JWT: { SESSION_EXPIRY },
} = ACCOUNT;

/**
 * verifyAccountSignInCode
 * Check if a OTP/security code is valid and if so, generate and return a JWT
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the AccountSignIn mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success or expired flag.
 */
const verifyAccountSignInCode = async (root: any, variables: VerifyAccountSignInCodeVariables, context: Context): Promise<VerifyAccountSignInCodeResponse> => {
  try {
    console.info('Verifying exporter account sign in code');

    const { accountId, securityCode } = variables;

    // get the exporter
    const exporter = await getExporterById(context, accountId);

    if (!exporter) {
      console.info('Unable to verify exporter account sign in code - no exporter exists with the provided ID');

      return {
        success: false,
      };
    }

    if (!exporter.otpSalt || !exporter.otpHash || !exporter.otpExpiry) {
      console.info('Unable to verify exporter account sign in code - no OTP available for this account');

      return {
        success: false,
      };
    }

    const { otpSalt, otpHash, otpExpiry } = exporter;

    // check that the verification period has not expired.
    const now = new Date();

    const hasExpired = isAfter(now, otpExpiry);

    if (hasExpired) {
      console.info('Unable to verify exporter account sign in code - verification period has expired');

      return {
        success: false,
        expired: true,
      };
    }

    // check if the sign in code is valid
    const isValid = otpSalt && otpHash && isValidOTP(securityCode, otpSalt, otpHash);

    if (isValid) {
      // create JWT
      const jwt = create.JWT(accountId);

      // update the account and nullify OTP fields.
      const { sessionIdentifier } = jwt;

      const accountUpdate = {
        sessionIdentifier,
        sessionExpiry: SESSION_EXPIRY(),
        otpSalt: '',
        otpHash: '',
        otpExpiry: null,
      };

      await context.db.Exporter.updateOne({
        where: { id: accountId },
        data: accountUpdate,
      });

      return {
        success: true,
        accountId: exporter.id,
        lastName: exporter.lastName,
        firstName: exporter.firstName,
        ...jwt,
        expires: accountUpdate.sessionExpiry,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying exporter account sign in code and generating JWT (verifyAccountSignInCode mutation) ${err}`);
  }
};

export default verifyAccountSignInCode;
