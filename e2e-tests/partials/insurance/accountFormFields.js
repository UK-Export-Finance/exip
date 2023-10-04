import { field } from '../../pages/shared';
import { ACCOUNT } from '../../constants/field-ids/insurance/account';

const { PASSWORD } = ACCOUNT;

const accountFormFields = {
  [PASSWORD]: {
    ...field(PASSWORD),
    hint: {
      intro: () => cy.get(`[data-cy="${PASSWORD}-hint-intro"]`),
      listItem1: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-1"]`),
      listItem2: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-2"]`),
      listItem3: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-3"]`),
      listItem4: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-4"]`),
    },
    revealButton: () => cy.get('.moj-password-reveal__button'),
  },
};

export default accountFormFields;
