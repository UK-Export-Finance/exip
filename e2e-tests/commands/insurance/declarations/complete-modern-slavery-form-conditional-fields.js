import { autoCompleteField } from '../../../pages/shared';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../constants/field-ids/insurance/declarations';

const {
  MODERN_SLAVERY: {
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const completeModernSlaveryFormConditionalFields = ({ cannotAdhereToAllRequirements, offensesOrInvestigations, awareOfExistingSlavery }) => {
  if (cannotAdhereToAllRequirements) {
    cy.keyboardInput(autoCompleteField(CANNOT_ADHERE_TO_ALL_REQUIREMENTS).input(), cannotAdhereToAllRequirements);
  }

  if (offensesOrInvestigations) {
    cy.keyboardInput(autoCompleteField(OFFENSES_OR_INVESTIGATIONS).input(), offensesOrInvestigations);
  }

  if (awareOfExistingSlavery) {
    cy.keyboardInput(autoCompleteField(AWARE_OF_EXISTING_SLAVERY).input(), awareOfExistingSlavery);
  }
};

export default completeModernSlaveryFormConditionalFields;
