import { EMAIL_TEMPLATE_IDS } from '../constants';
import notify from '../integrations/notify';
import { EmailResponse, ApplicationSubmissionEmailVariables, InsuranceFeedbackVariables } from '../types';
import dotenv from 'dotenv';

dotenv.config();

/**
 * callNotify
 * Call Notify API
 * @param {String} Notify template ID
 * @param {String} Email address
 * @param {String} First name
 * @param {Object} Email variables
 * @returns {Object} Object with success flag and emailRecipient
 */
export const callNotify = async (templateId: string, emailAddress: string, variables: object, firstName?: string): Promise<EmailResponse> => {
  try {
    let emailResponse;

    if (firstName) {
      emailResponse = await notify.sendEmail(templateId, emailAddress, variables, firstName);
    } else {
      emailResponse = await notify.sendEmail(templateId, emailAddress, variables);
    }

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email ${emailResponse}`);
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email ${err}`);
  }
};

/**
 * confirmEmailAddress
 * Send "confirm your email address" email to an exporter
 * @param {String} Email address
 * @param {String} First name
 * @param {String} Verification hash
 * @returns {Object} callNotify response
 */
const confirmEmailAddress = async (emailAddress: string, firstName: string, verificationHash: string): Promise<EmailResponse> => {
  try {
    console.info('Sending email verification for account creation');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    const variables = { confirmToken: verificationHash };

    const response = await callNotify(templateId, emailAddress, variables, firstName);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email verification for account creation ${err}`);
  }
};

/**
 * securityCodeEmail
 * Send the security code email to an exporter
 * @param {String} Email address
 * @param {String} First name
 * @param {String} Security code
 * @returns {Object} callNotify response
 */
const securityCodeEmail = async (emailAddress: string, firstName: string, securityCode: string): Promise<EmailResponse> => {
  try {
    console.info('Sending security code email for account sign in');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;

    const variables = { securityCode };

    const response = await callNotify(templateId, emailAddress, variables, firstName);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending security code email for account sign in ${err}`);
  }
};

const applicationSubmitted = {
  /**
   * applicationSubmitted.exporter
   * Send "application submitted" email to an exporter
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  exporter: async (variables: ApplicationSubmissionEmailVariables): Promise<EmailResponse> => {
    try {
      console.info('Sending application submitted email to exporter');

      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;

      const { emailAddress, firstName } = variables;

      const response = await callNotify(templateId, emailAddress, variables, firstName);

      return response;
    } catch (err) {
      console.error(err);

      throw new Error(`Sending application submitted email to exporter ${err}`);
    }
  },
  /**
   * applicationSubmitted.underwritingTeam
   * Send "application submitted" email to the underwriting team
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  underwritingTeam: async (variables: ApplicationSubmissionEmailVariables): Promise<EmailResponse> => {
    try {
      console.info('Sending application submitted email to underwriting team');

      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.UNDERWRITING_TEAM.NOTIFICATION;

      const emailAddress = process.env.UNDERWRITING_TEAM_EMAIL as string;

      const response = await callNotify(templateId, emailAddress, variables);

      return response;
    } catch (err) {
      console.error(err);

      throw new Error(`Sending application submitted email to underwriting team ${err}`);
    }
  },
};

/**
 * documentsEmail
 * Send "we need some documents from you" email to an exporter
 * @param {Object} ApplicationSubmissionEmailVariables
 * @param {Boolean} Flag for sending anto-bribery/trading history template
 * @returns {Object} callNotify response
 */
const documentsEmail = async (variables: ApplicationSubmissionEmailVariables, templateId: string): Promise<EmailResponse> => {
  try {
    console.info('Sending documents email');

    const { emailAddress, firstName } = variables;

    const response = await callNotify(templateId, emailAddress, variables, firstName);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending documents email ${err}`);
  }
};

/**
 * insuranceFeedbackEmail
 * sends email for insurance feedback
 * @param {InsuranceFeedbackVariables} variables
 * @returns {Object} callNotify response
 */
const insuranceFeedbackEmail = async (variables: InsuranceFeedbackVariables): Promise<EmailResponse> => {
  try {
    console.info('Sending insurance feedback email');

    const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;

    const emailAddress = process.env.FEEDBACK_EMAIL_RECIPIENT as string;

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending insurance feedback email ${err}`);
  }
};

const sendEmail = {
  confirmEmailAddress,
  securityCodeEmail,
  applicationSubmitted,
  documentsEmail,
  insuranceFeedbackEmail,
};

export default sendEmail;
