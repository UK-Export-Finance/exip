import { field } from '../../shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  EXPORT_CONTRACT: {
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  },
} = INSURANCE_FIELD_IDS;

const howWillYouGetPaid = {
  [PAYMENT_TERMS_DESCRIPTION]: {
    ...field(PAYMENT_TERMS_DESCRIPTION),
    hint: {
      intro: () => cy.get(`[data-cy="${PAYMENT_TERMS_DESCRIPTION}-hint-intro"]`),
      list: {
        item1: () => cy.get(`[data-cy="${PAYMENT_TERMS_DESCRIPTION}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${PAYMENT_TERMS_DESCRIPTION}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${PAYMENT_TERMS_DESCRIPTION}-hint-list-item-3"]`),
      },
      outro: () => cy.get(`[data-cy="${PAYMENT_TERMS_DESCRIPTION}-hint-outro"]`),
    },
  },
};

export default howWillYouGetPaid;
