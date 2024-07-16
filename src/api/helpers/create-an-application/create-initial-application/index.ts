import { APPLICATION } from '../../../constants';
import { CreateInitialApplicationParams } from '../../../types';

const { STATUS, SUBMISSION_TYPE } = APPLICATION;

/**
 * Create the initial application,
 * with a default submission type of SUBMISSION_TYPE.MIA.
 * This needs to be done first so that we can use the application ID.
 * @param {Context} context: KeystoneJS context API
 * @param {String} accountId: Account ID to own the application
 * @param {String} status: Application status. Defaults to IN_PROGRESS
 * @returns {Promise<Application>} Created application
 */
const createInitialApplication = async ({ context, accountId, status = STATUS.IN_PROGRESS }: CreateInitialApplicationParams) => {
  try {
    console.info('Creating initial application (createInitialApplication helper) for user %s', accountId);

    const application = await context.db.Application.createOne({
      data: {
        owner: {
          connect: { id: accountId },
        },
        status,
        submissionType: SUBMISSION_TYPE.MIA,
      },
    });

    return application;
  } catch (err) {
    console.error(`Error creating initial application (createInitialApplication helper) for user ${accountId} %O`, err);

    throw new Error(`Creating initial application (createInitialApplication helper) for user ${accountId} ${err}`);
  }
};

const initialApplication = {
  create: createInitialApplication,
};

export default initialApplication;
