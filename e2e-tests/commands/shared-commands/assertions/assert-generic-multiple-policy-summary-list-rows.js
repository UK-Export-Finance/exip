import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../insurance/check-policy-summary-list';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

/**
 * assertGenericMultiplePolicySummaryListRows
 * Assert generic "multiple policy" summary list rows.
 * These are rows specific to a multiple contract policy that will always be present.
 */
const assertGenericMultiplePolicySummaryListRows = () => {
  cy.assertGenericPolicySummaryListRows();

  checkSummaryList.multipleContractPolicy[POLICY_TYPE]();
  checkSummaryList.multipleContractPolicy[TOTAL_MONTHS_OF_COVER]();
  checkSummaryList.multipleContractPolicy[TOTAL_SALES_TO_BUYER]();
  checkSummaryList.multipleContractPolicy[MAXIMUM_BUYER_WILL_OWE]();
};

export default assertGenericMultiplePolicySummaryListRows;
