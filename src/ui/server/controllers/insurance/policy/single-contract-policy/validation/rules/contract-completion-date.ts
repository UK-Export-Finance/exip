import { add, isAfter, isBefore, isPast, isSameDay, isValid } from 'date-fns';
import { FIELD_IDS, ELIGIBILITY } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import createTimestampFromNumbers from '../../../../../../helpers/date/create-timestamp-from-numbers';
import { isNumber } from '../../../../../../helpers/number';
import { RequestBody } from '../../../../../../../types';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        SINGLE: { CONTRACT_COMPLETION_DATE: FIELD_ID },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

export const MAXIMUM_FUTURE_YEARS = 2;

const DATE_INPUT_IDS = {
  start: {
    day: `${REQUESTED_START_DATE}-day`,
    month: `${REQUESTED_START_DATE}-month`,
    year: `${REQUESTED_START_DATE}-year`,
  },
  end: {
    day: `${FIELD_ID}-day`,
    month: `${FIELD_ID}-month`,
    year: `${FIELD_ID}-year`,
  },
};

const getDateInputValues = (formBody: RequestBody) => ({
  start: {
    day: Number(formBody[`${REQUESTED_START_DATE}-day`]),
    month: Number(formBody[`${REQUESTED_START_DATE}-month`]),
    year: Number(formBody[`${REQUESTED_START_DATE}-year`]),
  },
  end: {
    day: Number(formBody[`${FIELD_ID}-day`]),
    month: Number(formBody[`${FIELD_ID}-month`]),
    year: Number(formBody[`${FIELD_ID}-year`]),
  },
});

/**
 * contractCompletionDateRules
 * Check submitted form data for errors with the requested start date field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const contractCompletionDateRules = (formBody: RequestBody, errors: object) => {
  const inputValues = getDateInputValues(formBody);

  // check that no fields are empty.
  const hasDay = objectHasProperty(formBody, DATE_INPUT_IDS.end.day);
  const hasMonth = objectHasProperty(formBody, DATE_INPUT_IDS.end.month);
  const hasYear = objectHasProperty(formBody, DATE_INPUT_IDS.end.year);

  if (!hasDay || !hasMonth || !hasYear) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  // check that all fields are numbers.
  if (!isNumber(inputValues.end.day) || !isNumber(inputValues.end.month) || !isNumber(inputValues.end.year)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_NUMBER, errors);
  }

  const submittedDate = createTimestampFromNumbers(inputValues.end.day, inputValues.end.month, inputValues.end.year);

  // check that the date is valid e.g not a month value of 24.
  if (submittedDate && !isValid(submittedDate)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  // check that the date is in the future.
  if (submittedDate && isPast(submittedDate)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BEFORE_EARLIEST, errors);
  }

  const requestedStartDate = createTimestampFromNumbers(inputValues.start.day, inputValues.start.month, inputValues.start.year);

  if (submittedDate && requestedStartDate) {
    // check that the date is not the same as the requested start date.
    if (isSameDay(submittedDate, requestedStartDate)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.CANNOT_BE_THE_SAME, errors);
    }

    // check that the date is not before the requested start date.
    if (isBefore(submittedDate, requestedStartDate)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.CANNOT_BE_BEFORE, errors);
    }

    // check that the end date is not past the maximum years of cover.
    const maximum = add(requestedStartDate, { years: ELIGIBILITY.MAX_COVER_PERIOD_YEARS });

    if (isAfter(submittedDate, maximum)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.AFTER_LATEST, errors);
    }
  }

  return errors;
};

export default contractCompletionDateRules;
