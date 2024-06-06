import confirmEmailAddressEmail from '../../../../helpers/send-email-confirm-email-address';
import generateOTPAndUpdateAccount from '../../../../helpers/generate-otp-and-update-account';
import getFullNameString from '../../../../helpers/get-full-name-string';
import sendEmail from '../../../../emails';
import { Account, Context } from '../../../../types';

/**
 * accountSignInChecks
 * Assuming that a provided password is valid, check if the account is verified.
 * If not, this means that the user has not verified their email address. We can therefore:
 * 1) Reset the account's verification expiry.
 * 2) Re-send the verification link email that was sent during account creation.
 *
 * Otherwise, the account is verified. We can therefore:
 * 1) Generate an OTP
 * 2) Update the account
 * 3) Send an email with the OTP
 *
 * @param {Context} KeystoneJS context API
 * @param {Account} Account
 * @param {String} URL origin
 * @returns {Promise<Object>} Object with success flag
 */
const accountSignInChecks = async (context: Context, account: Account, urlOrigin: string) => {
  try {
    console.info('Signing in account - checking account');

    const { id: accountId, email } = account;

    if (!account.status.isVerified) {
      console.info('Unable to sign in account - account has not been verified yet. Sending a new email verification');

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

    console.info('Signing in account - account is verified. Generating and sending an OTP');

    /**
     * Generate an OTP.
     * Update the account.
     */
    const { securityCode } = await generateOTPAndUpdateAccount(context, accountId);

    /**
     * Send the "security code" email.
     * Return a response.
     */
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
    console.error('Error validating password or sending email(s) for account sign in (accountSignIn mutation - account checks) %O', err);

    throw new Error(`Validating password or sending email(s) for account sign in (accountSignIn mutation - account checks) ${err}`);
  }
};

export default accountSignInChecks;
