import { Context } from '.keystone/types'; // eslint-disable-line
import crypto from 'crypto';
import { ACCOUNT } from '../../constants';
import getAccountByField from '../../helpers/get-account-by-field';
import encryptPassword from '../../helpers/encrypt-password';
import getFullNameString from '../../helpers/get-full-name-string';
import sendEmail from '../../emails';
import { AccountCreationVariables } from '../../types';

const { EMAIL, ENCRYPTION } = ACCOUNT;

const {
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

const createAnAccount = async (root: any, variables: AccountCreationVariables, context: Context) => {
  console.info('Creating new account for ', variables.email);

  try {
    const { urlOrigin, firstName, lastName, email, password } = variables;

    // check if an account with the email already exists
    const account = await getAccountByField(context, 'email', email);

    if (account) {
      console.info(`Unable to create a new account for ${variables.email} - account already exists`);

      return { success: false };
    }

    // generate encrypted password
    const { salt, hash } = encryptPassword(password);

    // generate email verification hash/token and expiry.
    const verificationHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const verificationExpiry = EMAIL.VERIFICATION_EXPIRY();

    const now = new Date();

    // create account data
    const accountData = {
      firstName,
      lastName,
      email,
      salt,
      hash,
      verificationHash,
      verificationExpiry,
      createdAt: now,
      updatedAt: now,
    };

    const creationResponse = await context.db.Account.createOne({
      data: accountData,
    });

    // send "confirm email address" email
    const name = getFullNameString(creationResponse);

    const emailResponse = await sendEmail.confirmEmailAddress(email, urlOrigin, name, verificationHash);

    if (emailResponse.success) {
      return {
        ...creationResponse,
        verificationHash,
        success: true,
      };
    }

    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    throw new Error(`Creating a new account ${err}`);
  }
};

export default createAnAccount;
