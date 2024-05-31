import FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../types';

const {
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS;

const nullifyMultipleContractPolicyFields = (formBody: RequestBody) => ({
  ...formBody,
  [MAXIMUM_BUYER_WILL_OWE]: '',
  [TOTAL_MONTHS_OF_COVER]: null,
  [TOTAL_SALES_TO_BUYER]: null,
});

export default nullifyMultipleContractPolicyFields;
