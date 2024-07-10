import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../insurance/check-policy-summary-list';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  },
} = POLICY_FIELD_IDS;

/**
 * assertGenericSinglePolicySummaryListRows
 * Assert generic "single policy" summary list rows.
 * These are rows specific to a single contract policy that will always be present.
 */
const assertGenericSinglePolicySummaryListRows = () => {
  cy.assertGenericPolicySummaryListRows();

  checkSummaryList.singleContractPolicy[POLICY_TYPE]();

  checkSummaryList.singleContractPolicy[CONTRACT_COMPLETION_DATE]();
  checkSummaryList.singleContractPolicy[TOTAL_CONTRACT_VALUE]();
};

export default assertGenericSinglePolicySummaryListRows;
