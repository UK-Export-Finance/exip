import { field } from '../../pages/shared';
import { ACCOUNT } from '../../constants/field-ids/insurance/account';

const { PASSWORD } = ACCOUNT;

const passwordField = {
  ...field(PASSWORD),
  hint: {
    listItem1: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-1"]`),
    listItem2: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-2"]`),
    listItem3: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-3"]`),
    listItem4: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-4"]`),
  },
  revealButton: () => cy.get('.govuk-js-password-input-toggle'),
};

export default passwordField;
