import sendEmail from '../index';
import getFullNameString from '../../helpers/get-full-name-string';
import getApplicationSubmittedEmailTemplateIds from '../../helpers/get-application-submitted-email-template-ids';
import formatDate from '../../helpers/format-date';
import { SuccessResponse, ApplicationSubmissionEmailVariables, Application } from '../../types';

/**
 * applicationSubmittedEmails.send
 * Send "application submitted" emails
 * @param {Object} Application
 * @param {String} Path to XLSX file for underwriting team email
 * @returns {Object} Object with success flag and emailRecipient
 */
const send = async (application: Application, xlsxPath: string): Promise<SuccessResponse> => {
  try {
    const { referenceNumber, owner, company, buyer, policyAndExport } = application as Application;

    // generate email variables
    const { email } = owner;

    const sendEmailVars = {
      emailAddress: email,
      name: getFullNameString(owner),
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
      buyerLocation: buyer.country?.name,
      companyName: company.companyName,
      requestedStartDate: formatDate(policyAndExport.requestedStartDate),
    } as ApplicationSubmissionEmailVariables;

    // send "application submitted" email receipt to the applicant
    const accountSubmittedResponse = await sendEmail.applicationSubmitted.account(sendEmailVars);

    if (!accountSubmittedResponse.success) {
      throw new Error('Sending application submitted email to owner/account');
    }

    // get email template IDs depending on the submitted answers
    const templateIds = getApplicationSubmittedEmailTemplateIds(application);

    // send "application submitted" email to the underwriting team
    const underwritingTeamSubmittedResponse = await sendEmail.applicationSubmitted.underwritingTeam(sendEmailVars, xlsxPath, templateIds.underwritingTeam);

    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error('Sending application submitted email to underwriting team');
    }

    // send "documents" email to the applicant depending on submitted answers
    if (templateIds.account) {
      const documentsResponse = await sendEmail.documentsEmail(sendEmailVars, templateIds.account);

      if (!documentsResponse.success) {
        throw new Error(`Sending application submitted emails ${documentsResponse}`);
      }
    }

    // no need to send "documents" email to the applicant
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
