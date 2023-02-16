import { Context } from '.keystone/types'; // eslint-disable-line
import { isBefore } from 'date-fns';
import getAccountByField from '../helpers/get-account-by-field';
import { VerifyEmailAddressVariables } from '../types';

/**
 * verifyAccountEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the VerifyEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success or expired flag.
 */
const verifyAccountEmailAddress = async (root: any, variables: VerifyEmailAddressVariables, context: Context) => {
  try {
    console.info('Verifying exporter email address');

    // get the account the token is associated with.
    const exporter = await getAccountByField(context, 'verificationHash', variables.token);

    if (exporter) {
      // check that the verification period has not expired.
      const now = new Date();
      const canActivateExporter = isBefore(now, exporter.verificationExpiry);

      if (!canActivateExporter) {
        console.info('Unable to verify exporter email - verification period has expired');

        return {
          expired: true,
        };
      }

      // mark the account has verified and nullify the verification hash and expiry.
      await context.db.Exporter.updateOne({
        where: { id: exporter.id },
        data: {
          isVerified: true,
          verificationHash: '',
          verificationExpiry: null,
        },
      });

      return {
        success: true,
        emailRecipient: exporter.email,
      };
    }

    // no account associated with the provided token.
    return {
      success: false,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying exporter email address ${err}`);
  }
};

export default verifyAccountEmailAddress;
