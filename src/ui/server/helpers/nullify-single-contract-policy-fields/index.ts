import FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../types';

const {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  },
} = FIELD_IDS;

const nullifySingleContractPolicyFields = (formBody: RequestBody) => ({
  ...formBody,
  [CONTRACT_COMPLETION_DATE]: null,
  [TOTAL_CONTRACT_VALUE]: null,
});

export default nullifySingleContractPolicyFields;
