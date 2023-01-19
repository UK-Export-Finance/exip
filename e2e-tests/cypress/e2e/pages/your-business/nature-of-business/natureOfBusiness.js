import { FIELD_IDS } from '../../../../../constants/field-ids';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const natureOfBusiness = {
  goodsOrServices: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}`),
  goodsOrServicesLabel: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-label`),
  goodsOrServicesHint: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-hint`),
  goodsOrServicesError: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-error`),
};

export default natureOfBusiness;
