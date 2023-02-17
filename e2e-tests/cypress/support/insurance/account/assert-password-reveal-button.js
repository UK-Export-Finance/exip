import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../content-strings/fields/insurance/account';
import accountFormFields from '../../../e2e/partials/insurance/accountFormFields';

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const fieldId = PASSWORD;

const FIELD_STRINGS = ACCOUNT_FIELDS[fieldId];

const field = accountFormFields[fieldId];

const expectedShowText = `${FIELD_STRINGS.REVEAL.SHOW} password`;
const expectedHideText = `${FIELD_STRINGS.REVEAL.HIDE} password`;

const shouldRender = () => {
  field.revealButton().should('exist');

  cy.checkText(field.revealButton(), expectedShowText);
};

const afterClick = {
  changesInputType: () => {
    field.input().should('have.attr', 'type', 'password');
    cy.inputType(field.input(), 'Mock');

    field.revealButton().click();

    // field input shuld change from password to text
    field.input().should('have.attr', 'type', 'text');

    // reveal button text should change to 'hide'
    cy.checkText(field.revealButton(), expectedHideText);
  },
};

const afterSecondClick = {
  changesInputType: () => {
    field.revealButton().click();

    // field input shuld change from text to password
    field.input().should('have.attr', 'type', 'password');

    // reveal button text should change to 'show'
    cy.checkText(field.revealButton(), expectedShowText);
  },
};

export default () => {
  shouldRender();

  afterClick.changesInputType();

  afterSecondClick.changesInputType();
};
