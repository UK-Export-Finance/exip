import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../types';

const {
  PRIVATE_MARKET: { DECLINED_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const {
  EXPORT_CONTRACT: {
    PRIVATE_MARKET: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validate the "declined description" field
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const declinedDescription = (formBody: RequestBody, errors: object) =>
  providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.DECLINED_BY_PRIVATE_MARKET_DESCRIPTION);

export default declinedDescription;
