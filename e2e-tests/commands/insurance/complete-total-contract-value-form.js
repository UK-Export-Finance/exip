import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  CONTRACT_POLICY: {
    SINGLE: { REQUESTED_CREDIT_LIMIT, TOTAL_CONTRACT_VALUE },
  },
} = POLICY_FIELD_IDS;

/**
 * completeTotalContractValueForm
 * Complete the "Total contract value" form
 * @param {boolean} policyValueOverMvpMaximum: Should submit an application with a value over the MVP maximum amount
 * @param {string} totalContractValue: Total contract value
 * @param {string} requestedCreditLimit: Requested credit limit
 */
const completeTotalContractValueForm = ({
  policyValueOverMvpMaximum = false,
  totalContractValue = application.POLICY[TOTAL_CONTRACT_VALUE],
  requestedCreditLimit = application.POLICY[REQUESTED_CREDIT_LIMIT],
}) => {
  if (policyValueOverMvpMaximum) {
    const mvpMaximumPlusOne = 50000 + 1;

    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), mvpMaximumPlusOne);
  } else if (totalContractValue) {
    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), totalContractValue);
  }

  if (requestedCreditLimit) {
    cy.keyboardInput(field(REQUESTED_CREDIT_LIMIT).input(), requestedCreditLimit);
  }
};

export default completeTotalContractValueForm;
