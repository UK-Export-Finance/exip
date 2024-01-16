import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../insurance/check-policy-summary-list';

const {
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    POLICY_CURRENCY_CODE,
  },
  NAME_ON_POLICY: { POSITION },
} = POLICY_FIELD_IDS;

/**
 * assertGenericPolicySummaryListRows
 * Assert generic "policy" summary list rows for single or multiple policies.
 * These are rows that will always be present.
 */
const assertGenericPolicySummaryListRows = () => {
  checkSummaryList[REQUESTED_START_DATE]();
  checkSummaryList[POLICY_CURRENCY_CODE]();

  checkSummaryList[POSITION]();
};

export default assertGenericPolicySummaryListRows;
