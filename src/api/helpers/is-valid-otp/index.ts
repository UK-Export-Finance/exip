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
 * Check if the provided OTP/security code is valid
 * @param {Number} OTP/security code
 * @param {String} OTP salt
 * @param {String} OTP hash
 * @returns {Boolean}
 */
const isValidOTP = (securityCode: string, otpSalt: string, otpHash: string) => {
  try {
    console.info('Validating OTP');

    const hashVerify = crypto.pbkdf2Sync(securityCode, otpSalt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    if (otpHash === hashVerify) {
      return true;
    }

    return false;
  } catch (err) {
    console.error('Error validating OTP %O', err);

    throw new Error(`Error validating OTP ${err}`);
  }
};

export default isValidOTP;
