import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../content-strings/fields/insurance/account';
import passwordField from '../../../partials/insurance/passwordField';

const {
  ACCOUNT: { PASSWORD: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS[FIELD_ID];

const EXPECTED_ARIA_LABELS = {
  SHOW: `${FIELD_STRINGS.REVEAL.SHOW} password`,
  HIDE: `${FIELD_STRINGS.REVEAL.HIDE} password`,
};

const shouldRender = () => {
  passwordField.revealButton().should('exist');

  cy.checkText(passwordField.revealButton(), FIELD_STRINGS.REVEAL.SHOW);
  cy.checkAriaLabel(passwordField.revealButton(), EXPECTED_ARIA_LABELS.SHOW);
};

const afterClick = {
  changesInputType: () => {
    passwordField.input().should('have.attr', 'type', 'password');
    cy.keyboardInput(passwordField.input(), 'Mock');

    passwordField.revealButton().click();

    // field input should change from password to text
    passwordField.input().should('have.attr', 'type', 'text');

    // reveal button text should change to 'hide'
    cy.checkText(passwordField.revealButton(), FIELD_STRINGS.REVEAL.HIDE);
    cy.checkAriaLabel(passwordField.revealButton(), EXPECTED_ARIA_LABELS.HIDE);
  },
};

const afterSecondClick = {
  changesInputType: () => {
    passwordField.revealButton().click();

    // field input should change from text to password
    passwordField.input().should('have.attr', 'type', 'password');

    // reveal button text should change to 'show'
    cy.checkText(passwordField.revealButton(), FIELD_STRINGS.REVEAL.SHOW);
    cy.checkAriaLabel(passwordField.revealButton(), EXPECTED_ARIA_LABELS.SHOW);
  },
};

export default () => {
  shouldRender();

  afterClick.changesInputType();

  afterSecondClick.changesInputType();
};
