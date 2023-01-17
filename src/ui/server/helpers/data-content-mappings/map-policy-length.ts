import { isSinglePolicyType, isMultiPolicyType } from '../policy-type';
import mapMonthString from './map-month-string';
import { FIELD_IDS } from '../../constants';

const { POLICY_TYPE, POLICY_LENGTH, SINGLE_POLICY_LENGTH, MULTI_POLICY_LENGTH } = FIELD_IDS;

/**
 * mapPolicyLength
 * Map policy length answer into an object for GOV summary list structure
 * @param {Number} Credit period
 * @returns {String} Answer in an object
 */
const mapPolicyLength = (data: object) => {
  let mapped;

  if (isSinglePolicyType(data[POLICY_TYPE])) {
    mapped = {
      [SINGLE_POLICY_LENGTH]: mapMonthString(data[POLICY_LENGTH]),
    };
  }

  if (isMultiPolicyType(data[POLICY_TYPE])) {
    mapped = {
      [MULTI_POLICY_LENGTH]: mapMonthString(data[POLICY_LENGTH]),
    };
  }

  return mapped;
};

export default mapPolicyLength;
