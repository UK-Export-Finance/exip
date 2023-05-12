import { Context } from '.keystone/types'; // eslint-disable-line
import { InsuranceFeedbackVariables } from '../../types';
import sendEmail from '../../emails';

const createInsuranceFeedbackAndEmail = async (root: any, variables: InsuranceFeedbackVariables, context: Context) => {
  console.info('Creating feedback');

  try {
    const feedback = {
      ...variables,
      createdAt: new Date(),
    };

    const response = await context.db.Feedback.createOne({
      data: feedback,
    });

    const emailResponse = await sendEmail.insuranceFeedbackEmail(feedback);

    if (response && emailResponse?.success) {
      return {
        ...response,
        ...emailResponse,
        success: true,
      };
    }

    return { success: false };
  } catch (err) {
    throw new Error(`Creating feedback: ${err}`);
  }
};

export default createInsuranceFeedbackAndEmail;
