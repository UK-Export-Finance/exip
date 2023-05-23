import sendEmail from '../index';
import getFullNameString from '../../helpers/get-full-name-string';
import getApplicationSubmittedEmailTemplateIds from '../../helpers/get-application-submitted-email-template-ids';
import isOwnerSameAsContact from '../../helpers/is-owner-same-as-contact';
import formatDate from '../../helpers/format-date';
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
    const { referenceNumber, owner, company, buyer, policyAndExport, business } = application as Application;

    const { businessContactDetail } = business;

    // generate email variables
    const { email } = owner;

    // shared variables for sending email
    const sharedEmailVars = {
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
      buyerLocation: buyer.country?.name,
      companyName: company.companyName,
      requestedStartDate: formatDate(policyAndExport.requestedStartDate),
    };

    // email variables for sending email to business owner of application
    const sendEmailVars = {
      ...sharedEmailVars,
      name: getFullNameString(owner),
      emailAddress: email,
    } as ApplicationSubmissionEmailVariables;

    // email variables for sending email to contact named on application
    const sendContactEmailVars = {
      ...sharedEmailVars,
      name: getFullNameString(businessContactDetail),
      emailAddress: businessContactDetail.email,
    } as ApplicationSubmissionEmailVariables;

    // checks if business owner email on application is the same as contact email provided
    const isOwnerSameAsBusinessContact = isOwnerSameAsContact(email, businessContactDetail.email);

    console.info('Sending application submitted email to business account owner: ', sendEmailVars.emailAddress);
    // send "application submitted" email receipt to the business owner applicant
    const accountSubmittedResponse = await sendEmail.applicationSubmitted.applicationSubmittedEmail(sendEmailVars);

    if (!accountSubmittedResponse.success) {
      throw new Error('Sending application submitted email to owner/account');
    }

    /**
     * if the contact email address is different to the business owner applicant
     * then it sends the same "application submitted" email receipt to the contact email address
     */
    if (!isOwnerSameAsBusinessContact) {
      console.info('Sending application submitted email to business contact email: ', sendContactEmailVars.emailAddress);
      const contactSubmittedResponse = await sendEmail.applicationSubmitted.applicationSubmittedEmail(sendContactEmailVars);

      if (!contactSubmittedResponse.success) {
        throw new Error('Sending application submitted email to contact');
      }
    }

    // get email template IDs depending on the submitted answers
    const templateIds = getApplicationSubmittedEmailTemplateIds(application);

    // send "application submitted" email to the underwriting team
    const underwritingTeamSubmittedResponse = await sendEmail.applicationSubmitted.underwritingTeam(sendEmailVars, csvPath, templateIds.underwritingTeam);

    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error('Sending application submitted email to underwriting team');
    }

    // send "documents" email to the applicant depending on submitted answers
    if (templateIds.account) {
      console.info('Sending documents email to business account owner: ', sendEmailVars.emailAddress);
      const documentsResponse = await sendEmail.documentsEmail(sendEmailVars, templateIds.account);

      if (!documentsResponse.success) {
        throw new Error(`Sending application documents emails ${documentsResponse}`);
      }

      /**
       * if the contact email address is different to the business owner applicant
       * then it sends the same "application submitted" email receipt to the contact email address
       */
      if (!isOwnerSameAsBusinessContact) {
        console.info('Sending documents email to business contact: ', sendContactEmailVars.emailAddress);
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
    console.error(err);

    throw new Error(`Sending application submitted emails ${err}`);
  }
};

const applicationSubmittedEmails = {
  send,
};

export default applicationSubmittedEmails;
