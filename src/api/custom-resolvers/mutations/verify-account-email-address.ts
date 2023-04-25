import { Context } from '.keystone/types'; // eslint-disable-line
import { isBefore } from 'date-fns';
import { FIELD_IDS } from '../../constants';
import getAccountByField from '../../helpers/get-account-by-field';
import { VerifyEmailAddressVariables, VerifyEmailAddressResponse } from '../../types';

/**
 * verifyAccountEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the VerifyEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success or expired flag.
 */
const verifyAccountEmailAddress = async (root: any, variables: VerifyEmailAddressVariables, context: Context): Promise<VerifyEmailAddressResponse> => {
  try {
    console.info('Verifying exporter email address');

    // get the account the token is associated with.
    const exporter = await getAccountByField(context, FIELD_IDS.INSURANCE.ACCOUNT.VERIFICATION_HASH, variables.token);

    if (exporter) {
      const { id } = exporter;

      // check that the verification period has not expired.
      const now = new Date();
      // const canActivateExporter = isBefore(now, exporter[verificationExpiryFieldId]);
      const canActivateExporter = isBefore(now, exporter.verificationExpiry);

      if (!canActivateExporter) {
        console.info('Unable to verify exporter email - verification period has expired');

        return {
          expired: true,
          success: false,
          accountId: id,
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
        accountId: id,
        emailRecipient: exporter.email,
      };
    }

    console.info('Unable to verify exporter email - no account found');

    return {
      success: false,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying exporter email address ${err}`);
  }
};

export default verifyAccountEmailAddress;
