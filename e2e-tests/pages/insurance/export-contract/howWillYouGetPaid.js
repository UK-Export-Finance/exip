import { field as fieldSelector } from '../../shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  EXPORT_CONTRACT: {
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  },
} = INSURANCE_FIELD_IDS;

const field = fieldSelector(PAYMENT_TERMS_DESCRIPTION);

const howWillYouGetPaid = {
  [PAYMENT_TERMS_DESCRIPTION]: {
    ...field,
    input: field.textarea,
    hint: {
      list: {
        item1: () => cy.get(`[data-cy="${PAYMENT_TERMS_DESCRIPTION}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${PAYMENT_TERMS_DESCRIPTION}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${PAYMENT_TERMS_DESCRIPTION}-hint-list-item-3"]`),
      },
    },
  },
};

export default howWillYouGetPaid;
