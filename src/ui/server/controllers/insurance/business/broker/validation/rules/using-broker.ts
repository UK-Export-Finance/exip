import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  BROKER: { USING_BROKER: FIELD_ID },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates using broker field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const usingExporter = (responseBody: RequestBody, errors: object) => {
  if (!objectHasProperty(responseBody, FIELD_ID)) {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  return errors;
};

export default usingExporter;
