import { Context } from '.keystone/types'; // eslint-disable-line
import { isAfter } from 'date-fns';
import { ACCOUNT } from '../../../constants';
import getAccountById from '../../../helpers/get-account-by-id';
import isValidOTP from '../../../helpers/is-valid-otp';
import deleteAuthenticationRetries from '../../../helpers/delete-authentication-retries';
import create from '../../../helpers/create-jwt';
import { VerifyAccountSignInCodeVariables, VerifyAccountSignInCodeResponse } from '../../../types';

const {
  JWT: { SESSION_EXPIRY },
} = ACCOUNT;

/**
 * verifyAccountSignInCode
 * Check if a OTP/security code is valid and if so, wipe the retry entries and generate and return a JWT
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the AccountSignIn mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success or expired flag.
 */
const verifyAccountSignInCode = async (root: any, variables: VerifyAccountSignInCodeVariables, context: Context): Promise<VerifyAccountSignInCodeResponse> => {
  try {
    console.info('Verifying account sign in code');

    const { accountId, securityCode } = variables;

    // get the account
    const account = await getAccountById(context, accountId);

    if (!account) {
      console.info('Unable to verify account sign in code - no account exists with the provided ID');

      return {
        success: false,
      };
    }

    if (!account.otpSalt || !account.otpHash || !account.otpExpiry) {
      console.info('Unable to verify account sign in code - no OTP available for this account');

      return {
        success: false,
      };
    }

    const { otpSalt, otpHash, otpExpiry } = account;

    // check that the verification period has not expired.
    const now = new Date();

    const hasExpired = isAfter(now, otpExpiry);

    if (hasExpired) {
      console.info('Unable to verify account sign in code - verification period has expired');

      return {
        success: false,
        expired: true,
      };
    }

    // check if the sign in code is valid
    const isValid = otpSalt && otpHash && isValidOTP(securityCode, otpSalt, otpHash);

    if (isValid) {
      // delete authentication retries for the account
      await deleteAuthenticationRetries(context, accountId);

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

      await context.db.Account.updateOne({
        where: { id: accountId },
        data: accountUpdate,
      });

      return {
        success: true,
        accountId: account.id,
        lastName: account.lastName,
        firstName: account.firstName,
        email: account.email,
        ...jwt,
        expires: accountUpdate.sessionExpiry,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying account sign in code and generating JWT (verifyAccountSignInCode mutation) ${err}`);
  }
};

export default verifyAccountSignInCode;
