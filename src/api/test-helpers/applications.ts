import { Application, TestHelperApplicationCreate, TestHelperApplicationGet, TestHelperApplicationUpdate } from '../types';

const applicationQuery =
  'id createdAt updatedAt referenceNumber dealType submissionCount submissionDeadline submissionType status previousStatus version eligibility { id } exportContract { id } owner { id } company { id } business { id } broker { id } buyer { id buyerTradingHistory { id } } sectionReview { id } declaration { id } policyContact { id }';

/**
 * create application test helper
 * Create an application with mock application data and any provied custom application data.
 * @param {Object} KeystoneJS context API, application data
 * @returns {Object} Created application
 */
const create = async ({ context, data }: TestHelperApplicationCreate) => {
  try {
    console.info('Creating an application (test helpers)');

    const application = (await context.query.Application.createOne({
      data,
      query: applicationQuery,
    })) as Application;

    return application;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * get application test helper
 * Get an application by ID.
 * @param {Object} KeystoneJS context API, application ID
 * @returns {Object} Application
 */
const get = async ({ context, applicationId }: TestHelperApplicationGet): Promise<Application> => {
  try {
    console.info('Getting an application (test helpers)');

    const application = (await context.query.Application.findOne({
      where: { id: applicationId },
      query:
        'id eligibility { id } buyer { id } company { id } exportContract { id }nominatedLossPayee { id } policy { id } sectionReview { id } referenceNumber',
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
 * @param {Object} KeystoneJS context API, application ID
 * @returns {Object} Application
 */
const update = async ({ context, applicationId, data }: TestHelperApplicationUpdate): Promise<Application> => {
  try {
    console.info('Updating an application (test helpers)');

    const application = (await context.query.Application.updateOne({
      where: { id: applicationId },
      data,
    })) as Application;

    return application;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const applications = {
  create,
  get,
  update,
};

export default applications;
