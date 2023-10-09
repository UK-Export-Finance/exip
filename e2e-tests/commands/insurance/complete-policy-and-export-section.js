import { FIELD_VALUES } from '../../constants';

const { SINGLE, MULTIPLE } = FIELD_VALUES.POLICY_TYPE;

const completePolicyAndExportSection = ({ policyType = SINGLE, sameName = true }) => {
  if (policyType === SINGLE) {
    cy.completeAndSubmitPolicyTypeForm(policyType);
    cy.completeAndSubmitSingleContractPolicyForm({});
  } else {
    cy.completeAndSubmitPolicyTypeForm(MULTIPLE);
    cy.completeAndSubmitMultipleContractPolicyForm({});
  }

  cy.completeAndSubmitAboutGoodsOrServicesForm();

  cy.completeAndSubmitNameOnPolicyForm({ sameName });

  if (!sameName) {
    cy.completeAndSubmitDifferentNameOnPolicyForm({});
  }
};

export default completePolicyAndExportSection;
