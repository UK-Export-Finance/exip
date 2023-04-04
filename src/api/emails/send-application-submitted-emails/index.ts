import sendEmail from '../index';
import { ANSWERS, EMAIL_TEMPLATE_IDS } from '../../constants';
import { SubmitApplicationResponse, ApplicationSubmissionEmailVariables, Application } from '../../types';

/**
 * applicationSubmittedEmails.send
 * Send "application submitted" emails
 * @param {Object} Application
 * @param {String} Path to CSV file for underwriting team email
 * @returns {Object} Object with success flag and emailRecipient
 */
const send = async (application: Application, csvPath: string): Promise<SubmitApplicationResponse> => {
  try {
    const { referenceNumber, exporter, exporterCompany, buyer, declaration } = application as Application;

    // generate email variables
    const { email, firstName } = exporter;

    const sendEmailVars = {
      emailAddress: email,
      firstName,
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
      exporterCompanyName: exporterCompany.companyName,
    } as ApplicationSubmissionEmailVariables;

    // send "application submitted" email to the exporter
    const exporterSubmittedResponse = await sendEmail.applicationSubmitted.exporter(sendEmailVars);

    if (!exporterSubmittedResponse.success) {
      throw new Error('Sending application submitted email to exporter');
    }

    // send "application submitted" email to the underwriting team

    const underwritingTeamSubmittedResponse = await sendEmail.applicationSubmitted.underwritingTeam(sendEmailVars, csvPath);

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

      if (!documentsResponse.success) {
        throw new Error(`Sending application submitted emails ${documentsResponse}`);
      }
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
