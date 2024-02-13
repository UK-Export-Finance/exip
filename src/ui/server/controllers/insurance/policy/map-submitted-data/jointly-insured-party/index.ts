import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../types';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * if REQUESTED is false, wipe "other company"/"jointly insured party" data.
 * @param {Express.Request.body} Form data
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (populatedData[REQUESTED] === false) {
    populatedData[COMPANY_NAME] = '';
    populatedData[COMPANY_NUMBER] = '';
    populatedData[COUNTRY_CODE] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
