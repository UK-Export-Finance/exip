import { RequestBody, ValidationErrors } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: { ALTERNATIVE_TRADING_ADDRESS, FULL_ADDRESS },
} = FIELD_IDS.INSURANCE;

/**
 * maps companyDifferentTradingAddress formBody and returns fields in correct format
 * changes ALTERNATIVE_TRADING_ADDRESS to FULL_ADDRESS so can be handled by API
 * removes ALTERNATIVE_TRADING_ADDRESS value
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  if (objectHasProperty(formBody, ALTERNATIVE_TRADING_ADDRESS)) {
    return {
      [FULL_ADDRESS]: formBody[ALTERNATIVE_TRADING_ADDRESS],
    };
  }

  return {};
};

/**
 * maps validation errors for companyDifferentTradingAddress
 * Adds object in errorList for FULL_ADDRESS if the error exists for ALTERNATIVE_TRADING_ADDRESS
 * Allows for datasaving as field is stored with different name as compared to form
 * @param {ValidationErrors} validationErrors
 * @returns {ValidationErrors} updated errors
 */
const mapErrors = (validationErrors?: ValidationErrors) => {
  const errors = validationErrors;

  if (errors?.errorList?.[ALTERNATIVE_TRADING_ADDRESS]) {
    errors.errorList[FULL_ADDRESS] = validationErrors?.errorList?.[ALTERNATIVE_TRADING_ADDRESS];
  }

  return errors;
};

export { mapSubmittedData, mapErrors };
