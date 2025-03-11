import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { RequestBody, ObjectType } from '../../../../../../types';

const {
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent fields
 * if USING_AGENT is false, delete AGENT_DETAILS fields
 * @param {RequestBody} formBody: Form body
 * @returns {ObjectType} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): ObjectType => {
  const populatedData = formBody;

  if (formBody[USING_AGENT] === 'false') {
    populatedData[NAME] = '';
    populatedData[FULL_ADDRESS] = '';
    populatedData[COUNTRY_CODE] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
