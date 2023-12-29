import { FIELD_VALUES } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { multipleContractPolicyExportValuePage } from '../../pages/insurance/policy';
import { field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY: {
    EXPORT_VALUE: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: {
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitExportValueForm
 * Complete and submit the "Export value" form
 * @param {Object} Object with flags completing and submitting export value form
 * - policyType: type of policy
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 */
// TODO
// TODO: policyMaximumValue = false
const completeAndSubmitExportValueForm = ({ policyType = FIELD_VALUES.POLICY_TYPE.SINGLE }) => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), application.POLICY[TOTAL_CONTRACT_VALUE]);
  }

  if (policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE) {
    cy.keyboardInput(field(TOTAL_SALES_TO_BUYER).input(), application.POLICY[TOTAL_SALES_TO_BUYER]);

    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), application.POLICY[MAXIMUM_BUYER_WILL_OWE]);
  }

  submitButton().click();
};

export default completeAndSubmitExportValueForm;
