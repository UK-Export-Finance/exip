import { Application, Context } from '.keystone/types'; // eslint-disable-line
import { APPLICATION } from '../../constants';

const { IN_PROGRESS } = APPLICATION.STATUS;

/**
 * getInactiveApplications
 * gets inactive applications - not updated for 30 days
 * returns array of application ids and statuses
 * @param {Context} context
 * @returns {Promise<Application[]>} Array of application ids and status
 */
const getInactiveApplications = async (context: Context): Promise<Application[]> => {
  try {
    console.info('Getting inactive applications - getInactiveApplications helper');

    /**
     * Queries applications that:
     * - have a status of IN_PROGRESS
     * - have a submission deadline in the past
     */
    const applications = (await context.query.Application.findMany({
      where: {
        AND: [{ status: { in: [IN_PROGRESS] } }, { submissionDeadline: { lt: new Date() } }],
      },
      query: 'id status',
    })) as Array<Application>;

    return applications;
  } catch (err) {
    console.error('Error getting inactive applications (getInactiveApplications helper) %O', err);

    throw new Error(`Error getting inactive applications (getInactiveApplications helper) ${err}`);
  }
};

export default getInactiveApplications;
