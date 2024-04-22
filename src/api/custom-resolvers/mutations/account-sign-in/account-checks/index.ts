import { isAfter } from 'date-fns';
import { ACCOUNT } from '../../../../constants';
import confirmEmailAddressEmail from '../../../../helpers/send-email-confirm-email-address';
import generateOTPAndUpdateAccount from '../../../../helpers/generate-otp-and-update-account';
import getFullNameString from '../../../../helpers/get-full-name-string';
import update from '../../../../helpers/update-account';
import sendEmail from '../../../../emails';
import { Account, Context } from '../../../../types';

const { EMAIL } = ACCOUNT;

/**
 * accountChecks
 * Assuming that a provided password is valid, check if the account:
 * 1) Is unverified.
 * 2) Has a verification hash/token.
 * 3) Has a verification hash/token that has not expired.
 *
 * If so, this means that the user has not verified their email address. We can therefore:
 * 1) Reset the account's verification expiry.
 * 2) Re-send the verification link email that was sent during account creation.
 *
 * Otherwise, the account is verified. We can therefore:
 * 1) Generate an OTP
 * 2) Update the account
 * 3) Send an email with the OTP
 *
 * @param {Object} KeystoneJS context API
 * @param {Object} Account
 * @param {String} URL origin
 * @returns {Promise<Object>} Object with success flag
 */
const accountChecks = async (context: Context, account: Account, urlOrigin: string) => {
  try {
    console.info('Signing in account - checking account');

    const { id: accountId, email } = account;

    if (!account.isVerified) {
      console.info('Unable to sign in account - account has not been verified yet');

      const now = new Date();

      const verificationHasExpired = isAfter(now, account.verificationExpiry);

      if (account.verificationHash && !verificationHasExpired) {
        console.info('Account has an unexpired verification token - resetting verification expiry');

        const accountUpdate = {
          verificationExpiry: EMAIL.VERIFICATION_EXPIRY(),
        };

        await update.account(context, accountId, accountUpdate);

        console.info('Account has an unexpired verification token - sending verification email');

        const emailResponse = await confirmEmailAddressEmail.send(context, urlOrigin, accountId);

        if (emailResponse?.success) {
          return {
            success: false,
            resentVerificationEmail: true,
            accountId,
          };
        }

        return { success: false, accountId };
      }

      // reject
      console.info('Unable to sign in account - account has not been verified');

      return { success: false };
    }

    // generate OTP and update the account
    const { securityCode } = await generateOTPAndUpdateAccount(context, accountId);

    // send "security code" email.
    const name = getFullNameString(account);

    const emailResponse = await sendEmail.accessCodeEmail(email, name, securityCode);

    if (emailResponse?.success) {
      return {
        ...emailResponse,
        accountId,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error('Error validating password or sending email for account sign in (accountSignIn mutation - account checks) %O', err);

    throw new Error(`Validating password or sending email for account sign in (accountSignIn mutation - account checks) ${err}`);
  }
};

export default accountChecks;
