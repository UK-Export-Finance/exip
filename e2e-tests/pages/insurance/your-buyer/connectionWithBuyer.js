import { field as fieldSelector } from '../../shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';

const { CONNECTION_WITH_BUYER } = FIELD_IDS;

const field = fieldSelector(CONNECTION_WITH_BUYER);

const connectionWithBuyer = {
  [CONNECTION_WITH_BUYER]: {
    ...field,
    hint: {
      intro: () => cy.get(`[data-cy="${CONNECTION_WITH_BUYER}-hint-intro"]`),
      list: {
        item1: () => cy.get(`[data-cy="${CONNECTION_WITH_BUYER}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${CONNECTION_WITH_BUYER}-hint-list-item-2"]`),
      },
    },
  },
};

export default connectionWithBuyer;
