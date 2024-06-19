import { Context } from '.keystone/types';
import createAnApplicationHelper from '../../../helpers/create-an-application';
import { APPLICATION } from '../../../constants';
import { CreateAnApplicationVariables } from '../../../types';

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
  console.info('Creating application for ', variables.accountId);

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
  } catch (err) {
    console.error('Error creating application %O', err);

    throw new Error(`Creating application ${err}`);
  }
};

export default createAnApplication;
