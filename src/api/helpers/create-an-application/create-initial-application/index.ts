import { addMonths } from 'date-fns';
import { APPLICATION } from '../../../constants';
import INITIAL_APPLICATION_DATA from '../../../constants/application/initial-application-data';
import { CreateInitialApplicationParams } from '../../../types';

const { STATUS, SUBMISSION_DEADLINE_IN_MONTHS, SUBMISSION_TYPE } = APPLICATION;

const { status: inititalStatus, ...APPLICATION_FIELDS } = INITIAL_APPLICATION_DATA;
/**
 * Create the initial application associated with a user and default:
 * - createdAt timestamp.
 * - dealType of DEAL_TYPE.
 * - status of IN_PROGRESS.
 * - submissionCount of SUBMISSION_COUNT_DEFAULT.
 * - submissionDeadline of SUBMISSION_DEADLINE_IN_MONTHS.
 * - submissionType of MIA.
 * - updatedAt timestamp.
 * - version of LATEST_VERSION_NUMBER
 * @param {Context} context: KeystoneJS context API
 * @param {String} accountId: Account ID to own the application
 * @param {String} status: Application status. Defaults to IN_PROGRESS
 * @returns {Promise<Application>} Created application
 */
const createInitialApplication = async ({ context, accountId, status = STATUS.IN_PROGRESS }: CreateInitialApplicationParams) => {
  try {
    console.info('Creating initial application (createInitialApplication helper) for user %s', accountId);

    const now = new Date();

    const application = await context.db.Application.createOne({
      data: {
        owner: {
          connect: { id: accountId },
        },
        createdAt: now,
        status,
        submissionDeadline: addMonths(new Date(now), SUBMISSION_DEADLINE_IN_MONTHS),
        submissionType: SUBMISSION_TYPE.MIA,
        updatedAt: now,
        ...APPLICATION_FIELDS,
      },
    });

    return application;
  } catch (error) {
    console.error('Error creating initial application (createInitialApplication helper) for user %s %O', accountId, error);

    throw new Error(`Creating initial application (createInitialApplication helper) for user ${accountId} ${error}`);
  }
};

const initialApplication = {
  create: createInitialApplication,
};

export default initialApplication;
