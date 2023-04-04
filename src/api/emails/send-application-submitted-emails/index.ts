import { Context } from '.keystone/types'; // eslint-disable-line
import sendEmail from '../index';
import getExporterById from '../../helpers/get-exporter-by-id';
import { ANSWERS, EMAIL_TEMPLATE_IDS } from '../../constants';
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
  exporterCompanyId: string,
): Promise<SubmitApplicationResponse> => {
  try {
    // get the application's exporter
    const exporter = await getExporterById(context, accountId);

    // ensure that we have found an acount with the requsted ID.
    if (!exporter) {
      console.error('Sending application submitted emails - no exporter exists with the provided ID');

      return {
        success: false,
      };
    }

    // get the application's buyer
    const buyer = await context.db.Buyer.findOne({
      where: { id: buyerId },
    });

    if (!buyer) {
      console.error('Sending application submitted emails - no buyer exists with the provided ID');

      return {
        success: false,
      };
    }

    // get the application's declarations
    const declaration = await context.db.Declaration.findOne({
      where: { id: declarationId },
    });

    if (!declaration) {
      console.error('Sending application submitted emails - no declarations exist with the provided ID');

      return {
        success: false,
      };
    }

    // get the exporter's company
    const exporterCompany = await context.db.ExporterCompany.findOne({
      where: { id: exporterCompanyId },
    });

    if (!exporterCompany) {
      console.error('Sending application submitted emails - no exporter company exists with the provided ID');

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
      exporterCompanyName: exporterCompany.companyName,
      // TODO: EMS-1273 to remove below
      linkToFile: '',
    } as ApplicationSubmissionEmailVariables;

    // send "application submitted" email to the exporter
    const exporterSubmittedResponse = await sendEmail.applicationSubmitted.exporter(sendEmailVars);

    if (!exporterSubmittedResponse.success) {
      throw new Error('Sending application submitted email to exporter');
    }

    // send "application submitted" email to the underwriting team
    const underwritingTeamSubmittedResponse = await sendEmail.applicationSubmitted.underwritingTeam(sendEmailVars);

    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error('Sending application submitted email to underwriting team');
    }

    // send "documents" email to the exporter depending on submitted answers
    let documentsResponse;

    let templateId = '';

    const hasAntiBriberyCodeOfConduct = declaration.hasAntiBriberyCodeOfConduct === ANSWERS.YES;

    if (hasAntiBriberyCodeOfConduct) {
      templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;
    }

    const isConectedWithBuyer = buyer.exporterIsConnectedWithBuyer && buyer.exporterIsConnectedWithBuyer === ANSWERS.YES;

    if (isConectedWithBuyer) {
      templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;
    }

    if (hasAntiBriberyCodeOfConduct && isConectedWithBuyer) {
      templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;
    }

    if (templateId) {
      documentsResponse = await sendEmail.documentsEmail(sendEmailVars, templateId);

      if (documentsResponse.success) {
        return documentsResponse;
      }

      throw new Error(`Sending application submitted emails ${documentsResponse}`);
    }

    // no need to send "documents" email
    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    throw new Error(`Sending application submitted emails ${err}`);
  }
};

const applicationSubmittedEmails = {
  send,
};

export default applicationSubmittedEmails;
