import { POLICY as FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../types';

const {
  CONTRACT_POLICY: { POLICY_CURRENCY_CODE, REQUESTED_START_DATE },
} = FIELD_IDS;

/**
 * nullifyGenericContractPolicyFields
 * Create an object with empty "contract policy" fields.
 * @returns {ApplicationPolicy}
 */
const nullifyGenericContractPolicyFields = (formBody: RequestBody) => ({
  ...formBody,
  [REQUESTED_START_DATE]: null,
  [POLICY_CURRENCY_CODE]: '',
});

export default nullifyGenericContractPolicyFields;
