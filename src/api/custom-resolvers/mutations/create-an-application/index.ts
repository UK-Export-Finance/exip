import createAnApplicationHelper from '../../../helpers/create-an-application';
import { CreateAnApplicationVariables, Context } from '../../../types';

/**
 * createAnApplication
 * Create an application.
 * 1) Create a new application with createAnApplicationHelper.
 * 2) Returns success flag and application
 * @param {object} root: GraphQL root variables
 * @param {CreateAnApplicationVariables} GraphQL variables for the createAnApplication mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<SuccessResponse>} Object with success flag and application
 */
const createAnApplication = async (root: any, variables: CreateAnApplicationVariables, context: Context) => {
  console.info('Creating application for user %s', variables.accountId);

  try {
    const application = await createAnApplicationHelper(variables, context);

    if (application) {
      return {
        ...application,
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating application for user %s %o', variables.accountId, error);

    throw new Error(`Creating application for user ${variables.accountId} ${error}`);
  }
};

export default createAnApplication;
