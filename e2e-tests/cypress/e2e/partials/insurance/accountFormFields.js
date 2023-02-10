import { ACCOUNT } from '../../../../constants/field-ids/insurance/account';

const { EMAIL, PASSWORD } = ACCOUNT;

const accountFormFields = {
  [EMAIL]: {
    label: () => cy.get(`[data-cy="${EMAIL}-label"]`),
    input: () => cy.get(`[data-cy="${EMAIL}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${EMAIL}-error-message"]`),
  },
  [PASSWORD]: {
    label: () => cy.get(`[data-cy="${PASSWORD}-label"]`),
    input: () => cy.get(`[data-cy="${PASSWORD}-input"]`),
    revealButton: () => cy.get('.moj-password-reveal__button'),
    errorMessage: () => cy.get(`[data-cy="${PASSWORD}-error-message"]`),
  },
};

export default accountFormFields;
