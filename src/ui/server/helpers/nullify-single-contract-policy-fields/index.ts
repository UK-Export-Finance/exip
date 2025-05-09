import FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../types';

const {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE, REQUESTED_CREDIT_LIMIT, TOTAL_CONTRACT_VALUE },
  },
} = FIELD_IDS;

/**
 * nullifySingleContractPolicyFields
 * Create an object with empty "single contract policy" fields.
 * @returns {ApplicationPolicy}
 */
const nullifySingleContractPolicyFields = (formBody: RequestBody) => ({
  ...formBody,
  [CONTRACT_COMPLETION_DATE]: null,
  [REQUESTED_CREDIT_LIMIT]: null,
  [TOTAL_CONTRACT_VALUE]: null,
});

export default nullifySingleContractPolicyFields;
