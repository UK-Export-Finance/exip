import { FIELD_IDS, PRODUCT } from '../../../../../../constants';
import { add, isAfter, isBefore, isPast, isSameDay } from 'date-fns';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import createTimestampFromNumbers from '../../../../../../helpers/date/create-timestamp-from-numbers';
import { isNumber } from '../../../../../../helpers/number';
import { RequestBody } from '../../../../../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        SINGLE: { CONTRACT_COMPLETION_DATE },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        SINGLE: { [CONTRACT_COMPLETION_DATE]: ERROR_MESSAGE },
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
    day: `${CONTRACT_COMPLETION_DATE}-day`,
    month: `${CONTRACT_COMPLETION_DATE}-month`,
    year: `${CONTRACT_COMPLETION_DATE}-year`,
  },
};

const getDateInputValues = (formBody: RequestBody) => ({
  start: {
    day: Number(formBody[`${REQUESTED_START_DATE}-day`]),
    month: Number(formBody[`${REQUESTED_START_DATE}-month`]),
    year: Number(formBody[`${REQUESTED_START_DATE}-year`]),
  },
  end: {
    day: Number(formBody[`${CONTRACT_COMPLETION_DATE}-day`]),
    month: Number(formBody[`${CONTRACT_COMPLETION_DATE}-month`]),
    year: Number(formBody[`${CONTRACT_COMPLETION_DATE}-year`]),
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
  const updatedErrors = errors;
  let errorMessage;

  const inputValues = getDateInputValues(formBody);

  // check that no fields are empty.
  const hasDay = objectHasProperty(formBody, DATE_INPUT_IDS.end.day);
  const hasMonth = objectHasProperty(formBody, DATE_INPUT_IDS.end.month);
  const hasYear = objectHasProperty(formBody, DATE_INPUT_IDS.end.year);

  if (!hasDay || !hasMonth || !hasYear) {
    errorMessage = ERROR_MESSAGE.IS_EMPTY;
  }

  // check that all fields are numbers.
  if (!isNumber(inputValues.end.day) || !isNumber(inputValues.end.month) || !isNumber(inputValues.end.year)) {
    errorMessage = ERROR_MESSAGE.NOT_A_NUMBER;
  }

  // check that the date is in the future.
  const submittedDate = createTimestampFromNumbers(inputValues.end.day, inputValues.end.month, inputValues.end.year);

  if (submittedDate && isPast(submittedDate)) {
    errorMessage = ERROR_MESSAGE.BEFORE_EARLIEST;
  }

  const requestedStartDate = createTimestampFromNumbers(inputValues.start.day, inputValues.start.month, inputValues.start.year);

  if (submittedDate && requestedStartDate) {
    // check that the date is not the same as the requested start date.
    if (isSameDay(submittedDate, requestedStartDate)) {
      errorMessage = ERROR_MESSAGE.CANNOT_BE_THE_SAME;
    }

    // check that the date is not before the requested start date.
    if (isBefore(submittedDate, requestedStartDate)) {
      errorMessage = ERROR_MESSAGE.CANNOT_BE_BEFORE;
    }

    // check that the end date is not past the maximum years of cover.
    const maximum = add(requestedStartDate, { years: PRODUCT.MAX_COVER_PERIOD_YEARS });

    if (isAfter(submittedDate, maximum)) {
      errorMessage = ERROR_MESSAGE.AFTER_LATEST;
    }
  }

  if (errorMessage) {
    return generateValidationErrors(CONTRACT_COMPLETION_DATE, errorMessage, errors);
  }

  return updatedErrors;
};

export default contractCompletionDateRules;
