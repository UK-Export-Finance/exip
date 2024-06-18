import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import checkSummaryList from '../../insurance/check-policy-summary-list';

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: { REQUESTED_START_DATE },
    NAME_ON_POLICY: { POSITION },
  },
} = INSURANCE_FIELD_IDS;

/**
 * assertGenericPolicySummaryListRows
 * Assert generic "policy" summary list rows for single or multiple policies.
 * These are rows that will always be present.
 */
const assertGenericPolicySummaryListRows = () => {
  checkSummaryList[REQUESTED_START_DATE]();
  checkSummaryList[CURRENCY_CODE]();

  checkSummaryList[POSITION]();
};

export default assertGenericPolicySummaryListRows;
