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
 * @param {Object} GraphQL root variables
 * @param {CreateAnApplicationVariables} GraphQL variables for the CreateAnAbandonedApplication mutation
 * @param {Context} KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag and application
 */
const createAnAbandonedApplication = async (root: any, variables: CreateAnApplicationVariables, context: Context) => {
  console.info('Creating an abandoned application for ', variables.accountId);

  const abandonedApplicationVariables = variables;

  // set status to abandoned
  abandonedApplicationVariables.status = STATUS.ABANDONED;

  try{
    // creates and returns application
    const createdApplication = await createAnApplicationHelper(root, abandonedApplicationVariables, context);

    if (createdApplication) {
      // TODO: EMS-3387 remove once schema hooks for status is removed
      // updates application status to abandoned
      const updatedApplication = await context.db.Application.updateOne({
        where: {
          id: createdApplication.id,
        },
        data: {
          status: STATUS.ABANDONED,
        },
      });

      return {
        ...updatedApplication,
        success: true,
      };
    }

    return {
      success: false,
    }
  } catch (err) {
    console.error('Error creating an abandoned application %O', err);

    throw new Error(`Creating an abandoned application ${err}`);
  }
};

export default createAnAbandonedApplication;
