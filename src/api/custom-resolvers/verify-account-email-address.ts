import { Context } from '.keystone/types'; // eslint-disable-line
import { isBefore } from 'date-fns';
import { Account, VerifyEmailAddressVariables } from '../types';

/**
 * verifyAccountEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the VerifyEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success or expired flag.
 */
const verifyAccountEmailAddress = async (root: any, variables: VerifyEmailAddressVariables, context: Context) => {
  console.info('Verifying exporter email address');

  try {
    /**
     * Get the account this token is associated with.
     * NOTE: Keystone has a limitation where you can't findOne by a field that is NOT the id.
     * Therefore we have to use findMany, which has a performance impact.
     * Because this is low volume service, there is no need to improve this.
     * However if volumes increase dramatically we will need to improve this.
     */
    const exportersArray = await context.db.Exporter.findMany({
      where: {
        verificationHash: { equals: variables.token },
      },
      take: 1,
    });

    // ensure that we have found an acount with the requsted verification hash.
    if (!exportersArray || !exportersArray.length || !exportersArray[0]) {
      console.info('Verifying exporter email - no exporter exists with the provided token');

      return {
        expired: true,
      };
    }

    const exporter = exportersArray[0] as Account;

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
  } catch (err) {
    throw new Error(`Verifying exporter email address ${err}`);
  }
};

export default verifyAccountEmailAddress;
