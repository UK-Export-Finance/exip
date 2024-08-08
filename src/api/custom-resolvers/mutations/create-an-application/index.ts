import createAnApplicationHelper from '../../../helpers/create-an-application';
import { APPLICATION } from '../../../constants';
import { CreateAnApplicationVariables, Context } from '../../../types';

const { STATUS } = APPLICATION;

/**
 * createAnApplication
 * Create an application.
 * 1) Set status to In progress
 * 2) Create a new application with createAnApplicationHelper.
 * 3) Returns success flag and application
 * @param {Object} GraphQL root variables
 * @param {CreateAnApplicationVariables} GraphQL variables for the createAnApplication mutation
 * @param {Context} KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag and application
 */
const createAnApplication = async (root: any, variables: CreateAnApplicationVariables, context: Context) => {
  console.info('Creating application for user %s', variables.accountId);

  const updatedVariables = variables;

  // set status to in progress
  updatedVariables.status = STATUS.IN_PROGRESS;

  try {
    const updatedApplication = await createAnApplicationHelper(root, updatedVariables, context);

    if (updatedApplication) {
      return {
        ...updatedApplication,
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating application for user %s %O', variables.accountId, error);

    throw new Error(`Creating application for user ${variables.accountId} ${error}`);
  }
};

export default createAnApplication;
