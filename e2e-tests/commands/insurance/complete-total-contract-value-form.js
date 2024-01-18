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
 * - policyValueOverMvpMaximum: should submit an application with a value over the MVP maximum amount
 */
const completeTotalContractValueForm = ({ policyValueOverMvpMaximum = false }) => {
  if (policyValueOverMvpMaximum) {
    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT.MAXIMUM);
  } else {
    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), application.POLICY[TOTAL_CONTRACT_VALUE]);
  }
};

export default completeTotalContractValueForm;
