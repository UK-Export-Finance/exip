import crypto from 'crypto';
import { authenticator } from 'otplib';
import { ACCOUNT } from '../constants';

const { PASSWORD, OTP } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM },
} = PASSWORD;

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
    throw new Error(`Error generating OTP ${err}`);
  }
};

const generate = {
  otp: generateOtp,
};

export default generate;
