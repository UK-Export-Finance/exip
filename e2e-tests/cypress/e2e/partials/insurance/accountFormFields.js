import { ACCOUNT } from '../../../../constants/field-ids/insurance/account';

const { EMAIL, PASSWORD, SECURITY_CODE } = ACCOUNT;

const accountFormFields = {
  [EMAIL]: {
    label: () => cy.get(`[data-cy="${EMAIL}-label"]`),
    hint: () => cy.get(`[data-cy="${EMAIL}-hint"]`),
    input: () => cy.get(`[data-cy="${EMAIL}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${EMAIL}-error-message"]`),
  },
  [PASSWORD]: {
    label: () => cy.get(`[data-cy="${PASSWORD}-label"]`),
    input: () => cy.get(`[data-cy="${PASSWORD}-input"]`),
    revealButton: () => cy.get('.moj-password-reveal__button'),
    errorMessage: () => cy.get(`[data-cy="${PASSWORD}-error-message"]`),
  },
  [SECURITY_CODE]: {
    label: () => cy.get(`[data-cy="${SECURITY_CODE}-label"]`),
    input: () => cy.get(`[data-cy="${SECURITY_CODE}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${SECURITY_CODE}-error-message"]`),
  },
};

export default accountFormFields;
