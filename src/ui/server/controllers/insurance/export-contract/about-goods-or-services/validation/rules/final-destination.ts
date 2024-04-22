import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

/**
 * finalDestinationRules
 * If FINAL_DESTINATION_KNOWN is true, return emptyFieldValidation for the FINAL_DESTINATION field.
 * Otherwise, return FINAL_DESTINATION for the FINAL_DESTINATION_KNOWN field.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const finalDestinationRules = (formBody: RequestBody, errors: object) => {
  if (formBody[FINAL_DESTINATION_KNOWN] === 'true') {
    return emptyFieldValidation(formBody, FINAL_DESTINATION, ERROR_MESSAGE[FINAL_DESTINATION].IS_EMPTY, errors);
  }

  return emptyFieldValidation(formBody, FINAL_DESTINATION_KNOWN, ERROR_MESSAGE[FINAL_DESTINATION_KNOWN].IS_EMPTY, errors);
};

export default finalDestinationRules;
