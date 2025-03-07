import mapMonthString from './map-month-string';
import { FIELD_IDS } from '../../constants';
import { ObjectType } from '../../../types';

const { POLICY_LENGTH } = FIELD_IDS;

/**
 * mapPolicyLength
 * Map policy length answer into an object for GOV summary list structure
 * @param {object} data - policy data
 * @returns {String} Answer in an object
 */
const mapPolicyLength = (data: ObjectType) => {
  const mapped = {
    [POLICY_LENGTH]: mapMonthString(data[POLICY_LENGTH]),
  };

  return mapped;
};

export default mapPolicyLength;
