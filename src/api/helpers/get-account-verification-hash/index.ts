import crypto from 'crypto';
import { ACCOUNT } from '../../constants';
import { Account } from '../../types';

const { EMAIL, ENCRYPTION } = ACCOUNT;

const {
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

const generateAccountVerificationHash = (email: string, salt: string) => {
  const verificationHash = crypto.pbkdf2Sync(email, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

  const verificationExpiry = EMAIL.VERIFICATION_EXPIRY();

  return {
    verificationHash,
    verificationExpiry,
  };
};

export default generateAccountVerificationHash;
