import sendEmail from '../index';
import getFullNameString from '../../helpers/get-full-name-string';
import getApplicationSubmittedEmailTemplateIds from '../../helpers/get-application-submitted-email-template-ids';
import formatDate from '../../helpers/format-date';
import { SuccessResponse, ApplicationSubmissionEmailVariables, Application } from '../../types';

/**
 * applicationSubmittedEmails.send
 * Send "application submitted" emails
 * @param {Application}
 * @param {String} Path to XLSX file for underwriting team email
 * @returns {Promise<Object>} Object with success flag and emailRecipient
 */
const send = async (application: Application, xlsxPath: string): Promise<SuccessResponse> => {
  try {
    const { referenceNumber, owner, company, buyer, policy, policyContact } = application;

    // generate email variables
    const { email } = owner;

    // shared variables for sending email
    const sharedEmailVars = {
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
      buyerLocation: buyer.country?.name,
      companyName: company.companyName,
      requestedStartDate: formatDate(policy.requestedStartDate),
    };

    // email variables for sending email to application owner of application
    const sendOwnerEmailVars = {
      ...sharedEmailVars,
      name: getFullNameString(owner),
      emailAddress: email,
    } as ApplicationSubmissionEmailVariables;

    // email variables for sending email to policy contact named on application
    const sendContactEmailVars = {
      ...sharedEmailVars,
      name: getFullNameString(policyContact),
      emailAddress: policyContact.email,
    } as ApplicationSubmissionEmailVariables;

    console.info('Sending application submitted email to application account owner: %s', sendOwnerEmailVars.emailAddress);
    // send "application submitted" email receipt to the application owner
    const accountSubmittedResponse = await sendEmail.application.submittedEmail(sendOwnerEmailVars);

    if (!accountSubmittedResponse.success) {
      throw new Error('Sending application submitted email to owner/account');
    }

    /**
     * if the policy contact email address is different to the application owner,
     * send the same "application submitted" email receipt to the contact email address
     */
    if (!policyContact.isSameAsOwner) {
      console.info('Sending application submitted email to policy contact email: %s', sendContactEmailVars.emailAddress);
      const contactSubmittedResponse = await sendEmail.application.submittedEmail(sendContactEmailVars);

      if (!contactSubmittedResponse.success) {
        throw new Error('Sending application submitted email to contact');
      }
    }

    // get email template IDs depending on the submitted answers
    const templateIds = getApplicationSubmittedEmailTemplateIds(application);

    // send "application submitted" email to the underwriting team
    const underwritingTeamSubmittedResponse = await sendEmail.application.underwritingTeam(sendOwnerEmailVars, xlsxPath, templateIds.underwritingTeam);

    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error('Sending application submitted email to underwriting team');
    }

    // send "documents" email to the applicant depending on submitted answers
    if (templateIds.account) {
      console.info('Sending documents email to application owner: %s', sendOwnerEmailVars.emailAddress);
      const documentsResponse = await sendEmail.documentsEmail(sendOwnerEmailVars, templateIds.account);

      if (!documentsResponse.success) {
        throw new Error(`Sending application documents emails ${documentsResponse}`);
      }

      /**
       * if the contact email address is different to the application owner,
       * send the same "application submitted" email receipt to the contact email address
       */
      if (!policyContact.isSameAsOwner) {
        console.info('Sending documents email to policy contact: %s', sendContactEmailVars.emailAddress);
        const contactDocumentsResponse = await sendEmail.documentsEmail(sendContactEmailVars, templateIds.account);

        if (!contactDocumentsResponse.success) {
          throw new Error(`Sending application documents emails to contact ${documentsResponse}`);
        }
      }
    }

    // no need to send "documents" email to the applicant
    return {
      success: true,
    };
  } catch (err) {
    console.error('Error sending application submitted emails %O', err);

    throw new Error(`Sending application submitted emails ${err}`);
  }
};

const applicationSubmittedEmails = {
  send,
};

export default applicationSubmittedEmails;
