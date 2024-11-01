import { passwordField } from '../../../partials/insurance';

const assertPasswordLabelHintAndInput = (fieldStrings) => {
  cy.checkText(passwordField.label(), fieldStrings.LABEL);

  cy.checkText(passwordField.hintIntro(), fieldStrings.HINT.INTRO);
  cy.checkText(passwordField.hint.listItem1(), fieldStrings.HINT.RULES[0]);
  cy.checkText(passwordField.hint.listItem2(), fieldStrings.HINT.RULES[1]);
  cy.checkText(passwordField.hint.listItem3(), fieldStrings.HINT.RULES[2]);
  cy.checkText(passwordField.hint.listItem4(), fieldStrings.HINT.RULES[3]);

  passwordField.input().should('exist');
};

export default assertPasswordLabelHintAndInput;
