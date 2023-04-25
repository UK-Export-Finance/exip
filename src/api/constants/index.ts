import dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';
import { BufferEncoding } from '../types';
export * from './field-ids';
export * from './application';
export * from './field-values';

dotenv.config();

export const ANSWERS = {
  YES: 'Yes',
  NO: 'No',
};

export const GBP_CURRENCY_CODE = 'GBP';

export const EXTERNAL_API_ENDPOINTS = {
  MULESOFT_MDM_EA: {
    CURRENCY: '/currency',
    INDUSTRY_SECTORS: '/map-industry-sector?size=1000',
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
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: {
        CONFIRMATION: '2e9084e2-d871-4be7-85d0-0ccc1961b148',
        SEND_DOCUMENTS: {
          TRADING_HISTORY: '1ae4d77e-58d6-460e-99c0-b62bf08d8c52',
          ANTI_BRIBERY: '002e43e3-ca78-4b9c-932f-6833014bb1e4',
          ANTI_BRIBERY_AND_TRADING_HISTORY: '49753c34-24b5-4cad-a7c5-1ab32d711dfe',
        },
      },
      UNDERWRITING_TEAM: {
        NOTIFICATION: '676e4655-1e82-4094-9e3e-387ea91f44df',
      },
    },
  },
  FEEDBACK: {
    INSURANCE: '4d3d7944-e894-4527-aee6-692038c84107',
  },
};

export const FEEDBACK = {
  VERY_SATISFIED: 'verySatisfied',
  SATISFIED: 'satisfied',
  NEITHER: 'neither',
  DISSATISFIED: 'dissatisfied',
  VERY_DISSATISIFED: 'veryDissatisfied',
};
export const ACCEPTED_FILE_TYPES = ['.csv'];
