import { APPLICATION } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeTotalContractValueForm
 * Complete the "Total contract value" form
 * @param {Object} Object with flags completing and submitting the form
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 */
const completeTotalContractValueForm = ({ policyMaximumValue = false }) => {
  if (policyMaximumValue) {
    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT.MAXIMUM);
  } else {
    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), application.POLICY[TOTAL_CONTRACT_VALUE]);
  }
};

export default completeTotalContractValueForm;
