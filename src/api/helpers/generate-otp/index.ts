import crypto from 'crypto';
import { authenticator } from 'otplib';
import { ACCOUNT } from '../../constants';

const { ENCRYPTION, OTP } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  OTP: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

/**
 * generateOtp
 * Generate a one time password/access code
 * @returns {Object} Access code, salt, hash, expiry date
 */
const generateOtp = () => {
  try {
    console.info('Generating OTP');

    const salt = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

    authenticator.options = { digits: OTP.DIGITS };

    const securityCode = authenticator.generate(salt);

    const hash = crypto.pbkdf2Sync(securityCode, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const expiry = OTP.VERIFICATION_EXPIRY();

    return {
      securityCode,
      salt,
      hash,
      expiry,
    };
  } catch (err) {
    console.error('Error generating OTP %O', err);

    throw new Error(`Error generating OTP ${err}`);
  }
};

const generate = {
  otp: generateOtp,
};

export default generate;
