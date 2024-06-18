import { add, isAfter, isBefore, isSameDay } from 'date-fns';
import { ELIGIBILITY } from '../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import dateRules from '../../../../../../shared-validation/date';
import createTimestampFromNumbers from '../../../../../../helpers/date/create-timestamp-from-numbers';
import generateValidationErrors from '../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../types';

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE: FIELD_ID },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

export const MAXIMUM_FUTURE_YEARS = 2;

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
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const contractCompletionDateRules = (formBody: RequestBody, errors: object) => {
  const genericDataErrors = dateRules({
    formBody,
    errors,
    fieldId: FIELD_ID,
    errorMessages: ERROR_MESSAGES_OBJECT,
  });

  if (genericDataErrors.count) {
    return genericDataErrors;
  }

  const inputValues = getDateInputValues(formBody);

  const requestedStartDate = createTimestampFromNumbers(inputValues.start.day, inputValues.start.month, inputValues.start.year);

  const submittedDate = createTimestampFromNumbers(inputValues.end.day, inputValues.end.month, inputValues.end.year);

  if (submittedDate && requestedStartDate) {
    // check that the date is not the same as the requested start date.
    if (isSameDay(submittedDate, requestedStartDate)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.CANNOT_BE_THE_SAME, errors);
    }

    // check that the date is not before the requested start date.
    if (isBefore(submittedDate, requestedStartDate)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.CANNOT_BE_BEFORE, errors);
    }

    // check that the end date is not past the maximum years of cover.
    const maximum = add(requestedStartDate, { years: ELIGIBILITY.MAX_COVER_PERIOD_YEARS });

    if (isAfter(submittedDate, maximum)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.AFTER_LATEST, errors);
    }
  }

  return errors;
};

export default contractCompletionDateRules;
