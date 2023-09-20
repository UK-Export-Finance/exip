import { FIELD_IDS } from '../../constants';
import { submitButton, input } from '../../pages/shared';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      NAME_ON_POLICY: {
        POSITION,
        SAME_NAME,
        OTHER_NAME,
      },
    },
  },
} = FIELD_IDS;

const completeAndSubmitNameOnPolicyForm = ({ sameName = false }) => {
  if (sameName) {
    input.field(SAME_NAME).input().click();
    cy.keyboardInput(input.field(POSITION).input(), 'CEO');
  } else {
    input.field(OTHER_NAME).input().click();
  }

  submitButton().click();
};

export default completeAndSubmitNameOnPolicyForm;
