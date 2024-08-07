import { APPLICATION } from '../constants';
import createAnApplicationHelper from '../helpers/create-an-application';
import accounts from './accounts';
import { Account, Application, TestHelperApplicationCreate, TestHelperApplicationGet, TestHelperApplicationUpdate, Context } from '../types';

const { GET_QUERY } = APPLICATION;

/**
 * create application test helper
 * Create an application with mock application data and any provied custom application data.
 * @param {Context} context: KeystoneJS context API, application data
 * @returns {Object} Created application
 */
const create = async ({ context }: TestHelperApplicationCreate) => {
  try {
    console.info('Creating an application (test helpers)');

    // const application = (await context.query.Application.createOne({
    //   data: {
    //     status: STATUS.IN_PROGRESS,
    //     ...data,
    //   },
    //   query: applicationQuery,
    // })) as Application;

    const account = (await accounts.create({ context })) as Account;

    const application = await createAnApplicationHelper(
      {
        accountId: account.id,
        eligibilityAnswers: {},
        company: {},
      },
      context,
    );

    return application;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * get application test helper
 * Get an application by ID.
 * @param {Context} context: KeystoneJS context API, application ID
 * @param {String} applicationId: Application ID
 * @returns {Object} Application
 */
const get = async ({ context, applicationId }: TestHelperApplicationGet): Promise<Application> => {
  try {
    console.info('Getting an application (test helpers)');

    const application = (await context.query.Application.findOne({
      where: { id: applicationId },
      query: GET_QUERY,
    })) as Application;

    return application;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * update application test helper
 * Update an application by ID.
 * @param {Context} context: KeystoneJS context API, application ID
 * @returns {Object} Application
 */
const update = async ({ context, applicationId, data }: TestHelperApplicationUpdate): Promise<Application> => {
  try {
    console.info('Updating an application (test helpers)');

    const application = (await context.query.Application.updateOne({
      where: { id: applicationId },
      data,
      query: 'id updatedAt',
    })) as Application;

    return application;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * deleteAll test helper
 * Get all accounts and delete them.
 * @param {Context} context: KeystoneJS context API
 * @returns {Array} Accounts that have been deleted
 */
const deleteAll = async (context: Context) => {
  try {
    console.info('Getting and deleting applications (test helpers)');

    const applications = await context.query.Application.findMany();

    if (applications.length) {
      const response = await context.query.Application.deleteMany({
        where: applications,
      });

      return response;
    }

    return [];
  } catch (err) {
    console.error(err);
    throw new Error(`Getting and deleting applications (test helpers) ${err}`);
  }
};

const applications = {
  create,
  get,
  update,
  deleteAll,
};

export default applications;
