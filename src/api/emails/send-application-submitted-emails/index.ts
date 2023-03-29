import { Context } from '.keystone/types'; // eslint-disable-line
import sendEmail from '../index';
import getExporterById from '../../helpers/get-exporter-by-id';
import { SubmitApplicationResponse, ApplicationSubmissionEmailVariables } from '../../types';

/**
 * applicationSubmittedEmails.send
 * Send "application submitted" emails
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailConfirmEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag and emailRecipient
 */
const send = async (
  context: Context,
  referenceNumber: number,
  accountId: string,
  buyerId: string,
  declarationId: string,
): Promise<SubmitApplicationResponse> => {
  try {
    // get the application's exporter
    const exporter = await getExporterById(context, accountId);

    // ensure that we have found an acount with the requsted ID.
    if (!exporter) {
      console.error('Sending application submitted emails to exporter - no exporter exists with the provided ID');

      return {
        success: false,
      };
    }

    // get the application's buyer
    const buyer = await context.db.Buyer.findOne({
      where: { id: buyerId },
    });

    if (!buyer) {
      console.error('Sending application submitted emails to exporter - no buyer exists with the provided ID');

      return {
        success: false,
      };
    }

    // get the application's declarations
    const declaration = await context.db.Declaration.findOne({
      where: { id: declarationId },
    });

    if (!declaration) {
      console.error('Sending application submitted emails to exporter - no declarations exist with the provided ID');

      return {
        success: false,
      };
    }

    // generate email variables
    const { email, firstName } = exporter;

    const sendEmailVars = {
      emailAddress: email,
      firstName,
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
    } as ApplicationSubmissionEmailVariables;

    // send "application submitted" email
    const submittedResponse = await sendEmail.applicationSubmittedEmail(sendEmailVars);

    if (!submittedResponse.success) {
      throw new Error('Sending application submitted emails to exporter');
    }

    // send "documents" email
    let documentsResponse;
    let useAntiBriberyAndTradingHistoryTemplate = false;

    if (buyer.exporterIsConnectedWithBuyer && buyer.exporterIsConnectedWithBuyer === 'Yes') {
      if (declaration.hasAntiBriberyCodeOfConduct === 'Yes') {
        useAntiBriberyAndTradingHistoryTemplate = true;
      }

      documentsResponse = await sendEmail.documentsEmail(sendEmailVars, useAntiBriberyAndTradingHistoryTemplate);

      if (documentsResponse.success) {
        return documentsResponse;
      }
    }

    throw new Error(`Sending application submitted emails to exporter ${documentsResponse}`);
  } catch (err) {
    console.error(err);

    throw new Error(`Sending application submitted emails to exporter ${err}`);
  }
};

const applicationSubmittedEmails = {
  send,
};

export default applicationSubmittedEmails;
