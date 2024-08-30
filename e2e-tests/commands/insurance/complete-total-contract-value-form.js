import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { CREDIT_LIMIT, TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeTotalContractValueForm
 * Complete the "Total contract value" form
 * @param {Boolean} policyValueOverMvpMaximum: Should submit an application with a value over the MVP maximum amount
 * @param {String} totalContractValue: Total contract value
 * @param {String} creditLimit: Credit limit
 */
const completeTotalContractValueForm = ({
  policyValueOverMvpMaximum = false,
  totalContractValue = application.POLICY[TOTAL_CONTRACT_VALUE],
  creditLimit = application.POLICY[CREDIT_LIMIT],
}) => {
  if (policyValueOverMvpMaximum) {
    const mvpMaximumPlusOne = 50000 + 1;
    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), mvpMaximumPlusOne);
  } else {
    cy.keyboardInput(field(TOTAL_CONTRACT_VALUE).input(), totalContractValue);
  }

  if (creditLimit) {
    cy.keyboardInput(field(CREDIT_LIMIT).input(), creditLimit);
  }
};

export default completeTotalContractValueForm;
