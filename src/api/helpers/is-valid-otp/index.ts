import crypto from 'crypto';
import { ACCOUNT } from '../../constants';

const { ENCRYPTION } = ACCOUNT;

const {
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  OTP: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

/**
 * isValidOTP
 * Check if the provided OTP/access code is valid
 * @param {number} OTP/access code
 * @param {string} OTP salt
 * @param {string} OTP hash
 * @returns {boolean}
 */
const isValidOTP = (securityCode: string, otpSalt: string, otpHash: string) => {
  try {
    console.info('Validating OTP');

    const hashVerify = crypto.pbkdf2Sync(securityCode, otpSalt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    if (otpHash === hashVerify) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error validating OTP %o', error);

    throw new Error(`Error validating OTP ${error}`);
  }
};

export default isValidOTP;
