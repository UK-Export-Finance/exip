import { Context } from '.keystone/types'; // eslint-disable-line
import { Application, TestHelperApplicationCreate } from '../types';

/**
 * create application test helper
 * Create an application with mock application data and any provied custom application data.
 * @param {Object} KeystoneJS context API, application data, deleteApplications flag
 * @returns {Object} Created application
 */
const create = async ({ context, data }: TestHelperApplicationCreate) => {
  try {
    console.info('Creating an application (test helpers)');

    const application = (await context.query.Application.createOne({
      data,
      query: 'id referenceNumber updatedAt',
    })) as Application;

    return application;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const applications = {
  create,
};

export default applications;
