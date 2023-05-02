import sendEmail from '../index';
import getApplicationSubmittedEmailTemplateIds from '../../helpers/get-application-submitted-email-template-ids';
import { SuccessResponse, ApplicationSubmissionEmailVariables, Application } from '../../types';

/**
 * applicationSubmittedEmails.send
 * Send "application submitted" emails
 * @param {Object} Application
 * @param {String} Path to CSV file for underwriting team email
 * @returns {Object} Object with success flag and emailRecipient
 */
const send = async (application: Application, csvPath: string): Promise<SuccessResponse> => {
  try {
    const { referenceNumber, exporter, exporterCompany, buyer } = application as Application;

    // generate email variables
    const { email, firstName } = exporter;

    const sendEmailVars = {
      emailAddress: email,
      firstName,
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
      buyerLocation: buyer.country?.name,
      exporterCompanyName: exporterCompany.companyName,
    } as ApplicationSubmissionEmailVariables;

    // send "application submitted" email receipt to the exporter
    const exporterSubmittedResponse = await sendEmail.applicationSubmitted.exporter(sendEmailVars);

    if (!exporterSubmittedResponse.success) {
      throw new Error('Sending application submitted email to exporter');
    }

    // get email template IDs depending on the submitted answers
    const templateIds = getApplicationSubmittedEmailTemplateIds(application);

    // send "application submitted" email to the underwriting team
    const underwritingTeamSubmittedResponse = await sendEmail.applicationSubmitted.underwritingTeam(sendEmailVars, csvPath, templateIds.underwritingTeam);

    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error('Sending application submitted email to underwriting team');
    }

    // send "documents" email to the exporter depending on submitted answers
    if (templateIds.exporter) {
      const documentsResponse = await sendEmail.documentsEmail(sendEmailVars, templateIds.exporter);

      if (!documentsResponse.success) {
        throw new Error(`Sending application submitted emails ${documentsResponse}`);
      }
    }

    // no need to send "documents" email to exporter
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
