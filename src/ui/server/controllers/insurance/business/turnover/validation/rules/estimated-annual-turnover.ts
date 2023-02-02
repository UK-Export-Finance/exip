import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates number of estimated annual turnover input
 * only allows number without decimal
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const estimatedAnnualTurnover = (responseBody: RequestBody, errors: object) => {
  if (!objectHasProperty(responseBody, FIELD_ID)) {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
  return wholeNumberValidation(responseBody, errors, errorMessage, FIELD_ID);
};

export default estimatedAnnualTurnover;
