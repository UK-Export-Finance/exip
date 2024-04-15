import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { RequestBody } from '../../../../../../types';

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map Private market fields
 * if ATTEMPTED is false, delete DECLINED_DESCRIPTION
 * @param {RequestBody} formBody
 * @param {Array} countries
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (formBody[ATTEMPTED] === 'false') {
    populatedData[DECLINED_DESCRIPTION] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
