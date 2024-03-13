import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import fullAddress from '../../../../../../shared-validation/full-address';
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
 * validate the "full address" in "company or organisation" request body
 * @param {Express.Request.body} responseBody: containing an object with broker form submission data
 * @param {Object} errors: errorList
 * @returns {Object} fullAddress
 */
const addressRules = (responseBody: RequestBody, errors: object) => fullAddress(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default addressRules;
