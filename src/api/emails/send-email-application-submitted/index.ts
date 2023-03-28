import { Context } from '.keystone/types'; // eslint-disable-line
import sendEmail from '../index';
import getExporterById from '../../helpers/get-exporter-by-id';
import { SubmitApplicationResponse } from '../../types';

/**
 * sendEmailApplicationSubmitted
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailConfirmEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag and emailRecipient
 */
const sendEmailApplicationSubmitted = async (
  context: Context,
  accountId: string,
  buyerId: string,
  referenceNumber: number,
): Promise<SubmitApplicationResponse> => {
  try {
    // get the exporter
    const exporter = await getExporterById(context, accountId);

    // ensure that we have found an acount with the requsted ID.
    if (!exporter) {
      console.info('Sending email to exporter - application submitted - no exporter exists with the provided ID');

      return {
        success: false,
      };
    }

    // get the buyer
    const buyer = await context.db.Buyer.findOne({
      where: { id: buyerId },
    });

    if (!buyer) {
      console.info('Sending email to exporter - application submitted - no buyer exists with the provided ID');

      return {
        success: false,
      };
    }

    const buyerName = buyer.companyOrOrganisationName;

    // send "application submitted" email.
    const { email, firstName } = exporter;

    const emailResponse = await sendEmail.applicationSubmittedEmail(email, firstName, referenceNumber, buyerName);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email to exporter - application submitted ${emailResponse}`);
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email to exporter - application submitted ${err}`);
  }
};

export default sendEmailApplicationSubmitted;
