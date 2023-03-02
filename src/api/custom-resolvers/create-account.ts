import { Context } from '.keystone/types'; // eslint-disable-line
import crypto from 'crypto';
import { ACCOUNT } from '../constants';
import getAccountByField from '../helpers/get-account-by-field';
import { AccountCreationVariables } from '../types';

const { EMAIL, ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

const createAccount = async (root: any, variables: AccountCreationVariables, context: Context) => {
  console.info('Creating new exporter account for ', variables.email);

  try {
    const { firstName, lastName, email, password } = variables;

    // check if an account with the email already exists
    const exporter = await getAccountByField(context, 'email', email);

    if (exporter) {
      console.info(`Unable to create new exporter account for ${variables.email} - account already exists`);

      return { success: false };
    }

    const salt = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

    const passwordHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const verificationHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const verificationExpiry = EMAIL.VERIFICATION_EXPIRY();

    const account = {
      firstName,
      lastName,
      email,
      salt,
      hash: passwordHash,
      verificationHash,
      verificationExpiry,
    };

    const response = await context.db.Exporter.createOne({
      data: account,
    });

    return {
      ...response,
      success: true,
    };
  } catch (err) {
    throw new Error(`Creating new exporter account ${err}`);
  }
};

export default createAccount;
