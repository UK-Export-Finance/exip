import { ACCOUNT } from '../../../constants';
import getAccountById from '../../../helpers/get-account-by-id';
import isValidOTP from '../../../helpers/is-valid-otp';
import deleteAuthenticationRetries from '../../../helpers/delete-authentication-retries';
import create from '../../../helpers/create-jwt';
import update from '../../../helpers/update-account';
import { dateIsInThePast } from '../../../helpers/date';
import { Context, VerifyAccountSignInCodeVariables, VerifyAccountSignInCodeResponse } from '../../../types';

const {
  JWT: { SESSION_EXPIRY },
} = ACCOUNT;

/**
 * verifyAccountSignInCode
 * Check if a OTP/access code is valid and if so, wipe the retry entries and generate and return a JWT
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the AccountSignIn mutation
 * @param {Context} KeystoneJS context API
 * @returns {Promise<Object>} Object with success or expired flag.
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
    const hasExpired = dateIsInThePast(otpExpiry);

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
      console.info('Verified account sign in code - creating JWT and updating account');

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

      await update.account(context, accountId, accountUpdate);

      return {
        success: true,
        accountId: account.id,
        lastName: account.lastName,
        firstName: account.firstName,
        email: account.email,
        ...jwt,
        expires: String(accountUpdate.sessionExpiry),
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error('Error verifying account sign in code and generating JWT (verifyAccountSignInCode mutation) %O', err);
    throw new Error(`Verifying account sign in code and generating JWT (verifyAccountSignInCode mutation) ${err}`);
  }
};

export default verifyAccountSignInCode;
