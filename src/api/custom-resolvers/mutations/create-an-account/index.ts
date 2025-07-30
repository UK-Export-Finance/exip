import 'dotenv/config';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import getAccountByField from '../../../helpers/get-account-by-field';
import isValidAccountPassword from '../../../helpers/is-valid-account-password';
import encryptPassword from '../../../helpers/encrypt-password';
import generateAccountVerificationHash from '../../../helpers/get-account-verification-hash';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import sendEmailReactivateAccountLinkHelper from '../../../helpers/send-email-reactivate-account-link';
import { Account, AccountCreationVariables, AccountCreationCore, Context } from '../../../types';

/**
 * createAnAccount
 * Create an account.
 * Check if an account with the same email already exists.
 * If an account already exists:
 * - Validate the provided password.
 * - If the account is unverified, send a "confirm email address" email.
 * - If the account is verified, return "isVerified=true"
 * - If the account is blocked, return "isBlocked=true"
 * - If the password is invalid, return "success=false".
 * If an account does NOT already exist:
 * - Create email verification hash/token.
 * - Create initial account data.
 * - Create account status connection
 * - Send "confirm email address" email.
 * @param {object} root: GraphQL root variables
 * @param {AccountCreationVariables} GraphQL variables for the CreateAnAccount mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<object>} Object with success flag and some account data
 */
const createAnAccount = async (root: any, variables: AccountCreationVariables, context: Context) => {
  console.info('Account creation - %s', variables.email);

  const { NODE_ENV } = process.env;
  const isDevEnvironment = NODE_ENV === 'development';

  try {
    const { urlOrigin, firstName, lastName, email, password } = variables;

    const account = (await getAccountByField(context, ACCOUNT_FIELD_IDS.EMAIL, email)) as Account;

    if (account) {
      console.info('Account creation - account already exists %s', email);

      if (isValidAccountPassword(password, account.salt, account.hash)) {
        console.info('Account creation - account already exists - valid credentials provided %s', email);

        /**
         * if account status is blocked,
         * send a reactivation email
         * returns object including isBlocked=true
         */
        if (account.status.isBlocked) {
          console.info('Account creation - unable to create a new account - account already exists and is blocked %s', email);

          const { id: accountId } = account;

          const reactivateAccountVariables = {
            accountId,
            urlOrigin,
          };

          console.info('Account creation - resending an email for reactivation %s', email);

          const emailResponse = await sendEmailReactivateAccountLinkHelper.send(reactivateAccountVariables, context);

          if (emailResponse.success) {
            return {
              id: accountId,
              success: true,
              alreadyExists: true,
              isVerified: false,
              isBlocked: true,
            };
          }

          return {
            success: false,
            alreadyExists: true,
          };
        }

        if (!account.status.isVerified) {
          console.info('Account creation - unable to create a new account - account already exists and is not verified %s', email);

          const { id: accountId } = account;

          console.info('Account creation - resending an email verification for %s', email);

          const emailResponse = await confirmEmailAddressEmail.send(context, urlOrigin, accountId);

          if (emailResponse.success) {
            return {
              id: accountId,
              success: true,
              alreadyExists: true,
              isVerified: false,
            };
          }
        }

        console.info('Account creation - unable to create a new account - account already exists and is verified %s', email);

        return {
          success: false,
          alreadyExists: true,
          isVerified: true,
        };
      }

      console.info('Account creation - account already exists - invalid credentials provided %s', email);

      return { success: false };
    }
    console.info('Account creation - no existing account found. Generating an encrypted password %s', email);

    const { salt, hash } = encryptPassword(password);

    const now = new Date();

    const { verificationHash, verificationExpiry } = generateAccountVerificationHash(email, salt);

    console.info('Account creation - constructing account data %s', email);

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

    console.info('Account creation - creating account %s', email);

    const creationResponse = await context.db.Account.createOne({
      data: accountData,
    });

    console.info('Account creation - creating account status relationship %s', email);

    const accountId = creationResponse.id;

    await context.db.AccountStatus.createOne({
      data: {
        account: {
          connect: {
            id: accountId,
          },
        },
      },
    });

    /**
     * Generate a full name string.
     * Send "confirm email address" email
     */
    console.info('Account creation - sending an email verification for %s', email);

    const name = getFullNameString(creationResponse);

    /**
     * If running in a dev environment, no need to send emails.
     * Otherwise, we risk reaching the rate limit.
     */
    if (isDevEnvironment) {
      const verificationUrl = `${variables.urlOrigin}/apply/create-account/verify-email?token=${verificationHash}&id=${accountId}`;

      console.info('✅ Account creation (dev environment only) - mimicking sending verification link via email \n%s', verificationUrl);

      return {
        id: accountId,
        verificationHash,
        success: true,
      };
    }

    const emailResponse = await sendEmail.confirmEmailAddress(email, urlOrigin, name, verificationHash, accountId);

    if (emailResponse.success) {
      return {
        id: accountId,
        verificationHash,
        success: true,
      };
    }

    throw new Error(`Account creation - sending email verification for account creation ${emailResponse}`);
  } catch (error) {
    console.error('Error Account creation - creating account %o', error);

    throw new Error(`Account creation - creating account ${error}`);
  }
};

export default createAnAccount;
