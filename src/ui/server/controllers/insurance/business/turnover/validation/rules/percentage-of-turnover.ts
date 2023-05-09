import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/business';
import { NumberErrorMessage, RequestBody } from '../../../../../../../types';
import percentageNumberValidation from '../../../../../../helpers/percentage-number-validation';

const {
  TURNOVER: { PERCENTAGE_TURNOVER: FIELD_ID },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

const errorMessages = {
  IS_EMPTY: ERROR_MESSAGE.IS_EMPTY,
  INCORRECT_FORMAT: ERROR_MESSAGE.INCORRECT_FORMAT,
  BELOW_MINIMUM: ERROR_MESSAGE.BELOW_MINIMUM,
  ABOVE_MAXIMUM: ERROR_MESSAGE.ABOVE_MAXIMUM,
} as NumberErrorMessage;

/**
 * validates percentage turnover
 * only numbers without decimals, special characters or commas
 * only allows numbers between 0 and 100
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const percentageTurnover = (responseBody: RequestBody, errors: object) => percentageNumberValidation(responseBody, FIELD_ID, errors, errorMessages);

export default percentageTurnover;
