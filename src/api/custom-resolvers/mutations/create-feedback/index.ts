import sendEmail from '../../../emails';
import { Context, InsuranceFeedbackVariables } from '../../../types';

/**
 * creates feedback in database and sends email
 * adds createdAt timestamp to feedback
 * @param {Object} root: GraphQL root variables
 * @param {Object} variables: GraphQL variables for the createInsuranceFeedback mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<SuccessResponse>} with success true or false and response
 */
const createFeedback = async (root: any, variables: InsuranceFeedbackVariables, context: Context) => {
  console.info('Creating feedback');

  try {
    const feedback = {
      ...variables,
      createdAt: new Date(),
    };

    // adds feedback to database
    const response = await context.db.Feedback.createOne({
      data: feedback,
    });

    // sends email with relevant fields
    const emailResponse = await sendEmail.insuranceFeedbackEmail(feedback);

    // only if data added to db and email has successfully been sent - then return success=true
    if (response && emailResponse?.success) {
      return {
        ...response,
        success: true,
      };
    }

    return { success: false };
  } catch (error) {
    console.error('Error creating feedback %o', error);

    throw new Error(`Creating feedback: ${error}`);
  }
};

export default createFeedback;
