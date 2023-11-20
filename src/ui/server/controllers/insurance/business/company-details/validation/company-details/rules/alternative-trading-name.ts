import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/business';
import { RequestBody } from '../../../../../../../../types';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';

const {
  YOUR_COMPANY: { ALTERNATIVE_TRADING_NAME: FIELD_ID, TRADING_NAME },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates alternative trading name field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const alternativeTradingName = (responseBody: RequestBody, errors: object) => {
  // if TRADING_NAME radio is yes then check validation
  if (responseBody[TRADING_NAME] === 'true') {
    return emptyFieldValidation(responseBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return errors;
};

export default alternativeTradingName;
