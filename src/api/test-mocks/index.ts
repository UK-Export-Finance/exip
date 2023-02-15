import { ACCOUNT } from '../constants';
import { Account } from '../types';

export const mockAccount = {
  firstName: 'first',
  lastName: 'last',
  email: process.env.GOV_NOTIFY_API_KEY,
  salt: 'mockSalt',
  hash: 'mockHash',
  isVerified: false,
  verificationHash: 'mockVerificationHash',
  verificationExpiry: ACCOUNT.EMAIL.VERIFICATION_EXPIRY(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as Account;
