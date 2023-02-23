import dotenv from 'dotenv';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import { Context } from '.keystone/types'; // eslint-disable-line
import { ACCOUNT } from '../constants';
import isValidOTP from '../helpers/is-valid-otp';
import { Account, VerifyAccountSignInCodeVariables, VerifyAccountSignInCodeResponse } from '../types';

dotenv.config();

const {
  ENCRYPTION: { RANDOM_BYTES_SIZE, STRING_TYPE },
  JWT: {
    KEY: { SIGNATURE, ENCODING, STRING_ENCODING },
    TOKEN: { EXPIRY },
    SESSION_EXPIRY,
  },
} = ACCOUNT;

const PRIV_KEY = Buffer.from(SIGNATURE, ENCODING).toString(STRING_ENCODING);

const createJWT = (accountId: string) => {
  const sessionIdentifier = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

  const expiresIn = EXPIRY;

  const payload = {
    sub: accountId,
    iat: Date.now(),
    sessionIdentifier,
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
    sessionIdentifier,
  };
};

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

    const exporter = (await context.db.Exporter.findOne({
      where: { id: accountId },
    })) as Account;

    if (!exporter) {
      return {
        success: false,
      };
    }

    const { otpSalt, otpHash } = exporter;

    // TODO:
    // check that the verification period has not expired. If so, return expired=true

    // check if the sign in code is valid
    const isValid = otpSalt && otpHash && isValidOTP(securityCode, otpSalt, otpHash);

    if (isValid) {
      // create JWT
      const jwt = createJWT(accountId);

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
