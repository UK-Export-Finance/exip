import sendEmail from '../../../emails';
import { InsuranceFeedbackVariables, SuccessResponse } from '../../../types';

/**
 * sendEmailInsuranceFeedback
 * - Sends email with feedback from insurance tool
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the insurance feedback
 * @returns {Object} Object with success flag
 */
const sendEmailInsuranceFeedback = async (root: any, variables: InsuranceFeedbackVariables): Promise<SuccessResponse> => {
  try {
    console.info('Generating and sending email for insurance feedback');

    const emailResponse = await sendEmail.insuranceFeedbackEmail(variables);

    if (emailResponse.success) {
      return {
        ...emailResponse,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error('Error generating and sending email for insurance feedback %O', err);
    throw new Error(`Generating and sending email for insurance feedback ${err}`);
  }
};

export default sendEmailInsuranceFeedback;
