import { APPLICATION } from '../../../constants';
import createAnApplicationHelper from '../../../helpers/create-an-application';
import { CreateAnApplicationVariables, Context } from '../../../types';

const { STATUS } = APPLICATION;

/**
 * createAnAbandonedApplication
 * Create an abandoned application.
 * 1) Set status to Abandoned
 * 2) Create a new application with createAnApplicationHelper.
 * 3) Updates application with abandoned status.
 * 4) Returns application and success flag
 * @param {Object} root: GraphQL root variables
 * @param {CreateAnApplicationVariables} GraphQL variables for the CreateAnAbandonedApplication mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag and application
 */
const createAnAbandonedApplication = async (root: any, variables: CreateAnApplicationVariables, context: Context) => {
  console.info('Creating an abandoned application for %s', variables.accountId);

  const abandonedApplicationVariables = variables;

  // set status to abandoned
  abandonedApplicationVariables.status = STATUS.ABANDONED;

  try {
    // creates and returns application
    const createdApplication = await createAnApplicationHelper(abandonedApplicationVariables, context);

    if (createdApplication) {
      return {
        ...createdApplication,
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error('Error creating an abandoned application %O', err);

    throw new Error(`Creating an abandoned application ${err}`);
  }
};

export default createAnAbandonedApplication;
