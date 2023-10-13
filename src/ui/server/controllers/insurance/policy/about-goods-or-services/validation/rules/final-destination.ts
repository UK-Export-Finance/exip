import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';

const {
  POLICY: {
    ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION: FIELD_ID },
  },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    POLICY: {
      ABOUT_GOODS_OR_SERVICES: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

export const MAXIMUM = 1000;

/**
 * finalDestinationRules
 * Returns the result of emptyFieldValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const finalDestinationRules = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default finalDestinationRules;
