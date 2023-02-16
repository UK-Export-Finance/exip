import crypto from 'crypto';
import { ACCOUNT } from '../constants';
import { Account } from '../types';

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM },
} = ACCOUNT.PASSWORD;

const generatePassword = (password: string) => {
  const salt = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

  return {
    salt,
    hash,
  };
};

// TODO: mock password as .env

export const mockAccount = {
  firstName: 'first',
  lastName: 'last',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT,
  // salt: 'mockSalt',
  // hash: 'mockHash',
  ...generatePassword('AmazingPassword123!'),
  isVerified: false,
  verificationHash: 'mockVerificationHash',
  verificationExpiry: ACCOUNT.EMAIL.VERIFICATION_EXPIRY(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as Account;
