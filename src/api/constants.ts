import dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';
import { BufferEncoding } from './types';

dotenv.config();

export const ANSWERS = {
  YES: 'Yes',
  NO: 'No',
};

export const APPLICATION = {
  SUBMISSION_TYPE: {
    MIA: 'Manual Inclusion Application',
  },
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  POLICY_TYPE: {
    SINGLE: 'Single contract policy',
    MULTIPLE: 'Multiple contract policy',
  },
  POLICY_AND_EXPORT: {
    TOTAL_VALUE_OF_CONTRACT: {
      MINIMUM: 1,
      MAXIMUM: 499999,
    },
  },
  STATUS: {
    DRAFT: 'Draft',
    SUBMITTED: 'Submitted to UKEF',
  },
};

export const FIELD_IDS = {
  ACCOUNT: {
    EMAIL: 'email',
    VERIFICATION_HASH: 'verificationHash',
  },
};

export const ACCOUNT = {
  EMAIL: {
    VERIFICATION_EXPIRY: () => {
      // 24 hours from now
      const now = new Date();
      const day = now.getDate();

      const tomorrow = new Date(now.setDate(day + 1));

      return tomorrow;
    },
  },
  ENCRYPTION: {
    RANDOM_BYTES_SIZE: 32,
    STRING_TYPE: 'hex' as BufferEncoding,
    PBKDF2: {
      ITERATIONS: 10000,
      DIGEST_ALGORITHM: 'sha512',
    },

    PASSWORD: {
      PBKDF2: {
        KEY_LENGTH: 64,
      },
    },
    OTP: {
      PBKDF2: {
        KEY_LENGTH: 128,
      },
    },
  },
  // One time password
  OTP: {
    DIGITS: 6,
    VERIFICATION_EXPIRY: () => {
      // 5 minutes from now
      const now = new Date();

      const milliseconds = 300000;
      const future = new Date(now.setMilliseconds(milliseconds));

      return future;
    },
  },
  // JSON web token
  JWT: {
    KEY: {
      SIGNATURE: String(process.env.JWT_SIGNING_KEY),
      ENCODING: 'base64' as BufferEncoding,
      STRING_ENCODING: 'ascii' as BufferEncoding,
    },
    TOKEN: {
      EXPIRY: '8h',
      ALGORITHM: 'RS256' as Algorithm,
    },
    SESSION_EXPIRY: () => {
      // 8 hours from now
      const now = new Date();

      const hours = 8;
      const seconds = 60 * 60 * 1000;

      const future = new Date(now.getTime() + hours * seconds);

      return future;
    },
  },
};

export const EMAIL_TEMPLATE_IDS = {
  ACCOUNT: {
    CONFIRM_EMAIL: '24022e94-171c-4044-b0ee-d22418116575',
    SECURITY_CODE: 'b92650d1-9187-4510-ace2-5eec7ca7e626',
  },
};
