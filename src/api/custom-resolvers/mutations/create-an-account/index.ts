import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import getAccountByField from '../../../helpers/get-account-by-field';
import encryptPassword from '../../../helpers/encrypt-password';
import generateAccountVerificationHash from '../../../helpers/get-account-verification-hash';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import { AccountCreationVariables, AccountCreationCore, Context } from '../../../types';

/**
 * createAnAccount
 * Create an account.
 * 1) Check if an account with the same email already exists.
 * 2) Create email verification hash/token.
 * 3) Create initial account data.
 * 4) Create account status connection
 * 5) Send "confirm email address" email.
 * @param {Object} GraphQL root variables
 * @param {AccountCreationVariables} GraphQL variables for the CreateAnAccount mutation
 * @param {Context} KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag and some account data
 */
const createAnAccount = async (root: any, variables: AccountCreationVariables, context: Context) => {
  console.info('Creating new account for %s', variables.email);

  try {
    const { urlOrigin, firstName, lastName, email, password } = variables;

    // check if an account with the email already exists
    const account = await getAccountByField(context, ACCOUNT_FIELD_IDS.EMAIL, email);

    if (account) {
      console.info('Unable to create a new account for %s - account already exists', variables.email);

      return { success: false };
    }

    // generate encrypted password
    const { salt, hash } = encryptPassword(password);

    const now = new Date();

    const { verificationHash, verificationExpiry } = generateAccountVerificationHash(email, salt);

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
    } as AccountCreationCore;

    const creationResponse = await context.db.Account.createOne({
      data: accountData,
    });

    // creates account status relationship
    await context.db.AccountStatus.createOne({
      data: {
        account: {
          connect: {
            id: creationResponse.id,
          },
        },
      },
    });

    // send "confirm email address" email
    const name = getFullNameString(creationResponse);

    const emailResponse = await sendEmail.confirmEmailAddress(email, urlOrigin, name, verificationHash, creationResponse.id);

    if (emailResponse.success) {
      return {
        ...creationResponse,
        verificationHash,
        success: true,
      };
    }

    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    console.error('Error creating a new account %O', err);
    throw new Error(`Creating a new account ${err}`);
  }
};

export default createAnAccount;
