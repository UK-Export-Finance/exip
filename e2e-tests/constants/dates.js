/**
 * DATE_ONE_MINUTE_IN_THE_PAST
 * Generate a date that is 1 minute in the past.
 * @returns {Date}
 */
export const DATE_ONE_MINUTE_IN_THE_PAST = () => {
  const now = new Date();

  const MS_PER_MINUTE = 60000;

  const oneMinuteInThePast = new Date(now.getTime() - 1 * MS_PER_MINUTE);

  return oneMinuteInThePast;
};

const DATES = {
  DATE_ONE_MINUTE_IN_THE_PAST,
};

export default DATES;
