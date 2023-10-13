import { field } from '../../shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  POLICY: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  },
} = INSURANCE_FIELD_IDS;

const aboutGoodsOrServices = {
  [DESCRIPTION]: {
    ...field(DESCRIPTION),
    hint: {
      intro: () => cy.get(`[data-cy="${DESCRIPTION}-hint-intro"]`),
      list: {
        item1: () => cy.get(`[data-cy="${DESCRIPTION}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${DESCRIPTION}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${DESCRIPTION}-hint-list-item-3"]`),
      },
    },
  },
};

export default aboutGoodsOrServices;
