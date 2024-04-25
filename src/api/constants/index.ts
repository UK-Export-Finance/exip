import dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';
import { BufferEncoding } from '../types';
export * from './field-ids';
export * from './allowed-graphql-resolvers';
export * from './answers';
export * from './application';
export * from './cover-period';
export * from './external-apis';
export * from './field-values';
export * from './supported-currencies';
export * from './total-contract-value';
export * from './XLSX-CONFIG';

dotenv.config();

export const GBP_CURRENCY_CODE = 'GBP';

/**
 * DATE_24_HOURS_FROM_NOW
 * Generate a date that is 24 hours from now
 * @returns {Date}
 */
export const DATE_24_HOURS_FROM_NOW = () => {
  const now = new Date();

  const day = now.getDate();

  // add 1 day to the current time.
  const tomorrow = new Date(now.setDate(day + 1));

  return tomorrow;
};

/**
 * DATE_24_HOURS_IN_THE_PAST
 * Generate a date that is 24 hours in the past
 * @returns {Date}
 */
export const DATE_24_HOURS_IN_THE_PAST = () => {
  const now = new Date();

  const day = now.getDate();

  // subtract 1 day from the current day.
  const yesterday = new Date(now.setDate(day - 1));

  return yesterday;
};

/**
 * DATE_30_MINUTES_FROM_NOW
 * Generate a date that is 30 minutes from now
 * @returns {Date}
 */
const DATE_30_MINUTES_FROM_NOW = () => {
  const now = new Date();

  const minutes = 30;

  // milliseconds in a minute
  const milliseconds = 60000;

  // add 30 minutes of milliseconds to the current time.
  const future = new Date(now.getTime() + minutes * milliseconds);

  return future;
};

/**
 * DATE_ONE_MINUTE_IN_THE_PAST
 * Generate a date that is 1 minute in the past.
 * @returns {Date}
 */
export const DATE_ONE_MINUTE_IN_THE_PAST = () => {
  const now = new Date();

  const MS_PER_MINUTE = 60000;

  const oneMinuteInThePast = new Date(now.getTime() - 1 * MS_PER_MINUTE);

  return oneMinuteInThePast;
};

export const ACCOUNT = {
  EMAIL: {
    VERIFICATION_EXPIRY: DATE_24_HOURS_FROM_NOW,
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
  PASSWORD_RESET_EXPIRY: DATE_30_MINUTES_FROM_NOW,
  // One time password
  OTP: {
    DIGITS: 6,
    VERIFICATION_EXPIRY: DATE_30_MINUTES_FROM_NOW,
  },
  REACTIVATION_EXPIRY: DATE_24_HOURS_FROM_NOW,
  // JSON web token
  JWT: {
    KEY: {
      SIGNATURE: String(process.env.JWT_SIGNING_KEY),
      ENCODING: 'base64' as BufferEncoding,
      STRING_ENCODING: 'ascii' as BufferEncoding,
    },
    TOKEN: {
      EXPIRY: '12h',
      ALGORITHM: 'RS256' as Algorithm,
    },
    SESSION_EXPIRY: () => {
      // 12 hours from now
      const now = new Date();

      const hours = 12;
      const seconds = 60 * 60 * 1000;

      const future = new Date(now.getTime() + hours * seconds);

      return future;
    },
  },
  MAX_AUTH_RETRIES: 6,
  /**
   * MAX_AUTH_RETRIES_TIMEFRAME
   * Generate a date that is 24 hours ago from now
   * To be safe, we use time rather than subtracting a day.
   */
  MAX_AUTH_RETRIES_TIMEFRAME: DATE_24_HOURS_IN_THE_PAST(),
};

/**
 * default object for data encryption
 * if no data or initialisation vector provided
 * then empty string for value and iv must be saved to database
 * eg. if wiping field, then empty string will wipe data
 * replaced by values if data and initalisation vector provided
 */
export const DEFAULT_ENCRYPTION_SAVE_OBJECT = {
  value: '',
  iv: '',
};

export const FINANCIAL_DETAILS = {
  ENCRYPTION: {
    CIPHER: {
      ENCODING: 'hex' as BufferEncoding,
      STRING_ENCODING: 'base64' as BufferEncoding,
      ENCRYPTION_METHOD: 'aes-256-cbc',
      OUTPUT_ENCODING: 'utf-8' as BufferEncoding,
    },
    KEY: {
      ALGORITHM: 'sha512' as Algorithm,
      SIGNATURE: String(process.env.LOSS_PAYEE_ENCRYPTION_KEY),
      SUBSTRING_INDEX_START: 0,
      SUBSTRING_INDEX_END: 32,
    },
    IV: {
      BYTES_SIZE: 16,
      ENCODING: 'base64' as BufferEncoding,
      SLICE_INDEX_START: 0,
      SLICE_INDEX_END: 16,
    },
  },
};

export const EMAIL_TEMPLATE_IDS = {
  ACCOUNT: {
    CONFIRM_EMAIL: '24022e94-171c-4044-b0ee-d22418116575',
    ACCESS_CODE: 'b92650d1-9187-4510-ace2-5eec7ca7e626',
    PASSWORD_RESET: '86d5f582-e1d3-4b55-b103-50141401fd13',
    REACTIVATE_ACCOUNT_CONFIRM_EMAIL: '2abf173a-52fc-4ec8-b28c-d7a862b8cf37',
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
        NOTIFICATION_TRADING_HISTORY: '34457439-bf9c-46e3-bd05-b8732ed682fb',
        NOTIFICATION_ANTI_BRIBERY: '8be12c98-b2c7-4992-8920-925aa37b6391',
        NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY: '7f0541dd-1dae-4d51-9ebc-87d2a624f8d2',
        NO_DOCUMENTS: '65b517c6-ae86-470b-9448-194ae5ac44bb',
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
  EMAIL_TEXT: {
    verySatisfied: 'Very satisfied',
    satisfied: 'Satisfied',
    neither: 'Neither satisfied or dissatisfied',
    dissatisfied: 'Dissatisfied',
    veryDissatisfied: 'Very dissatisfied',
  },
};

export const ACCEPTED_FILE_TYPES = ['.xlsx'];

export const DATE_FORMAT = {
  DEFAULT: 'd MMMM yyyy',
  HOURS_AND_MINUTES: 'HH:mm',
};

export const ORDNANCE_SURVEY_QUERY_URL = '/search/places/v1/postcode?postcode=';
