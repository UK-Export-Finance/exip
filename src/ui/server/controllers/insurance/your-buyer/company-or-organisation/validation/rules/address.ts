import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import fullAddressValidation from '../../../../../../shared-validation/full-address';
import { RequestBody } from '../../../../../../../types';

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { ADDRESS: FIELD_ID },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

/**
 * validate the "full address" field
 * @param {Express.Response.body} Express response body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Function} fullAddressValidation
 */
const addressRules = (responseBody: RequestBody, errors: object) => fullAddressValidation(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default addressRules;
