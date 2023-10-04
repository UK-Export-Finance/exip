import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import passwordField from '../../../partials/insurance/passwordField';

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const fieldId = PASSWORD;

const field = passwordField[fieldId];

const assertPasswordLabelHintAndInput = (fieldStrings) => {
  cy.checkText(field.label(), fieldStrings.LABEL);

  cy.checkText(field.hint.intro(), fieldStrings.HINT.INTRO);
  cy.checkText(field.hint.listItem1(), fieldStrings.HINT.RULES[0]);
  cy.checkText(field.hint.listItem2(), fieldStrings.HINT.RULES[1]);
  cy.checkText(field.hint.listItem3(), fieldStrings.HINT.RULES[2]);
  cy.checkText(field.hint.listItem4(), fieldStrings.HINT.RULES[3]);

  field.input().should('exist');
};

export default assertPasswordLabelHintAndInput;
