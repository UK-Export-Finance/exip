import { FIELD_VALUES } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { multipleContractPolicyExportValuePage } from '../../pages/insurance/policy';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY_TYPE: { SINGLE, MULTIPLE},
} = FIELD_VALUES;

const {
  POLICY: {
    EXPORT_VALUE: {
      MULTIPLE: {
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeExportValueForm
 * Complete the "Export value" form
 * @param {Object} Object with flags completing and submitting export value form
 * - policyType: type of policy
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 */
const completeExportValueForm = ({ policyType = SINGLE }) => {
  if (policyType === MULTIPLE) {
    cy.keyboardInput(field(TOTAL_SALES_TO_BUYER).input(), application.POLICY[TOTAL_SALES_TO_BUYER]);

    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), application.POLICY[MAXIMUM_BUYER_WILL_OWE]);
  }
};

export default completeExportValueForm;
