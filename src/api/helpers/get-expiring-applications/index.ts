import { Application, Context } from '.keystone/types'; // eslint-disable-line
import { APPLICATION } from '../../constants';
import getStartAndEndTimeOfDate from '../get-start-and-end-time-of-date';
import { dateInTheFutureByDays } from '../date';

const { IN_PROGRESS } = APPLICATION.STATUS;

const { REMINDER_DAYS } = APPLICATION.SUBMISSION_DEADLINE_EMAIL;

/**
 * getExpiringApplications
 * gets expiring applications - submissionDeadline in 2 days time
 * returns array of applications
 * @param {Context} context
 * @returns {Promise<Application[]>} Array of applications
 */
const getExpiringApplications = async (context: Context): Promise<Application[]> => {
  try {
    console.info('Getting expiring applications - getExpiringApplications helper');

    const today = new Date();

    const twoDaysTime = dateInTheFutureByDays(today, REMINDER_DAYS);

    // generates start and end time of provided date
    const { startTime, endTime } = getStartAndEndTimeOfDate(twoDaysTime);

    /**
     * Queries applications that:
     * - have a status of IN_PROGRESS
     * - have a submission deadline 2 days in the future
     * - between midnight and 23:59:59 on the day so any timestamp during that day is queried
     */
    const applications = (await context.query.Application.findMany({
      where: {
        AND: [{ status: { in: [IN_PROGRESS] } }, { submissionDeadline: { gte: startTime, lte: endTime } }],
      },
      query: APPLICATION.GET_QUERY,
    })) as Array<Application>;

    return applications;
  } catch (err) {
    console.error('Error getting expiring applications (getExpiringApplications helper) %O', err);

    throw new Error(`Error getting expiring applications (getExpiringApplications helper) ${err}`);
  }
};

export default getExpiringApplications;
