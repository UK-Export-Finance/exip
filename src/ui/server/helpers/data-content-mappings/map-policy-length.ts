import mapMonthString from './map-month-string';
import { FIELD_IDS } from '../../constants';

const { POLICY_LENGTH } = FIELD_IDS;

/**
 * mapPolicyLength
 * Map policy length answer into an object for GOV summary list structure
 * @param {Number} Credit period
 * @returns {String} Answer in an object
 */
const mapPolicyLength = (data: object) => {
  const mapped = {
    [POLICY_LENGTH]: mapMonthString(data[POLICY_LENGTH]),
  };

  return mapped;
};

export default mapPolicyLength;
