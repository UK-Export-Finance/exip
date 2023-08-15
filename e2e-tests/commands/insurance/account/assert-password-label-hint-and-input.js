import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import accountFormFields from '../../../partials/insurance/accountFormFields';

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const fieldId = PASSWORD;

const field = accountFormFields[fieldId];

const assertPasswordLabelHintAndInput = (fieldStrings) => {
  field.label().should('exist');

  cy.checkText(field.label(), fieldStrings.LABEL);

  cy.checkText(accountFormFields[fieldId].hint.intro(), fieldStrings.HINT.INTRO);
  cy.checkText(accountFormFields[fieldId].hint.listItem1(), fieldStrings.HINT.RULES[0]);
  cy.checkText(accountFormFields[fieldId].hint.listItem2(), fieldStrings.HINT.RULES[1]);
  cy.checkText(accountFormFields[fieldId].hint.listItem3(), fieldStrings.HINT.RULES[2]);
  cy.checkText(accountFormFields[fieldId].hint.listItem4(), fieldStrings.HINT.RULES[3]);

  field.input().should('exist');
};

export default assertPasswordLabelHintAndInput;
