import getStartAndEndTimeOfDate from '.';
import { APPLICATION } from '../../constants';

const {
  START_TIME_LIMIT_HOURS,
  START_TIME_LIMIT_MINUTES,
  START_TIME_LIMIT_MSECONDS,
  START_TIME_LIMIT_SECONDS,
  END_TIME_LIMIT_HOURS,
  END_TIME_LIMIT_MINUTES,
  END_TIME_LIMIT_MSECONDS,
  END_TIME_LIMIT_SECONDS,
} = APPLICATION.SUBMISSION_DEADLINE_EMAIL;

describe('helpers/get-start-and-end-time-of-date', () => {
  const today = new Date();

  it('should return the startTime and endTime of provided date', () => {
    const { startTime, endTime } = getStartAndEndTimeOfDate(today);

    const expectedStartTime = new Date(today.setHours(START_TIME_LIMIT_HOURS, START_TIME_LIMIT_MINUTES, START_TIME_LIMIT_SECONDS, START_TIME_LIMIT_MSECONDS));
    const expectedEndTime = new Date(today.setHours(END_TIME_LIMIT_HOURS, END_TIME_LIMIT_MINUTES, END_TIME_LIMIT_SECONDS, END_TIME_LIMIT_MSECONDS));

    expect(startTime).toEqual(expectedStartTime);
    expect(endTime).toEqual(expectedEndTime);
  });
});
