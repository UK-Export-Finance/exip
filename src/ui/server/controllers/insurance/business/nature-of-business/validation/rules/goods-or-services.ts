import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../types';

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates goods or services input
 * errors if empty or more than 1000 characters
 * @param {RequestBody} formBody
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Object} errors
 */
const goodsOrServices = (formBody: RequestBody, errors: object) =>
  providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.NATURE_OF_BUSINESS_GOODS_OR_SERVICES_DESCRIPTION);

export default goodsOrServices;
