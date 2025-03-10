import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { RequestBody, ObjectType } from '../../../../../../types';

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map Private market fields
 * if ATTEMPTED is false, delete DECLINED_DESCRIPTION
 * @param {RequestBody} formBody
 * @param {Array<Country>} countries
 * @returns {ObjectType} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): ObjectType => {
  const populatedData = formBody;

  if (formBody[ATTEMPTED] === 'false') {
    populatedData[DECLINED_DESCRIPTION] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
