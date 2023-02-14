import { EMAIL_TEMPLATE_IDS } from '../constants';
import notify from '../integrations/notify';
import { Account } from '../types';

/**
 * confirmEmailAddress
 * @param {Object} Exporter account
 * @returns {Object} Object with success flag and emailRecipient
 */
const confirmEmailAddress = async (account: Account) => {
  try {
    console.info('Sending email verification for account creation');
    // send "confirm email" email with verification token/hash.
    const { email, firstName, verificationHash } = account;

    const emailResponse = await notify.sendEmail(EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL, email, firstName, verificationHash);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email verification for account creation ${err}`);
  }
};

const sendEmail = {
  confirmEmailAddress,
};

export default sendEmail;
