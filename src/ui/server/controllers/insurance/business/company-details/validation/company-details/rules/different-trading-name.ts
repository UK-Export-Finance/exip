import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/business';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { DIFFERENT_TRADING_NAME: FIELD_ID, HAS_DIFFERENT_TRADING_NAME },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates alternative trading name field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const differentTradingName = (formBody: RequestBody, errors: object) => {
  if (formBody[HAS_DIFFERENT_TRADING_NAME] === 'true') {
    return providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.COMPANY_DIFFERENT_TRADING_NAME);;
  }

  return errors;
};

export default differentTradingName;
