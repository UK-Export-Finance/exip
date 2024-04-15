import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { RequestBody } from '../../../../../../types';

const {
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map Private market fields
 * if USING_AGENT is false, delete AGENT_DETAILS fields
 * @param {Express.Request.body} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (formBody[USING_AGENT] === 'false') {
    populatedData[NAME] = '';
    populatedData[FULL_ADDRESS] = '';
    populatedData[COUNTRY_CODE] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
