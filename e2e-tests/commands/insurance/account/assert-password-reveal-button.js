import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../content-strings/fields/insurance/account';
import accountFormFields from '../../../partials/insurance/accountFormFields';

const {
  ACCOUNT: { PASSWORD: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS[FIELD_ID];

const field = accountFormFields[FIELD_ID];

const expectedShowText = `${FIELD_STRINGS.REVEAL.SHOW} password`;
const expectedHideText = `${FIELD_STRINGS.REVEAL.HIDE} password`;

const shouldRender = () => {
  field.revealButton().should('exist');

  cy.checkText(field.revealButton(), expectedShowText);
};

const afterClick = {
  changesInputType: () => {
    field.input().should('have.attr', 'type', 'password');
    cy.keyboardInput(field.input(), 'Mock');

    field.revealButton().click();

    // field input should change from password to text
    field.input().should('have.attr', 'type', 'text');

    // reveal button text should change to 'hide'
    cy.checkText(field.revealButton(), expectedHideText);
  },
};

const afterSecondClick = {
  changesInputType: () => {
    field.revealButton().click();

    // field input should change from text to password
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
