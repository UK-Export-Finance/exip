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
    hint: {
      intro: () => cy.get(`[data-cy="${PASSWORD}-hint-intro"]`),
      listItem1: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-1"]`),
      listItem2: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-2"]`),
      listItem3: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-3"]`),
      listItem4: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-4"]`),
    },
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
