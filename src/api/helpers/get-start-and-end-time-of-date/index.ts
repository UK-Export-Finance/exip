import { APPLICATION } from '../../constants';

const {
  START_TIME_LIMIT_HOURS,
  START_TIME_LIMIT_MINUTES,
  START_TIME_LIMIT_MS,
  START_TIME_LIMIT_SECONDS,
  END_TIME_LIMIT_HOURS,
  END_TIME_LIMIT_MINUTES,
  END_TIME_LIMIT_MS,
  END_TIME_LIMIT_SECONDS,
} = APPLICATION.SUBMISSION_DEADLINE_EMAIL;

/**
 * getStartAndEndTimeOfDate
 * gets the earliest and latest time in a day (midnight to 23:59:59)
 * returns object with startTime and endTime
 * @param {Date} date
 * @returns {Object} start and end time
 */
const getStartAndEndTimeOfDate = (date: Date) => {
  // sets earliest time in the day (midnight)
  const startSet = date.setHours(START_TIME_LIMIT_HOURS, START_TIME_LIMIT_MINUTES, START_TIME_LIMIT_SECONDS, START_TIME_LIMIT_MS);

  // sets latest time in the day (23:59:59)
  const endSet = date.setHours(END_TIME_LIMIT_HOURS, END_TIME_LIMIT_MINUTES, END_TIME_LIMIT_SECONDS, END_TIME_LIMIT_MS);

  return {
    startTime: new Date(startSet),
    endTime: new Date(endSet),
  };
};

export default getStartAndEndTimeOfDate;
