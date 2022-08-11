import { isSinglePolicyType, isMultiPolicyType } from '../policy-type';
import mapPeriodMonths from './map-period-months';
import { FIELD_IDS } from '../../constants';

const { POLICY_TYPE, POLICY_LENGTH, SINGLE_POLICY_LENGTH, MULTI_POLICY_LENGTH } = FIELD_IDS;

const mapPolicyLength = (data: object) => {
  let mapped;

  if (isSinglePolicyType(data[POLICY_TYPE])) {
    mapped = {
      [SINGLE_POLICY_LENGTH]: {
        text: mapPeriodMonths(data[POLICY_LENGTH]),
      },
    };
  }

  if (isMultiPolicyType(data[POLICY_TYPE])) {
    mapped = {
      [MULTI_POLICY_LENGTH]: {
        text: mapPeriodMonths(data[POLICY_LENGTH]),
      },
    };
  }

  return mapped;
};

export default mapPolicyLength;
